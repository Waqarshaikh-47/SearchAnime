<template>
    <div class="container">
        <ul class="list-group" v-if="animeCharacters.length">
  <li class="list-group-item" v-for="(animeCharacter) in animeCharacters" :key="animeCharacter.mal_id">
   
    <div class="row">
    <div class="col-2">
        <img :src="animeCharacter.images.jpg.image_url" class="rounded img-fluid d-block" alt="...">
    </div>
    <div class="col-8">
        <div class="d-flex">
            <h5>{{ animeCharacter.name }}</h5>
        <h5 class="ms-auto ms-lg-3">❤️{{ animeCharacter.favorites }}</h5>
        </div>
        <span v-for="(nickname,nicknameIndex) in animeCharacter.nicknames" :key="nickname+nicknameIndex" class="me-2 badge rounded-pill bg-info text-dark">{{ nickname }}</span>
    </div>
        <a :href="animeCharacter.url" target="_blank" class="btn btn-primary col-2 d-flex justify-content-center align-items-center"><i class="bi bi-arrow-right icon-large"></i></a>
</div>
  </li>
</ul>
  <div v-else class="alert text-center" role="alert">
      No results found.
    </div>
    </div>
</template>
  <script setup lang="ts">
  withDefaults(defineProps<{
    animeCharacters: Array<any>
        }>(),{
    animeCharacters: ()=>[]
})
  </script>
  
  <style scoped>
 
 .icon-large {
  font-size: 2rem; 
  font-weight: bold; 
}

.btn-primary {
  padding: 0.5rem; 
  border: none; 
  color: #C8A2C8;
  background-color: aliceblue;
}


  </style>
  