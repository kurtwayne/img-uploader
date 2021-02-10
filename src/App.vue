<template>
    <v-app>
      <Logo/>
      <ImageUpload/>
    </v-app>
</template>

<script>
import ImageUpload from './components/ImageUpload'
import Logo from './components/Logo'

export default {
  name: 'App',

  components: {
    ImageUpload,
    Logo
  },

  data: () => ({
    //
  }),
};
</script>
