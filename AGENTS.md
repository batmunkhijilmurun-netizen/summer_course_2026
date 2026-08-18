# AGENTS.md

Student repo for the 2026 summer web-dev course. Plain static HTML/CSS/JS — **no build
tooling, package.json, tests, or linters**. Run pages by opening the `.html` file directly
in a browser.

## Structure
- `week01`–`week07`: exercises in `monday/tuesday/thursday/friday` subfolders.
  - Quirk: `week06/monday/` nests `tuesday/`, `thursday/`, `friday/` inside it — don't "fix".
  - Filenames are inconsistent (`ex01.html`, `exercise01.html`, `dasgal…`); never assume a convention.
- `my-firebase-workspace/`: Firebase Hosting project (below).

## p5.js sketches (week05–week07)
- p5 **global mode** (`setup()`/`draw()`).
- Two loading conventions coexist — match the surrounding folder:
  - CDN: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js` (week05 root, week07/monday).
  - Vendored `./js/p5.min.js` (week05/{tuesday,thursday,friday}, week06, week07/tuesday).
- `p5.min.js` is committed per-`js/` folder; copy it in for the local convention.
- HTML links css/js with `./` relative paths (`./css/…`, `./js/…`).

## Firebase Hosting
- Main workspace `my-firebase-workspace/`: project `summer-course-2026-ijilmurun`,
  `firebase.json` hosting `public: "y"`. Deploy from that folder: `firebase deploy`.
- Hosting target `project01` → site `my-project01` (`.firebaserc` `targets`):
  `firebase deploy --only hosting:project01`.
- `project0X.html` and `fir-deploy-5eb8b/` are deploy staging copies — edit source files, not these.
- Older setups in `week04/project{,01,02}`; `project02` deploys to its own site
  (`summer-course-2026-ijilmurun-8d67f`) — see `week04/project02/deployment.md`.

## Conventions
- Code comments are in Mongolian; keep that when editing.
- Commit messages are short/lowercase ("week4 project", "add project 01"), occasionally Mongolian.