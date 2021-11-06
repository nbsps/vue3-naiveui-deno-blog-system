<template>
  <!-- header -->
  <header :style="{ 'background-image': `url(${cover})` }">
    <div class="headmask">
      <!-- avatar -->
      <div class="loader">
        <span></span><span></span><span></span><span></span>
        <img :src="src" class="head" />
      </div>
      <!-- avatar info -->
      <div class="head-content">
        <h2 ref="text"></h2>
        <ul class="icons">
          <li>
            <a :href="'tencent://message/?uin=' + info.qq">
              <i class="iconfont icon-qq"></i>
            </a>
          </li>
          <li>
            <a :title="info.email"><i class="iconfont icon-email"></i></a>
          </li>
          <li>
            <a :href="info.github" title="Follow Me">
              <i class="iconfont icon-github"></i>
            </a>
          </li>
          <li>
            <a href="https://www.bilibili.com/" title="bilibili">
              <i class="iconfont icon-bilibili"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <!-- Articles -->
  <main>
    <Article
      v-for="blog in blogs"
      :blog="blog"
      :key="blog.id"
      @click="getBlog(blog.id)"
    />
    <!-- pages -->
    <pagination :pages="pages" :index="index" />
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '@/store';

import Article from 'components/common/card/specific/Article.vue';
import Pagination from 'components/common/pagination/Pagination.vue';

import textwbw from '@/utils/textwbw/textwbw';
import headerReveal from '@/mixin/headerReveal';
import { getBlogs } from '@/service/blog/blogs';

export default defineComponent({
  mixins: [headerReveal], // header scrollReveal
  setup() {
    // blog info
    const info = ref(store.state);
    const motto = computed(() => info.value.motto);
    const src = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + info.value.avatar,
    );
    const cover = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + info.value.cover,
    );
    const text = ref<HTMLHeadingElement | null>(null);
    const articles = ref([]);
    // route router
    const route = useRoute();
    const router = useRouter();
    // pagination state
    const index = computed(() => {
      const page = +route.params.page;
      if (isNaN(page) || page > pages.value || page < 0) return 1;
      return page;
    });
    const pages = computed(() => {
      const pages = Math.ceil(articles.value.length / 6);
      if (pages === 0) return 1;
      return pages;
    });
    const blogs = computed(() =>
      articles.value.slice((index.value - 1) * 6, index.value * 6),
    );
    // blog click
    const getBlog = (id: number) => {
      router.push({ path: `/blog/${id}` });
    };

    onMounted(() => {
      getBlogs().then((res) => {
        articles.value = res.data.data;
      });
      // text word by word util
      textwbw(motto, text);
    });
    return { blogs, text, index, pages, src, cover, info, getBlog };
  },
  components: {
    Article,
    Pagination,
  },
});
</script>

<style lang="less" scoped>
header {
  width: 100vw;
  height: 100vh;
  background-position: bottom;
  background-size: cover;
  .headmask {
    width: 800px;
    height: 250px;
    text-align: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .loader {
      position: relative;
      margin: 0 auto;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background: linear-gradient(#f07e6e, #84cdfa, #5ad1cd);
      transition: all ease 1s;
      img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        box-shadow: inset 0 0 10px #000;
        padding: 5px;
        transform: rotate(0);
      }
      span {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(#f07e6e, #84cdfa, #5ad1cd);
      }
      span:nth-child(1) {
        filter: blur(5px);
      }
      span:nth-child(2) {
        filter: blur(10px);
      }
      span:nth-child(3) {
        filter: blur(25px);
      }
      span:nth-child(4) {
        filter: blur(50px);
      }
    }
    .loader:hover {
      transform: rotate(360deg);
    }
    .head-content {
      width: 63%;
      margin: auto;
      color: #ffffff;
      padding: 15px;
      margin-top: 22px;
      line-height: 30px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      ul {
        height: 32px;
        display: flex;
        justify-content: space-between;
        margin: 20px 0 10px;
        padding: 0 120px;
        .iconfont {
          font-size: 30px;
          color: rgb(14, 133, 208);
        }
      }
    }
  }
}
main {
  .card:nth-child(2n + 1) {
    --float: left;
    --text: right;
    --border-radius: 10px 0 0 10px;
    --info-padding-left: 30px;
    --info-padding-right: 0;
  }
  .card:nth-child(2n) {
    --float: right;
    --text: left;
    --border-radius: 0 10px 10px 0;
    --info-padding-left: 0;
    --info-padding-right: 30px;
  }
}
</style>
