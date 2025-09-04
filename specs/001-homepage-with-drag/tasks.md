# Tasks: Homepage with Drag-and-Drop Content Management

**Input**: Design documents from `/specs/001-homepage-with-drag/`
**Prerequisites**: plan.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓

## Execution Flow (main)
```
1. Load plan.md from feature directory ✓
   → Tech stack: Next.js 14+, TypeScript, @dnd-kit, TipTap, IndexedDB
   → Structure: Single Next.js project with components/hooks/lib organization
2. Load optional design documents ✓:
   → data-model.md: ContentItem, Section, ContentPlacement entities
   → contracts/: ContentManager and DragDropManager interfaces
   → research.md: Technology decisions and rationale
3. Generate tasks by category ✓:
   → Setup: Next.js dependencies, TypeScript config, testing setup
   → Tests: Component tests, drag-drop tests, integration tests
   → Core: Content management, rich text editor, drag-drop system
   → Integration: Storage persistence, layout system
   → Polish: Performance optimization, accessibility, E2E tests
4. Apply task rules ✓:
   → Different components/files = [P] for parallel
   → Related components = sequential for dependencies
   → Tests before implementation (TDD enforced)
5. Number tasks sequentially (T001, T002...) ✓
6. Generate dependency graph ✓
7. Create parallel execution examples ✓
8. Validate task completeness ✓:
   → All interfaces have tests ✓
   → All entities have models ✓
   → All components implemented ✓
9. Return: SUCCESS (tasks ready for execution) ✓
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
Single Next.js project structure (from plan.md):
- **Components**: `src/components/` (ui/, content/, editor/, layout/)
- **Hooks**: `src/hooks/` (content management, drag-drop)
- **Lib**: `src/lib/` (content/, storage/, dnd/)
- **Types**: `src/types/` (TypeScript definitions)
- **Tests**: `tests/` (components/, integration/, e2e/)

## Phase 3.1: Setup
- [x] T001 Install Next.js dependencies: @dnd-kit/core, @dnd-kit/sortable, @tiptap/react, @tiptap/starter-kit, dexie
- [ ] T002 [P] Configure TypeScript strict mode and path aliases in tsconfig.json
- [ ] T003 [P] Setup Jest and React Testing Library configuration in jest.config.js
- [ ] T004 [P] Setup Playwright for E2E testing in playwright.config.ts
- [ ] T005 [P] Create base TypeScript types in src/types/content.ts and src/types/sections.ts

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Content Management Tests
- [ ] T006 [P] Content creation test in tests/lib/content/test-content-manager.test.ts
- [ ] T007 [P] Content placement test in tests/lib/content/test-placement-manager.test.ts
- [ ] T008 [P] Storage persistence test in tests/lib/storage/test-storage-service.test.ts
- [ ] T009 [P] Blog post draft/publish test in tests/lib/content/test-blog-manager.test.ts

### Component Tests
- [ ] T010 [P] ContentItem component test in tests/components/content/test-content-item.test.tsx
- [ ] T011 [P] Section component test in tests/components/layout/test-section.test.tsx
- [ ] T012 [P] RichTextEditor component test in tests/components/editor/test-rich-text-editor.test.tsx
- [ ] T013 [P] DragDropProvider test in tests/components/dnd/test-drag-drop-provider.test.tsx

### Drag and Drop Tests
- [ ] T014 [P] Drag start/end test in tests/hooks/test-use-drag-drop.test.ts
- [ ] T015 [P] Cross-section drag test in tests/integration/test-cross-section-drag.test.ts
- [ ] T016 [P] Drop validation test in tests/lib/dnd/test-drop-validation.test.ts

### Integration Tests
- [ ] T017 [P] Complete user workflow test in tests/integration/test-homepage-workflow.test.ts
- [ ] T018 [P] Data persistence across sessions in tests/integration/test-data-persistence.test.ts
- [ ] T019 [P] Responsive layout test in tests/integration/test-responsive-layout.test.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Type Definitions & Contracts
- [ ] T020 [P] Implement ContentItem interface in src/types/content.ts
- [ ] T021 [P] Implement Section interface in src/types/sections.ts
- [ ] T022 [P] Implement DragDrop interfaces in src/types/drag-drop.ts

### Data Layer
- [ ] T023 [P] IndexedDB storage service in src/lib/storage/indexeddb-service.ts
- [ ] T024 [P] LocalStorage fallback in src/lib/storage/localstorage-service.ts
- [ ] T025 Storage manager with fallback logic in src/lib/storage/storage-manager.ts

### Content Management
- [ ] T026 [P] Content CRUD operations in src/lib/content/content-manager.ts
- [ ] T027 [P] Content placement logic in src/lib/content/placement-manager.ts
- [ ] T028 [P] Blog post management in src/lib/content/blog-manager.ts
- [ ] T029 Content validation utilities in src/lib/content/validation.ts

### Drag and Drop System
- [ ] T030 [P] Drag drop utilities in src/lib/dnd/drag-drop-utils.ts
- [ ] T031 [P] Drop zone validation in src/lib/dnd/drop-validation.ts
- [ ] T032 [P] Position calculation logic in src/lib/dnd/position-calculator.ts

### React Hooks
- [ ] T033 [P] Content management hook in src/hooks/use-content-manager.ts
- [ ] T034 [P] Drag and drop hook in src/hooks/use-drag-drop.ts
- [ ] T035 [P] Section management hook in src/hooks/use-section-manager.ts

### UI Components - Content
- [ ] T036 [P] ContentItem display component in src/components/content/content-item.tsx
- [ ] T037 [P] ContentCard component in src/components/content/content-card.tsx
- [ ] T038 [P] ContentInventory component in src/components/content/content-inventory.tsx

### UI Components - Editor
- [ ] T039 [P] RichTextEditor component in src/components/editor/rich-text-editor.tsx
- [ ] T040 [P] BlogPostForm component in src/components/editor/blog-post-form.tsx
- [ ] T041 [P] MediaUpload component in src/components/editor/media-upload.tsx

### UI Components - Layout
- [ ] T042 [P] Section component in src/components/layout/section.tsx
- [ ] T043 [P] HomepageLayout component in src/components/layout/homepage-layout.tsx
- [ ] T044 [P] SectionHeader component in src/components/layout/section-header.tsx

### Drag and Drop Components
- [ ] T045 [P] DragDropProvider component in src/components/dnd/drag-drop-provider.tsx
- [ ] T046 [P] DraggableContent component in src/components/dnd/draggable-content.tsx
- [ ] T047 [P] DropZone component in src/components/dnd/drop-zone.tsx

## Phase 3.4: Integration

### Page Implementation
- [ ] T048 Homepage implementation in src/app/page.tsx
- [ ] T049 Layout integration in src/app/layout.tsx
- [ ] T050 Global styles for drag-drop in src/app/globals.css

### State Management Integration
- [ ] T051 Content context provider in src/contexts/content-context.tsx
- [ ] T052 Drag-drop context provider in src/contexts/drag-drop-context.tsx
- [ ] T053 Global state management in src/providers/app-providers.tsx

### Feature Integration
- [ ] T054 Content creation workflow integration
- [ ] T055 Drag-drop workflow integration
- [ ] T056 Blog post editing workflow integration

## Phase 3.5: Polish

### Performance Optimization
- [ ] T057 [P] Implement React.memo for content components in src/components/content/
- [ ] T058 [P] Virtualization for large content lists in src/components/content/virtualized-list.tsx
- [ ] T059 [P] Debounced auto-save in src/hooks/use-auto-save.ts

### Accessibility
- [ ] T060 [P] Keyboard navigation for drag-drop in src/lib/dnd/keyboard-navigation.ts
- [ ] T061 [P] Screen reader support in src/hooks/use-screen-reader.ts
- [ ] T062 [P] ARIA labels and roles in all interactive components

### Error Handling
- [ ] T063 [P] Error boundaries in src/components/error/error-boundary.tsx
- [ ] T064 [P] Error display components in src/components/error/error-display.tsx
- [ ] T065 [P] Error recovery utilities in src/lib/error/error-recovery.ts

### Testing & Documentation
- [ ] T066 [P] Unit tests for utility functions in tests/unit/
- [ ] T067 [P] Accessibility tests in tests/accessibility/
- [ ] T068 [P] Performance tests in tests/performance/
- [ ] T069 E2E test suite in tests/e2e/homepage.spec.ts
- [ ] T070 Component documentation in src/components/*/README.md

## Dependencies

### Sequential Dependencies
- **Setup Phase**: T001 → T002-T005 (dependencies before config)
- **Storage Layer**: T023, T024 → T025 (services before manager)
- **Content Layer**: T020-T022 → T026-T029 (types before implementation)
- **Hooks**: T026-T032 → T033-T035 (services before hooks)
- **Components**: T033-T035 → T036-T047 (hooks before components)
- **Integration**: T036-T047 → T048-T056 (components before pages)
- **Polish**: T048-T056 → T057-T070 (core before optimization)

### Test Dependencies
- **ALL Tests (T006-T019) MUST complete and FAIL before ANY implementation (T020+)**
- **Each test must verify its corresponding implementation**

## Parallel Execution Examples

### Setup Phase (After T001)
```bash
# Launch T002-T005 together:
Task: "Configure TypeScript strict mode in tsconfig.json"
Task: "Setup Jest configuration in jest.config.js"
Task: "Setup Playwright in playwright.config.ts"
Task: "Create base TypeScript types in src/types/"
```

### Test Phase (After Setup)
```bash
# Launch T006-T012 together:
Task: "Content creation test in tests/lib/content/test-content-manager.test.ts"
Task: "Storage persistence test in tests/lib/storage/test-storage-service.test.ts"
Task: "ContentItem component test in tests/components/content/test-content-item.test.tsx"
Task: "RichTextEditor test in tests/components/editor/test-rich-text-editor.test.tsx"
```

### Implementation Phase (After ALL tests failing)
```bash
# Launch T023-T024, T030-T032 together:
Task: "IndexedDB storage service in src/lib/storage/indexeddb-service.ts"
Task: "LocalStorage fallback in src/lib/storage/localstorage-service.ts"
Task: "Drag drop utilities in src/lib/dnd/drag-drop-utils.ts"
Task: "Drop zone validation in src/lib/dnd/drop-validation.ts"
```

## Notes
- **[P] tasks** = different files, no shared dependencies
- **Verify tests fail** before implementing (RED-GREEN-REFACTOR)
- **Commit after each task** for granular history
- **Run failing tests** before starting each implementation task
- **Avoid**: implementing before tests, skipping validation

## Task Generation Rules
1. **Test-Driven Development**: Every feature has failing tests before implementation
2. **Component Isolation**: Each component in separate file for parallel development
3. **Dependency Management**: Sequential tasks only when one depends on another
4. **Performance Focus**: Optimization tasks after core functionality
5. **Accessibility**: Built-in throughout, not afterthought
