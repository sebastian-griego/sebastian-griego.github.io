# sebastian-griego.github.io

Personal GitHub Pages site for math, formal verification, Lean 4, and related project notes.

## Local editing

This is a static site with no build step. Open `index.html` directly in a browser to preview changes.

Useful checks before publishing:

```bash
python -m http.server 8000
python -c "from html.parser import HTMLParser; from pathlib import Path; pages=('index.html','ai-assisted-bound-improvements.html','estimathon/index.html','smart_snake/index.html','math_genealogy/index.html'); [HTMLParser().feed(Path(p).read_text(encoding='utf-8')) for p in pages]; print('html parse ok')"
```

## Deployment

GitHub Pages serves the `main` branch at:

https://sebastian-griego.github.io/

Keep `sitemap.xml` and `robots.txt` in sync when adding top-level public pages.
