<template>
  <n-popover trigger="hover">
    <template #trigger>
      <div @dragend="uploadClick">
        <n-avatar v-if="imgName === 'avatar'" round :size="48" :src="src" />
        <n-image v-else width="200" :src="src" />
        <input type="file" ref="img" @change="FileToUpload" />
      </div>
    </template>
    <span>拽我上传</span>
  </n-popover>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import store from '@/store';
import { upload } from '@/service/upload/upload';

export default defineComponent({
  props: {
    imgName: {
      type: String,
      default: 'avatar',
    },
  },
  setup(props) {
    onMounted(() => {
      // 头像动效
      if (props.imgName === 'avatar') import('./avatar');
    });
    const src = computed(() => {
      return (
        process.env.VUE_APP_IMAGE_LOAD_BASE +
        (store.state as { [index: string]: any })[props.imgName]
      );
    });
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
        store.dispatch('setBaseInfo', {
          key: props.imgName,
          value: res.data.data.file.url,
        });
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
