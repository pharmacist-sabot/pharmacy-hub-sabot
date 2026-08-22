<script setup lang="ts">
import { onBeforeUnmount } from 'vue';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

let observer: IntersectionObserver | null = null;
let hoveredTile: HTMLElement | null = null;

function clearTilt(tile: HTMLElement | null) {
  if (!tile)
    return;
  tile.style.setProperty('--tilt-x', '0deg');
  tile.style.setProperty('--tilt-y', '0deg');
}

function onGridPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse')
    return;

  const tile = (event.target as HTMLElement).closest<HTMLElement>('.hover-shrink');
  if (tile !== hoveredTile) {
    clearTilt(hoveredTile);
    hoveredTile = tile;
  }
  if (!tile)
    return;

  const rect = tile.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  tile.style.setProperty('--tilt-x', `${(-y * 2.6).toFixed(2)}deg`);
  tile.style.setProperty('--tilt-y', `${(x * 2.6).toFixed(2)}deg`);
}

function onGridPointerLeave() {
  clearTilt(hoveredTile);
  hoveredTile = null;
}

const vRevealGroup = {
  mounted(container: HTMLElement) {
    const reducedMotion
      = typeof window.matchMedia === 'function'
        && window.matchMedia(REDUCED_MOTION).matches;

    if (reducedMotion || typeof IntersectionObserver === 'undefined')
      return;

    const tiles = Array.from(container.children) as HTMLElement[];
    if (!tiles.length)
      return;

    tiles.forEach((tile, index) => {
      tile.style.setProperty('--tile-order', String(index));
      tile.classList.add('tile-pending');
    });

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting)
            continue;
          entry.target.classList.remove('tile-pending');
          entry.target.classList.add('tile-shown');
          observer?.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    tiles.forEach(tile => observer?.observe(tile));
  },
};

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div class="home-view">
    <article
      id="inicio"
      v-reveal-group
      class="inicio-container"
      @pointermove="onGridPointerMove"
      @pointerleave="onGridPointerLeave"
    >
      <section class="chicken-container hover-shrink">
        <div class="mock-visual mock-visual--hero" aria-label="พื้นที่ภาพตัวอย่างหน้าแรก">
          <span class="mock-chip">Hero Image</span>
          <div class="capsule capsule--one" />
          <div class="capsule capsule--two" />
          <div class="capsule capsule--three" />
          <div class="mock-cross">
            <span />
            <span />
          </div>
        </div>
      </section>

      <section class="marca flex-center hover-shrink">
        <div class="brand-mark" aria-hidden="true">
          <span class="brand-dot" />
          <span class="brand-dot brand-dot--small" />
          <span class="brand-line" />
        </div>
        <p>RX ROOM</p>
      </section>

      <section class="gifs flex-center hover-shrink" aria-label="ฟีเจอร์เด่น">
        <div class="media-pill media-pill--mint">
          <strong>01</strong>
          <span>คำนวณยา</span>
        </div>
        <div class="media-pill media-pill--blue">
          <strong>02</strong>
          <span>รายงาน</span>
        </div>
        <div class="media-pill media-pill--cream">
          <strong>03</strong>
          <span>เชื่อมต่อ</span>
        </div>
      </section>

      <section class="papas-container hover-shrink">
        <div class="mock-visual mock-visual--vertical" aria-hidden="true">
          <div class="pharmacy-icon pharmacy-icon--tablet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="4" y="6" width="16" height="12" rx="3" />
              <path d="M8 12h8" />
            </svg>
          </div>
          <div class="pharmacy-icon pharmacy-icon--leaf">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22c5-5 8-10 8-16C20 4 16 2 12 2 4 4 2 10 4 16c2-6 8-6 8 6z" />
              <path d="M12 22c-2 0-5-3-5-8" />
              <path d="M9 14c1-2 3-4 6-4" />
            </svg>
          </div>
          <div class="pharmacy-icon pharmacy-icon--bottle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 3h6v3l2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8l2-2z" />
              <path d="M9 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
              <path d="M12 11v4" />
              <path d="M10 13h4" />
            </svg>
          </div>
          <div class="pharmacy-icon pharmacy-icon--clipboard">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="4" y="4" width="16" height="18" rx="2" />
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <path d="M8 10h8" />
              <path d="M8 14h4" />
              <path d="M8 18h2" />
            </svg>
          </div>
        </div>
      </section>

      <section class="logo flex-center hover-shrink">
        <div class="logo-badge" aria-hidden="true">
          <svg class="shield-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 5V11C4 16.5 12 21 12 21C12 21 20 16.5 20 11V5L12 2Z" stroke="#F97316" stroke-width="1.8" stroke-linejoin="round" />
            <rect x="8" y="9" width="3.5" height="4" rx="1.8" fill="#F97316" />
            <rect x="12.5" y="9" width="3.5" height="4" rx="1.8" fill="#F97316" />
          </svg>
        </div>
      </section>

      <section class="title hover-shrink">
        <div class="title-content">
          <h1>RX ROOM</h1>
          <p>ศูนย์รวมระบบงาน <span>กลุ่มงานเภสัชกรรม โรงพยาบาลสระโบสถ์</span></p>
          <div class="title-meta" role="list" aria-label="ภาพรวมทรัพยากร">
            <span role="listitem">เครื่องมือ 9</span>
            <span role="listitem">รายงาน 5</span>
            <span role="listitem">เชื่อมต่อภายนอก 1</span>
          </div>
        </div>
      </section>

      <section class="gif-brasas hover-shrink">
        <div class="mock-video" aria-label="พื้นที่โมชั่นตัวอย่าง">
          <span class="signal signal--one" />
          <span class="signal signal--two" />
          <span class="signal signal--three" />
          <p>Dashboard Motion</p>
        </div>
      </section>

      <section class="img-alitas hover-shrink">
        <div class="mock-visual mock-visual--secondary" aria-label="พื้นที่วิดีโอ">
          <video
            class="pharmacy-video"
            autoplay
            loop
            muted
            playsinline
          >
            <source src="/video/pharmacy.webm" type="video/webm">
          </video>
        </div>
      </section>

      <section class="action-link hover-shrink">
        <a href="/tools" class="animated-link" aria-label="ไปยังหน้ารวมเครื่องมือ">
          <span class="text">ดูเครื่องมือทั้งหมด</span>
          <svg viewBox="0 0 24 24" class="cta-arrow" aria-hidden="true">
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
          </svg>
        </a>
      </section>
    </article>
  </div>
</template>

<style scoped>
.home-view {
  position: relative;
}

/* Subtle film-grain overlay to reduce banding and add texture */
.home-view::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: soft-light;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.inicio-container {
  --tile-border: rgba(255, 255, 255, 0.16);
  --tile-blur: 8px;
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
  height: calc(100vh - 90px);
  padding: 12px 10%;
  animation: fadeIn 0.8s ease-in-out;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hover-shrink,
.mock-visual,
.mock-video,
.logo-badge,
.media-pill,
.brand-mark {
  transition: transform 0.3s ease;
}

.hover-shrink:hover {
  transform: scale(0.97);
}

/* ── Pointer tilt ── */
.hover-shrink {
  transform: perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale(var(--tile-scale, 1));
  transition: transform 0.25s ease-out;
  will-change: transform;
}

@media (hover: hover) {
  .hover-shrink:hover {
    --tile-scale: 0.975;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hover-shrink {
    transform: none;
  }
}

/* ── Staggered entrance reveal ── */
.inicio-container > section {
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    translate 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(min(var(--tile-order, 0), 4) * 70ms);
}

@media (prefers-reduced-motion: no-preference) {
  .inicio-container > section.tile-pending {
    opacity: 0;
    translate: 0 24px;
  }
}

.chicken-container,
.img-alitas,
.papas-container,
.gif-brasas,
.title,
.action-link,
.marca,
.gifs,
.logo {
  position: relative;
  z-index: 1;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--tile-border);
  background: transparent;
  box-shadow: 0 10px 22px rgb(14 8 27 / 0.06);
}

.chicken-container::before,
.img-alitas::before,
.papas-container::before,
.gif-brasas::before,
.title::before,
.action-link::before,
.marca::before,
.gifs::before,
.logo::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url('/images/home.png');
  background-repeat: no-repeat;
  background-size: var(--tile-bg-size, cover);
  background-position: var(--tile-bg-position, center);
  filter: saturate(1.02) brightness(1.04);
}

.chicken-container::after,
.img-alitas::after,
.papas-container::after,
.gif-brasas::after,
.title::after,
.action-link::after,
.marca::after,
.gifs::after,
.logo::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(145deg, rgb(255 255 255 / 0.03), rgb(255 255 255 / 0.008));
  backdrop-filter: blur(var(--tile-blur)) saturate(108%);
  -webkit-backdrop-filter: blur(var(--tile-blur)) saturate(108%);
}

.chicken-container > *,
.img-alitas > *,
.papas-container > *,
.gif-brasas > *,
.title > *,
.action-link > *,
.marca > *,
.gifs > *,
.logo > * {
  position: relative;
  z-index: 1;
}

.chicken-container {
  --tile-bg-size: 700% 300%;
  --tile-bg-position: 0% 0%;
}

.marca {
  --tile-bg-size: 350% 300%;
  --tile-bg-position: 16.7% 0%;
}

.gifs {
  --tile-bg-size: 350% 300%;
  --tile-bg-position: 50% 0%;
}

.papas-container {
  --tile-bg-size: 350% 100%;
  --tile-bg-position: 100% 0%;
}

.logo {
  --tile-bg-size: 700% 300%;
  --tile-bg-position: 0% 50%;
}

.title {
  --tile-bg-size: 175% 300%;
  --tile-bg-position: 16.7% 50%;
}

.gif-brasas {
  --tile-bg-size: 700% 300%;
  --tile-bg-position: 0% 100%;
}

.img-alitas {
  --tile-bg-size: 350% 300%;
  --tile-bg-position: 16.7% 100%;
}

.action-link {
  --tile-bg-size: 350% 300%;
  --tile-bg-position: 50% 100%;
}

.chicken-container,
.img-alitas {
  transition: transform 0.3s ease;
}

.mock-visual,
.mock-video {
  width: 100%;
  height: 100%;
  min-height: 100%;
  position: relative;
  background-color: transparent;
  z-index: 1;
}

.chicken-container .mock-visual,
.img-alitas .mock-visual,
.img-alitas .mock-visual {
  border-radius: 20px;
  height: 100%;
  min-height: 100%;
}

.mock-visual::before,
.mock-video::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgb(255 255 255 / 0.05), transparent 28%),
    linear-gradient(135deg, rgb(255 255 255 / 0.02), transparent 50%);
  pointer-events: none;
}

.mock-visual--hero {
  background:
    linear-gradient(140deg, rgb(255 255 255 / 0.005), rgb(23 198 210 / 0.025)),
    linear-gradient(135deg, rgb(255 243 234 / 0.03) 0%, rgb(248 223 206 / 0.015) 35%, rgb(23 198 210 / 0.025) 100%);
  min-height: 100%;
}

.mock-chip {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  padding: 8px 12px;
  border-radius: 999px;
  background-color: rgb(255 255 255 / 0.22);
  color: var(--color-negro-puro);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.capsule {
  position: absolute;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--color-white) 0%, #dff4f6 100%);
  box-shadow: 0 10px 24px rgb(14 8 27 / 0.12);
}

.capsule--one {
  width: 40%;
  height: 20%;
  bottom: 18%;
  left: 14%;
  transform: rotate(-18deg);
}

.capsule--two {
  width: 34%;
  height: 17%;
  top: 18%;
  right: 14%;
  transform: rotate(22deg);
  background: linear-gradient(180deg, var(--color-white) 0%, #ffe0cc 100%);
}

.capsule--three {
  width: 18%;
  height: 18%;
  bottom: 20%;
  right: 18%;
  border-radius: 18px;
  background: linear-gradient(180deg, var(--color-white) 0%, #ffe8db 100%);
}

.mock-cross {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 92px;
  height: 92px;
  transform: translate(-50%, -50%) rotate(12deg);
}

.mock-cross span {
  position: absolute;
  inset: 0;
  margin: auto;
  background-color: var(--color-orange-fuerte);
  border-radius: 16px;
}

.mock-cross span:first-child {
  width: 92px;
  height: 28px;
}

.mock-cross span:last-child {
  width: 28px;
  height: 92px;
}

.marca {
  grid-column: span 2 / span 2;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  padding: 20px 6%;
}

.brand-mark {
  position: relative;
  width: 65px;
  height: 70px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.28) 0%, rgb(225 251 253 / 0.12) 100%);
}

.brand-dot,
.brand-line {
  position: absolute;
}

.brand-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--color-orange);
  top: 15px;
  left: 15px;
}

.brand-dot--small {
  width: 12px;
  height: 12px;
  background-color: var(--color-teal);
  top: 18px;
  right: 14px;
  left: auto;
}

.brand-line {
  width: 34px;
  height: 10px;
  border-radius: 999px;
  background-color: var(--color-negro);
  left: 15px;
  bottom: 16px;
}

.marca p {
  color: var(--color-white);
  text-shadow: 0 6px 18px rgb(14 8 27 / 0.22);
  text-align: center;
  font-weight: 600;
  font-size: clamp(1.55em, 1.8vw, 2.1em);
  white-space: nowrap;
}

.gifs {
  grid-column: span 2 / span 2;
  grid-column-start: 4;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  padding: 12px;
}

.media-pill {
  width: calc(33.333% - 14px);
  min-width: 92px;
  min-height: 100px;
  padding: 14px 10px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
}

.media-pill strong {
  font-size: 1.5rem;
  line-height: 1;
}

.media-pill span {
  font-size: 0.88rem;
  font-weight: 700;
}

.media-pill--mint {
  background-color: rgb(226 246 213 / 0.22);
  color: var(--color-green-dark);
}

.media-pill--blue {
  background-color: rgb(215 245 255 / 0.22);
  color: var(--color-teal-oscuro);
}

.media-pill--cream {
  background-color: rgb(255 240 228 / 0.22);
  color: var(--color-orange-fuerte);
}

.papas-container {
  grid-column: span 2 / span 2;
  grid-row: span 3 / span 3;
  grid-column-start: 6;
  position: relative;
}

.mock-visual--vertical {
  position: absolute;
  inset: 0;
  opacity: 0.46;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 0.015), transparent 60%),
    linear-gradient(135deg, rgb(245 154 75 / 0.025) 0%, rgb(217 94 20 / 0.02) 100%);
}

.papas-container:hover .mock-visual--vertical,
.img-alitas:hover .mock-visual--secondary,
.chicken-container:hover .mock-visual--hero {
  transform: scale(1.08);
}

.pharmacy-icon {
  position: absolute;
  width: 28%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(255 255 255 / 0.7);
  animation: pharmacyPulse 1.8s ease-in-out infinite;
}

.pharmacy-icon svg {
  width: 100%;
  height: 100%;
}

.pharmacy-icon--tablet {
  top: 16%;
  left: 18%;
  animation-delay: 0s;
}

.pharmacy-icon--leaf {
  top: 16%;
  right: 18%;
  animation-delay: 0.3s;
}

.pharmacy-icon--bottle {
  bottom: 16%;
  left: 18%;
  animation-delay: 0.6s;
}

.pharmacy-icon--clipboard {
  bottom: 16%;
  right: 18%;
  animation-delay: 0.9s;
}

@keyframes pharmacyPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.papas-container p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  writing-mode: vertical-lr;
  text-orientation: upright;
  color: var(--color-white);
  font-weight: 700;
  font-size: clamp(1.6em, 2.5vw, 3.2em);
  z-index: 1;
  line-height: 1.1;
  pointer-events: none;
}

.logo {
  grid-row-start: 2;
  padding: 20px 10px;
}

.logo-badge {
  position: relative;
  width: 130px;
  height: 135px;
  border-radius: 30px;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.24) 0%, rgb(223 249 251 / 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.shield-logo {
  width: 76px;
  height: 76px;
  animation: shieldGlow 2.6s ease-in-out infinite;
}

@keyframes shieldGlow {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    filter: drop-shadow(0 0 4px rgb(249 115 22 / 0.3));
  }
  50% {
    transform: scale(1.06) rotate(6deg);
    filter: drop-shadow(0 0 16px rgb(249 115 22 / 0.6));
  }
}

.logo:hover .shield-logo {
  animation: shieldHover 0.6s ease-in-out forwards;
}

@keyframes shieldHover {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.15) rotate(-8deg);
  }
  100% {
    transform: scale(1.1) rotate(6deg);
  }
}

.title {
  grid-column: span 4 / span 4;
  grid-row-start: 2;
  width: 100%;
  padding: 20px 6%;
  text-align: center;
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  align-content: center;
}

.title-content {
  display: grid;
  gap: 10px;
  max-width: min(100%, 720px);
  padding: 22px 28px;
  border: 1px solid var(--tile-border);
  border-radius: var(--radius-xl);
  background: linear-gradient(180deg, rgb(8 20 38 / 0.3), rgb(8 20 38 / 0.16));
  backdrop-filter: blur(var(--tile-blur));
  -webkit-backdrop-filter: blur(var(--tile-blur));
  box-shadow: 0 18px 40px rgb(8 20 38 / 0.16);
}

.title h1 {
  margin-bottom: 0;
  font-size: clamp(2.6em, 3.6vw, 3.6em);
  line-height: 0.95;
  letter-spacing: 0.06em;
  background: linear-gradient(95deg, #fff 12%, #ffd9bd 48%, #a9ecf4 88%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.title p {
  max-width: 36ch;
  color: rgb(255 255 255 / 0.86);
  font-size: 1.02rem;
  font-weight: 400;
  line-height: 1.65;
  letter-spacing: 0.01em;
  text-wrap: balance;
}

.title-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
}

.title-meta span {
  padding: 5px 14px;
  border: 1px solid rgb(255 255 255 / 0.28);
  border-radius: var(--radius-pill);
  background: rgb(255 255 255 / 0.12);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.title span {
  color: var(--color-orange-claro);
  font-weight: 700;
}

.gif-brasas {
  grid-row-start: 3;
}

.mock-video {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 20%, rgb(255 255 255 / 0.025), transparent 30%),
    linear-gradient(135deg, rgb(36 36 36 / 0.05) 0%, rgb(17 17 17 / 0.02) 100%);
}

.signal {
  position: absolute;
  bottom: 18px;
  width: 18px;
  border-radius: 999px 999px 4px 4px;
  background: linear-gradient(180deg, var(--color-green) 0%, var(--color-teal-oscuro) 100%);
  animation: pulseBars 1.6s ease-in-out infinite;
}

.signal--one {
  left: 24px;
  height: 42px;
}

.signal--two {
  left: 52px;
  height: 68px;
  animation-delay: 0.18s;
}

.signal--three {
  left: 80px;
  height: 54px;
  animation-delay: 0.36s;
}

.mock-video p {
  color: var(--color-white);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-shadow: 0 6px 16px rgb(10 24 45 / 0.18);
}

.img-alitas {
  grid-column: span 2 / span 2;
  grid-row-start: 3;
  height: 100%;
}

.mock-visual--secondary {
  background: linear-gradient(
    135deg,
    rgb(223 249 251 / 0.02) 0%,
    rgb(255 240 228 / 0.015) 60%,
    rgb(245 154 75 / 0.025) 100%
  );
}

.folder-stack {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 70%;
  height: 56%;
}

.folder-stack span {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  height: 38%;
  border-radius: 18px;
  background-color: rgb(255 255 255 / 0.72);
  border: 2px solid rgb(14 8 27 / 0.08);
}

.folder-stack span:nth-child(1) {
  top: 0;
  width: 88%;
}

.folder-stack span:nth-child(2) {
  top: 28%;
  width: 100%;
}

.folder-stack span:nth-child(3) {
  top: 56%;
  width: 78%;
}

.pharmacy-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
}

.action-link {
  grid-column: span 2 / span 2;
  grid-column-start: 4;
  grid-row-start: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 4%;
}

.animated-link {
  position: relative;
  width: fit-content;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 0.32);
  border-radius: 999px;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.26), rgb(255 255 255 / 0.14));
  padding: 14px 22px;
  color: var(--color-white);
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  box-shadow: 0 14px 28px rgb(14 8 27 / 0.14);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-link svg {
  z-index: 1;
  width: 18px;
  height: 18px;
  fill: currentColor;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.text {
  position: relative;
  z-index: 1;
  transform: none;
  white-space: nowrap;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-link:hover {
  transform: translateY(-2px) scale(1.02);
  background: linear-gradient(180deg, rgb(255 255 255 / 0.34), rgb(255 255 255 / 0.18));
  box-shadow: 0 18px 32px rgb(14 8 27 / 0.18);
}

.animated-link:hover .cta-arrow {
  transform: translateX(3px);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulseBars {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

@media only screen and (max-width: 1440px) {
  .inicio-container {
    padding: 12px 4%;
  }
}

@media only screen and (max-width: 1280px) {
  .inicio-container {
    padding: 12px 2%;
  }

  .marca p {
    font-size: 1.6em;
  }

  .logo-badge {
    width: 100px;
    height: 105px;
  }

  .shield-logo {
    width: 60px;
    height: 60px;
  }

  .title h1 {
    font-size: 2.4em;
  }
}

@media screen and (max-width: 1024px) {
  .inicio-container {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 10px;
  }

  .chicken-container {
    --tile-bg-size: 400% 300%;
    --tile-bg-position: 0% 0%;
    grid-column: 1 / 1;
    grid-row: 1;
    height: auto;
  }

  .marca {
    --tile-bg-size: 400% 300%;
    --tile-bg-position: 33.33% 0%;
    grid-column: 2 / 3;
    grid-row: 1;
    gap: 10px;
  }

  .marca p {
    font-size: 1.3em;
  }

  .gifs {
    --tile-bg-size: 200% 300%;
    --tile-bg-position: 100% 0%;
    grid-column: 3 / 5;
    grid-row: 1;
  }

  .logo {
    --tile-bg-size: 400% 300%;
    --tile-bg-position: 0% 50%;
    grid-column: 1;
    grid-row: 2;
    height: 200px;
  }

  .title {
    --tile-bg-size: 200% 300%;
    --tile-bg-position: 33.33% 50%;
    grid-column: 2 / 4;
    grid-row: 2;
  }

  .title h1 {
    font-size: 2em;
  }

  .title-content {
    padding: 18px 22px;
  }

  .gif-brasas {
    --tile-bg-size: 400% 300%;
    --tile-bg-position: 0% 100%;
    grid-column: 1 / 2;
    grid-row: 3;
  }

  .img-alitas {
    --tile-bg-size: 400% 300%;
    --tile-bg-position: 33.33% 100%;
    grid-column: 2 / 3;
    grid-row: 3;
    height: 200px;
  }

  .action-link {
    --tile-bg-size: 400% 300%;
    --tile-bg-position: 66.66% 100%;
    grid-column: 3 / 4;
    grid-row: 3;
  }

  .papas-container {
    --tile-bg-size: 400% 150%;
    --tile-bg-position: 100% 100%;
    grid-column: 4 / 5;
    grid-row: 2 / span 2;
  }
}

@media only screen and (max-width: 768px) {
  .inicio-container {
    min-height: auto;
    padding-top: 12px;
    padding-bottom: 72px;
  }

  .title h1 {
    font-size: 1.7em;
  }

  .title p,
  .text {
    font-size: 0.8em;
  }

  .animated-link {
    padding: 12px 18px;
  }
}

@media only screen and (max-width: 480px) {
  .inicio-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(8, auto);
  }

  .marca {
    --tile-bg-size: 100% 800%;
    --tile-bg-position: 0% 0%;
    grid-column: 1 / span 2;
    gap: 10px;
  }

  .marca p {
    font-size: 1.1em;
  }

  .chicken-container {
    --tile-bg-size: 200% 800%;
    --tile-bg-position: 0% 14.28%;
    grid-column: 1;
    grid-row: 2;
    height: 116px;
  }

  .logo {
    --tile-bg-size: 200% 800%;
    --tile-bg-position: 100% 14.28%;
    grid-column: 2;
    grid-row: 2;
    height: 116px;
  }

  .logo-badge {
    width: 80px;
    height: 85px;
  }

  .shield-logo {
    width: 48px;
    height: 48px;
  }

  .title {
    --tile-bg-size: 100% 800%;
    --tile-bg-position: 0% 28.57%;
    grid-column: 1 / span 2;
    grid-row: 3;
  }

  .title h1 {
    font-size: 1.6em;
  }

  .title p {
    font-size: 0.7em;
  }

  .gifs {
    --tile-bg-size: 100% 800%;
    --tile-bg-position: 0% 42.85%;
    grid-column: 1 / span 2;
    grid-row: 4;
    padding: 4px;
    gap: 4px;
  }

  .media-pill {
    min-width: 0;
    min-height: 88px;
  }

  .gif-brasas {
    --tile-bg-size: 200% 800%;
    --tile-bg-position: 0% 57.14%;
    grid-column: 1;
    grid-row: 5;
    min-height: 116px;
  }

  .img-alitas {
    --tile-bg-size: 200% 800%;
    --tile-bg-position: 100% 57.14%;
    grid-column: 2;
    grid-row: 5;
    height: 116px;
  }

  .action-link {
    --tile-bg-size: 100% 800%;
    --tile-bg-position: 0% 71.42%;
    grid-column: 1 / span 2;
    grid-row: 6;
  }

  .animated-link svg {
    width: 16px;
    height: 16px;
  }

  .papas-container {
    --tile-bg-size: 100% 800%;
    --tile-bg-position: 0% 85.71%;
    grid-column: 1 / span 2;
    grid-row: 7;
    height: 160px;
  }

  .papas-container p {
    writing-mode: horizontal-tb;
  }
}
</style>
