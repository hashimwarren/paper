# Content Management Contracts

Client-side interfaces for content management operations.

## Types

```typescript
// Core content types
type ContentType = 'news' | 'social' | 'blog';
type ContentStatus = 'draft' | 'published';
type SectionId = 'feature' | 'main' | 'left' | 'right';
type LayoutType = 'grid' | 'list' | 'cards';

// Core entities
interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  excerpt: string;
  content: string;
  sourceUrl: string | null;
  imageUrl: string | null;
  author: string | null;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  status: ContentStatus;
  tags: string[];
  metadata: Record<string, any>;
}

interface ContentPlacement {
  contentId: string;
  sectionId: SectionId;
  position: number;
  placedAt: Date;
}

interface Section {
  id: SectionId;
  name: string;
  maxItems: number | null;
  allowedTypes: ContentType[];
  layout: LayoutType;
}
```

## Content Management Interface

```typescript
interface ContentManager {
  // Content operations
  createContent(data: CreateContentRequest): Promise<ContentItem>;
  updateContent(id: string, data: UpdateContentRequest): Promise<ContentItem>;
  deleteContent(id: string): Promise<void>;
  getContent(id: string): Promise<ContentItem | null>;
  listContent(filters?: ContentFilters): Promise<ContentItem[]>;

  // Blog post operations
  saveDraft(data: BlogPostData): Promise<ContentItem>;
  publishBlogPost(id: string): Promise<ContentItem>;

  // Placement operations
  placeContent(contentId: string, sectionId: SectionId, position: number): Promise<ContentPlacement>;
  moveContent(contentId: string, sectionId: SectionId, newPosition: number): Promise<ContentPlacement>;
  removeFromSection(contentId: string, sectionId: SectionId): Promise<void>;
  reorderSection(sectionId: SectionId, contentIds: string[]): Promise<ContentPlacement[]>;

  // Query operations
  getHomepageLayout(): Promise<HomepageLayout>;
  getContentInventory(): Promise<ContentInventory>;
  searchContent(query: string): Promise<ContentItem[]>;
}
```

## Request/Response Types

```typescript
interface CreateContentRequest {
  type: ContentType;
  title: string;
  excerpt: string;
  content?: string;
  sourceUrl?: string;
  imageUrl?: string;
  author?: string;
  publishedAt?: Date;
  tags?: string[];
  metadata?: Record<string, any>;
}

interface UpdateContentRequest {
  title?: string;
  excerpt?: string;
  content?: string;
  sourceUrl?: string;
  imageUrl?: string;
  author?: string;
  publishedAt?: Date;
  tags?: string[];
  metadata?: Record<string, any>;
}

interface BlogPostData {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  imageUrl?: string;
}

interface ContentFilters {
  type?: ContentType;
  status?: ContentStatus;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  limit?: number;
  offset?: number;
}

interface HomepageLayout {
  feature: SectionLayout;
  main: SectionLayout;
  left: SectionLayout;
  right: SectionLayout;
  totalItems: number;
  lastUpdated: Date;
}

interface SectionLayout {
  section: Section;
  items: (ContentItem & { placement: ContentPlacement })[];
}

interface ContentInventory {
  unplaced: ContentItem[];
  available: ContentItem[];
  drafts: ContentItem[];
  recent: ContentItem[];
}
```

## Drag and Drop Interface

```typescript
interface DragDropManager {
  // Drag operations
  startDrag(contentId: string, sourceSection: SectionId): Promise<DragContext>;
  updateDragPreview(context: DragContext, targetSection: SectionId, position: number): Promise<void>;
  completeDrag(context: DragContext): Promise<ContentPlacement>;
  cancelDrag(context: DragContext): Promise<void>;

  // Drop zone validation
  canDrop(contentId: string, targetSection: SectionId, position: number): Promise<boolean>;
  getDropPreview(contentId: string, targetSection: SectionId, position: number): Promise<DropPreview>;
}

interface DragContext {
  contentId: string;
  sourceSection: SectionId;
  sourcePosition: number;
  dragId: string;
  startTime: Date;
}

interface DropPreview {
  valid: boolean;
  targetSection: SectionId;
  targetPosition: number;
  affectedItems: string[]; // IDs of items that would be displaced
  errorMessage?: string;
}
```

## Error Types

```typescript
class ContentError extends Error {
  constructor(
    message: string,
    public code: ContentErrorCode,
    public details?: Record<string, any>
  ) {
    super(message);
  }
}

enum ContentErrorCode {
  NOT_FOUND = 'CONTENT_NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION',
  STORAGE_ERROR = 'STORAGE_ERROR',
  DRAG_DROP_ERROR = 'DRAG_DROP_ERROR'
}

interface ValidationError {
  field: string;
  message: string;
  value?: any;
}
```

## Events

```typescript
interface ContentEvents {
  contentCreated: (content: ContentItem) => void;
  contentUpdated: (content: ContentItem) => void;
  contentDeleted: (contentId: string) => void;
  contentPlaced: (placement: ContentPlacement) => void;
  contentMoved: (placement: ContentPlacement) => void;
  contentRemoved: (contentId: string, sectionId: SectionId) => void;
  layoutChanged: (layout: HomepageLayout) => void;
  dragStarted: (context: DragContext) => void;
  dragCompleted: (placement: ContentPlacement) => void;
  dragCancelled: (context: DragContext) => void;
}
