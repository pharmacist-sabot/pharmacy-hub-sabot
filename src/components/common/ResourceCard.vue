<script setup lang="ts">
import type { ResourceItem } from '@/types/resource';

import { computed, ref } from 'vue';

const props = defineProps<{
  item: ResourceItem;
}>();

const gradients = [
  'linear-gradient(135deg, #e2f6d5 0%, #f0fbea 100%)',
  'linear-gradient(135deg, var(--color-teal-claro) 0%, #eaf9fa 100%)',
  'linear-gradient(135deg, var(--color-orange-claro) 0%, #fff5ee 100%)',
  'linear-gradient(135deg, var(--color-purple-claro) 0%, #f5f2fa 100%)',
];

const ctaStyles = {
  tool: {
    background: 'var(--color-teal)',
    color: 'var(--color-white)',
    hoverShadow: 'rgba(23, 198, 210, 0.4)',
  },
  report: {
    background: 'var(--color-pink)',
    color: 'var(--color-white)',
    hoverShadow: 'rgba(240, 98, 146, 0.4)',
  },
  external: {
    background: 'var(--color-purple)',
    color: 'var(--color-white)',
    hoverShadow: 'rgba(139, 92, 246, 0.4)',
  },
};

const categoryLabel = computed(() => {
  if (props.item.type === 'tool')
    return 'TOOL';
  if (props.item.type === 'report')
    return 'REPORT';
  return 'EXTERNAL';
});

const gradient = computed(() => {
  const index = props.item.title.charCodeAt(0) % gradients.length;
  return gradients[index];
});

const ctaStyle = computed(() => ctaStyles[props.item.type]);

const imageUrl = computed(() => {
  return `/images/${props.item.id}.png`;
});

const imageLoaded = ref(true);
</script>

<template>
  <div
    class="combo"
    :class="{ 'combo--disabled': !item.isActive }"
  >
    <div class="combo-image-wrapper">
      <img
        v-if="imageLoaded"
        :src="imageUrl"
        :alt="item.title"
        class="combo-img"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        @load="imageLoaded = true"
        @error="imageLoaded = false"
      >
      <div
        v-if="!imageLoaded"
        class="combo-fallback"
        :style="{ background: gradient }"
      >
        <span>{{ item.title.charAt(0) }}</span>
      </div>
    </div>

    <div class="combo-info">
      <span class="combo-category">
        {{ categoryLabel }}
      </span>
      <h3 class="combo-title">
        {{ item.title }}
      </h3>
      <p class="combo-desc">
        {{ item.description }}
      </p>

      <a
        v-if="item.isActive"
        :href="item.url"
        target="_blank"
        class="combo-cta"
        :style="{
          'background': ctaStyle.background,
          'color': ctaStyle.color,
          '--hover-shadow': ctaStyle.hoverShadow,
        }"
      >
        เปิดใช้งาน
      </a>
      <span v-else class="combo-cta combo-cta--inactive">
        Coming Soon
      </span>
    </div>
  </div>
</template>

<style scoped>
.combo {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 16px;
  gap: 16px;
  position: relative;
  z-index: 1;
  background: var(--color-white);
  transition: transform 0.4s ease;
  scroll-snap-align: start;
  width: 280px;
  flex-shrink: 0;
}

.combo::before {
  content: '';
  position: absolute;
  inset: -3px;
  background: linear-gradient(90deg, var(--color-purple), var(--color-purple-claro), var(--color-green));
  border-radius: 23px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.combo:hover::before {
  opacity: 1;
}

.combo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-white);
  border-radius: 20px;
  z-index: -1;
  transition: background-color 0.4s ease;
}

.combo:hover {
  transform: translateY(-6px);
}

.combo-image-wrapper {
  width: 100%;
  height: 250px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.combo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  position: absolute;
  top: 0;
  left: 0;
}

.combo-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.combo-fallback span {
  font-size: 3rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.2);
}

.combo-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.combo-category {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-gris);
  background: var(--color-gris-claro);
  padding: 8px 12px;
  border-radius: 30px;
  transition: transform 0.4s ease;
}

.combo-category:hover {
  transform: scale(1.1);
}

.combo-title {
  font-size: clamp(1.1rem, 1.3vw, 1.3rem);
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  line-height: 1.3;
}

.combo-desc {
  font-size: clamp(0.75rem, 0.9vw, 0.85rem);
  color: var(--color-gris);
  margin: 0;
  line-height: 1.3;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 80%;
}

.combo-cta {
  display: inline-flex;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 4px;
}

.combo-cta:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px -2px var(--hover-shadow);
}

.combo-cta--inactive {
  background: rgba(14, 15, 12, 0.08);
  color: var(--color-gris);
  cursor: default;
}

.combo-cta--inactive:hover {
  transform: none;
  box-shadow: none;
}

.combo--disabled {
  opacity: 0.6;
  filter: grayscale(0.3);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
