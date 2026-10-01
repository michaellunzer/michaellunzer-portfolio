# Dependency & Maintenance Review — 2026-10-01

**Verdict: the repo is not current.** `yarn audit` reports **38 advisories on `master` (2 critical, 22 high, 14 moderate)**.
Everything security-relevant is fixable by refreshing `yarn.lock` — **no `package.json` edits, no version bumps, no code changes.**

Awaiting approval before any commit, push, or deploy.

---

## 1. What's outdated

| Package | Installed | In-range | Latest |
|---|---|---|---|
| next | 15.5.23 | **15.5.27** | 16.3.8 |
| contentful | 11.12.9 | 11.12.10 | 11.12.10 |
| axios *(via contentful)* | 1.19.0 | **1.20.0** | 1.20.0 |
| qs *(via contentful)* | 6.15.3 | **6.16.0** | 6.16.0 |
| sharp *(via next)* | 0.35.3 | **0.35.5** | 0.35.5 |
| moment | 2.30.1 | 2.31.0 | 2.31.0 |
| js-yaml, brace-expansion *(via eslint)* | 4.3.1 / 1.1.18 | 4.3.2 / 1.1.21 | — |
| postcss | 8.5.26 | 8.5.28 | 8.5.28 |
| prettier | 3.9.6 | 3.9.9 | 3.9.9 |
| react / react-dom | 18.3.1 | 18.3.1 | 19.3.0 |
| eslint | 8.57.1 *(EOL)* | 8.57.1 | 10.11.0 |
| dotenv | 17.4.2 | 17.4.2 | 18.0.5 |

## 2. Security findings

**2 critical, both in `next@15.5.23`** (patched in `>=15.5.24`):
- Unauthenticated RCE on **Windows-hosted** servers
- Unauthenticated RCE in the **Image Optimization API** when AVIF is used

**Practical exposure is low on this deployment**, and I want to be straight about that rather than overstate it:
- The site runs on Vercel (Linux), so the Windows RCE does not apply.
- `next.config.js` sets `images.unoptimized: true`, which disables the `/_next/image` optimizer the AVIF RCE targets — even though `formats: ['image/webp','image/avif']` is configured.

The remaining 36 are mostly **12 axios advisories via `contentful`** (ReDoS, prototype-pollution gadgets, redirect-based SSRF) plus `qs`, `js-yaml`, `brace-expansion` (dev-only, via eslint), `moment` path traversal, and `sharp`/libheif.

None of this looks actively exploited against a static portfolio, but the fix is free — so it should just be taken.

## 3. Pre-existing breakage (not caused by any upgrade)

1. **`yarn lint` has never worked.** There is no ESLint config file in the repo at all, so `next lint` falls through to its interactive setup prompt and exits 1. Confirmed on `master`.
2. **There is no test suite.** No `test` script, no test files, no runner. Step "run the test suite" in this routine has nothing to run.
3. **No CI.** No `.github/` directory — nothing validates a PR before merge.
4. **459 stale `out/` build artifacts are tracked in git** even though `out/` is in `.gitignore` (same class of issue as the earlier "Stop tracking .next build output" commit).
5. **`.nvmrc` pins Node 18**, which is EOL (April 2025).
6. **4 unused dependencies**: `prismjs`, `prism-themes`, `@popperjs/core`, `spotify-web-api-node` — no references anywhere in `src/`, `lib/`, or `scripts/`.

## 4. PR #54 needs attention before merge

[#54](https://github.com/michaellunzer/michaellunzer-portfolio/pull/54) (Next 16 + React 19 + working lint) is open, `mergeable_state: clean`, and 6 weeks old. It is good work, but **merging it as-is would not fix the security problem — it would make it slightly worse**:

- Its lockfile now audits at **38 advisories with 3 critical** — the same two Next RCEs (`next@16.x` is vulnerable below 16.3.3) plus a third, RCE in `next/og` `ImageResponse` (needs `>=16.3.6`). It pins `^16.3.1`, which resolved to a vulnerable 16.3.x when the branch was written. It was genuinely clean in August; advisories landed since.
  - *The `next/og` one is not reachable here — nothing imports `next/og` or `ImageResponse`.*
- **It leaves `.nvmrc` at `18` while moving to Next 16, which requires Node `>=20.9.0`.** Vercel reads `.nvmrc` to select the build image. This is the one change in #54 I'd call an actual risk.

Both are small: refresh its lockfile (`^16.3.1` already admits 16.3.8) and bump `.nvmrc`.

## 5. Proposed plan

### Tier 1 — Security patch (recommended now; lowest risk available)
Refresh the lockfile on `master` only:
```
rm yarn.lock && yarn install
```
- **38 → 0 advisories.** `package.json` byte-identical. Only `yarn.lock` changes (+439/−429).
- **Verified:** `yarn build` succeeds and prerenders all 14 routes with **identical** route output and First Load JS vs. baseline.
- Resolves to next 15.5.27, axios 1.20.0, qs 6.16.0, sharp 0.35.5, moment 2.31.0, js-yaml 4.3.2, brace-expansion 1.1.21, postcss 8.5.28.
- ⚠️ Do **not** use plain `yarn upgrade` — I tested it and yarn v1 silently promotes the two `resolutions` entries (`postcss`, `sharp`) into `dependencies`. The `rm yarn.lock` path leaves `package.json` untouched.

### Tier 2 — Land PR #54 (after two fixes)
Refresh #54's lockfile and bump `.nvmrc` to `22`, then merge.
- **Verified on the #54 tree with a refreshed lockfile:** `0 advisories`, `yarn build` clean, `yarn lint` **0 errors / 2 warnings** (the two `no-img-element` warnings its own description already flags), on next 16.3.8 / react 19.3.0 / eslint 9.39.5.
- All React consumers already declare React 19 support (`react-slick`, `reactjs-popup`, `@formspree/react`, `react-markdown`, `@contentful/rich-text-react-renderer`), so this is less risky than a React major usually is.
- Tier 1 and Tier 2 don't conflict — Tier 1 touches only `yarn.lock`, and #54 regenerates it anyway.

### Tier 3 — Housekeeping (separate, no urgency)
- `git rm -r --cached out/` to stop tracking 459 ignored build artifacts.
- Drop the 4 unused dependencies.
- Bump `.nvmrc` 18 → 22 regardless of #54.
- Add a minimal CI workflow (install + build + lint) — there is currently nothing stopping a broken push.
- Close the superseded dependabot PRs: **#46** (next 15.5.14 — below the 15.5.24 security floor), **#45**, **#43**, **#42** are all resolved by Tier 1. **#37, #36, #32, #31** date to the Gatsby era (2023) and no longer apply.
- Consider replacing `moment` (maintenance-only since 2020) — low priority, used in 9 files.

### Deliberately not proposed
ESLint 10 and dotenv 18. #54 already documents that `eslint-config-next@16` bundles `typescript-eslint@8`, which breaks on ESLint 10 — 9.x is the ceiling. dotenv 18 is a major affecting only two build scripts; no benefit worth the churn.

## 6. Risks

| Risk | Assessment |
|---|---|
| Tier 1 breaks the build | **Very low** — verified; patch/minor only within existing ranges, identical build output |
| Tier 1 is unverifiable by tests | **Real** — there is no test suite; "verified" here means build + route-output comparison, nothing more |
| Tier 2 React 19 runtime regressions | **Low-moderate** — build and lint pass, but with no tests and no CI, confidence rests on #54's own byte-for-byte prerender diff |
| Tier 2 `.nvmrc` 18 vs Next 16's Node ≥20.9 | **Must fix before merge** |
| Contentful/Spotify calls unverified here | Sandbox network is restricted; the Spotify fetch fails locally with `Host not in allowlist`. The build falls back to committed `contentful-data.json`, so a successful local build does **not** prove live API behavior |

## 7. What I could not do

Steps 6–8 of this routine are **blocked in this environment**, independent of approval:
- **No test suite exists**, so there is nothing to run.
- **Deploy is not possible from here**: no `VERCEL_TOKEN`, no `vercel` CLI, and no Contentful/Spotify/Resend credentials. Production deploys happen through Vercel's git integration on push to `master` — so "deploy" means merging to `master`, which is a production release I will not perform without explicit approval.

**Nothing has been committed or pushed.** All verification ran in throwaway copies under the scratchpad; the working tree is clean.

## 8. Requested approval

1. **Tier 1 now?** (lockfile refresh → PR into `master`; clears all 38 advisories)
2. **Tier 2?** Should I push the lockfile refresh + `.nvmrc` bump onto `upgrade-next16-react19` so #54 is mergeable and clean?
3. **Tier 3** — any of it, and should I close the stale dependabot PRs?
4. To actually reach production, confirm you want a merge to `master` — or do that yourself after reviewing the PR.
