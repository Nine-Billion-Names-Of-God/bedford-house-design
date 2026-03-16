# PRD: Markdown File Routes

- Status: Draft
- Date: 2026-03-16
- Implementation state: Not approved for build

## Context

The project is currently a clean Next.js template with no functional customization yet.

Current relevant repo state:

- Framework: Next.js 16.1.6 with App Router
- React: 19.2.3
- Styling: Tailwind CSS v4
- Existing markdown content source:
  - `md/front/chatgpt-1.md`
  - `md/front/chatgpt-2.md`
  - `md/front/chatgpt-3.md`
  - `md/front/claude-1.md`
  - `md/front/claude-2.md`
  - `md/back/sample.md`

## User Instructions Captured

The user wants the Next.js template converted so that markdown files are rendered as pages.

Required behavior captured so far:

- Each markdown file should be available at its own individual route
- The homepage should reflect the markdown folder structure exactly
- Existing top-level content groupings such as `front/` and `back/` should remain visible in the route structure
- Each page route should match the markdown filename
- The markdown rendering should follow the Next.js markdown approach
- Markdown content formatting should use Tailwind Typography (`prose`)
- No frontmatter is needed
- No extra navigation chrome is needed, including headers, sidebars, or breadcrumbs
- The visual design should be minimal, tasteful, and slightly styled rather than barren
- The project is a simple internal sample project for front garden and back garden design content
- The final UI implementation should follow the `frontend-design` skill guidance for polished, intentional visual design
- No implementation work should begin until explicit approval is given
- We should first align on the final look and feel, then implement all code changes in one pass

## Product Goal

Turn the existing markdown files in `md/` into browsable content pages inside the Next.js app, using a clean reading experience with typography handled by Tailwind prose styles.

## Proposed Scope

In scope for the later implementation:

- Read markdown files from the local `md/` directory
- Generate one route per markdown file
- Render markdown content inside the Next.js App Router
- Apply Tailwind Typography styling to rendered content
- Replace the starter homepage with a minimal index page that mirrors the markdown folder structure

Out of scope unless later requested:

- CMS integration
- Editing markdown in the browser
- Search
- Tagging, categories, or filtering UI
- Frontmatter parsing
- Comments, auth, analytics, or SEO enhancements beyond basic page metadata
- Headers, sidebars, breadcrumbs, or other document-navigation chrome

## Working Assumptions

- Route structure should mirror the file path under `md/`
- Example mapping:
  - `md/front/chatgpt-1.md` -> `/front/chatgpt-1`
  - `md/back/sample.md` -> `/back/sample`
- The homepage should present the content tree in the same grouped structure, for example:
  - `front`
  - `back`
- Filenames should be used directly for route slugs and display labels unless lightly humanized for readability
- Markdown files do not yet require custom React components inside content
- Basic metadata can initially be inferred from filenames
- The first implementation should stay file-system based and static where possible

## Experience Direction

Confirmed so far:

- The pages should read like proper article/document pages, not raw text dumps
- Typography should be driven by Tailwind `prose`
- The visual direction should be minimal and restrained
- The design should feel stylish and intentional without heavy UI structure
- The palette should feel appropriate for an internal garden-design sample project
- The interface should avoid feeling barren, but should also avoid decorative excess

Proposed design interpretation for implementation:

- A calm, garden-adjacent visual language
- Soft natural colors rather than stark monochrome
- Clean spacing and restrained framing around the prose content
- Simple grouped lists on the homepage instead of a documentation shell
- Subtle surface treatment so the app feels designed, not default

Design execution constraint:

- Follow the `frontend-design` skill during implementation
- Keep the interface intentional and polished
- Avoid generic default template styling
- Preserve restraint: the design should feel refined, not overloaded

## Technical Direction

Preferred implementation direction for the later build:

- Use the Next.js App Router with dynamic routes
- Source content from local markdown files in `md/`
- Use the official Next.js-compatible markdown rendering approach
- Render content on the server
- Precompute known routes from the markdown file tree
- Style content containers with Tailwind Typography
- Build a minimal homepage that enumerates content by directory and links to each markdown route
- Keep the page layout intentionally simple, with no persistent nav framework

## Implementation Notes

Expected information architecture:

1. Homepage (`/`)
   - Shows the markdown content grouped by folder
   - Mirrors `md/front/*` and `md/back/*` structure directly
   - Acts as the only discovery surface needed for this sample project
2. Document pages
   - One page per markdown file
   - Route path derived from folder path plus filename
   - Content rendered in a centered reading layout using `prose`
3. Navigation model
   - Minimal
   - No header, sidebar, breadcrumb, or secondary navigation system

## Remaining Confirmation

The PRD is now materially aligned with the requested structure and visual direction. The main remaining checkpoint is your approval that this interpretation of the homepage and styling is the final one to implement.

## Delivery Rule

No code changes should be made until the user explicitly approves implementation after the PRD and look-and-feel are finalized.
