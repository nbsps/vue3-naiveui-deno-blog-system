<template>
  <h2 class="title">friend links</h2>
  <div class="blog">
    <!-- friend links table -->
    <n-card title="友链管理" :segmented="{ introduce: 'soft' }">
      <template #header-extra>
        <n-button type="primary" style="margin-right: 20px" @click="newLink">
          新建
        </n-button>
        <n-button disabled>删除</n-button>
      </template>
      <n-data-table
        :row-key="rowKeys"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :single-line="false"
      />
    </n-card>

    <!-- barrage row modal -->
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :show-icon="false"
      positive-text="提交"
      @positive-click="modalData.submit"
    >
      <template #header>
        <div>友链😁</div>
      </template>

      <n-grid x-gap="12">
        <n-gi :span="5">
          <n-statistic label="头像">
            <LinkUpload @img-updated="imgUpdated" :avatar="modalData.avatar" />
          </n-statistic>
        </n-gi>
        <n-gi :span="15">
          <n-statistic label="标题">
            <n-input v-model:value="modalData.title" placeholder="Silvensn" />
          </n-statistic>
        </n-gi>
        <n-gi :span="5">
          <n-statistic label="发布">
            <n-switch v-model:value="modalData.isPublish" />
          </n-statistic>
        </n-gi>
        <n-gi :span="15">
          <n-statistic label="座右铭">
            <n-input
              v-model:value="modalData.motto"
              placeholder="人活着就是为了樱岛麻衣!"
            />
          </n-statistic>
        </n-gi>
      </n-grid>
    </n-modal>
  </div>
</template>

<script>
import { h, defineComponent, ref, onMounted, reactive } from 'vue';
import { NButton, NImage, NSwitch } from 'naive-ui';
import LinkUpload from 'components/service/upload/LinkUpload.vue';

import loadAndMessage from '@/mixin/loadAndMessage';
import imageLoadBaseURL from '@/mixin/imgBaseUrl';
import {
  getAllLinks,
  createLink,
  updateLinkById,
  deleteLinkById,
} from '@/service/link/link';

// NDataTable Columns
const imgBaseUrl = process.env.VUE_APP_IMAGE_LOAD_BASE;
const createColumns = ({ editRow, deleteRow }) => {
  return [
    {
      type: 'selection',
    },
    {
      title: '头像',
      key: 'avatar',
      render(row) {
        return h(
          NImage,
          {
            width: 40,
            src: imgBaseUrl + row.avatar,
          },
          null,
        );
      },
    },
    {
      title: '标题',
      align: 'center',
      key: 'title',
    },
    {
      title: '座右铭',
      align: 'center',
      key: 'motto',
    },
    {
      title: '发布',
      align: 'center',
      key: 'isPublish',
      render: (row) => {
        return h(
          NSwitch,
          {
            value: row.isPublish === 1,
            disable: null,
          },
          null,
        );
      },
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render(row) {
        return [
          h(
            NButton,
            {
              size: 'small',
              style: 'margin-right: 20px;',
              type: 'info',
              onClick: () => editRow(row),
            },
            { default: () => '编辑' },
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
              onClick: () => deleteRow(row),
            },
            { default: () => '删除' },
          ),
        ];
      },
    },
  ];
};

export default defineComponent({
  // mixin 反馈 初始化
  mixins: [loadAndMessage, imageLoadBaseURL],
  components: {
    LinkUpload,
  },
  setup() {
    // 初始化数据
    const data = ref([]);
    // 模态框开关
    const showModal = ref(false);
    // 模态框数据
    const modalData = reactive({
      id: -1,
      title: '',
      motto: '',
      avatar: '',
      isPublish: true,
      submit: null,
    });
    // Modal img upload emits
    const imgUpdated = (src) => {
      modalData.avatar = src;
    };
    // 编辑 更新 友链
    const editRow = (row) => {
      showModal.value = !showModal.value;
      modalData.id = row.id;
      modalData.title = row.title;
      modalData.motto = row.motto;
      modalData.avatar = row.avatar;
      modalData.isPublish = row.isPublish === 1;
      modalData.submit = updateLink;
    };
    const updateLink = () => {
      const { id, submit, ...link } = modalData;
      updateLinkById(modalData.id, link).then(() => {
        const row = data.value.find((row) => row.id === modalData.id);
        row.motto = modalData.motto;
        row.title = modalData.title;
        row.avatar = modalData.avatar;
        // row.isPublish -> 1 0
        // modalData.isPublish => true false
        row.isPublish = modalData.isPublish ? 1 : 0;
      });
    };
    // 新增 提交 友链
    const newLink = () => {
      showModal.value = !showModal.value;
      modalData.title = '';
      modalData.motto = '';
      // 默认头像
      modalData.avatar =
        'uploads/2021/10/26/b9204125-8ee9-4ef5-b8f9-492f9003189e.png';
      modalData.isPublish = true;
      modalData.submit = createSubmit;
    };
    const createSubmit = () => {
      const { id, submit, ...link } = modalData;
      createLink(link).then(() => {
        getAllLinks().then((res) => {
          data.value = res.data.data;
        });
      });
    };
    // 删除单个友链
    const deleteRow = (row) => {
      deleteLinkById(row.id).then(() => {
        data.value.splice(
          data.value.findIndex((item) => item.id === row.id),
          1,
        );
      });
    };
    // 数据初始化
    onMounted(() => {
      getAllLinks().then((res) => {
        data.value = res.data.data;
      });
    });
    return {
      rowKeys: (row) => row.id,
      data: data,
      showModal,
      modalData,
      columns: createColumns({ editRow, deleteRow }),
      pagination: {
        pageSize: 20,
      },
      newLink,
      imgUpdated,
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
