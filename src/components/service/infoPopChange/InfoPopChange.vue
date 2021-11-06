<template>
  <div>
    <span>{{ info[infoName] }}</span>
    <n-popconfirm
      :show-icon="false"
      positive-text="确认"
      negative-text="取消"
      @positive-click="positiveClick"
    >
      <template #trigger>
        <i class="icon iconfont icon-xiugai"></i>
      </template>
      <n-input
        :placeholder="info[infoName]"
        :type="type"
        v-model:value="infoValue"
        :maxlength="maxlength"
        clearable
        :rows="rows"
        show-count
      />
    </n-popconfirm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import store from '@/store';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    infoName: {
      type: String,
      default: 'nickname',
    },
    maxlength: Number,
    rows: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const info = ref(store.state);
    const infoValue = ref(
      (info.value as { [index: string]: any })[props.infoName],
    );
    const positiveClick = () => {
      store.dispatch('setBaseInfo', {
        key: props.infoName,
        value: infoValue.value,
      });
    };
    return { info, infoValue, positiveClick };
  },
});
</script>

<style scoped></style>
