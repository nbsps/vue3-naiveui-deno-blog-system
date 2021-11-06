<template>
  <Card>
    <about-me-info>
      <p>{{ info.description }}</p>
    </about-me-info>
    <div class="cover">
      <img :src="src" />
    </div>
  </Card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Card from '../Card.vue';
import AboutMeInfo from '../AboutMeInfo.vue';

export default defineComponent({
  props: {
    info: null,
  },
  components: {
    Card,
    AboutMeInfo,
  },
  setup(props) {
    const src = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + props.info.about,
    );
    return { src };
  },
});
</script>

<style lang="less" scoped>
.card {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  .cover {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s;
      filter: contrast(70%);
    }
    img:hover {
      transform: scale(1.1);
    }
  }
}
</style>
