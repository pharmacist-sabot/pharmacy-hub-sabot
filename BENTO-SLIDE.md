# BENTO-SLIDE.md

> Architecture and interaction spec for the Pharmacy Department website.
> Visual design tokens, colors, typography, and component styles are defined in `DESIGN.md` — treat it as the single source of truth. This file governs layout structure, navigation model, and page composition only.

---

## Concept

The site uses a **bento-home + slide-transition** model inspired by presentation software.

- The **home screen** is a single bento grid that fills 100dvh exactly — no scroll, no overflow.
- Every bento card that links to a section acts as a navigation trigger.
- Clicking a card **slides the home screen out** and **slides the target page in** — like advancing a slide deck.
- The back button on any subpage **reverses the transition**, returning to the bento home.
- Subpages may scroll internally if content exceeds the viewport height.

There is no traditional nav bar, no breadcrumb trail beyond the back button, and no URL routing required (though a hash-based router may be added later without changing the visual model).

---

## Application Shell

```
#app
  width: 100dvw
  height: 100dvh
  overflow: hidden          ← critical; prevents any global scroll
  position: relative
  background: {colors.canvas}
```

All screens are children of `#app`, stacked via `position: absolute; inset: 0`. Only one screen is visible at a time.

---

## Screen States & Transitions

Each screen (home or subpage) exists in one of three states:

| State          | Transform                      | Opacity | Pointer events |
| -------------- | ------------------------------ | ------- | -------------- |
| `visible`      | `translateX(0)`                | 1       | auto           |
| `hidden-right` | `translateX(100%)`             | 0       | none           |
| `hidden-left`  | `translateX(-40%) scale(0.96)` | 0       | none           |

**Navigating forward** (home → subpage):

1. Home transitions to `hidden-left`.
2. Target subpage transitions from `hidden-right` to `visible`.

**Navigating back** (subpage → home):

1. Current subpage transitions to `hidden-right`.
2. Home transitions from `hidden-left` to `visible`.

**Transition spec:**

```css
transition:
  transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
  opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
will-change: transform, opacity;
```

Do not use `display: none` or `visibility: hidden` — keep all screens in the DOM so the transition plays correctly.

---

## Home Screen — Bento Grid

### Container

```
.home
  width: 100%
  height: 100%
  display: grid
  grid-template-columns: repeat(12, 1fr)
  grid-template-rows: repeat(10, 1fr)
  gap: 12px
  padding: 14px
```

The grid must fit exactly within `100dvh`. Adjust `gap` and `padding` at each breakpoint to maintain the no-scroll constraint. Never let the grid content push beyond the viewport.

### Card Base Style

All bento cards share this foundation and extend from `card-base` in `DESIGN.md`:

```
background: {colors.canvas}
border: 1px solid {colors.hairline}
border-radius: {rounded.lg}
overflow: hidden
position: relative
cursor: pointer (on interactive cards)
transition: border-color 0.15s, transform 0.12s
```

Pressed/active state (interactive cards only): `transform: scale(1.012)`, `border-color: {colors.hairline}` upgrades to secondary.

Non-interactive cards (hero, stats): `cursor: default`, no scale transform.

### Card Slots

Define the following named slots. Column/row spans are the **desktop baseline** (see Responsive section for overrides).

| Slot                | `grid-column` | `grid-row` | Interactive       | Links to         |
| ------------------- | ------------- | ---------- | ----------------- | ---------------- |
| `card-hero`         | span 8        | span 4     | No                | —                |
| `card-stat-rx`      | span 4        | span 2     | No                | —                |
| `card-stat-staff`   | span 4        | span 2     | No                | —                |
| `card-service`      | span 4        | span 3     | Yes               | `page-service`   |
| `card-safety`       | span 4        | span 3     | Yes               | `page-ptc`       |
| `card-team`         | span 4        | span 3     | Yes               | `page-team`      |
| `card-documents`    | span 4        | span 3     | Yes               | `page-documents` |
| `card-news`         | span 8        | span 3     | Yes               | `page-news`      |
| `card-team-preview` | span 4        | span 3     | Yes               | `page-team`      |
| `card-quicklinks`   | span 12       | span 3     | No (children are) | —                |

> The exact arrangement of these slots in the grid is left to the implementer, provided the total rows consumed equals 10 and no card overflows the 12-column track.

### Card Content Patterns

#### `card-hero`

- Dark navy background (`#1D3461` or closest token from `DESIGN.md` `{colors.canvas-dark}`).
- Department name in `{typography.heading-2}`, `{colors.on-dark}`.
- Hospital name + province in `{typography.body-sm}`, `{colors.on-dark-muted}`.
- 2–3 service badge pills using `button-secondary` style adapted for dark surface.
- Decorative icon (pharmacy flask/pill) at large size, low opacity, positioned bottom-right.
- No click handler.

#### `card-stat-*`

- Label in `{typography.micro-uppercase}`, `{colors.steel}`.
- Large numeral in 28–32px, weight 500, colored with a semantic accent (blue for prescriptions, teal for staff — reference `DESIGN.md` ramps).
- Sub-label in `{typography.body-sm}`, `{colors.steel}`.
- No click handler.

#### Interactive section cards (`card-service`, `card-safety`, `card-team`, `card-documents`)

- Small "view all →" label in `{typography.caption}`, `{colors.stone}`, positioned `top: 12px; right: 12px`.
- Icon block: 32×32px rounded (`{rounded.md}`) container with tinted background + icon at 16px.
  - Service: blue tint.
  - Safety/PTC: purple tint.
  - Team: teal tint.
  - Documents: amber tint.
  - Use tint colors from `DESIGN.md` semantic surfaces (`{colors.surface}` family or brand ramps).
- Section label in `{typography.micro-uppercase}`, `{colors.steel}`.
- Title in `{typography.body-md-medium}`, `{colors.ink}`.
- Sub-description in `{typography.body-sm}`, `{colors.slate}`.

#### `card-news`

- Header row: label left (`{typography.micro-uppercase}`, `{colors.steel}`) + "view all →" right (`{typography.caption}`, `{colors.stone}`).
- 3 news items, each:
  - Colored dot (5–6px circle): blue for announcements, teal for events, red for alerts.
  - Title in `{typography.body-sm}`, `{colors.ink}`.
  - Date in `{typography.caption}`, `{colors.stone}`.
  - Divider between items: `1px solid {colors.hairline-soft}`. No divider after last item.

#### `card-team-preview`

- Label in `{typography.micro-uppercase}`, `{colors.steel}`.
- Avatar row: overlapping 28–32px circles, each showing initials. Colors drawn from brand ramps. Overlap with negative margin (`-6px`).
- Status pill using `badge-discount` pattern adapted to green: "Open today".
- Sub-text in `{typography.body-sm}`, `{colors.slate}`.

#### `card-quicklinks`

- Non-interactive container card.
- Label "Quick links" in `{typography.micro-uppercase}`, `{colors.steel}`, left-aligned.
- Row of pill tags, each: `border: 1px solid {colors.hairline}`, `border-radius: {rounded.full}`, `{typography.body-sm}`, `{colors.slate}`, icon at 13px left of label.
- Each pill is individually clickable and triggers the same slide transition as its parent card destination.

---

## Subpage Structure

Every subpage shares this shell:

```
.subpage
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  background: {colors.canvas-tertiary or surface-soft}
```

### Subpage Header

```
.subpage-header
  display: flex
  align-items: center
  gap: 10px
  padding: 14px 18px 12px
  border-bottom: 1px solid {colors.hairline}
  background: {colors.canvas}
  flex-shrink: 0          ← never compress; body scrolls below it
```

Contents (left to right):

1. **Back button** — `button-ghost` style, `← Home` label. Triggers back transition.
2. **Section icon** — same icon used on the bento card, 16px, accent color.
3. **Page title** — `{typography.heading-5}`, `{colors.ink}`.

### Subpage Body

```
.subpage-body
  flex: 1
  overflow-y: auto        ← only scroll container in the app
  padding: 16px 18px
  background: {colors.surface-soft}
```

All subpage content renders inside `.subpage-body`. Use a 2-column grid (`grid-template-columns: 1fr 1fr; gap: 10px`) as the default layout for content cards. Full-width cards use `grid-column: span 2`.

Content cards inside subpages use `card-base` from `DESIGN.md`: `{colors.canvas}` background, `1px solid {colors.hairline}` border, `{rounded.lg}`, `{spacing.xl}` padding.

---

## Defined Subpages

### `page-service` — Pharmacy Services

Cards to render (2-column grid):

- **OPD Dispensing** — hours Mon–Fri, with key-value rows for time slots.
- **IPD Dispensing** — morning and afternoon round times.
- **DM/HT Clinic** — MTM service description, weekly schedule pill badge.
- **TB Clinic (DOT)** — DOTS program description, weekly schedule pill badge.
- **Operating Hours** (full-width) — 3-column sub-grid showing weekday / Saturday / Sunday hours. Each cell: `{colors.surface}` background, `{rounded.md}`, center-aligned label + time.

Schedule badge style: inline pill, `{rounded.full}`, tinted background + dark text from the same ramp (blue for weekday clinics, amber for specialist clinics). Matches `badge-discount` pattern from `DESIGN.md`.

### `page-ptc` — Drug Safety (PTC / ADR / RDU)

Cards:

- **PTC Committee** (full-width) — meeting frequency, mandate summary.
- **ADR Reporting** — report count key-value rows (total year, serious count).
- **RDU Indicators** — key-value rows with semantic color on values: green for on-target, amber for improving, default ink for neutral.

Key-value row pattern:

```
display: flex
justify-content: space-between
padding: 6px 0
border-bottom: 1px solid {colors.hairline-soft}
```

Key: `{typography.body-sm}`, `{colors.slate}`. Value: `{typography.body-sm-medium}`, `{colors.ink}` (or semantic override).

### `page-team` — Staff Directory

- One card per pharmacist: avatar circle (38×38px, `border-radius: 50%`, initials, tinted background), name in `{typography.body-sm-medium}`, role in `{typography.caption}` `{colors.slate}`, role badge pill.
- Full-width card for pharmacy technicians: 3-column sub-grid of smaller avatar circles with name label below.

Role badge colors:

- Pharmacist: blue ramp (`{badge-type}` pattern with blue tint).
- Senior/head: teal ramp.
- Technician: stone/gray ramp.

### `page-documents` — Forms & Documents

Single-column list layout (not grid). Each item is a `card-base` row:

```
display: flex
align-items: center
justify-content: space-between
```

Left side: 32×32px icon block (colored per document category) + title (`{typography.body-sm-medium}`) + subtitle (`{typography.caption}` `{colors.slate}`).
Right side: download icon (`ti-download`, 15px, `{colors.steel}`).

Document category tints (icon block background):

- ADR forms → amber.
- Patient guides → blue.
- PTC / HA documents → purple.
- Drug request forms → teal.
- Expiry / stock forms → coral/red.

### `page-news` — Announcements

Single-column list layout. Each item is a `card-base` with:

- Top row: category badge pill (left) + date (right, `{typography.caption}`, `{colors.stone}`).
- Title: `{typography.body-sm-medium}`, `{colors.ink}`, margin-top 6px.
- Body: `{typography.body-sm}`, `{colors.slate}`, margin-top 4px.
- Left border accent (3px, `border-radius: 0`) colored by category:
  - Alert/recall → red (`{colors.brand-error}` or red ramp).
  - Announcement → blue.
  - Event/schedule → teal/green.

Category badge style matches `badge-required` pattern but with category-appropriate ramp colors.

---

## Responsive Behavior

### Desktop (≥ 1024px)

Full 12-column × 10-row bento grid as specified above.

### Tablet (768px – 1023px)

- Grid reduces to 8 columns, 12 rows.
- `card-hero`: span 8, span 3.
- Stats stack 2-up (span 4, span 2 each) below hero.
- Section cards: span 4, span 3 (2 per row).
- News + team-preview: span 8 + span 4 (or both span 4 in a 2-up row).
- Quick links: span 8, span 2.
- `gap: 10px`, `padding: 12px`.

### Mobile (< 768px)

- Abandon the fixed-height bento constraint. Root becomes `overflow-y: auto`.
- Grid: single column, auto rows.
- Each card: full width, explicit `min-height` (hero 160px, stat 80px, section cards 120px).
- Maintain slide transition but allow the home screen to scroll.

---

## Implementation Notes

1. **Never put `overflow: hidden` on individual bento cards** — icons and decorative elements may intentionally bleed; clip at the card's `border-radius` via `overflow: hidden` on the card itself only if needed for a specific card.
2. **All screens stay in the DOM.** Do not conditionally render/unmount screens — the CSS transition requires the element to exist in both states.
3. **`will-change: transform, opacity`** on screen elements prevents repaint jank during transitions.
4. **Back gesture on mobile:** A right-swipe gesture (touchstart/touchend delta > 60px) should trigger `goBack()` identically to the back button.
5. **`100dvh` not `100vh`** — use `dvh` units to account for mobile browser chrome.
6. **Quick link pills** trigger the same `goto(pageId)` function as their parent cards.
7. **Subpage scroll position** should reset to top on every navigation (`scrollTop = 0` before transition starts).
8. **Font loading:** Load Inter and Geist Mono per `DESIGN.md` — do not substitute system fonts in production.
9. **Icon library:** Use Tabler Icons (outline only) to match the icon system referenced in `DESIGN.md`.
10. **Token references** throughout this file (`{colors.*}`, `{typography.*}`, `{rounded.*}`, `{spacing.*}`) resolve to the values defined in `DESIGN.md`. Do not hardcode hex values or px values here.
