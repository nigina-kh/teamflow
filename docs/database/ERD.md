# TeamFlow ER Diagram

## Core Entities

---

### User

Represents a registered user.

Responsibilities:

- Authentication
- Profile information
- Workspace membership

---

### Workspace

Represents a team or organization.

Contains:

- Members
- Projects

---

### WorkspaceMembership

Represents the relationship between a User and a Workspace.

Stores:

- Role
- Joined date

---

### Invitation

Invitation sent by email.

Stores:

- Email
- Workspace
- Invitation token
- Expiration date

---

### Project

Belongs to a workspace.

Contains:

- Boards

---

### Board

Represents a Kanban board.

Contains:

- Tasks

---

### Task

Represents a unit of work.

Contains:

- Comments
- Labels
- Assignee
- Reporter

---

### Comment

Discussion attached to a task.

---

### Label

Reusable tag assigned to tasks.