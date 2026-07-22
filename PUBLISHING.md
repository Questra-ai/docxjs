# Publishing `@questra/docx-preview`

This package publishes to private GitHub Packages under the **`questra`** org (`@questra/*` scope).

## Required secret

On `Questra-ai/docxjs`, set repository secret **`QUESTRA_PACKAGES_TOKEN`** to a classic PAT that has:

- `write:packages` and `read:packages`
- Access to the **`questra`** GitHub org (not only `Questra-ai`)

`GITHUB_TOKEN` from the `Questra-ai/docxjs` Actions run cannot create packages in the `questra` package namespace. Without `QUESTRA_PACKAGES_TOKEN`, Release will tag/version in git but fail on `npm publish` with:

`403 … The requested installation does not exist`

## Release flow

1. Push conventional commits to `main` (`feat:`, `fix:`, …).
2. Wait for the **Release** workflow.
3. Confirm the version on GitHub Packages before bumping consumers outside the umbrella.

Umbrella workspace development links `packages/docxjs` locally and does not require a published tarball.
