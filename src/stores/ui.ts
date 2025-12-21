import { defineStore } from 'pinia';
import { ref } from 'vue';

export type TabType = 'all' | 'tool' | 'report';

export const useUIStore = defineStore('ui', () => {
  const isMobileMenuOpen = ref(false);
  const currentTab = ref<TabType>('all');
  const searchQuery = ref('');

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  }

  function setTab(tab: TabType) {
    currentTab.value = tab;
    // Reset search when changing major tabs if desired,
    // but keeping it allows searching across tabs.
    if (isMobileMenuOpen.value) {
      isMobileMenuOpen.value = false;
    }
  }

  function setSearch(query: string) {
    searchQuery.value = query;
  }

  return {
    isMobileMenuOpen,
    currentTab,
    searchQuery,
    toggleMobileMenu,
    setTab,
    setSearch,
  };
});
