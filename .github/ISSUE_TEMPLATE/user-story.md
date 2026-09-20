---
name: User Story
about: Template for creating user stories
title: ''
labels: ''
assignees: ''

---

**As a** [role]
**I need** [function]
**So that** [benefit]

### Details and Assumptions
* [document what you know]

### Acceptance Criteria

```gherkin
Given [some context]
When [certain action is taken]
Then [the outcome of action is observed]


This follows the required Story → Details and Assumptions → Acceptance Criteria/Gherkin structure. :contentReference[oaicite:4]{index=4}

Then click:

**Propose changes → Commit changes**

GitHub should create the issue-template directory in your repository. :contentReference[oaicite:5]{index=5}

## Step 3 — Create the required labels

Go to:

**Issues → Labels → New label**

Create:

| Label | Purpose |
|---|---|
| `new` | Stories needing prioritization |
| `backlog` | Stories selected for current work |
| `icebox` | Stories to work on later |

Colors can be whatever you want. These are the three labels explicitly required at this stage. :contentReference[oaicite:6]{index=6}

Later we'll also create:

**`technical debt` — yellow**

as required by Exercise 6. :contentReference[oaicite:7]{index=7}

## Step 4 — Create the 10 required issues

The lab explicitly asks for these ten stories: :contentReference[oaicite:8]{index=8}

1. `Finish user stories`
2. `Initialize and populate MongoDB`
3. `Run skeleton application`
4. `Implement a landing page and navigation`
5. `Add authentication components and logic`
6. `Implement Gifts details page`
7. `Implement a search component`
8. `Design and implement the comments feature`
9. `Containerize the services and applications`
10. `Deploy backend and frontend`

Initially apply **`new`** to all ten.

You don't have to figure out the story bodies yourself. For example, for **Initialize and populate MongoDB**, you can enter:

```markdown
**As a** developer
**I need** to initialize and populate the MongoDB database
**So that** the GiftLink application has persistent data available for its features

### Details and Assumptions
* MongoDB will be used as the application's database.
* Sample GiftLink data will be imported into the database.
* Database credentials will be configured through environment variables.

### Acceptance Criteria

```gherkin
Given a MongoDB instance is available
When the sample GiftLink data is imported
Then the database should contain the required application data
And the imported data should be accessible using mongosh


### Important: we'll create all 10 properly

Don't create vague or incomplete issues just to reach the required number. Exercise 6 specifically requires the Product Backlog stories to contain enough detail and acceptance criteria to be **sprint ready**. :contentReference[oaicite:9]{index=9}

After the ten stories, we'll also create:

**Issue title:** `research authentication in React and Express`

and give it the **`technical debt`** label. :contentReference[oaicite:10]{index=10}

## What you'll eventually submit

For the final assessment, you need to preserve:

**1. Public GitHub URL of `user-story.md`**

**2. Screenshot of your public GitHub Issues page containing at least eight user stories**

Save the screenshot as:

`userstories.png`

or

`userstories.jpeg`

These are explicitly required for the AI-graded submission. :contentReference[oaicite:11]{index=11}

### Do this first

For now, complete **Step 1 only**:

**Use this template → Create a new repository → `fullstack-capstone-project` → Public → Create repository**

Once you've created it, **send me a screenshot of the repository page**. Then I'll guide you through creating the `User Story` template, and after that I'll give you the **exact ready-to-paste content for all 10 user stories** one by one.
