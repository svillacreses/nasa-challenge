<template>
  <v-app>
    <v-app-bar app color="#03aa6f" dark height="80">
      <div class="d-flex align-center">
        <img
          alt="Nasa Logo"
          style="max-height: 40px"
          :src="require('@/assets/logo-gw.png')"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <img
          class="d-none d-md-inline"
          alt="Nasa Logo"
          style="min-height: 30px"
          :src="require('@/assets/logo-dw-white.svg')"
        />
      </div>

      <v-btn v-if="false" href="#" target="_blank" text>
        <span class="mr-2">Analitica de Datos</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="overflow-y: hidden">
      <div style="display: flex; justify-content: center; align-items: center">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s ease-in-out infinite;
  -moz-animation: rotating 2s ease-in-out infinite;
  -ms-animation: rotating 2s ease-in-out infinite;
  -o-animation: rotating 2s ease-in-out infinite;
  animation: rotating 2s ease-in-out infinite;
}
</style>
