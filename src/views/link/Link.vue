<template>
  <header :style="{ 'background-image': `url(${cover})` }">
    <div class="head-mask">
      <div class="title">Friend Links</div>
    </div>
  </header>
  <main>
    <!-- friend links -->
    <link-card v-for="link in links" :key="link.id" :info="link" />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import store from '@/store';

import LinkCard from '@/components/common/card/LinkCard.vue';
import { getAllLinks } from '@/service/link/link';
import headerReveal from '@/mixin/headerReveal';

export default defineComponent({
  mixins: [headerReveal], // header scrollReveal
  components: {
    LinkCard,
  },
  setup() {
    const cover = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + store.state.cover,
    );
    const links = ref([]);

    onMounted(() => {
      getAllLinks().then((res) => {
        links.value = res.data.data;
      });
    });
    return { links, cover };
  },
});
</script>

<style lang="less" scoped>
@import '../../../public/font/dance.css';
header {
  width: 100vw;
  height: 100vh;
  background-position: bottom;
  background-size: cover;
  .head-mask {
    position: relative;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-family: 'Dance';
      font-size: 100px;
      margin: auto;
      background-image: -webkit-linear-gradient(
        left,
        yellow,
        red 10%,
        blue 25%,
        green 35%,
        yellow 50%,
        blue 60%,
        red 75%,
        pink 85%,
        yellow 100%
      );
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: stream 15s infinite linear;
      background-size: 200% 100%;
      @keyframes stream {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
    }
  }
}
main {
  width: 90%;
  margin: 30px auto;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-radius: 20px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
}
</style>
