<template>
    <div class="searchContainer">
        <i class="bi bi-search"></i>
        <input class="input" v-model="searchQuery" placeholder="Search by character"/>
    </div>
    <div class="searchContainer">
      <p>Total {{ paginationData.items.total }} matching anime characters found</p>
    </div>
    <AnimeList :animeCharacters="animeCharacters"/>
    <Pagination 
    :key="paginationData.current_page"
    :currentPage="paginationData.current_page" 
    :lastVisiblePage="paginationData.last_visible_page" 
    :hasNextPage="paginationData.has_next_page"
    @page-change="searchByPage"
  />
</template>
  <script setup lang="ts">
import apiRequest from "../../../apiRequest"
import { onMounted,ref,watch } from "vue"
import AnimeList from "../layout/AnimeList.vue"
import Pagination from "../layout/Pagination.vue"  
import debounce from 'lodash/debounce';



const animeCharacters = ref <Array<any>>([]) 
const limit = ref <Number>(15) 
const page = ref <Number>(1) 
const searchQuery = ref <String>('') 

onMounted(()=>{
  searchAnime() 
})
 
const paginationData = ref( {
  current_page: 1,
  last_visible_page: 1,
  has_next_page: false,
  items: {
    count: 15,
    total: 0,
    per_page: 15
  }
})

const searchByPage = (current_page:Number)=>{
  page.value = current_page
  searchAnime()
}

const searchAnime = async ()=>{
    const params = {
    limit: limit.value,
    page: page.value,
    q: searchQuery.value,
    order_by: 'favorites',
    sort: 'desc'
  }
    try {
      const res = await apiRequest.get('characters',{ params: params })
      animeCharacters.value = res.data.data
      paginationData.value = res.data.pagination
    } catch (error) {
      console.log(error)
    }

}
const debouncedsearchAnime =   debounce(searchAnime,600)

watch(searchQuery, () => {
  page.value = 1  // to redirect on the first page
  debouncedsearchAnime()
});

  </script>
  
  <style scoped>
 /* This is not the best way to add css I will update this  */
 .searchContainer {
    margin: 20px auto;
    width: 300px;
    position: relative;
}

.input {
    border: none;
    border-bottom: 1px solid #e3e4dc;
    padding: 10px 20px;
    width: none;
    outline: none;
    font-size: 16px;
    color: #393e46;
}

  </style>
  