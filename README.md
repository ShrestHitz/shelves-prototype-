# shelves-proto srivas

first prototype for project shelves

members:
Swarnava
Shresth

## Frontend location

The canonical frontend files live at the repository root (HTML, CSS, and `js/`).
Do your development edits in the root files. There used to be duplicate copies under `backend/` — those were removed to avoid stale served content.

If you want the backend to serve the site for production builds, move the root frontend into `backend/src/main/resources/static/` as part of a build step. Until then, keep the root as the source of truth.

## Preventing accidental duplicates

To avoid re-adding duplicates under `backend/`, a `.gitignore` entry has been added (see `.gitignore`). If you intentionally add files to `backend/`, ensure they're part of the build process and documented here.
