# AGENTS.md

Student repo for the 2026 summer web-dev course. Plain static HTML/CSS/JS — **no build
tooling, package.json, tests, or linters**. Run pages by opening the `.html` file directly
in a browser.

## Structure
- `week01`–`week08`: exercises in `monday/tuesday/thursday/friday` subfolders.
  - Quirk: `week06/monday/` nests `tuesday/`, `thursday/`, `friday/` inside it — don't "fix".
  - Filenames are inconsistent (`ex01.html`, `exercise01.html`, `dasgal…`); never assume a convention.
  - `week08/tuesday/` is empty; `week08/monday/index.html` loads `./js/p5.min.js` but the copy lives at
    `week08/p5.min.js` — copy it into `week08/monday/js/` before editing.
- `my-firebase-workspace/`: Firebase Hosting project (below).

## p5.js sketches (week05–week08)
- p5 **global mode** (`setup()`/`draw()`).
- Two loading conventions coexist — match the neighboring file (both appear even within one folder, e.g. `week05/tuesday/`):
  - Vendored `./js/p5.min.js`, committed per `js/` folder (most of week05/{tuesday,thursday,friday}, week06, week07/{tuesday,thursday}, week08).
  - CDN: week05 root files + week07/{monday,friday}. CDN version differs — **1.9.4 in week05, 1.9.0 in week07**.
- `p5.min.js` is committed per-`js/` folder; copy it in for the local convention.
- HTML links css/js with `./` relative paths (`./css/…`, `./js/…`).

## Firebase Hosting
- Workspace `my-firebase-workspace/`: project `summer-course-2026-ijilmurun`, multi-site hosting
  in `firebase.json` — targets `project01/02/03` → public dirs `projects/project01`, `projects/project02`, `projects/project03`. Deploy from `my-firebase-workspace/`.
  - `.firebaserc` maps only `project01` → `my-project01` and `project03` → `my-project-03`;
    deploy with `firebase deploy --only hosting:project01` (or `:project03`).
  - `project02` has a target in `firebase.json` but **no site mapped in `.firebaserc`** —
    `firebase deploy --only hosting:project02` fails until `firebase target:apply hosting project02 <site>`.
- Older standalone setups in `week04/project{,01,02}`; `project02` deploys to its own site
  (`summer-course-2026-ijilmurun-8d67f`) — run `firebase deploy --only hosting:summer-course-2026-ijilmurun-8d67f` from `week04/project02/`.

## Conventions
- Code comments are in Mongolian; keep that when editing.
- Commit messages are short/lowercase ("week4 project", "add project 01"), occasionally Mongolian.