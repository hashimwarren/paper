---
mode: agent
---

You are an expert full-stack engineer. Build a **minimal original RebelMouse-style app** with four drag-and-drop sections and automatic link previews.

### Layout

* **Featured Section (top)**: Wide area for hero cards.
* **Left Sidebar River**: Vertical column of cards.
* **Highlight River (center)**: Larger feed-style column.
* **Right Sidebar River**: Vertical column of cards.
* Each section is a droppable container; cards can be dragged between them.

### Core Features

1. **Drag-and-Drop**

   * Use `react-beautiful-dnd` or `react-grid-layout`.
   * Support reordering within and between sections.

2. **Add by Link**

   * User pastes a link into an input field.
   * Backend fetches metadata:

     * Use `metascraper` for Open Graph/Twitter card data.
     * Normalize to `{type, title, description, image, url, embed}`.
   * Special cases:

     * **YouTube** → embed with `react-player`.
     * **Tweet** → fetch via Twitter oEmbed API, render with `react-tweet` or `react-twitter-embed`.
     * **Fallback** → generic Card with OG image, title, description.

3. **Content Cards**

   * Base `Card` component that switches renderer based on `type`.
   * Examples: `YouTubeCard`, `TweetCard`, `GenericLinkCard`.

4. **Persistence**

   * Store page layouts in Neon/Postgres.
   * Schema:

     * `pages (id, title, layout_json)`
     * `cards (id, type, content_json, created_at)`
   * `layout_json` keeps track of which card is in which section and in what order.

5. **Frontend Stack**

   * Next.js + TypeScript
   * TailwindCSS + shadcn/ui
   * Responsive layout for desktop/tablet/mobile

6. **Backend**

   * API routes for:

     * `POST /api/preview` → accept a URL, scrape metadata, return normalized card JSON.
     * `GET /api/page/:id` → load page + cards.
     * `POST /api/page/:id` → save updated layout.

### Deliverables

* `frontend/` Next.js project with:

  * Four drag-and-drop sections.
  * Input form to paste links and create new cards.
  * Card renderers (YouTube, Tweet, Generic).
* `backend/` API routes with metadata scraping + Neon integration.
* Example seeding script with mock tweets, YouTube videos, and article links.
* Clear inline comments so future card types can be added easily.


