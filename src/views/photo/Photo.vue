<template>
  <header :style="{ 'background-image': `url(${cover})` }">
    <div class="head-mask">
      <div class="title">My Favorite Pics</div>
    </div>
  </header>
  <main>
    <!-- pics -->
    <Picture
      v-for="pic in pics"
      :key="pic.id"
      :url="pic.url"
      @click="showPic(pic.url)"
    />
    <!-- modal for pic -->
    <div class="img-preview" v-show="showModal" @click="triggle">
      <div class="mask"></div>
      <img :src="modalImg" alt="" />
    </div>
  </main>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue';
import store from '@/store';

import { getAllPhotos } from '@/service/photo/photos';
import Picture from '@/components/common/card/Picture.vue';
import headerReveal from '@/mixin/headerReveal';

export default defineComponent({
  mixins: [headerReveal], // header scrollReveal
  components: {
    Picture,
  },
  setup() {
    // imgs data
    const pics = ref([]);
    const cover = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + store.state.cover,
    );
    // modal for img
    const showModal = ref(false);
    const modalImg = ref('');
    const triggle = () => (showModal.value = !showModal.value);
    const showPic = (src) => {
      modalImg.value = process.env.VUE_APP_IMAGE_LOAD_BASE + src;
      triggle();
    };

    onMounted(() => {
      getAllPhotos().then((res) => {
        pics.value = res.data.data;
      });
    });
    return { showModal, pics, triggle, modalImg, showPic, cover };
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
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 20px;
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  .img-preview {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;
    position: fixed;
    .mask {
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.8;
    }
    img {
      position: absolute;
      height: 60%;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
    }
    @media screen and (max-width: 768px) {
      img {
        width: 60%;
        height: auto;
      }
    }
  }
}
</style>
