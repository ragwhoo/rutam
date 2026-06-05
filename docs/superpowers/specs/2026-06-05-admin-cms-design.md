# Admin CMS for Rutam Oils

## Overview
Add a content management system (Decap CMS) to the Rutam Oils static site so the client can edit products, about text, benefits, gallery videos, and contact info through a password-protected `/admin` page. Changes save to GitHub and auto-deploy via Vercel.

## Architecture
- **Site**: Single static HTML file on Vercel (unchanged architecture)
- **Admin**: Decap CMS (formerly Netlify CMS) at `rutam-kappa.vercel.app/admin`
- **Content Storage**: JSON files in `content/` directory committed to the GitHub repo
- **Authentication**: GitHub OAuth via Decap CMS
- **Deployment**: Vercel auto-deploys on push to main

### Request Flow
```
Client edits content at /admin →
  Decap CMS commits content/*.json to GitHub →
    Vercel detects push → rebuilds static site →
      Live site serves updated JSON files →
        Browser JS fetches JSON and renders dynamic sections
```

## Content Collections

### Products (`content/products.json`)
- Single JSON file with an array of 10 products (order maintained)
- Each product has fields: `image` (path), `name`, `description`
- Current products: Groundnut, Coconut, Sweet Almond, Sesame, Mustard, Virgin Coconut, Flaxseed, Niger, Safflower, Sunflower

### About (`content/about.json`)
- Fields: `subtitle`, `storyText` (single text block, paragraphs separated by blank lines), `videoSrc`

### Benefits (`content/benefits.json`)
- Array of 8 items, each with `title` and `description`

### Gallery (`content/gallery.json`)
- Array of 8 video file paths

### Contact (`content/contact.json`)
- Fields: `phone`, `email`

### Media
- Uploaded images/videos go to `static/uploads/`
- Decap CMS configures media folder for image uploads

## Static Site Changes
### What stays hardcoded in index.html
- HTML structure and CSS (full stylesheet remains untouched)
- SEO meta tags (title, description, OG/Twitter, canonical, JSON-LD)
- Hero section (background images remain CSS-based)
- Purity section (background image remains CSS-based)
- Navbar and footer
- Lenis smooth scroll, navigation logic

### What becomes dynamic (fetched via JS)
- **About section**: text content fetched from `/content/about.json`
- **Products grid**: rendered from `/content/products.json`
- **Benefits grid**: rendered from `/content/benefits.json`
- **Gallery carousel**: video list from `/content/gallery.json`
- **Contact info**: phone/email from `/content/contact.json`

## Decap CMS Configuration
### Files to create
- `admin/index.html` — Decap CMS admin entry point
- `admin/config.yml` — CMS configuration with collections, fields, media folder
- `content/` — content JSON files directory
- `static/uploads/` — media uploads directory

### Authentication
- Uses GitHub OAuth
- Client logs in with their GitHub account
- Repository: `ragwhoo/rutam` on `main` branch

## Security
- Admin page is not linked anywhere on the public site
- GitHub OAuth required to access `/admin`
- Only the client's GitHub account has write access to the repo
- Content changes are committed with author attribution

## Out of Scope
- SEO meta tag editing (stays hardcoded)
- Hero/purity background image swapping
- Site navigation editing
- User management (single admin only)

## Future Considerations
- Adding more products by editing the products.json array
- Replacing videos by updating file paths in gallery.json
- No architectural changes needed for scaling
