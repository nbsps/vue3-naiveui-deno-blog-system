<template>
  <div class="mask"></div>
  <n-space vertical size="large">
    <!-- layout -->
    <n-layout has-sider>
      <!-- sider line -->
      <n-layout-sider
        width="170"
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :collapsed="collapsed"
      >
        <n-config-provider :theme="darkTheme">
          <NMenu
            :options="menuOptions"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :collapsed="collapsed"
        /></n-config-provider>
      </n-layout-sider>
      <!-- content -->
      <n-layout-content>
        <!-- breadcrumb -->
        <div class="nav">
          <n-icon @click="pullinout" class="icon-in-out">
            <img v-if="collapsed" src="~assets/svg/pullout.svg" alt="" />
            <img v-else src="~assets/svg/pullin.svg" />
          </n-icon>
          <n-breadcrumb separator=">">
            <n-breadcrumb-item>blogcms</n-breadcrumb-item>
            <n-breadcrumb-item>{{ $route.name }}</n-breadcrumb-item>
          </n-breadcrumb>
        </div>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import { NLayoutSider } from 'naive-ui';
import { defineComponent, h, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { darkTheme } from 'naive-ui';

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/cms',
          },
        },
        { default: () => 'info' },
      ),
    key: 'info',
    icon: () => h('i', { class: 'iconfont icon-info' }),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/cms/blogs',
          },
        },
        { default: () => 'blogs' },
      ),
    key: 'blogs',
    icon: () => h('i', { class: 'iconfont icon-blog' }),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/cms/barrages',
          },
        },
        { default: () => 'barrages' },
      ),
    key: 'barrages',
    icon: () => h('i', { class: 'iconfont icon-barrage-l' }),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/cms/imgs',
          },
        },
        { default: () => 'imgs' },
      ),
    key: 'imgs',
    icon: () => h('i', { class: 'iconfont icon-tupian' }),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/cms/links',
          },
        },
        { default: () => 'links' },
      ),
    key: 'links',
    icon: () => h('i', { class: 'iconfont icon-lianjie' }),
  },
];

export default defineComponent({
  setup() {
    let collapsed = ref<boolean>(false);
    const side = ref<typeof NLayoutSider | null>(null);
    const pullinout = () => {
      collapsed.value = !collapsed.value;
      if (!side.value) return;
      side.value.style = 'width: 120px';
    };

    return {
      menuOptions,
      darkTheme,
      collapsed,
      pullinout,
      side,
    };
  },
});
</script>

<style lang="less">
.n-space {
  position: relative;
  top: 60px;
  z-index: 0;
}
.n-layout-sider {
  background: rgba(53, 183, 229, 1);
  min-height: calc(100vh - 60px);
}
.n-layout-content {
  background-color: rgb(250, 251, 252);
  min-width: 1050px;
}
.n-breadcrumb {
  display: inline-block;
}
.mask {
  width: 100%;
  height: 60px;
  background-color: rgb(58, 58, 58);
  left: 0;
  z-index: 999;
  position: fixed;
}
.icon-in-out {
  width: 20px;
  height: 20px;
}
.nav {
  background: #fff;
  box-shadow: 0 1px 4px #00152914;
  height: 30px;
  .n-icon {
    margin: 0 5px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
// child component
.title {
  margin-top: 12px;
  padding: 10px 20px 10px 30px;
  font-size: 24px;
}
.n-card {
  border-radius: 14px;
  padding: 1px;
  margin: 20px 0;
}
</style>
