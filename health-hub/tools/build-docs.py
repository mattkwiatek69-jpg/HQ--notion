"""Build the Docs reader from Google Docs exports.

    python3 -I health-hub/tools/build-docs.py <export>...

Each export is the JSON the Google Drive connector returns for a doc ({fileContent, title, viewUrl}) or a .txt file
named after the doc. Known docs (DOCS below) get their id, hub and Google link from here.

Writes three files:
  data/docindex.js  committed: the OP docs and their section headings (no body text), so records can point at a section.
  data/docs-private.js NOT committed: the same index for the owner's own docs (the Max doc). Its headings are personal, and the
                    repository is public.
  data/docs-text.js NOT committed (.gitignore): the full text of every section, loaded by the hub only when the reader opens.
                    The repository is public and the OP docs are a paid programme, so their text stays out of git;
                    it is published with the private artifact only.
Section ids are stable as long as headings do not change: <doc id>-<slug of the heading>[-n for repeats]."""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
DOCS = {
    "OP 1": {"id": "op1", "src": "op", "url": "https://docs.google.com/document/d/1LpZ360x0LTrry7Gms6gDCzRlyA0DUge2HowRt1MlUsQ/edit"},
    "OP 2": {"id": "op2", "src": "op", "url": "https://docs.google.com/document/d/1fygQr85Al3N60-_lYnl7laetjWo5LDe30TBFIhjClS8/edit"},
    "Max": {"id": "max", "src": "me", "url": "https://docs.google.com/document/d/17uVk-ot8NebtQ3-n4OiTs0Vc4XbiOH6JApgLk2Ykd7A/edit"},
}
ORDER = ["OP 1", "OP 2", "Max"]
GROUPS = {"Bonus: Puberty Optimisation"}  # a section that also heads the ones after it


def load(path):
    raw = open(path, encoding="utf8").read()
    try:
        j = json.loads(raw)
        return j.get("title"), j.get("fileContent", "")
    except ValueError:
        return os.path.splitext(os.path.basename(path))[0].replace("_", " "), raw


def clean_heading(h):
    h = re.sub(r"[*\\`]", "", h).strip().rstrip(".!-' ").strip()
    return re.sub(r"\s+", " ", h)


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:48] or "section"


def fix_text(t):
    t = re.sub("ð[\u0080-ÿ]{0,3}", "", t)  # emoji the export could not keep
    t = re.sub("[\u0080-\u009f]", "", t)
    return t


def split(title, text, tabs):
    meta = DOCS[title]
    secs, chapter, group, cur, seen = [], "", "", None, {}
    for line in fix_text(text).splitlines():
        m = re.match(r"^# (.+?)\s*$", line)
        if m:
            h = clean_heading(m.group(1))
            if re.match(r"^chapter\b", h, re.I):
                chapter, group, cur = h, "", None
                continue
            if cur is not None and (cur["h"] in GROUPS or not re.sub(r"\*\*[^*\n]*\*\*|[\s*-]", "", "\n".join(cur["body"]))):
                group = cur["h"]  # a title with nothing under it (or one in GROUPS) heads the sections that follow (e.g. "Bonus: Fixing TMJ")
            base = meta["id"] + "-" + slug(h)
            seen[base] = seen.get(base, 0) + 1
            sid = base if seen[base] == 1 else base + "-" + str(seen[base])
            tab = tabs.get(title + ": " + re.sub(r"[\\]", "", m.group(1)).strip()) or tabs.get(title + ": " + h)
            cur = {"id": sid, "d": meta["id"], "ch": chapter, "g": group, "h": h, "body": []}
            if tab:
                cur["tab"] = tab.split("tab=")[-1]
            secs.append(cur)
            continue
        if cur is None:
            continue
        cur["body"].append(line.rstrip())
    out = []
    for s in secs:
        body = "\n".join(s.pop("body")).strip("\n")
        body = re.sub(r"^\s*\*\*" + re.escape(s["h"]) + r"[^\n]*\*\*\s*\n", "", body.lstrip(), count=1, flags=re.I)  # the export repeats the title
        body = re.sub(r"\n{3,}", "\n\n", re.sub(r"[ \t]+\n", "\n", body)).strip()
        s["text"] = body
        out.append(s)
    return out


def main(paths):
    tabs = {}
    lib = os.path.join(DATA, "library.js")
    if os.path.exists(lib):  # section links the exercise library already records
        for n, u in re.findall(r'\["((?:OP [12]): [^"]+)","(https://docs\.google\.com/[^"]+)"\]', open(lib, encoding="utf8").read()):
            tabs[n] = u
    docs = {}
    for p in paths:
        title, text = load(p)
        if title not in DOCS:
            sys.exit(f"{p}: unknown doc {title!r}; add it to DOCS first (ask whose it is)")
        docs[title] = split(title, text, tabs)
    index, text = [], {}
    for t in ORDER:
        if t not in docs:
            continue
        m = DOCS[t]
        secs = [s for s in docs[t] if s["text"]]
        index.append({"id": m["id"], "n": t, "src": m["src"], "url": m["url"], "secs": [{k: s[k] for k in ("id", "ch", "g", "h", "tab") if s.get(k)} for s in secs]})
        for s in secs:
            text[s["id"]] = s["text"]
    head = "/* Primal Health Hub — the docs reader's index: every doc and its sections (headings only, no text).\n   Generated by tools/build-docs.py; the text itself is data/docs-text.js, which is not committed. */\n"
    pub, own = [d for d in index if d["src"] != "me"], [d for d in index if d["src"] == "me"]
    open(os.path.join(DATA, "docindex.js"), "w", encoding="utf8").write(head + "(function (P) {\n  P.docs = " + json.dumps(pub, ensure_ascii=False, indent=1) + ";\n})(window.PHH);\n")
    open(os.path.join(DATA, "docs-private.js"), "w", encoding="utf8").write("/* The owner's own docs and their headings. Private: generated by tools/build-docs.py, never committed. */\n(window.PHH.docs = window.PHH.docs || []).push.apply(window.PHH.docs, " + json.dumps(own, ensure_ascii=False) + ");\n")
    open(os.path.join(DATA, "docs-text.js"), "w", encoding="utf8").write("/* Full text of the docs, by section id. Private: generated by tools/build-docs.py, never committed. */\nwindow.PHH.docText = " + json.dumps(text, ensure_ascii=False) + ";\n")
    for d in index:
        print(d["n"], len(d["secs"]), "sections,", sum(len(text[s["id"]]) for s in d["secs"]), "characters")


if __name__ == "__main__":
    main(sys.argv[1:])
