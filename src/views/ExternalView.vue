<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ResourceCard from '@/components/common/ResourceCard.vue';
import { useResources } from '@/composables/use-resources';
import { useUIStore } from '@/stores/ui';

const store = useUIStore();
const { searchQuery } = storeToRefs(store);

const { resources, loading, error } = useResources();

const externals = computed(() => {
  if (loading.value || error.value)
    return [];

  let items = resources.value.filter(r => r.type === 'external');

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(r =>
      r.title.toLowerCase().includes(query)
      || r.description.toLowerCase().includes(query),
    );
  }

  return items;
});

const categories = ['ทั้งหมด', 'สปสช.', 'กระทรวง'];
const activeCategory = 'ทั้งหมด';
</script>

<template>
  <div class="carta-container">
    <section class="cart-title-nav">
      <div class="cart-title cart-title--purple hover-shrink">
        <h2>ระบบงานภายนอก</h2>
      </div>

      <div class="cart-nav cart-nav--purple rounded" aria-label="เมนูหมวดหมู่">
        <ul>
          <li v-for="cat in categories" :key="cat">
            <a
              href="#"
              :class="{ active: cat === activeCategory }"
            >
              {{ cat }}
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="loading" class="promociones">
      <div v-for="n in 4" :key="n" class="combo">
        <div class="skeleton" style="height: 140px; border-radius: 16px;" />
        <div class="skeleton" style="height: 20px; width: 60%; margin: 8px auto;" />
        <div class="skeleton" style="height: 24px; width: 80%; margin: 4px auto;" />
      </div>
    </section>

    <section v-else-if="error" class="error-message">
      {{ error }}
    </section>

    <section v-else class="promociones">
      <ResourceCard
        v-for="item in externals"
        :key="item.id"
        :item="item"
      />
    </section>
  </div>
</template>

<style scoped>
.carta-container {
  padding: 6.5dvh 10%;
  animation: fadeIn 0.5s ease-in-out;
  content-visibility: auto;
  contain-intrinsic-size: 1px 5000px;
}

.cart-title-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  height: 100px;
}

.cart-title {
  background: linear-gradient(135deg, var(--color-orange-fuerte) 0%, var(--color-orange-claro) 100%);
  padding: 20px 6%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-title h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-white);
  margin: 0;
}

.cart-nav {
  grid-column: span 3;
  background: var(--color-orange);
  border-radius: 20px;
  padding: 20px 6%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-nav ul {
  list-style: none;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.cart-nav a {
  padding: 10px 18px;
  color: var(--color-white);
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.5s ease;
  position: relative;
  z-index: 1;
}

.cart-nav a:hover,
.cart-nav a.active {
  background: var(--color-white);
  color: var(--color-negro);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}

.promociones {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  animation: fadeIn 0.4s ease-in-out;
  padding: 12px 0;
  gap: 12px;
}

.promociones::-webkit-scrollbar {
  display: none;
}

.promociones::-webkit-scrollbar {
  display: none;
}

.error-message {
  padding: 20px;
  background: var(--color-white);
  color: var(--color-orange-fuerte);
  border-radius: 16px;
  text-align: center;
  margin-top: 20px;
}

.hover-shrink:hover {
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

@media (max-width: 1440px) {
  .carta-container {
    padding: 6dvh 4%;
  }
}

@media (max-width: 1280px) {
  .carta-container {
    padding: 10dvh 2%;
  }
}

@media (max-width: 1024px) {
  .carta-container {
    padding: 6.5dvh 4%;
  }

  .cart-title-nav {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    height: auto;
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .carta-container {
    padding: 16px;
    padding-bottom: 80px;
  }
}

@media (max-width: 480px) {
  .carta-container {
    padding-bottom: 90px;
  }
}
</style>
