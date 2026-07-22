# Entity Relationships

User 1 --- * WorkspaceMembership

Workspace 1 --- * WorkspaceMembership

Workspace 1 --- * Project

Workspace 1 --- * Invitation

Project 1 --- * Board

Board 1 --- * Task

Task 1 --- * Comment

Task * --- * Label