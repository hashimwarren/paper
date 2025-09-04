# Data Model: Homepage with Drag-and-Drop Content Management

**Generated**: September 4, 2025
**Feature**: Homepage with Drag-and-Drop Content Management
**Status**: Complete

## Core Entities

### ContentItem
Primary entity representing any piece of content that can be placed on the homepage.

**Fields**:
- `id`: string (UUID) - Unique identifier
- `type`: 'news' | 'social' | 'blog' - Content type
- `title`: string - Display title (required)
- `excerpt`: string - Short description/preview text
- `content`: string - Full content (HTML for blog posts, text for others)
- `sourceUrl`: string | null - Original URL for news/social content
- `imageUrl`: string | null - Featured image URL
- `author`: string | null - Content author
- `publishedAt`: Date - Original publication date
- `createdAt`: Date - When added to system
- `updatedAt`: Date - Last modification
- `status`: 'draft' | 'published' - Publication status (for blog posts)
- `tags`: string[] - Content tags for organization
- `metadata`: Record<string, any> - Flexible metadata storage

**Validation Rules**:
- `title` must be 1-200 characters
- `excerpt` must be 0-500 characters
- `content` required for blog posts, optional for others
- `status` only applies to blog posts (always 'published' for news/social)
- `sourceUrl` required for news/social content, optional for blog posts

**State Transitions**:
- Blog posts: draft → published
- News/social content: Always published when created

### Section
Represents each of the four homepage layout areas.

**Fields**:
- `id`: 'feature' | 'main' | 'left' | 'right' - Section identifier
- `name`: string - Display name
- `maxItems`: number | null - Maximum items allowed (null = unlimited)
- `allowedTypes`: ContentType[] - Which content types can be placed
- `layout`: 'grid' | 'list' | 'cards' - Visual layout style

**Static Configuration**:
```typescript
const SECTIONS: Section[] = [
  {
    id: 'feature',
    name: 'Featured',
    maxItems: 3,
    allowedTypes: ['news', 'social', 'blog'],
    layout: 'cards'
  },
  {
    id: 'main',
    name: 'Main River',
    maxItems: null,
    allowedTypes: ['news', 'social', 'blog'],
    layout: 'list'
  },
  {
    id: 'left',
    name: 'Left Sidebar',
    maxItems: null,
    allowedTypes: ['news', 'social', 'blog'],
    layout: 'grid'
  },
  {
    id: 'right',
    name: 'Right Sidebar',
    maxItems: null,
    allowedTypes: ['news', 'social', 'blog'],
    layout: 'grid'
  }
];
```

### ContentPlacement
Represents the relationship between content items and sections, including positioning.

**Fields**:
- `contentId`: string - Reference to ContentItem.id
- `sectionId`: SectionId - Reference to Section.id
- `position`: number - Order within section (0-based)
- `placedAt`: Date - When item was placed in this position

**Constraints**:
- Unique constraint on (contentId, sectionId) - content can only appear once per section
- Content can appear in multiple sections simultaneously
- Position must be sequential within each section (no gaps)

## Derived Data

### HomepageLayout
Computed view of the complete homepage state.

**Structure**:
```typescript
interface HomepageLayout {
  feature: {
    section: Section;
    items: (ContentItem & { placement: ContentPlacement })[];
  };
  main: {
    section: Section;
    items: (ContentItem & { placement: ContentPlacement })[];
  };
  left: {
    section: Section;
    items: (ContentItem & { placement: ContentPlacement })[];
  };
  right: {
    section: Section;
    items: (ContentItem & { placement: ContentPlacement })[];
  };
  totalItems: number;
  lastUpdated: Date;
}
```

### ContentInventory
All available content items not currently placed or available for additional placement.

**Structure**:
```typescript
interface ContentInventory {
  unplaced: ContentItem[]; // Items not placed in any section
  available: ContentItem[]; // All items available for placement
  drafts: ContentItem[]; // Blog posts in draft status
  recent: ContentItem[]; // Recently created/modified items
}
```

## Data Operations

### Content Management
- **Create Content**: Add new content item (news, social, or blog)
- **Update Content**: Modify existing content (title, content, metadata)
- **Delete Content**: Remove content and all placements
- **Publish Blog**: Change blog post from draft to published
- **Save Draft**: Store blog post as draft

### Placement Management
- **Place Content**: Add content to section at specific position
- **Move Content**: Change content position within same section
- **Transfer Content**: Move content from one section to another
- **Remove Placement**: Remove content from section (content remains available)
- **Reorder Section**: Bulk reposition multiple items within section

### Data Queries
- **Get Homepage Layout**: Retrieve complete homepage with all sections and content
- **Get Content Inventory**: Retrieve available content for placement
- **Search Content**: Find content by title, tags, or content text
- **Filter Content**: Filter by type, date range, or status
- **Get Section Contents**: Retrieve all content in specific section

## Storage Schema

### IndexedDB Structure
```
Database: homepage_content
Version: 1

Object Stores:
1. content_items
   - Key: id (string)
   - Indexes: type, status, createdAt, tags

2. content_placements
   - Key: [contentId, sectionId] (compound)
   - Indexes: sectionId, position, placedAt

3. app_metadata
   - Key: key (string)
   - Storage for: last_backup, user_preferences, feature_flags
```

### LocalStorage Fallback
```
Keys:
- homepage_content_items: Serialized ContentItem[]
- homepage_content_placements: Serialized ContentPlacement[]
- homepage_metadata: Serialized app metadata
```

## Data Integrity Rules

### Referential Integrity
- All ContentPlacement.contentId must reference existing ContentItem.id
- All ContentPlacement.sectionId must reference valid Section.id

### Business Rules
- Content items cannot have duplicate positions within same section
- Blog posts must have non-empty content to be published
- News/social content must have sourceUrl
- Feature section respects maxItems limit

### Consistency Constraints
- Position sequences must be sequential (0, 1, 2... no gaps)
- Timestamps must be chronologically consistent (createdAt ≤ updatedAt)
- Content type must match section allowedTypes

## Performance Considerations

### Indexing Strategy
- Primary lookups by content ID (frequent)
- Section-based queries by sectionId + position (frequent)
- Content type filtering (occasional)
- Date-based queries for recent content (occasional)

### Caching Strategy
- Homepage layout cached in memory with invalidation
- Content inventory computed on demand
- Section contents cached per section

### Data Size Estimates
- ContentItem: ~2-5KB per item (including content)
- ContentPlacement: ~100 bytes per placement
- Expected scale: 100-500 content items, 200-1000 placements
- Total storage: ~1-3MB typical usage
