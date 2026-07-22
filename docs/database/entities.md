# Database Entities

---

# User

Stores registered users.

Fields:

- id (UUID)
- email
- passwordHash
- firstName
- lastName
- avatarUrl (optional)
- isEmailVerified
- createdAt
- updatedAt

---

# Workspace

Represents a team workspace.

Fields:

- id (UUID)
- name
- slug
- description (optional)
- ownerId
- createdAt
- updatedAt

---

# WorkspaceMembership

Connects users and workspaces.

Fields:

- id (UUID)
- workspaceId
- userId
- role
- joinedAt

---

# Invitation

Stores invitations sent by email.

Fields:

- id (UUID)
- workspaceId
- email
- token
- status
- expiresAt
- createdAt

---

# Project

Belongs to a workspace.

Fields:

- id (UUID)
- workspaceId
- name
- description (optional)
- icon (optional)
- color (optional)
- isArchived
- createdAt
- updatedAt

---

# Board

Represents a Kanban board.

Fields:

- id (UUID)
- projectId
- name
- position
- createdAt
- updatedAt

---

# Task

Represents a unit of work.

Fields:

- id (UUID)
- taskNumber
- boardId
- title
- description (optional)
- priority
- status
- position
- assigneeId (optional)
- reporterId
- dueDate (optional)
- createdAt
- updatedAt

---

# Comment

Task discussion.

Fields:

- id (UUID)
- taskId
- authorId
- content
- createdAt
- updatedAt

---

# Label

Reusable task label.

Fields:

- id (UUID)
- workspaceId
- name
- color

---

# TaskLabel

Many-to-many relation.

Fields:

- taskId
- labelId