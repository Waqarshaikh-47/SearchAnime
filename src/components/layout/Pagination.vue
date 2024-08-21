<template>
    <nav aria-label="Page navigation ">
      <ul class="pagination justify-content-center mt-2 mb-2">
        <li class="page-item" :class="{ disabled: !hasPrevPage }">
          <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">
            Previous
          </a>
        </li>
  
        <li class="page-item active">
          <span class="page-link">
            {{ currentPage }}
          </span>
        </li>
  
        <li class="page-item" :class="{ disabled: !hasNextPage }">
          <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">
            Next
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref ,computed } from 'vue';
  
  const props = defineProps<{
    currentPage: number;
    lastVisiblePage: number;
    hasNextPage: boolean;
  }>();
  
  const emit = defineEmits<{
    (event: 'page-change', page: number): void;
  }>();
  
  const currentPage = ref(props.currentPage);
  
  const hasPrevPage = computed(() => currentPage.value > 1);
  const hasNextPage = computed(() => props.hasNextPage);
  
  const goToPage = (page: number) => {
    if (page < 1 || page > props.lastVisiblePage) return;
    currentPage.value = page;
    emit('page-change', page);
  };
  </script>
  

<style scoped>

</style>

