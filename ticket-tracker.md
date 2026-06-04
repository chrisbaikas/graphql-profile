# Epic: GraphQL Profile Page

## Ticket 1 — Project Setup & Structure

### Goal

Set up the project and create the basic application structure.

### Tasks

* Create repository
* Create project structure

  * `index.html`
  * `css/`
  * `js/`
* Create base layout
* Configure navigation between Login and Dashboard views

### Done When

* The project runs locally
* The basic file structure is in place

---

## Ticket 2 — Authentication (JWT Login)

### Goal

Implement user authentication using Basic Auth.

### Tasks

* Create login form
* Add username/email input
* Add password input
* Send POST request to the signin endpoint
* Store JWT in localStorage
* Handle authentication errors

### Done When

* Successful login returns and stores a JWT
* Invalid credentials display an error message

---

## Ticket 3 — Session Management & Logout

### Goal

Manage authenticated user sessions.

### Tasks

* Check for existing JWT on page load
* Redirect authenticated users to Dashboard
* Implement logout button
* Clear localStorage on logout

### Done When

* User remains logged in after page refresh
* Logout works correctly

---

## Ticket 4 — GraphQL Service Layer

### Goal

Create a reusable GraphQL request service.

### Tasks

* Create GraphQL helper function
* Add Bearer token authentication
* Handle GraphQL and network errors

### Done When

* GraphQL queries can be executed through a single service function

---

## Ticket 5 — User Profile Information

### Goal

Display basic user information.

### Queries

```graphql
{
  user {
    id
    login
  }
}
```

### UI

* User login
* User ID

### Done When

* User information is displayed correctly

---

## Ticket 6 — XP & Progress Statistics

### Goal

Display core profile statistics.

### Queries

XP:

```graphql
{
  transaction {
    amount
  }
}
```

Progress:

```graphql
{
  result {
    grade
  }
}
```

### UI

* Total XP
* Passed projects count
* Failed projects count

### Done When

* Statistics are calculated and displayed correctly

---

## Ticket 7 — Required GraphQL Query Types

### Goal

Implement all required GraphQL query types.

### Tasks

#### Standard Query

```graphql
{
  user {
    login
  }
}
```

#### Query with Arguments

```graphql
{
  object(where: { id: { _eq: 3323 } }) {
    name
  }
}
```

#### Nested Query

```graphql
{
  result {
    user {
      login
    }
  }
}
```

### Done When

* All three query types are used within the application

---

## Ticket 8 — SVG Graph #1: XP Progress Over Time

### Goal

Create a line chart showing XP progression.

### Data Source

```graphql
{
  transaction {
    amount
    createdAt
  }
}
```

### SVG Features

* Axes
* Labels
* Polyline chart

### Done When

* XP progression graph is rendered correctly

---

## Ticket 9 — SVG Graph #2: Pass / Fail Ratio

### Goal

Visualize project success statistics.

### Data Source

```graphql
{
  result {
    grade
  }
}
```

### SVG Features

Choose one:

* Pie Chart
* Bar Chart

### Done When

* Pass/Fail statistics are displayed visually

---

## Ticket 10 — UI Polish & Deployment

### Goal

Finalize the application and deploy it.

### Tasks

* Improve styling
* Add loading states
* Add empty states
* Create README
* Deploy application

### Deployment Options

* GitHub Pages
* Netlify

### Done When

* Application is publicly accessible
* All required features work correctly
