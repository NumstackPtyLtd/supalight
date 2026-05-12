# Supalight

Supalight (`@supaproxy/supalight`) provides syntax highlighting themes for the SupaProxy design system. It ships Shiki-compatible dark and light themes plus a rehype plugin for use in MDX pipelines. Published on npm as `@supaproxy/supalight`.

See the [central hub](https://github.com/NumstackPtyLtd/supaproxy) for cross-repo governance, workflow, and conventions.

## Project structure

```
supalight/
  src/
    index.js           Main entry. Exports dark, light themes and rehypeSupalight.
    rehype.js          Rehype plugin. Transforms <pre><code> blocks using Shiki.
    themes/
      dark.json        Shiki theme: supalight-dark
      light.json       Shiki theme: supalight-light
  package.json         npm package config (@supaproxy/supalight)
```

## Exports

| Export path | What it provides |
|---|---|
| `@supaproxy/supalight` | `dark`, `light` theme objects and `rehypeSupalight` plugin |
| `@supaproxy/supalight/themes/dark` | Dark theme JSON |
| `@supaproxy/supalight/themes/light` | Light theme JSON |
| `@supaproxy/supalight/rehype` | Rehype plugin for MDX pipelines |

## Supported languages

javascript, typescript, jsx, tsx, json, bash, shell, sh, html, css, yaml, yml, python, go, rust, sql, markdown, mdx, dockerfile, diff, graphql, toml, xml.

## Usage

```js
import { rehypeSupalight } from '@supaproxy/supalight'
// or
import { dark, light } from '@supaproxy/supalight'
```

## Development

```bash
npm install
```

This is a plain JavaScript package with no build step. Edit `src/` files directly.

## Git workflow

All changes go through pull requests. NEVER push directly to main.

### Branch naming

```
feat/short-description
fix/short-description
chore/short-description
docs/short-description
```

### Destructive commands

NEVER run these commands:
- `git push --force`
- `git reset --hard`
- `git clean -f`
- `rm -rf` on project directories

If something needs to be undone, create a revert commit on a branch.

## Code rules

### No hardcoded values

- No env var fallbacks. Use `requireEnv()` with no defaults.
- No hardcoded API URLs, secrets, or magic numbers.

### Type safety

- No `any` types. Define interfaces for all data structures.
- No `as any` casts.

### Writing standards

- British English throughout (colour, organisation, behaviour).
- No em dashes or en dashes. Use commas, full stops, or semicolons.
- No smart quotes. Use straight quotes only.
- Sentence case for headings.
