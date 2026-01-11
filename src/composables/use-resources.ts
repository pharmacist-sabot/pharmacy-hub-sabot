import { onMounted, ref } from 'vue';

import type { ResourceItem } from '@/types/resource';

export function useResources() {
  const resources = ref<ResourceItem[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function fetchResources() {
    loading.value = true;
    error.value = null;

    try {
      // Since the file is in public/, we can fetch it directly.
      // We cast the response as ResourceItem[].
      const response = await fetch('/data/resources.json');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ResourceItem[] = await response.json();
      resources.value = data;
    }
    catch (err) {
      console.error('Failed to fetch resources:', err);
      // Simplify error type checking
      error.value = err instanceof Error ? err.message : 'Unknown error';
    }
    finally {
      loading.value = false;
    }
  }

  onMounted(() => {
    void fetchResources();
  });

  return {
    resources,
    loading,
    error,
    refresh: fetchResources,
  };
}
