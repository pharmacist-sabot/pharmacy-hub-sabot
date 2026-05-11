<script setup lang="ts">
import { onMounted, ref } from 'vue';

const showLoader = ref(true);

onMounted(() => {
  window.setTimeout(() => {
    showLoader.value = false;
  }, 200);
});
</script>

<template>
  <div class="home-view">
    <div v-if="showLoader" class="loader-container" aria-hidden="true">
      <div class="loader">
        <div class="stripe" />
        <div class="stripe" />
        <div class="stripe" />
        <div class="stripe" />
      </div>
    </div>

    <article id="inicio" class="inicio-container">
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
        <p>PHARMACY HUB</p>
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
          <span class="mock-grid" />
          <span class="mock-grid" />
          <span class="mock-grid" />
          <span class="mock-grid" />
        </div>
        <p>เครื่องมือ</p>
      </section>

      <section class="logo flex-center hover-shrink">
        <div class="logo-badge" aria-hidden="true">
          <span />
          <span />
        </div>
      </section>

      <section class="title hover-shrink">
        <h1>PHARMACY HUB</h1>
        <p>ศูนย์รวมระบบงาน <span>กลุ่มงานเภสัชกรรม โรงพยาบาลสระโบสถ์</span></p>
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
        <div class="mock-visual mock-visual--secondary" aria-label="พื้นที่ภาพตัวอย่างรอง">
          <span class="mock-chip">Mock Image</span>
          <div class="folder-stack">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section class="action-link hover-shrink">
        <a href="/tools" class="animated-link" aria-label="ไปยังหน้ารวมเครื่องมือ">
          <svg viewBox="0 0 24 24" class="arr-2" aria-hidden="true">
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
          </svg>
          <span class="text">ดูเครื่องมือทั้งหมด</span>
          <span class="circle" />
          <svg viewBox="0 0 24 24" class="arr-1" aria-hidden="true">
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
          </svg>
        </a>
      </section>
    </article>
  </div>
</template>

<style scoped>
.home-view {
  --naranja-fuerte: #ec5228;
  --naranja: #f0781f;
  --naranja-claro: #f8dfce;
  --celeste: #17c6d2;
  --celeste-oscuro: #31acb5;
  --blanco: #f4f6f5;
  --blanco-puro: #ffffff;
  --negro-puro: #0e081b;
  --negro: #3b3b3b;
  --gris-claro: #d9d9d9;
}

.inicio-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
  min-height: calc(100vh - 160px);
  padding: 6.5dvh 10%;
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

.chicken-container,
.img-alitas,
.papas-container,
.gif-brasas,
.title,
.action-link,
.marca,
.gifs,
.logo {
  border-radius: 20px;
  overflow: hidden;
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
}

.chicken-container .mock-visual,
.img-alitas .mock-visual,
.papas-container .mock-visual {
  border-radius: 20px;
}

.mock-visual::before,
.mock-video::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgb(255 255 255 / 0.28), transparent 32%),
    linear-gradient(135deg, rgb(255 255 255 / 0.12), transparent 55%);
  pointer-events: none;
}

.mock-visual--hero {
  background: linear-gradient(135deg, #fff3ea 0%, #f8dfce 35%, #17c6d2 100%);
  min-height: 100%;
}

.mock-chip {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  padding: 8px 12px;
  border-radius: 999px;
  background-color: rgb(255 255 255 / 0.88);
  color: var(--negro);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.capsule {
  position: absolute;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffffff 0%, #dff4f6 100%);
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
  background: linear-gradient(180deg, #ffffff 0%, #ffe0cc 100%);
}

.capsule--three {
  width: 18%;
  height: 18%;
  bottom: 20%;
  right: 18%;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #ffe8db 100%);
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
  background-color: var(--naranja-fuerte);
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
  background-color: var(--negro);
  padding: 20px 6%;
}

.brand-mark {
  position: relative;
  width: 65px;
  height: 70px;
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff 0%, #e1fbfd 100%);
}

.brand-dot,
.brand-line {
  position: absolute;
}

.brand-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--naranja);
  top: 15px;
  left: 15px;
}

.brand-dot--small {
  width: 12px;
  height: 12px;
  background-color: var(--celeste);
  top: 18px;
  right: 14px;
  left: auto;
}

.brand-line {
  width: 34px;
  height: 10px;
  border-radius: 999px;
  background-color: var(--negro);
  left: 15px;
  bottom: 16px;
}

.marca p {
  color: var(--blanco-puro);
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
  background-color: var(--naranja-fuerte);
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
  background-color: #e2f6d5;
  color: #204400;
}

.media-pill--blue {
  background-color: #d7f5ff;
  color: #00454b;
}

.media-pill--cream {
  background-color: #fff0e4;
  color: #693100;
}

.papas-container {
  grid-column: span 2 / span 2;
  grid-row: span 3 / span 3;
  grid-column-start: 6;
  position: relative;
  background-color: var(--naranja);
}

.mock-visual--vertical {
  position: absolute;
  inset: 0;
  opacity: 0.82;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 0.16), transparent 60%), linear-gradient(135deg, #f59a4b 0%, #d95e14 100%);
}

.papas-container:hover .mock-visual--vertical,
.img-alitas:hover .mock-visual--secondary,
.chicken-container:hover .mock-visual--hero {
  transform: scale(1.08);
}

.mock-grid {
  position: absolute;
  width: 32%;
  aspect-ratio: 1;
  border: 2px solid rgb(255 255 255 / 0.45);
  border-radius: 18px;
}

.mock-grid:nth-child(1) {
  top: 12%;
  left: 16%;
}

.mock-grid:nth-child(2) {
  top: 12%;
  right: 16%;
}

.mock-grid:nth-child(3) {
  bottom: 12%;
  left: 16%;
}

.mock-grid:nth-child(4) {
  bottom: 12%;
  right: 16%;
}

.papas-container p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  writing-mode: vertical-lr;
  text-orientation: upright;
  color: var(--blanco-puro);
  font-weight: 700;
  font-size: clamp(1.6em, 2.5vw, 3.2em);
  z-index: 1;
  line-height: 1.1;
  pointer-events: none;
}

.logo {
  grid-row-start: 2;
  background-color: var(--celeste);
  padding: 20px 10px;
}

.logo-badge {
  position: relative;
  width: 105px;
  height: 110px;
  border-radius: 30px;
  background: linear-gradient(180deg, #ffffff 0%, #dff9fb 100%);
}

.logo-badge span {
  position: absolute;
  inset: 0;
  margin: auto;
  background-color: var(--naranja);
  border-radius: 18px;
}

.logo-badge span:first-child {
  width: 58px;
  height: 18px;
}

.logo-badge span:last-child {
  width: 18px;
  height: 58px;
}

.logo:hover .logo-badge {
  transform: scale(1.1) rotate(18deg);
}

.title {
  grid-column: span 4 / span 4;
  grid-row-start: 2;
  width: 100%;
  padding: 20px 6%;
  background-color: var(--naranja-claro);
  text-align: center;
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  align-content: center;
}

.title h1 {
  margin-bottom: 10px;
  font-size: 2.9em;
  color: var(--negro-puro);
}

.title span {
  color: var(--naranja-fuerte);
}

.gif-brasas {
  grid-row-start: 3;
  background-color: var(--negro);
}

.mock-video {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 20%, rgb(255 255 255 / 0.08), transparent 30%),
    linear-gradient(135deg, #242424 0%, #111111 100%);
}

.signal {
  position: absolute;
  bottom: 18px;
  width: 18px;
  border-radius: 999px 999px 4px 4px;
  background: linear-gradient(180deg, #9fe870 0%, #31acb5 100%);
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
  color: var(--blanco-puro);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.img-alitas {
  grid-column: span 2 / span 2;
  grid-row-start: 3;
}

.mock-visual--secondary {
  background: linear-gradient(135deg, #dff9fb 0%, #fff0e4 60%, #f59a4b 100%);
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

.action-link {
  grid-column: span 2 / span 2;
  grid-column-start: 4;
  grid-row-start: 3;
  background-color: var(--naranja);
  padding: 28px 4%;
}

.animated-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  overflow: hidden;
  border-color: transparent;
  border-radius: 30px;
  background-color: var(--blanco-puro);
  padding: 16px 36px;
  color: var(--negro-puro);
  text-decoration: none;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-link svg {
  position: absolute;
  z-index: 2;
  width: 24px;
  fill: var(--naranja);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-link .arr-1 {
  right: 16px;
}

.animated-link .arr-2 {
  left: -25%;
}

.text {
  position: relative;
  z-index: 1;
  transform: translateX(-12px);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: var(--negro);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.animated-link:hover {
  color: var(--blanco-puro);
  border-radius: 12px;
}

.animated-link:hover .arr-1 {
  right: -25%;
}

.animated-link:hover .arr-2 {
  left: 16px;
}

.animated-link:hover .text {
  transform: translateX(12px);
}

.animated-link:hover .circle {
  width: 220px;
  height: 220px;
  opacity: 1;
}

.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--blanco-puro);
}

.loader {
  max-width: 70px;
  max-height: 70px;
  transform: rotate(80deg);
}

.loader .stripe {
  display: inline-block;
  width: 8px;
  height: 70px;
  margin-bottom: -12px;
  border-radius: 30px;
  outline: 1px solid transparent;
  animation: loader 1s ease-in-out infinite;
}

.loader .stripe:nth-child(1) {
  background-color: var(--celeste);
  animation-delay: 0.15s;
}

.loader .stripe:nth-child(2) {
  margin-bottom: 12px;
  background-color: var(--naranja-fuerte);
  animation-delay: 0.3s;
}

.loader .stripe:nth-child(3) {
  background-color: var(--naranja-claro);
  animation-delay: 0.45s;
}

.loader .stripe:nth-child(4) {
  margin-bottom: 12px;
  background-color: var(--naranja);
  animation-delay: 0.6s;
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

@keyframes loader {
  20% {
    transform: scale(1, 2.2);
  }

  40% {
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
    padding: 6dvh 4%;
  }
}

@media only screen and (max-width: 1280px) {
  .inicio-container {
    padding: 10dvh 2%;
  }

  .marca p {
    font-size: 1.6em;
  }

  .logo-badge {
    width: 85px;
    height: 90px;
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
    grid-column: 1 / 1;
    grid-row: 1;
    height: auto;
  }

  .marca {
    grid-column: 2 / 3;
    grid-row: 1;
    gap: 10px;
  }

  .marca p {
    font-size: 1.3em;
  }

  .gifs {
    grid-column: 3 / 5;
    grid-row: 1;
  }

  .logo {
    grid-column: 1;
    grid-row: 2;
    height: 200px;
  }

  .title {
    grid-column: 2 / 4;
    grid-row: 2;
  }

  .title h1 {
    font-size: 2em;
  }

  .gif-brasas {
    grid-column: 1 / 2;
    grid-row: 3;
  }

  .img-alitas {
    grid-column: 2 / 3;
    grid-row: 3;
    height: 200px;
  }

  .action-link {
    grid-column: 3 / 4;
    grid-row: 3;
  }

  .papas-container {
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
}

@media only screen and (max-width: 480px) {
  .inicio-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(8, auto);
  }

  .marca {
    grid-column: 1 / span 2;
    gap: 10px;
  }

  .marca p {
    font-size: 1.1em;
  }

  .chicken-container {
    grid-column: 1;
    grid-row: 2;
    height: 116px;
  }

  .logo {
    grid-column: 2;
    grid-row: 2;
    height: 116px;
  }

  .logo-badge {
    width: 65px;
    height: 68px;
  }

  .title {
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
    grid-column: 1;
    grid-row: 5;
    min-height: 116px;
  }

  .img-alitas {
    grid-column: 2;
    grid-row: 5;
    height: 116px;
  }

  .action-link {
    grid-column: 1 / span 2;
    grid-row: 6;
  }

  .animated-link svg {
    width: 20px;
  }

  .papas-container {
    grid-column: 1 / span 2;
    grid-row: 7;
    height: 160px;
  }

  .papas-container p {
    writing-mode: horizontal-tb;
  }
}
</style>
