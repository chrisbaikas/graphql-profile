# GraphQL Profile

A personal profile page for the Zone01 platform. It authenticates against the
platform (JWT), queries the logged-in user's own data from the GraphQL
endpoint, and displays it as profile sections plus SVG statistics graphs.

- **Platform:** `platform.zone01.gr`
- **Live URL:** _(add after deploying — see Deployment)_

## Tech

Plain static site — HTML + CSS + vanilla JavaScript. No build step, no
dependencies, no framework.

```
index.html        # login + dashboard views
css/style.css     # styles
js/app.js         # auth, GraphQL queries, rendering
docs/             # project instructions, audit criteria, ticket tracker
```

## Run locally

The app uses `fetch` against the platform API, so it must be served over HTTP
(opening `index.html` with `file://` breaks CORS). Use any static server:

```bash
# Recommended — uses the Makefile (Python, no dependencies)
make run
# then open http://localhost:8042
# change the port with: make run PORT=9000

# Equivalent without make:
python3 -m http.server 8042

# or Node
npx serve .
```

In VS Code you can also use the **Live Server** extension.

## Deployment

Static hosting — no build. Options:

- **GitHub Pages:** push to GitHub → Settings → Pages → deploy from branch.
- **Netlify:** drag-and-drop this folder into the Netlify dashboard.

After deploying, put the public URL in the **Live URL** field above.

## Docs

- [Project instructions](docs/instructions.md)
- [Audit criteria](docs/audit-readme.md)
- [Ticket tracker](docs/ticket-tracker.md)
