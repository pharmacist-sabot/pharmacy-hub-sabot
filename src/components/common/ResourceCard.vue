<script setup lang="ts">
import type { Component } from 'vue';

import type { ResourceItem } from '@/types/resource';
import {
  AlertTriangle,
  ArrowUpRight,
  Baby,
  Banknote,
  BarChart3,
  Calculator,
  CalendarRange,
  ClipboardList,
  FileDown,
  FileSignature,
  Link,
  PieChart,
  Pill,
  Siren,
  Users,
} from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
  item: ResourceItem;
}>();

const iconMap: Record<ResourceItem['iconName'], Component> = {
  AlertTriangle,
  FileSignature,
  Calculator,
  Baby,
  FileDown,
  Pill,
  Siren,
  ClipboardList,
  BarChart3,
  PieChart,
  CalendarRange,
  Banknote,
  Users,
  Link,
};

const currentIcon = computed(() => iconMap[props.item.iconName] || Pill);

const typeLabel = computed(() =>
  props.item.type === 'tool' ? 'Application' : props.item.type === 'report' ? 'Dashboard' : 'External',
);
</script>

<template>
  <a
    :href="item.isActive ? item.url : undefined"
    :target="item.isActive ? '_blank' : undefined"
    :aria-disabled="!item.isActive"
    class="resource-card group flex flex-col h-full rounded-[28px] overflow-hidden animate-fade-in-up"
    :class="{ 'card--disabled': !item.isActive }"
    style="
      background-color: #ffffff;
      border: 1px solid rgba(14,15,12,0.09);
      box-shadow: 0 2px 12px -4px rgba(22,51,0,0.08);
      transition: transform 0.28s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.28s ease, border-color 0.2s ease;
    "
  >
    <!-- ── Coloured top strip with icon ── -->
    <div
      class="relative px-6 pt-6 pb-5 flex items-start justify-between"
      style="background: linear-gradient(135deg, #e2f6d5 0%, #f0fbea 100%);"
    >
      <!-- Icon circle -->
      <div
        class="card-icon w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300"
        style="background-color: #ffffff; box-shadow: 0 2px 8px -2px rgba(22,51,0,0.14);"
      >
        <component
          :is="currentIcon"
          class="w-7 h-7 transition-colors duration-300"
          style="color: #163300;"
          :stroke-width="1.8"
        />
      </div>

      <!-- Status badge -->
      <div>
        <span
          v-if="item.isActive"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
          style="background-color: #163300; color: #9fe870;"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#9fe870] animate-pulse" />
          ONLINE
        </span>
        <span
          v-else
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
          style="background-color: rgba(14,15,12,0.07); color: #868685;"
        >
          MAINTENANCE
        </span>
      </div>

    </div>

    <!-- ── Content ── -->
    <div class="flex flex-col flex-1 px-6 py-5">
      <!-- Type label -->
      <p
        class="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2"
        style="color: #868685;"
      >
        {{ typeLabel }}
      </p>

      <!-- Title -->
      <h3
        class="text-base font-bold leading-snug mb-2 transition-colors duration-200"
        style="color: #0e0f0c; font-feature-settings: 'calt' 1;"
      >
        {{ item.title }}
      </h3>

      <!-- Description -->
      <p
        class="text-sm leading-relaxed line-clamp-2 flex-1 font-normal"
        style="color: #868685;"
      >
        {{ item.description }}
      </p>

      <!-- ── Footer ── -->
      <div
        class="mt-5 pt-4 flex items-center justify-between"
        style="border-top: 1px solid rgba(14,15,12,0.07);"
      >
        <!-- Active: CTA pill -->
        <span
          v-if="item.isActive"
          class="card-cta inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          style="background-color: #9fe870; color: #163300;"
        >
          เปิดใช้งาน
          <ArrowUpRight class="w-3.5 h-3.5 transition-transform duration-200 cta-arrow" :stroke-width="2.5" />
        </span>

        <!-- Inactive: coming soon -->
        <span
          v-else
          class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
          style="background-color: rgba(14,15,12,0.05); color: #868685;"
        >
          Coming Soon
        </span>
      </div>
    </div>
  </a>
</template>

<style scoped>
/* ── Hover lift ── */
.resource-card:not(.card--disabled):hover {
  transform: translateY(-5px) scale(1.01);
  border-color: rgba(159, 232, 112, 0.5) !important;
  box-shadow:
    0 0 0 1px rgba(159, 232, 112, 0.4),
    0 20px 48px -8px rgba(22, 51, 0, 0.16) !important;
}

/* ── Icon pop on hover ── */
.resource-card:not(.card--disabled):hover .card-icon {
  background-color: #9fe870;
  box-shadow: 0 4px 16px -4px rgba(159, 232, 112, 0.6);
}
.resource-card:not(.card--disabled):hover .card-icon svg {
  color: #163300;
}

/* ── CTA arrow nudge on hover ── */
.resource-card:not(.card--disabled):hover .cta-arrow {
  transform: translate(2px, -2px);
}

/* ── CTA pill scale ── */
.resource-card:not(.card--disabled):hover .card-cta {
  box-shadow: 0 4px 16px -4px rgba(159, 232, 112, 0.5);
}

/* ── Disabled state ── */
.card--disabled {
  opacity: 0.6;
  filter: grayscale(0.5);
  cursor: not-allowed;
  pointer-events: none;
}
</style>
