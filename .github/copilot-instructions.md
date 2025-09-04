# Copilot Instructions for AI Coding Agents

## Project Overview
This is a Next.js project using the App Router, TypeScript, and a custom UI component library under `src/components/ui`. The codebase is structured for modularity and scalability, with clear separation between app logic, UI components, hooks, and utility functions.

## Current Feature: Homepage with Drag-and-Drop Content Management
**Branch**: `001-homepage-with-drag`
**Status**: Planning Complete - Ready for Implementation

### Feature Overview
Building a four-section homepage where users can drag and drop curated news/social media posts and create blog posts. Sections: feature (top), main river (center), left sidebar, right sidebar.

### Key Technologies
- **Drag & Drop**: @dnd-kit/core + @dnd-kit/sortable for accessibility and React integration
- **Rich Text Editor**: TipTap v2 for blog post creation with media embedding
- **Data Persistence**: IndexedDB with Dexie.js wrapper + localStorage fallback
- **Layout**: CSS Grid for four-section responsive layout
- **State Management**: React Context + useReducer for content management

### Implementation Focus
- Single-user application (no authentication needed)
- Client-side only (no backend integration)
- Manual content input (no external APIs)
- Responsive design maintaining four-section structure
- Rich text editing with draft/publish workflow

### File Structure
```
src/
├── components/
│   ├── content/     # Content item components
│   ├── editor/      # Rich text editor components
│   └── layout/      # Section and layout components
├── hooks/           # Content management and DnD hooks
├── lib/
│   ├── content/     # Content CRUD operations
│   ├── storage/     # IndexedDB/localStorage
│   └── dnd/         # Drag and drop utilities
└── types/           # TypeScript definitions
```

### Design Artifacts
- **Specification**: `specs/001-homepage-with-drag/spec.md`
- **Data Model**: `specs/001-homepage-with-drag/data-model.md`
- **Contracts**: `specs/001-homepage-with-drag/contracts/content-management.md`
- **Test Guide**: `specs/001-homepage-with-drag/quickstart.md`

## Key Directories & Files
- `src/app/`: Main application entry, global styles, layout, and routing.
- `src/components/ui/`: Custom, reusable UI components. Follow existing patterns for props, styling, and composition.
- `src/hooks/`: Custom React hooks (e.g., `use-mobile.ts`).
- `src/lib/utils.ts`: Utility functions shared across the app.
- `public/`: Static assets (SVGs, icons).
- `README.md`: Basic setup and run instructions.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`).
- **Edit Main Page:** Modify `src/app/page.tsx`.
- **Global Styles:** Edit `src/app/globals.css`.
- **Component Development:** Add new UI components in `src/components/ui/` following the structure and conventions of existing files.
- **TypeScript:** All code should be type-safe and follow strict typing conventions.

## Patterns & Conventions
- **Component Props:** Use explicit TypeScript interfaces for props. See examples in `src/components/ui/*`.
- **Styling:** Use CSS modules or global styles. Avoid inline styles unless necessary.
- **SVGs:** Store in `public/` and import as needed.
- **Hooks:** Place custom hooks in `src/hooks/` and name them with `use-` prefix.
- **Utilities:** Shared logic goes in `src/lib/utils.ts`.
- **Routing:** Use Next.js App Router conventions (`src/app/`).

## Integration Points
- **Next.js:** App Router, TypeScript, next/font for font optimization.
- **Vercel:** Recommended deployment platform.

## Examples
- To create a new button variant, copy `src/components/ui/button.tsx` and follow its prop/interface pattern.
- For a new page, add a file under `src/app/` and export a React component.
- For a new hook, add to `src/hooks/` and follow the `use-` naming convention.

## Recent Changes
- 2025-09-04: Added homepage drag-and-drop feature planning (TypeScript + React DnD + TipTap)

## Additional Notes
- No test setup or custom build scripts detected; use standard Next.js workflows.
- No custom linting or formatting rules found beyond defaults.
- If adding new dependencies, update `package.json` and run `npm install`.

---

If any section is unclear or missing, please provide feedback so this guide can be improved for future AI agents.
