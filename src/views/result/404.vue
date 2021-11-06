<template>
  <n-result
    status="404"
    title="404 资源不存在"
    description="网址路径输错了哦！"
  >
    <template #footer>
      <n-button @click="reindex">首页</n-button>
    </template>
  </n-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const reindex = () => {
      router.push({ path: '/' });
    };
    return { reindex };
  },
});
</script>

<style lang="less" scoped>
.n-result {
  position: relative;
  height: 66.6vh;
  top: 150px;
}
</style>
