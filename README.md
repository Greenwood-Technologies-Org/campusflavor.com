# campusflavor.com

The official site for [campusflavor.com](campusflavor.com).

## Getting Started

Install all of the packages.

```bash
npm i
```

Run development server

```bash
npm run dev
```

## .env

```.env
# vercel
VERCEL_URL=https://campusflavor.com

# supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# s3

# resend
RESEND_NOTIFICATIONS=
```

## Git Commit Message Guidelines

This document offers guidelines for writing commit messages in this repository, based on the Angular commit message format.

### Format of the Commit Message

```text
<type>(<scope>): <short summary>
    │   │           │
    │   │           └─⫸ Summary in present tense. Not capitalized. No period at the end.
    │   │
    │   └─⫸ Commit Scope: Could be anything specifying the scope of the commit change.
    │
    └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|style|test
```

## Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)

## Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

The following is the list of supported scopes:

- **api**
- **ui**
- **db**
- **s3**

_Note: The scope can be omitted when the change is a global or difficult to assign to a single component._
