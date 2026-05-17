# Role Based Access Control:

<img width="1901" height="834" alt="users, projects and other tables" src="https://github.com/user-attachments/assets/b1b6a767-8993-435d-b37b-481ed0f45979" />

Current Implementation:

1. There are four roles that a user can have for a project:

```
1. SUPER_ADMIN
2. ADMIN
3. MODERATOR
4. VIEWER
```

2. There are actions which only SUPER_ADMIN can do. Then below it are ADMIN, MODERATOR and VIEWER.

### Project

| Action  | Super Admin | Admin       | Moderator | Viewer |
| ------- | ----------- | ----------- | --------- | ------ |
| Create  | Yes         | Yes         | No        | No     |
| Read    | Yes         | Yes         | Yes       | Yes    |
| Update  | Yes         | own_project | No        | No     |
| Delete  | Yes         | own_project | No        | No     |
| Archive | Yes         | own_project | No        | No     |

### Task

| Action | Super Admin | Admin | Moderator | Viewer   |
| ------ | ----------- | ----- | --------- | -------- |
| Create | Yes         | Yes   | Yes       | No       |
| Read   | Yes         | Yes   | Yes       | Yes      |
| Update | Yes         | Yes   | Yes       | own_task |
| Delete | Yes         | Yes   | Yes       | No       |
| Assign | Yes         | Yes   | Yes       | No       |

### Member

| Action      | Super Admin | Admin       | Moderator | Viewer |
| ----------- | ----------- | ----------- | --------- | ------ |
| Invite      | Yes         | Yes         | No        | No     |
| Remove      | Yes         | own_project | No        | No     |
| Read        | Yes         | Yes         | Yes       | Yes    |
| Change Role | Yes         | own_project | No        | No     |

## role_permissions table

| id  | role_id | resource | action      | condition   |
| --- | ------- | -------- | ----------- | ----------- |
| 1   | 1       | project  | create      |             |
| 2   | 1       | project  | read        |             |
| 3   | 1       | project  | update      |             |
| 4   | 1       | project  | delete      |             |
| 5   | 1       | project  | archive     |             |
| 6   | 1       | task     | create      |             |
| 7   | 1       | task     | read        |             |
| 8   | 1       | task     | update      |             |
| 9   | 1       | task     | delete      |             |
| 10  | 1       | task     | assign      |             |
| 11  | 1       | member   | invite      |             |
| 12  | 1       | member   | remove      |             |
| 13  | 1       | member   | read        |             |
| 14  | 1       | member   | change_role |             |
| 15  | 2       | project  | create      |             |
| 16  | 2       | project  | read        |             |
| 17  | 2       | project  | update      | own_project |
| 18  | 2       | project  | delete      | own_project |
| 19  | 2       | project  | archive     | own_project |
| 20  | 2       | task     | create      |             |
| 21  | 2       | task     | read        |             |
| 22  | 2       | task     | update      |             |
| 23  | 2       | task     | delete      |             |
| 24  | 2       | task     | assign      |             |
| 25  | 2       | member   | invite      |             |
| 26  | 2       | member   | remove      | own_project |
| 27  | 2       | member   | read        |             |
| 28  | 2       | member   | change_role | own_project |
| 29  | 3       | project  | read        |             |
| 30  | 3       | task     | create      |             |
| 31  | 3       | task     | read        |             |
| 32  | 3       | task     | update      |             |
| 33  | 3       | task     | delete      |             |
| 34  | 3       | task     | assign      |             |
| 35  | 3       | member   | read        |             |
| 36  | 4       | project  | read        |             |
| 37  | 4       | task     | read        |             |
| 38  | 4       | task     | update      | own_task    |
| 39  | 4       | member   | read        |             |
