<template>
  <header :style="{ 'background-image': `url(${src})` }">
    <div class="title">
      <h1>About Me</h1>
      <p ref="text"></p>
    </div>
  </header>
  <main>
    <about-me :info="info" />
  </main>
</template>

<script lang="ts">
import { onMounted, ref, computed, defineComponent } from 'vue';
import store from '@/store';

import AboutMe from 'components/common/card/specific/AboutMe.vue';
import textwbw from '@/utils/textwbw/textwbw';

export default defineComponent({
  setup() {
    const info = ref(store.state);
    const text = ref<HTMLParagraphElement | null>(null);
    const headtext = computed(() => store.state.aboutMotto);
    const src = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + info.value.about,
    );
    onMounted(() => {
      textwbw(headtext, text);
    });
    return { text, info, src };
  },
  components: {
    AboutMe,
  },
});
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 50vh;
  background-position: center;
  background-size: cover;
  margin-bottom: 50px;
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    height: 100%;
    h1 {
      font-size: 5vmin;
    }
    p {
      font-weight: 550;
      font-size: 2vmin;
    }
  }
}
</style>
