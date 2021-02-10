<template>
  <v-container>
    <v-row class="text-center">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Logo',
  }
</script>
