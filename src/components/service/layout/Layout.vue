<template>
  <div class="base-background"></div>
  <Tab />
  <router-view v-slot="{ Component }">
    <keep-alive v-if="!$route.meta.notKeepAlive">
      <component :is="Component" />
    </keep-alive>
    <component v-else :is="Component" />
  </router-view>
  <BackTop />
  <footer>
    <div class="foot-mask">
      <p>@2021-2022 By Silvensn</p>
      <p>vue3 | deno</p>
      <p>人活着就是为了樱岛麻衣！</p>
    </div>
  </footer>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import store from '@/store';

import Tab from 'components/service/tab/Tab.vue';
import BackTop from 'components/common/backtop/BackTop.vue';
import { sRequest } from '@/service';

export default defineComponent({
  components: {
    Tab,
    BackTop,
  },
  setup() {
    store.dispatch('getBaseInfo');
    onMounted(() => {
      // 注册反馈组件
      sRequest.setLoadAndMessage();
    });
    return {};
  },
});
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  #app {
    overflow-x: hidden;
  }
}
.base-background {
  background-image: url(~assets/img/basebg.png);
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: bottom;
  position: fixed;
  z-index: -10;
}
footer {
  width: 100vw;
  height: 30vh;
  background-color: rgb(134, 139, 155);
  margin-top: 50px;
  .foot-mask {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    p {
      color: white;
      font-weight: 400;
      line-height: 30px;
    }
  }
}
// scrollbar
::-webkit-scrollbar {
  width: 6px;
  background: #ecf0f1;
}
::-webkit-scrollbar-thumb {
  background: #34495e;
}
// cursor
body {
  cursor: url(~assets/cursor/Arrow.cur), default;
}
a:hover,
button:hover {
  cursor: url(~assets/cursor/Link.cur), pointer;
}
input:hover {
  cursor: url(~assets/cursor/Text.cur), text;
}
img:hover {
  cursor: url(~assets/cursor/Move.cur), pointer;
}
</style>
