<template>
  <Card>
    <div class="cover">
      <img v-lazy="src" />
    </div>
    <article-info
      :thumbnail="blog.thumbnail"
      :createdAt="blog.createdAt"
      :updatedAt="blog.updatedAt"
      :views="blog.views"
      :title="blog.title"
      :category="blog.category"
    />
  </Card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import Card from '../Card.vue';
import ArticleInfo from '../ArticleInfo.vue';

export default defineComponent({
  props: {
    blog: null,
  },
  components: {
    Card,
    ArticleInfo,
  },
  setup(props) {
    const src = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + props.blog.cover,
    );
    return {
      src,
    };
  },
});
</script>

<style lang="less" scoped>
.cover {
  float: var(--float);
  width: 55%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  border-radius: var(--border-radius);
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
@media (max-width: 768px) {
  .cover {
    width: 100%;
    border-radius: 10px;
    height: 300px;
  }
  .card {
    float: left;
    height: auto;
  }
}
</style>
