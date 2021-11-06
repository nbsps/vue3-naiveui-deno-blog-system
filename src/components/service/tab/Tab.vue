<template>
  <nav>
    <h1>{{ baseInfo.nickname }}</h1>
    <ul class="nav-bar" :class="{ show: show }">
      <li>
        <router-link to="/">
          <i class="iconfont icon-home"></i><span> 首页</span>
        </router-link>
        <div class="uline"></div>
      </li>
      <li>
        <router-link to="/timeline">
          <i class="iconfont icon-guidang"></i><span> 归档</span>
        </router-link>
        <div class="uline"></div>
      </li>
      <li>
        <router-link to="/msgboard">
          <i class="iconfont icon-liuyan"></i><span> 留言</span>
        </router-link>
        <div class="uline"></div>
      </li>
      <li>
        <router-link to="/photo">
          <i class="iconfont icon-tupian"></i><span> 图片</span>
        </router-link>
        <div class="uline"></div>
      </li>
      <li>
        <router-link to="/link">
          <i class="iconfont icon-lianjie"></i><span> 友链</span>
        </router-link>
        <div class="uline"></div>
      </li>
      <li>
        <router-link to="/about">
          <i class="iconfont icon-guanyu"></i><span> 关于</span>
        </router-link>
        <div class="uline"></div>
      </li>
      <li>
        <router-link to="/login">
          <i class="iconfont icon-denglu"></i><span> 登录</span>
        </router-link>
        <div class="uline"></div>
      </li>
    </ul>
    <img
      src="~assets/label/menu.png"
      class="menu"
      style="width: 25px; height: 25px"
      @click="maskshow"
    />
  </nav>
  <div class="mask"></div>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'tab',
  computed: {},
  setup() {
    // blog info
    const baseInfo = ref(store.state);
    // 移动端 侧边栏
    const show = ref(false);
    const maskshow = () => {
      show.value = !show.value;
    };
    // 注册 滚动事件
    window.onscroll = function () {
      const mask: HTMLDivElement | null = document.querySelector('.mask');
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (!mask) return;
      if (scrollTop == 0) {
        mask.style.opacity = '0';
      } else {
        mask.style.opacity = '1';
      }
    };

    return { maskshow, show, baseInfo };
  },
});
</script>

<style lang="less" scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 80px;
  height: 60px;
  width: 100%;
  z-index: 1000;
  position: fixed;
  color: whitesmoke;
  .nav-bar {
    display: flex;
    align-items: center;
    li {
      position: relative;
      margin-left: 17px;
      display: flex;
      a {
        color: whitesmoke;
      }
      .iconfont {
        display: inline-block;
        font-size: 20px;
      }
      .uline {
        position: absolute;
        top: 28px;
        width: 0px;
        border-bottom: 4px #e67e22 solid;
        transition: 0.3s ease-in-out;
      }
    }
  }
  li:hover .uline {
    width: 100%;
  }
  .menu {
    display: none;
  }
}
.mask {
  width: 100vw;
  height: 60px;
  background-color: rgb(58, 58, 58);
  opacity: 0;
  z-index: 999;
  position: fixed;
}
@media screen and (max-width: 1050px) {
  nav {
    padding: 0 40px;
    position: fixed;
    top: 0;
    .nav-bar {
      position: absolute;
      top: 60px;
      right: 0;
      bottom: 0;
      width: 20vw;
      min-width: 150px;
      height: calc(100vh - 60px);
      background-color: rgb(58, 58, 58);
      flex-direction: column;
      z-index: 998;
      transform: translateX(100%);
      transition: 0.4s ease-in-out;
      li {
        margin: 3vh 0;
        opacity: 0;
      }
    }
    .menu {
      display: block;
    }
  }
  .nav-bar.show {
    transform: translateX(0);
    li {
      opacity: 1;
    }
  }
}
</style>
