<template>
  <div
    style="
      position: absolute;
      left: 0;
      width: 100vw;
      height: 100%;
      background-color: white;
      opacity: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
    "
  >
    <img
      class="rotating"
      :src="require('@/assets/carga.png')"
      alt="Cargando..."
      style="margin-top: -100px; width: 100px"
    />
  </div>
</template>

<script>
export default {
  name: "Loader",

  data: () => ({
    //
  }),
};
</script>