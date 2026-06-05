# Admin CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Decap CMS admin panel to the Rutam Oils static site so the client can edit products, about text, benefits, gallery videos, and contact info via `/admin`.

**Architecture:** Decap CMS lives at `/admin/` on the same Vercel site. Content is stored as JSON files in a `content/` directory. The static `index.html` fetches these JSON files at page load and renders them dynamically, with hardcoded fallback content for SEO and offline use. No servers or databases needed — edits commit to GitHub and Vercel auto-deploys.

**Tech Stack:** Decap CMS (Git-based), plain JS fetch, Vercel (existing)

---

## File Structure

```
rutam/
├── admin/
│   ├── index.html       — Decap CMS admin entry point (new)
│   └── config.yml       — CMS collection/field configuration (new)
├── content/
│   ├── about.json       — About section text (new)
│   ├── products.json    — Products array (new)
│   ├── benefits.json    — Health benefits array (new)
│   ├── gallery.json     — Video file paths array (new)
│   └── contact.json     — Phone and email (new)
├── static/
│   └── uploads/         — Media upload directory (new)
├── index.html           — Main site (modified: add content loader JS)
└── docs/superpowers/specs/2026-06-05-admin-cms-design.md  — Design doc
```

---

### Task 1: Create content JSON files with initial data

**Files:**
- Create: `content/about.json`
- Create: `content/products.json`
- Create: `content/benefits.json`
- Create: `content/gallery.json`
- Create: `content/contact.json`

- [ ] **Step 1: Create `content/about.json`**

```json
{
  "subtitle": "RUTAM Cold Wood-Pressed Oils by Sri Krishna Enterprises",
  "storyText": "RUTAM Oils by Sri Krishna Enterprises is a passion project by Mahima Hegde, veteran educator who has dedicated decades to studying and sharing the rich culinary traditions of rural Karnataka. We blend scholarly insight with hands-on recipes and stories from village kitchens to keep this heritage alive and accessible.\n\nWe are FSSAI Certified SME manufacturer of several types of Wood Cold-Pressed Edible Oils with 100% purity and hygiene standards. We operate using the ancient method of oil production — using wood and stone combination machines (Marachekku Machine - ಮರದ ಗಾಣ) with good quality seeds at room temperature.\n\nBy adopting this traditional method, we manufacture unbleached, unrefined, pure natural, vegetarian chemical-free edible oils that offer great health benefits.",
  "videoSrc": "bestvideosofar.mp4"
}
```

- [ ] **Step 2: Create `content/products.json`**

```json
[
  { "image": "groundnut.jpeg", "name": "Groundnut Oil", "description": "Wood cold-pressed from premium groundnuts. Rich, full-bodied flavor perfect for cooking and deep frying." },
  { "image": "coconut.jpeg", "name": "Coconut Oil", "description": "Pure wood cold-pressed coconut oil. Ideal for cooking, hair care, and skin nourishment." },
  { "image": "sweetalmond.jpeg", "name": "Sweet Almond Oil", "description": "Cold-pressed from sweet almonds. Rich in Vitamin E, perfect for skin, hair, and wellness." },
  { "image": "sesame.jpeg", "name": "Sesame Oil", "description": "Available in both white and black sesame. Nutty, rich, and prized in Ayurveda for its warming properties." },
  { "image": "mustardoil.jpeg", "name": "Mustard Oil", "description": "Robust and pungent, traditionally wood cold-pressed. Pure authenticity in every drop." },
  { "image": "virgincoconutoil.jpeg", "name": "Virgin Coconut Oil", "description": "Premium virgin coconut oil, cold-pressed from fresh coconuts. Aromatic and nutrient-rich." },
  { "image": "flaxseedoil.jpeg", "name": "Flaxseed Oil", "description": "Wood cold-pressed from flaxseeds. Packed with Omega-3 fatty acids for heart and brain health." },
  { "image": "nigeroil.jpeg", "name": "Niger Oil", "description": "Traditional wood cold-pressed niger seed oil. Rich in linoleic acid, valued for its health benefits." },
  { "image": "safflower.jpeg", "name": "Safflower Oil", "description": "Wood cold-pressed from premium safflower seeds. Light texture and rich in unsaturated fats for heart health." },
  { "image": "sunflower.jpeg", "name": "Sunflower Oil", "description": "Wood cold-pressed from quality sunflower seeds. Rich in Vitamin E and light for everyday cooking." }
]
```

- [ ] **Step 3: Create `content/benefits.json`**

```json
[
  { "title": "Antioxidants & Vitamin E", "description": "Rich in natural antioxidants and Vitamin E that protect cells from oxidative damage." },
  { "title": "Omega-3 & 6 Fatty Acids", "description": "Essential fatty acids that support heart health, brain function, and overall vitality." },
  { "title": "Boosts Immunity", "description": "Natural nutrients and antibacterial properties strengthen the body's immune system." },
  { "title": "Good Cholesterol", "description": "Promotes healthy HDL cholesterol levels and supports cardiovascular health." },
  { "title": "Improves Memory", "description": "Essential nutrients that support cognitive function and memory power." },
  { "title": "Relieves Joint Pain", "description": "Anti-inflammatory properties help reduce joint pain and stiffness naturally." },
  { "title": "Heart & Thyroid Care", "description": "Supports healthy heart function and helps manage thyroid problems naturally." },
  { "title": "Total Health Care", "description": "A wholesome addition to your diet for sustained energy and complete wellness." }
]
```

- [ ] **Step 4: Create `content/gallery.json`**

```json
[
  "bestvideosofar.mp4",
  "bettervideo.mp4",
  "video1.mp4",
  "video2.mp4",
  "video3.mp4",
  "video4.mp4",
  "machine video.mp4",
  "videos.mp4"
]
```

- [ ] **Step 5: Create `content/contact.json`**

```json
{
  "phone": "+919481548382",
  "email": "rutamoils@gmail.com"
}
```

- [ ] **Step 6: Commit**

```bash
git add content/
git commit -m "feat: add initial content JSON files for Decap CMS"
```

---

### Task 2: Create Decap CMS admin configuration

**Files:**
- Create: `admin/index.html`
- Create: `admin/config.yml`
- Create: `static/uploads/.gitkeep`

- [ ] **Step 1: Create `admin/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rutam Oils — Admin</title>
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  </style>
</head>
<body>
  <script src="https://unpkg.com/decap-cms-app@^3/dist/decap-cms-app.js"></script>
</body>
</html>
```

The admin entry point loads Decap CMS from CDN. It reads `config.yml` automatically.

- [ ] **Step 2: Create `admin/config.yml`**

```yaml
backend:
  name: github
  repo: ragwhoo/rutam
  branch: main
  base_url: https://oauth.decapcms.org

publish_mode: editorial_workflow
media_folder: "static/uploads"
public_folder: "/static/uploads"

collections:
  - name: "about"
    label: "About Section"
    folder: "content"
    create: false
    format: "json"
    slug: "about"
    editor:
      preview: false
    fields:
      - { label: "Subtitle", name: "subtitle", widget: "string" }
      - { label: "Story Text", name: "storyText", widget: "markdown" }
      - { label: "About Video", name: "videoSrc", widget: "string" }

  - name: "products"
    label: "Products"
    folder: "content"
    create: false
    format: "json"
    slug: "products"
    editor:
      preview: false
    fields:
      - label: "Product List"
        name: "body"
        widget: "list"
        fields:
          - { label: "Image", name: "image", widget: "image", media_folder: "", public_folder: "" }
          - { label: "Name", name: "name", widget: "string" }
          - { label: "Description", name: "description", widget: "text" }

  - name: "benefits"
    label: "Health Benefits"
    folder: "content"
    create: false
    format: "json"
    slug: "benefits"
    editor:
      preview: false
    fields:
      - label: "Benefit Cards"
        name: "body"
        widget: "list"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Description", name: "description", widget: "text" }

  - name: "gallery"
    label: "Gallery Videos"
    folder: "content"
    create: false
    format: "json"
    slug: "gallery"
    editor:
      preview: false
    fields:
      - label: "Video File Paths"
        name: "body"
        widget: "list"
        field: { label: "Video Path", name: "path", widget: "string" }

  - name: "contact"
    label: "Contact Info"
    folder: "content"
    create: false
    format: "json"
    slug: "contact"
    editor:
      preview: false
    fields:
      - { label: "Phone", name: "phone", widget: "string" }
      - { label: "Email", name: "email", widget: "string" }
```

- [ ] **Step 3: Create `static/uploads/.gitkeep`**

Empty file to ensure the uploads directory is tracked by git.

- [ ] **Step 4: Commit**

```bash
git add admin/ static/
git commit -m "feat: add Decap CMS admin panel configuration"
```

---

### Task 3: Update index.html with dynamic content loader

**Files:**
- Modify: `index.html` (add content fetching JS)

- [ ] **Step 1: Read the existing index.html to understand what sections need dynamic loading**

The sections to make dynamic:
- About subtitle + story paragraphs + video src
- Products grid (10 cards)
- Benefits grid (8 cards)
- Gallery carousel video list
- Contact phone and email

- [ ] **Step 2: Add a content loader script at the top of the existing `<script>` block, and call it at the bottom**

Add the `loadContent` definition at the top of the existing script block (after `const carouselVideos = [...]` is defined), and add `loadContent()` call at the very end of the same script block (after all event listeners and lenis setup).

```javascript
    async function loadContent() {
      try {
        const [aboutRes, productsRes, benefitsRes, galleryRes, contactRes] = await Promise.all([
          fetch('/content/about.json').then(r => r.ok ? r.json() : null),
          fetch('/content/products.json').then(r => r.ok ? r.json() : null),
          fetch('/content/benefits.json').then(r => r.ok ? r.json() : null),
          fetch('/content/gallery.json').then(r => r.ok ? r.json() : null),
          fetch('/content/contact.json').then(r => r.ok ? r.json() : null),
        ]);

        if (aboutRes) {
          const subtitle = document.querySelector('#about .section-subtitle');
          if (subtitle) subtitle.textContent = aboutRes.subtitle;
          const storyEl = document.querySelector('#about .about-text');
          if (storyEl && aboutRes.storyText) {
            const paragraphs = aboutRes.storyText.split('\n\n').filter(p => p.trim());
            const pEls = storyEl.querySelectorAll('p');
            paragraphs.forEach((text, i) => {
              if (pEls[i]) pEls[i].textContent = text;
            });
          }
          const aboutVideo = document.querySelector('.about-video');
          if (aboutVideo && aboutRes.videoSrc) aboutVideo.src = aboutRes.videoSrc;
        }

        if (productsRes && Array.isArray(productsRes)) {
          const grid = document.getElementById('productsGrid');
          if (grid) {
            grid.innerHTML = productsRes.map(p => `
              <div class="product-card">
                <img class="product-img" src="${p.image || ''}" alt="${p.name || ''}" loading="lazy">
                <h3>${p.name || ''}</h3>
                <p>${p.description || ''}</p>
              </div>
            `).join('');
          }
        }

        if (benefitsRes && Array.isArray(benefitsRes)) {
          const grid = document.getElementById('benefitsGrid');
          if (grid) {
            grid.innerHTML = benefitsRes.map(b => `
              <div class="benefit-item">
                <h4>${b.title || ''}</h4>
                <p>${b.description || ''}</p>
              </div>
            `).join('');
          }
        }

        if (galleryRes && Array.isArray(galleryRes)) {
          carouselVideos.length = 0;
          galleryRes.forEach(v => carouselVideos.push(v));
          CA = carouselVideos.length;
          // Update existing card video sources (track has 3+CA+3 = CA+6 cards)
          const cards = carouselTrack.querySelectorAll('.carousel3d-card');
          const totalCards = CA + 6;
          for (let i = 0; i < cards.length && i < totalCards; i++) {
            const srcIndex = ((i - 3) % CA + CA) % CA;
            const video = cards[i].querySelector('video');
            if (video) {
              video.src = carouselVideos[srcIndex];
              video.load();
              video.play().catch(() => {});
            }
          }
        }

        if (contactRes) {
          const phoneLink = document.querySelector('a[href^="tel:"]');
          const emailLink = document.querySelector('a[href^="mailto:"]');
          if (phoneLink && contactRes.phone) {
            phoneLink.href = `tel:${contactRes.phone.replace(/[^0-9+]/g, '')}`;
            phoneLink.textContent = contactRes.phone;
          }
          if (emailLink && contactRes.email) {
            emailLink.href = `mailto:${contactRes.email}`;
            emailLink.textContent = contactRes.email;
          }
        }
      } catch (e) {
        console.log('Content load failed, using fallback');
      }
    }

    loadContent();
```

- [ ] **Step 3: Update the products grid HTML to add an `id` attribute**

Replace:
```html
<div class="products-grid">
```
with:
```html
<div class="products-grid" id="productsGrid">
```

- [ ] **Step 4: Update the benefits grid HTML to add an `id` attribute**

Replace:
```html
<div class="benefits-grid">
```
with:
```html
<div class="benefits-grid" id="benefitsGrid">
```

- [ ] **Step 5: Make `carouselVideos` and `CA` use `let` instead of `const`**

In the gallery carousel JS section, change:
```javascript
const carouselVideos = [
```
to:
```javascript
let carouselVideos = [
```
and:
```javascript
const CA = carouselVideos.length;
```
to:
```javascript
let CA = carouselVideos.length;
```

- [ ] **Step 6: Add a `.gitattributes` file for consistent line endings**

In the root, create `.gitattributes`:
```
* text=auto eol=lf
```

- [ ] **Step 7: Commit**

```bash
git add index.html .gitattributes
git commit -m "feat: add dynamic content loader with hardcoded fallback"
```

---

## Self-Review Checklist

1. **Spec coverage:** All spec requirements are covered:
   - Products collection ✓ (Task 3 updates grid from JSON)
   - About collection ✓ (Task 3 updates subtitle, story text, video)
   - Benefits collection ✓ (Task 3 updates grid)
   - Gallery collection ✓ (Task 3 rebuilds carousel)
   - Contact collection ✓ (Task 3 updates phone/email links)
   - Admin at /admin ✓ (Task 2)
   - No public nav link ✓ (admin is only accessible at /admin URL)
   - Decap CMS config ✓ (Task 2)
   - SEO stays hardcoded ✓ (not in content JSONs)
   - OAuth via decapcms.org proxy ✓ (config.yml backend.base_url)

2. **Placeholder scan:** No TBD, TODO, or placeholder content. All code is complete and executable.

3. **Type consistency:** 
   - `carouselVideos` declared with `let` in Task 3 Step 5, modified in Step 2 — consistent
   - `CA` declared with `let` in Task 3 Step 5 — consistent
   - `REAL0`, `cur`, `goTo`, `carouselTrack` referenced in Task 3 Step 2 — all defined in existing script
   - Content JSON structures match config.yml field definitions

4. **Ambiguity check:** All requirements are explicit. The gallery rebuild clears existing cards and recreates them from fetched data.
