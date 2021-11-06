<template>
  <div class="center">
    <ul class="pagination">
      <li v-if="index > 1"><a :href="index - 1">«</a></li>
      <li v-for="i in pages" :key="i">
        <a :class="{ active: i === index }" :href="i">{{ i }}</a>
      </li>
      <li v-if="index < pages"><a :href="index + 1">»</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    // all-pages count
    pages: {
      type: Number,
      default: 1,
    },
    // index page
    index: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.center {
  text-align: center;
  ul.pagination {
    display: inline-block;
    margin-top: 40px;
    li {
      display: inline;
      a {
        color: black;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 5px;
        border: 1px solid #ddd;
      }
      a.active {
        background-color: #4caf50;
        color: white;
      }
      a:hover:not(.active) {
        background-color: #ddd;
      }
    }
  }
}
</style>
