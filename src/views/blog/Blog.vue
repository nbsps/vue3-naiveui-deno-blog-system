<template>
  <header :style="header">
    <!-- article info -->
    <div class="h-title">
      <h1>{{ blog.title }}</h1>
      <h2 class="blog-info">
        <i class="iconfont icon-time"></i> {{ blog.createdAt.slice(0, 10) }}
        |
        <i class="iconfont icon-guidang"></i> {{ blog.category }}
        |
        <i class="iconfont icon-View"></i> {{ blog.views }}
      </h2>
    </div>
  </header>
  <main>
    <!-- sketeton before blog load -->
    <div class="blog" @click="imgClick">
      <article
        style="max-width: 100vw"
        v-if="blogHtml.length > 0"
        class="
          prose prose-sm
          break-all
          md:prose
          2xl:prose-lg
          mb-[15px]
          md:mb-[20px]
        "
        v-html="blogHtml"
      ></article>
      <div v-else>
        <div class="skeleton" style="height: 40px"></div>
        <div class="skeleton" style="height: 100px"></div>
      </div>
    </div>
    <!-- modal for pic -->
    <div class="img-preview" v-show="showModal" @click="triggle">
      <div class="mask"></div>
      <img :src="modalImg" alt="" />
    </div>
  </main>
</template>

<script>
import { onMounted, ref, computed, defineComponent, reactive } from 'vue';
import marked from 'marked';
import store from '@/store';
import('@/assets/css/tailwind.css');

import Article from '@/components/common/card/specific/Article.vue';
import { getBlogById } from '@/service/blog/blogs';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const info = ref(store.state);
    const blogHtml = ref('');
    const blog = reactive({
      title: '',
      cover: '',
      views: '',
      createdAt: '',
      category: '',
    });
    const header = computed(() => {
      const src = process.env.VUE_APP_IMAGE_LOAD_BASE + blog.cover;
      if (blog.cover === '') return {};
      return { 'background-image': `url(${src})` };
    });
    const route = useRoute();
    const router = useRouter();
    const imgClick = (event) => {
      let target = event.target;
      if (target instanceof HTMLImageElement) {
        modalImg.value = target.src;
        triggle();
      }
    };
    // modal for img
    const showModal = ref(false);
    const modalImg = ref('');
    const triggle = () => (showModal.value = !showModal.value);

    onMounted(() => {
      getBlogById(route.params.id)
        .then((res) => {
          var rendererMD = new marked.Renderer();
          marked.setOptions({
            renderer: rendererMD,
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false,
          });
          Object.assign(blog, res.data.data[0]);
          blogHtml.value = marked(res.data.data[0].content);
        })
        .catch(() => {
          router.push({ path: '/404/notfound' });
        });
    });
    return {
      info,
      blogHtml,
      blog,
      header,
      imgClick,
      showModal,
      modalImg,
      triggle,
    };
  },
  components: { Article },
});
</script>

<style lang="less" scoped>
header {
  width: 100vw;
  height: 50vh;
  background-position: bottom;
  background-size: cover;
  margin-bottom: 50px;
  .h-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    height: 100%;
    h1 {
      font-size: 5vmin;
    }
    .blog-info {
      padding-top: 10px;
      color: black;
      font-weight: 900;
      font-size: 14px;
    }
  }
}
.blog {
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
  .skeleton {
    margin-top: 10px;
    animation: skeleton-ani 2s cubic-bezier(0.36, 0, 0.64, 1) infinite;
    border-radius: 2px;
  }
}
@keyframes skeleton-ani {
  0% {
    background-color: rgb(238, 238, 238);
  }
  40% {
    background-color: rgb(222, 222, 222);
  }
  80% {
    background-color: rgb(238, 238, 238);
  }
  100% {
    background-color: rgb(238, 238, 238);
  }
}
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
</style>
