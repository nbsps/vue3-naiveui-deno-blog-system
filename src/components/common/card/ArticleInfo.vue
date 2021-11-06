<template>
  <div class="info-wrap">
    <!-- blog title -->
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <!-- blog time info -->
    <div class="time">
      <i class="icon iconfont icon-time"></i>
      {{ createdAt.slice(0, 10) }}
      <i class="icon iconfont icon-update"></i>
      {{ updatedAt.slice(0, 10) }}
    </div>
    <!-- blog base info -->
    <div class="meta">
      <span class="view">
        <i class="icon iconfont icon-View"></i>
        {{ views }}
      </span>
      <span>
        <i class="icon iconfont icon-guidang"></i>
        {{ category }}
      </span>
    </div>
    <!-- blog content -->
    <div class="content">
      <p>
        {{ thumbnail }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    thumbnail: String,
    createdAt: String,
    updatedAt: String,
    views: Number,
    title: String,
    category: String,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.info-wrap {
  box-sizing: border-box;
  margin: 20px 10px 10px 0;
  width: 40%;
  padding-left: var(--info-padding-left);
  padding-right: var(--info-padding-right);
  float: var(--float);
  text-align: var(--text);
  .title {
    margin: 40px 0 10px;
  }
  .time,
  .meta {
    font-family: 'Merriweather Sans', Helvetica, Tahoma, Arial, 'PingFang SC',
      'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif;
    font-size: 12px;
    line-height: 18px;
    text-size-adjust: 100%;
    color: #888;
    margin-top: 5px 0 0 0;
    .view {
      margin-right: 5px;
    }
  }
  .iconfont {
    margin-right: 3px;
    line-height: 21px;
    display: inline-block;
    font-size: 13px;
  }
  .content p {
    margin: 15px 0 22.5px 0;
    height: 67.5px;
    line-height: 22.5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.66);
  }
}

@media (max-width: 768px) {
  .info-wrap {
    position: relative;
    display: block;
    width: 100%;
    float: left;
    text-align: left;
    padding: 0;
    padding-left: 20px;
  }
}
</style>
