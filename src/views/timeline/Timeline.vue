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
  <main>
    <!-- timeline -->
    <div class="container">
      <div class="wrapper">
        <h1>Timeline of All Blogs😁</h1>
        <ul class="sessions">
          <li v-for="blog in articles" :key="blog.id" @click="getBlog(blog.id)">
            <div class="time">{{ dateFormat(blog.createdAt) }}</div>
            <p>{{ blog.title }}</p>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
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
    const dateFormat = (date: string) => {
      return date.slice(0, 10);
    };
    // route
    const router = useRouter();
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
    return { text, src, cover, info, articles, dateFormat, getBlog };
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  background: linear-gradient(45deg, #209cff, #68e0cf);
  padding: 3rem 0;
  margin-bottom: -50px;
  .wrapper {
    background: #eaf6ff;
    padding: 2rem;
    border-radius: 15px;
    min-width: 50vw;
    h1 {
      font-size: 1.1rem;
    }
    .sessions {
      margin-top: 2rem;
      border-radius: 12px;
      position: relative;
      li {
        border-radius: 5px;
        padding-bottom: 1.5rem;
        border-left: 1px solid #abaaed;
        position: relative;
        padding-left: 20px;
        margin-left: 10px;
        transition: background 0.5s ease-out;
      }
      li:hover {
        background: #f07e6e;
      }
      li:last-child {
        border: 0px;
        padding-bottom: 0;
      }
      li:before {
        content: '';
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: white;
        border: 1px solid #4e5ed3;
        box-shadow: 3px 3px 0px #bab5f8;
        position: absolute;
        left: -10px;
        top: 0px;
      }
      .time {
        color: #2a2839;
        font-weight: 900;
        font-size: 0.9rem;
      }
      p {
        color: #4f4f4f;
        line-height: 1.5;
        margin-top: 0.4rem;
      }
      @media screen and (max-width: 600px) {
        .time {
          margin-bottom: 0.3rem;
          font-size: 0.85rem;
        }
        p {
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
