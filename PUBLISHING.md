# Publishing `@questra-ai/docx-preview`

This package publishes to GitHub Packages under the **`Questra-ai`** org (`@questra-ai/*` scope), matching the repo owner.

## Auth

The Release workflow uses the Actions `GITHUB_TOKEN` with `packages: write`. No extra org PAT is required for same-org publishes.

For local installs outside the umbrella:

```ini
@questra-ai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

PAT needs `read:packages` (and `repo` if the package is private).

## Release flow

1. Push conventional commits to `main` (`feat:`, `fix:`, …).
2. Wait for the **Release** workflow.
3. Confirm the version on GitHub Packages / the Releases page before bumping standalone consumers.

Umbrella workspace development links `packages/docxjs` locally and does not require a published tarball.
