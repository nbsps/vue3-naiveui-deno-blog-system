<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <layout />
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<script>
import { defineComponent } from 'vue';
import Layout from '@/components/service/layout/Layout.vue';
export default defineComponent({
  components: {
    Layout,
  },
  setup() {
    return {};
  },
});
</script>
