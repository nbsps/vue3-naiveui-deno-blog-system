<template>
  <!-- 头像上传组件 -->
  <n-popover trigger="hover">
    <template #trigger>
      <div @click="uploadClick">
        <n-avatar round :size="48" :src="src" />
        <input type="file" ref="img" @change="FileToUpload" />
      </div>
    </template>
    <span>点击上传</span>
  </n-popover>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { upload } from '@/service/upload/upload';

export default defineComponent({
  props: {
    avatar: {
      type: String,
    },
  },
  emits: {
    imgUpdated: null,
  },
  setup(props, { emit }) {
    // avatar src
    const avatar = ref(props.avatar);
    const src = computed(() => {
      return process.env.VUE_APP_IMAGE_LOAD_BASE + avatar.value;
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
        avatar.value = res.data.data.file.url;
        emit('imgUpdated', avatar.value);
      });
    };
    return { src, img, uploadClick, FileToUpload };
  },
});
</script>

<style lang="less" scoped>
div {
  margin-right: 20px;
}
input {
  display: none;
}
</style>
