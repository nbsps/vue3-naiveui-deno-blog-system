<template>
  <!-- 博客封面上传组件 -->
  <n-popover trigger="hover">
    <template #trigger>
      <div @dragend="uploadClick">
        <n-image :height="48" :src="src" />
        <input type="file" ref="img" @change="FileToUpload" />
      </div>
    </template>
    <span>拽我上传</span>
  </n-popover>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import { upload } from '@/service/upload/upload';

export default defineComponent({
  props: {
    cover: {
      type: String,
    },
  },
  emits: {
    imgUpdated: null,
  },
  setup(props, { emit }) {
    // cover src
    const cover = ref(props.cover);
    watchEffect(() => {
      cover.value = props.cover;
    });
    const src = computed(() => {
      return process.env.VUE_APP_IMAGE_LOAD_BASE + cover.value;
    });
    // 原生 文件上传 模拟
    const img = ref<HTMLInputElement | null>(null);
    const uploadClick = () => {
      img.value?.click();
    };
    const FileToUpload = () => {
      if (!img.value?.files) return;
      const file_ = img.value?.files[0];
      var formdata = new FormData();
      formdata.append('file', file_);
      upload(formdata).then((res) => {
        emit('imgUpdated', res.data.data.file.url);
      });
    };
    return { src, img, uploadClick, FileToUpload };
  },
});
</script>

<style lang="less" scoped>
div {
  display: inline-block;
}
input {
  display: none;
}
</style>
