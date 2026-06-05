# Epic: GraphQL Profile Page

> Build a hosted profile page that authenticates against the Zone01 platform
> (JWT), queries the user's own data from the GraphQL endpoint, and displays it
> in three mandatory information sections plus a statistics section with at
> least two SVG graphs.
>
> **Endpoints**
> - GraphQL: `https://((DOMAIN))/api/graphql-engine/v1/graphql`
> - Sign-in:  `https://((DOMAIN))/api/auth/signin`
>
> Every ticket below maps to one or more audit questions. The
> **Audit mapping** line in each ticket points at the exact question(s) in
> [audit-readme.md](./audit-readme.md) that the ticket must satisfy.

---

## Legend

- **Status:** `TODO` · `IN PROGRESS` · `DONE`
- **Priority:** `P0` (blocks audit pass) · `P1` (required) · `P2` (bonus)
- Acceptance criteria are written so each line can be checked off by an auditor.

---

## Audit coverage matrix

Quick view of which ticket satisfies which audit requirement. Keep this in sync
when tickets change.

| Audit requirement (audit-readme.md)                                  | Ticket(s)        |
| -------------------------------------------------------------------- | ---------------- |
| Invalid credentials show an appropriate error                        | T2               |
| Login with valid credentials (username **and** email)               | T2               |
| Profile has the three required sections                              | T5, T6, T7       |
| Section content is accurate vs GraphiQL                              | T5, T6, T7, T13  |
| Fourth section dedicated to graphical statistics                     | T9, T10, T11     |
| At least two different SVG graphs                                    | T10, T11         |
| Graphs display the expected data accurately                          | T10, T11, T13    |
| Profile accessible from a host domain                               | T12              |
| Logout logs the authenticated user out                              | T3               |
| Mandatory queries used: normal, nested, with arguments              | T8               |
| **Bonus** — extra information beyond the three sections             | T14              |
| **Bonus** — extra graphs beyond the required two                    | T15              |
| **Bonus** — student created/used their own GraphiQL                 | T16              |
| **Bonus** — UI respects good practices                              | T17              |

---

## Ticket 1 — Project Setup & Structure

- **Status:** DONE
- **Priority:** P0
- **Audit mapping:** Foundation (no direct audit question; enables all others)

### Goal
Stand up the repository and the static-site skeleton (login view + dashboard
view) so every later ticket has a place to live.

### Tasks
- [x] Initialise git repository
- [x] Create file structure: `index.html`, `css/style.css`, `js/app.js`
- [x] Build the two-view skeleton (`#login-view`, `#dashboard-view`)
- [x] Wire `index.html` to the CSS and JS files

### Acceptance criteria
- [x] The page opens locally with no console errors
- [x] Login view is shown by default; dashboard view is hidden

### Notes
Current `index.html` already has both views and the script/style links. The
view toggle currently uses inline `display` switching in `js/app.js` — keep or
refactor into a small router in T4.

---

## Ticket 2 — Authentication (JWT Login)

- **Status:** IN PROGRESS
- **Priority:** P0
- **Audit mapping:**
  *"Try to log in with invalid credentials → Is an appropriate error shown?"*
  *"Ask the student to login with valid credentials."*

### Goal
Obtain a JWT from the `signin` endpoint using HTTP **Basic** auth
(base64 of `identifier:password`) and store it for later GraphQL requests.

### Tasks
- [ ] Replace the hard-coded `https://DOMAIN/...` with the real platform domain
- [ ] Build the login form (identifier + password) — already present in HTML
- [ ] Encode credentials with `btoa("identifier:password")`
- [ ] `POST` to `/api/auth/signin` with header `Authorization: Basic <base64>`
- [ ] Parse the returned JWT (response may be a quoted string — trim quotes)
- [ ] Persist the JWT to `localStorage`
- [ ] On error, render a human-readable message into `#error`
- [ ] Clear the error message on a subsequent successful login

### Acceptance criteria
- [ ] **Invalid** credentials display a clear error message (no crash, no blank)
- [ ] **Valid** login stores a JWT and switches to the dashboard view
- [ ] Login works with **username**:password
- [ ] Login works with **email**:password
  *(required explicitly by instructions.md — same single input field handles both)*

### Notes
`js/app.js` already POSTs with Basic auth and stores `token`, but the domain is
a placeholder and the JWT may come back wrapped in quotes — handle both.

---

## Ticket 3 — Session Management & Logout

- **Status:** IN PROGRESS
- **Priority:** P0
- **Audit mapping:**
  *"Log out → Is the logout functionality successful in logging the
  authenticated user out?"*

### Goal
Persist the session across reloads and provide a working logout.

### Tasks
- [x] On load, check `localStorage` for a JWT and route accordingly
- [ ] Treat an expired/invalid JWT (rejected by GraphQL) as logged-out
- [x] Implement the logout button
- [x] Clear the JWT from `localStorage` on logout

### Acceptance criteria
- [ ] Refreshing the page while logged in keeps the user on the dashboard
- [ ] Logout clears the token and returns the user to the login view
- [ ] After logout, protected data is no longer reachable (no stale render)

### Notes
Load-time routing and logout exist in `js/app.js`. Still missing: handling a
JWT that the server rejects (e.g. expired) by forcing a logout.

---

## Ticket 4 — GraphQL Service Layer

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:** Foundation for T5–T11 and T13 (data accuracy)

### Goal
A single reusable function that runs any GraphQL query/variables against the
endpoint with `Bearer` auth and consistent error handling.

### Tasks
- [ ] `graphqlRequest(query, variables)` helper
- [ ] Send header `Authorization: Bearer <jwt>`
- [ ] `POST` JSON `{ query, variables }` to the GraphQL endpoint
- [ ] Surface GraphQL errors (response `errors[]`) and network errors
- [ ] On auth failure, trigger the logout flow from T3

### Acceptance criteria
- [ ] Every data query in the app goes through this one function
- [ ] A failed/expired token produces a graceful error, not an uncaught throw

---

## Ticket 5 — Section 1: User Identification

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:**
  *"Does the profile page consist of three sections as required?"* (section 1/3)
  *"Are the details … accurate and correspond to the expected data?"*

### Goal
Display basic user identification — the first of the three required sections.

### Query
```graphql
{
  user {
    id
    login
  }
}
```

### UI
- [ ] User login
- [ ] User ID
- [ ] (optional) decode the JWT to confirm the user id matches

### Acceptance criteria
- [ ] The section renders the logged-in user's real `login` and `id`
- [ ] Values match what GraphiQL returns for the same query (see T13)

---

## Ticket 6 — Section 2: XP

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:** Three required sections (section 2/3); data accuracy.

### Goal
Display the user's total XP — the second required section.

### Query
```graphql
{
  transaction(where: { type: { _eq: "xp" } }) {
    amount
    path
    createdAt
  }
}
```

### UI
- [ ] Total XP (sum of `amount` where `type = "xp"`)
- [ ] Human-readable formatting (e.g. kB / MB if the platform uses byte-XP)

### Acceptance criteria
- [ ] Total XP matches the sum computed from GraphiQL for the same query
- [ ] Only `xp`-type transactions are counted (no `level`/`up`/`down` noise)

---

## Ticket 7 — Section 3: Grades / Audits

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:** Three required sections (section 3/3); data accuracy.

### Goal
Display the third required section: project results and the **audit ratio**
(explicitly mentioned in instructions.md, missing from the previous tracker).

### Queries
Pass / fail results:
```graphql
{
  result {
    grade
    path
  }
}
```
Audit ratio (XP given vs received):
```graphql
{
  transaction(where: { type: { _in: ["up", "down"] } }) {
    type
    amount
  }
}
```

### UI
- [ ] Passed vs failed project counts (`grade >= 1` = pass)
- [ ] Audit ratio = total `up` / total `down`

### Acceptance criteria
- [ ] Pass/fail counts match GraphiQL
- [ ] Audit ratio matches the value shown on the platform profile

---

## Ticket 8 — Required GraphQL Query Types

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:**
  *"Does the project have at least the mandatory queries
  (nested, normal and using arguments)?"*

### Goal
Guarantee all three mandatory query forms are actually used in the app. This is
a cross-cutting checklist over T5–T11, not a separate feature.

### Tasks — confirm each form is used somewhere in the codebase
- [ ] **Normal** query — e.g. `{ user { id login } }` (T5)
- [ ] **Query with arguments** — e.g.
  ```graphql
  { object(where: { id: { _eq: 3323 } }) { name type } }
  ```
- [ ] **Nested** query — e.g.
  ```graphql
  { result { grade user { id login } } }
  ```

### Acceptance criteria
- [ ] All three query types are present and executed in the running app
- [ ] Each is demonstrable to the auditor (e.g. visible in DevTools network tab)

### Notes
The argument-style query in instructions.md *requires* arguments to return a
single object — a good candidate to satisfy the "with arguments" requirement.

---

## Ticket 9 — Section 4: Statistics (SVG container)

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:**
  *"Does the profile include a fourth section dedicated to graphical
  statistics?"*

### Goal
Create the dedicated statistics section that hosts the SVG graphs.

### Tasks
- [ ] Add a clearly-labelled "Statistics" section to the dashboard
- [ ] Provide responsive SVG containers for at least two graphs
- [ ] Build a tiny SVG helper (scaling, axes, labels) reused by T10/T11

### Acceptance criteria
- [ ] A distinct fourth section exists, separate from the three info sections
- [ ] Graphs are drawn with **SVG** (not canvas, not an image, not a chart lib)

---

## Ticket 10 — SVG Graph #1: XP Progress Over Time

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:**
  *"At least two different graphs created using SVG"* (graph 1/2);
  *"Do the graphs display the expected data accurately?"*

### Goal
A line/area chart of cumulative XP over time.

### Data source
```graphql
{
  transaction(
    where: { type: { _eq: "xp" } }
    order_by: { createdAt: asc }
  ) {
    amount
    createdAt
  }
}
```

### SVG features
- [ ] X axis (time) and Y axis (cumulative XP) with labels
- [ ] Polyline / path of the cumulative total
- [ ] Bonus: hover tooltip with the value at a point

### Acceptance criteria
- [ ] The final cumulative value equals the total XP shown in T6
- [ ] The trend visibly tracks the chronological transactions

---

## Ticket 11 — SVG Graph #2: Pass / Fail (or Audit) Ratio

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:**
  *"At least two different graphs created using SVG"* (graph 2/2);
  data accuracy.

### Goal
A second, **different** graph type visualising pass/fail or the audit ratio.

### Data source
```graphql
{
  result {
    grade
  }
}
```

### SVG features
- [ ] Pie **or** bar chart (must be a different chart type than T10)
- [ ] Legend / labels with counts or percentages

### Acceptance criteria
- [ ] The two slices/bars sum to the total number of results
- [ ] Counts match the pass/fail figures in T7

---

## Ticket 12 — Hosting / Deployment

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:**
  *"Try to access the profile from the host domain → Is the profile
  successfully accessible and hosted online?"*

### Goal
Publish the site so the auditor can open it at a public URL.

### Tasks
- [ ] Choose a host (GitHub Pages / Netlify / …)
- [ ] Deploy the static site
- [ ] Verify the deployed login flow works against the live endpoints

### Acceptance criteria
- [ ] The profile is reachable at a public URL
- [ ] Login, all sections, graphs, and logout work on the hosted version
- [ ] Record the live URL in `README.md`

---

## Ticket 13 — Data Accuracy Verification (GraphiQL cross-check)

- **Status:** TODO
- **Priority:** P0
- **Audit mapping:**
  *"Verify the accuracy of the content … using GraphiQL"* and
  *"Try to validate the accuracy of the information presented in the graphs."*

### Goal
A pre-audit pass confirming every displayed number matches the source data.
This is the step an auditor will literally perform, so do it first ourselves.

### Tasks
- [ ] Run each app query in GraphiQL and compare values to the UI
- [ ] Confirm total XP (T6), pass/fail and audit ratio (T7) match
- [ ] Confirm both graphs (T10/T11) reflect the same numbers

### Acceptance criteria
- [ ] No discrepancy between the UI and GraphiQL for any displayed value

---

## Ticket 14 — Bonus: Extra Information

- **Status:** TODO
- **Priority:** P2
- **Audit mapping:**
  *"+Does the profile showcase additional information beyond the three
  mandatory sections?"*

### Goal
Add genuinely useful extra data beyond the three required sections.

### Ideas
- [ ] Skills breakdown
- [ ] Recent activity / latest projects
- [ ] Level, attendance, or piscine stats

### Acceptance criteria
- [ ] At least one meaningful section exists beyond the three required ones

---

## Ticket 15 — Bonus: Extra Graph(s)

- **Status:** TODO
- **Priority:** P2
- **Audit mapping:**
  *"+Are there additional graphs featured apart from the required two?"*

### Goal
Add a third SVG graph (e.g. XP by project, piscine attempts per exercise).

### Acceptance criteria
- [ ] A third distinct SVG graph is present and accurate

---

## Ticket 16 — Bonus: Own GraphiQL

- **Status:** TODO
- **Priority:** P2
- **Audit mapping:**
  *"+Has the student created and utilized their own GraphiQL?"*

### Goal
Provide an in-app query playground (custom GraphiQL-like panel) authenticated
with the user's JWT.

### Acceptance criteria
- [ ] User can type a query, run it, and see the JSON result inside the app

---

## Ticket 17 — Bonus: UI / Good Practices

- **Status:** TODO
- **Priority:** P2
- **Audit mapping:**
  *"+Does the UI respect the good practices?"*

### Goal
Polish the interface to good-UI standards.

### Tasks
- [ ] Loading states for async data
- [ ] Empty / error states
- [ ] Responsive layout, readable contrast, consistent spacing
- [ ] Accessible labels on inputs and buttons

### Acceptance criteria
- [ ] The UI is responsive, gives feedback during/after actions, and is legible
