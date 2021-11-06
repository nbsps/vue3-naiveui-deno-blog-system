<template>
  <h2 class="title">images</h2>
  <div class="blog">
    <!-- photo manage -->
    <n-card title="图片墙" :segmented="{ content: 'soft' }">
      <n-upload
        :action="uploadURL"
        :default-file-list="fileList"
        list-type="image-card"
        @preview="handlePreview"
        @finish="handleFinish"
        @remove="removeImg"
        :headers="getToken"
      >
        点击上传
      </n-upload>
    </n-card>
    <!-- image modal -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      style="width: 600px"
      title="麻衣学姐！"
    >
      <img :src="previewImageUrl" style="width: 100%" />
    </n-modal>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useMessage } from 'naive-ui';
import store from '@/store';
import { useRouter } from 'vue-router';

import {
  getAllPhotos,
  createPhoto,
  deletePhotoById,
} from '@/service/photo/photos';

export default defineComponent({
  setup() {
    // 初始图片墙
    const fileList = ref([]);
    const router = useRouter();
    // img preview
    const showModalRef = ref(false);
    const previewImageUrlRef = ref('');
    function handlePreview(file) {
      const { url } = file;
      previewImageUrlRef.value = url;
      showModalRef.value = true;
    }
    // img upload
    const uploadURL = process.env.VUE_APP_IMAGE_LOAD_BASE + 'api/upload';
    const message = useMessage();
    const getToken = () => {
      return {
        Authorization: store.state.login.token,
      };
    };
    const handleFinish = ({ file, event }) => {
      const res = JSON.parse(event.target.response);
      if (event.target.status === 401) {
        router.push('/login');
        message.error(res.message);
        return;
      }
      message.success(res.message);
      createPhoto({ url: res.data.file.url }).then((res) => {
        file._id = res.data.data.id;
      });
      file.url = process.env.VUE_APP_IMAGE_LOAD_BASE + res.data.url;
    };
    // 删除图片
    const removeImg = ({ file }) => {
      deletePhotoById(file.id_);
    };
    onMounted(() => {
      // 初始化数据
      getAllPhotos().then((res) => {
        fileList.value.push(
          ...res.data.data.map((item) => {
            return {
              id_: item.id,
              id: item.id,
              url: process.env.VUE_APP_IMAGE_LOAD_BASE + item.url,
              status: 'finished',
            };
          }),
        );
      });
    });
    return {
      handlePreview,
      showModal: showModalRef,
      previewImageUrl: previewImageUrlRef,
      fileList,
      handleFinish,
      uploadURL,
      getToken,
      removeImg,
    };
  },
});
</script>

<style lang="less" scoped>
.blog {
  margin-left: 30px;
  margin-right: 40px;
}
</style>
