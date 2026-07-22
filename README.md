# @questra-ai/docx-preview

Maintained Questra fork of [VolodymyrBaydalka/docxjs](https://github.com/VolodymyrBaydalka/docxjs) (`docx-preview`). Published to GitHub Packages as `@questra-ai/docx-preview`.

Upstream demo: https://volodymyrbaydalka.github.io/docxjs/

## Questra changes

- Package scoped as `@questra-ai/docx-preview` with semantic-release to GitHub Packages
- `jszip` pinned to `3.10.1`
- `renderAltChunks` defaults to `false` (avoids `iframe.srcdoc` with document HTML)
- External hyperlink `href` values are scheme-allowlisted (`http`, `https`, `mailto`, fragment/relative)

Consumers should still sanitize rendered HTML (e.g. DOMPurify) before trusting it in a privileged origin.

Goal
----
Goal of this project is to render/convert DOCX document into HTML document with keeping HTML semantic as much as possible. 
That means library is limited by HTML capabilities (for example Google Docs renders *.docx document on canvas as an image).

Installation
-----
```
pnpm add @questra-ai/docx-preview
```

Requires `@questra-ai` registry auth — see [`PUBLISHING.md`](./PUBLISHING.md).
