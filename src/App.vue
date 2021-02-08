<template>
    <v-app>
      <HelloWorld/>
      <ImageUpload/>
    </v-app>
</template>

<script>
import ImageUpload from './components/ImageUpload'
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    ImageUpload,
    HelloWorld
  },

  data: () => ({
    //
  }),
};
</script>
