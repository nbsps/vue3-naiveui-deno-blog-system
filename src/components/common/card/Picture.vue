<template>
  <div class="card">
    <img v-lazy="src" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    url: String,
  },
  setup(props) {
    const src = computed(() => process.env.VUE_APP_IMAGE_LOAD_BASE + props.url);
    return { src };
  },
});
</script>

<style lang="less" scoped>
.card {
  width: 20%;
  min-height: 20%;
  border-radius: 20px;
  margin: 1%;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s;
  }
  img:hover {
    transform: scale(1.1);
  }
}
@media screen and (max-width: 768px) {
  main {
    width: 100%;
    justify-content: space-around;
  }
  .card {
    width: 25%;
    margin: 3%;
  }
}
</style>
