<script setup lang="ts">
import { Clock3, MapPin, Phone, ShieldPlus } from 'lucide-vue-next';

const faqItems = [
  {
    question: 'กลุ่มงานเภสัชกรรมมีบทบาทหลักอะไรบ้าง?',
    answer: 'หน้านี้ออกแบบรอข้อมูลจริงไว้ก่อน โดยเตรียมพื้นที่สำหรับภารกิจหลัก โครงสร้างทีม และแนวทางการให้บริการของกลุ่มงานเภสัชกรรม',
  },
  {
    question: 'จะเพิ่มรูปอาคารหรือแผนที่จริงภายหลังได้หรือไม่?',
    answer: 'ได้ สามารถแทนที่ placeholder ด้านภาพและแผนที่ด้วยภาพจริงหรือฝัง Google Maps เมื่อข้อมูลพร้อมโดยไม่ต้องเปลี่ยนโครง layout',
  },
  {
    question: 'ต้องการแสดงข้อมูลหน่วยย่อยหรือช่องทางติดต่อหลายรายการได้ไหม?',
    answer: 'ได้เช่นกัน การ์ดฝั่งซ้ายและชุด FAQ ด้านขวาถูกวางไว้ให้ขยายเป็นข้อมูลหน่วยบริการ รายชื่อบุคลากร หรือขั้นตอนติดต่อเพิ่มเติมได้ทันที',
  },
];
</script>

<template>
  <article class="local-container">
    <section class="local-title hover-shrink">
      <h2>กลุ่มงานเภสัชกรรม</h2>
      <p>หน้าแนะนำหน่วยงานที่จัดโครงรอข้อมูลจริง โดยอ้างอิงภาษาการออกแบบจากหน้า local ของต้นฉบับ</p>
    </section>

    <section class="local-msg hover-shrink">
      <ShieldPlus class="local-msg-icon" :stroke-width="1.8" />
      <p>เตรียมพื้นที่สำหรับภารกิจหน่วยงาน วิสัยทัศน์ และบริการสำคัญของกลุ่มงานเภสัชกรรม</p>
    </section>

    <section class="contact-hours hover-shrink">
      <Clock3 class="contact-icon" :stroke-width="1.8" />
      <span>
        <h3>เวลาทำการ</h3>
        <p>จันทร์ - ศุกร์ 08:00 - 16:00 น. และสามารถเพิ่มตารางเวร/บริการนอกเวลาได้ภายหลัง</p>
      </span>
    </section>

    <section class="contact-address hover-shrink">
      <MapPin class="contact-icon" :stroke-width="1.8" />
      <span>
        <h3>ที่ตั้งหน่วยงาน</h3>
        <p>เตรียมพื้นที่สำหรับอาคาร จุดบริการ ห้องจ่ายยา และตำแหน่งงานเฉพาะภายในโรงพยาบาล</p>
      </span>
    </section>

    <section class="contact-phone hover-shrink">
      <Phone class="contact-icon" :stroke-width="1.8" />
      <span>
        <h3>ช่องทางติดต่อ</h3>
        <a href="tel:036-000-000">036-000-000 ต่อ 000</a>
      </span>
    </section>

    <section class="img-huanchaco hover-shrink">
      <div class="department-photo" aria-label="พื้นที่ภาพหน่วยงานตัวอย่าง">
        <span class="photo-chip">Department Photo</span>
        <div class="building building--main" />
        <div class="building building--side" />
        <div class="building-window-group">
          <span v-for="n in 6" :key="n" />
        </div>
        <p>Department Preview</p>
      </div>
    </section>

    <section class="contact-map hover-shrink">
      <div class="map-placeholder" aria-label="พื้นที่แผนที่ตัวอย่าง">
        <div class="map-line map-line--one" />
        <div class="map-line map-line--two" />
        <div class="map-line map-line--three" />
        <div class="map-pin" />
        <strong>Map Placeholder</strong>
      </div>
    </section>

    <section class="faq-title hover-shrink">
      <h2>ข้อมูลเพิ่มเติม</h2>
    </section>

    <section v-for="(item, index) in faqItems" :key="item.question" class="f-items" :class="`faq-item${index + 1}`">
      <details :open="index === 0">
        <summary>{{ item.question }}</summary>
        {{ item.answer }}
      </details>
    </section>
  </article>
</template>

<style scoped>
.local-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 12px;
  height: calc(100vh - 90px);
  padding: 12px 10%;
  overflow: hidden;
  animation: fadeIn 0.8s ease-in-out;
}

.local-title,
.local-msg,
.faq-title {
  width: 100%;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 8px;
  padding: 20px 6%;
  border-radius: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.local-title {
  background-color: var(--color-orange-claro);
  color: var(--color-orange-fuerte);
}

.local-title h2,
.faq-title h2 {
  margin: 0;
  font-size: 1.5em;
}

.local-title p,
.local-msg p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.4;
}

.local-msg {
  background-color: var(--color-teal);
  color: var(--color-white);
}

.local-msg-icon {
  width: 46px;
  height: 46px;
}

.contact-hours,
.contact-address,
.contact-phone {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px 5%;
  border-radius: 20px;
  background-color: var(--color-negro);
  color: var(--color-white);
  transition: transform 0.3s ease;
}

.contact-hours {
  grid-column: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 2;
}

.contact-address {
  grid-column: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 3;
}

.contact-phone {
  grid-column: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 4;
}

.contact-icon {
  width: clamp(40px, 5vw, 60px);
  height: clamp(40px, 5vw, 60px);
  padding: clamp(0px, 1vw, 10px);
}

.contact-hours span,
.contact-address span,
.contact-phone span {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  text-align: left;
}

.contact-hours h3,
.contact-address h3,
.contact-phone h3 {
  margin-right: 16px;
}

.contact-hours h3 {
  color: var(--color-orange);
}

.contact-address h3 {
  color: var(--color-teal);
}

.contact-phone h3 {
  color: var(--color-green);
}

.contact-phone a {
  color: inherit;
  text-decoration: none;
}

.contact-phone a:hover {
  text-decoration: underline;
  text-decoration-color: var(--color-white);
}

.img-huanchaco {
  grid-column: span 2 / span 2;
  grid-column-start: 3;
  grid-row: span 2 / span 2;
  grid-row-start: 1;
  border-radius: 20px;
  background-color: var(--color-negro);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.department-photo {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
  background: linear-gradient(180deg, #dff9fb 0%, #fef2e6 58%, var(--color-orange) 100%);
}

.photo-chip {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  padding: 8px 12px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.88);
  color: var(--color-negro);
  font-size: 0.8rem;
  font-weight: 700;
}

.building,
.building-window-group span {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.72);
}

.building {
  bottom: 16%;
  border-radius: 18px 18px 6px 6px;
}

.building--main {
  left: 18%;
  width: 32%;
  height: 42%;
}

.building--side {
  right: 16%;
  width: 22%;
  height: 32%;
}

.building-window-group {
  position: absolute;
  left: 23%;
  bottom: 27%;
  display: grid;
  grid-template-columns: repeat(3, 12px);
  gap: 10px;
}

.building-window-group span {
  width: 12px;
  height: 18px;
  border-radius: 4px;
  background-color: rgba(23, 198, 210, 0.8);
}

.department-photo p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-white);
  font-size: 1.4rem;
  font-weight: 600;
  text-shadow: 0 8px 16px rgba(14, 8, 27, 0.18);
}

.contact-map {
  grid-column: span 2 / span 2;
  grid-column-start: 3;
  grid-row: span 2 / span 2;
  grid-row-start: 3;
  border-radius: 20px;
  overflow: hidden;
}

.map-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 330px;
  background: linear-gradient(135deg, #faf4ec 0%, #dff9fb 100%);
}

.map-line {
  position: absolute;
  border-radius: 999px;
  background-color: rgba(58, 58, 58, 0.15);
}

.map-line--one {
  top: 18%;
  left: 8%;
  width: 75%;
  height: 16px;
  transform: rotate(12deg);
}

.map-line--two {
  top: 48%;
  left: 14%;
  width: 68%;
  height: 18px;
  transform: rotate(-18deg);
}

.map-line--three {
  top: 30%;
  right: 10%;
  width: 18px;
  height: 56%;
}

.map-pin {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 46px;
  height: 46px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  background-color: var(--color-orange-fuerte);
  box-shadow: 0 12px 24px rgba(236, 82, 40, 0.25);
}

.map-pin::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-white);
}

.map-placeholder strong {
  position: absolute;
  right: 18px;
  bottom: 18px;
  color: var(--color-negro);
  font-size: 0.9rem;
}

.faq-title {
  grid-column: span 2 / span 2;
  grid-column-start: 5;
  grid-row-start: 1;
  background-color: var(--color-orange-fuerte);
  color: var(--color-white);
}

.f-items {
  width: 100%;
  border-radius: 20px;
  background-color: var(--color-orange-claro);
  transition: transform 0.3s ease;
}

.faq-item1 {
  grid-column: span 2 / span 2;
  grid-column-start: 5;
  grid-row-start: 2;
}

.faq-item2 {
  grid-column: span 2 / span 2;
  grid-column-start: 5;
  grid-row-start: 3;
}

.faq-item3 {
  grid-column: span 2 / span 2;
  grid-column-start: 5;
  grid-row-start: 4;
}

details {
  width: 100%;
  height: 100%;
  padding: clamp(12px, 1.5vw, 16px);
  color: var(--color-negro);
  font-size: clamp(0.75em, 1.5vw, 0.9em);
  transition: all 0.4s ease;
}

details[open] {
  display: block;
  border-left: 10px solid var(--color-orange-fuerte);
  border-radius: 20px;
  background-color: var(--color-white);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

details summary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  list-style: none;
  font-weight: 700;
  cursor: pointer;
}

details summary::before {
  content: '👇';
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-orange-fuerte);
  color: var(--color-white);
  font-size: 1.15em;
  transition: transform 0.4s ease;
}

details[open] summary::before {
  content: '☝️';
  transform: rotate(360deg);
}

.hover-shrink:hover,
.f-items:hover {
  transform: scale(0.97);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media only screen and (max-width: 1440px) {
  .local-container {
    padding: 12px 4%;
  }
}

@media only screen and (max-width: 1280px) {
  .local-container {
    padding: 12px 2%;
  }

  .local-title p,
  .local-msg p {
    font-size: 0.9em;
  }
}

@media screen and (max-width: 1024px) {
  .local-container {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, minmax(120px, 1fr));
    gap: 10px;
  }

  .local-title {
    grid-column: 1 / 3;
    grid-row: 1;
  }

  .local-msg {
    grid-column: 3 / 5;
    grid-row: 1;
  }

  .contact-hours,
  .contact-address,
  .contact-phone {
    grid-column: 1 / 3;
  }

  .img-huanchaco {
    grid-column: 3 / 5;
    grid-row: 2 / 4;
  }

  .contact-map {
    grid-column: 3 / 5;
    grid-row: 4 / 6;
  }

  .faq-title,
  .faq-item1,
  .faq-item2,
  .faq-item3 {
    grid-column: 1 / 5;
  }
}

@media only screen and (max-width: 768px) {
  .local-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(9, auto);
    padding: 16px;
    padding-bottom: 80px;
    gap: 10px;
  }

  .local-title {
    grid-row: 1;
  }

  .local-msg {
    grid-column: 2;
    grid-row: 1;
  }

  .contact-hours {
    grid-column: 1 / span 2;
    grid-row: 2;
  }

  .contact-address {
    grid-column: 1 / span 2;
    grid-row: 3;
  }

  .contact-phone {
    grid-column: 1 / span 2;
    grid-row: 4;
  }

  .img-huanchaco {
    grid-column: 1;
    grid-row: 5;
    min-height: 220px;
  }

  .contact-map {
    grid-column: 2;
    grid-row: 5;
  }

  .faq-title {
    grid-column: 1 / span 2;
    grid-row: 6;
  }

  .faq-item1 {
    grid-column: 1 / span 2;
    grid-row: 7;
  }

  .faq-item2 {
    grid-column: 1 / span 2;
    grid-row: 8;
  }

  .faq-item3 {
    grid-column: 1 / span 2;
    grid-row: 9;
  }
}

@media only screen and (max-width: 480px) {
  .local-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(9, auto);
    padding-bottom: 90px;
  }

  .local-title,
  .local-msg,
  .contact-hours,
  .contact-address,
  .contact-phone,
  .img-huanchaco,
  .contact-map,
  .faq-title,
  .faq-item1,
  .faq-item2,
  .faq-item3 {
    grid-column: 1;
  }

  .local-msg {
    grid-row: 2;
  }

  .contact-hours {
    grid-row: 3;
  }

  .contact-address {
    grid-row: 4;
  }

  .contact-phone {
    grid-row: 5;
  }

  .img-huanchaco {
    grid-row: 6;
  }

  .contact-map {
    grid-row: 7;
  }

  .faq-title {
    grid-row: 8;
  }

  .faq-item1 {
    grid-row: 9;
  }

  .faq-item2 {
    grid-row: 10;
  }

  .faq-item3 {
    grid-row: 11;
  }
}
</style>
