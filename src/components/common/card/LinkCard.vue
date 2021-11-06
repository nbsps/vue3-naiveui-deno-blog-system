<template>
  <div class="card" :title="info.title">
    <div class="img"><img v-lazy="src" /></div>
    <div class="title">
      <h2>{{ info.title }}</h2>
    </div>
    <p>{{ info.motto }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    info: null,
  },
  setup(props) {
    const src = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + props.info.avatar,
    );
    return { src };
  },
});
</script>

<style lang="less" scoped>
.card {
  margin: 1%;
  width: 240px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.5);
  position: relative;
  text-align: center;
  transition: all 0.6s;
  background-color: aliceblue;
  .img {
    float: left;
    margin: 20px 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s;
  }
  .title {
    margin: 0 10px 0 90px;
    border-bottom: 1px dashed black;
  }
  h2 {
    display: inline-block;
    padding-right: 10px;
  }
  p {
    padding-left: 8px;
    padding-top: 25px;
    font-size: 14px;
    font-weight: 900;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.card:hover {
  background-color: #a5b1c2;
  img {
    transform: rotate(360deg);
  }
}
</style>
