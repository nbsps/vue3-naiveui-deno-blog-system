<template>
  <h2 class="title">barrages</h2>
  <div class="blog">
    <!-- barrages table -->
    <n-card title="所有弹幕" :segmented="{ content: 'soft' }">
      <template #header-extra>
        <n-button type="primary" @click="newBarrage" style="margin-right: 20px">
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
        <div>{{ modalData.title }}</div>
      </template>
      <n-input
        v-model:value="modalData.barrage"
        placeholder="人活着就是为了樱岛麻衣!"
      />
    </n-modal>
  </div>
</template>

<script>
import { h, defineComponent, ref, onMounted, reactive } from 'vue';
import { NButton, NGradientText } from 'naive-ui';

import loadAndMessage from '@/mixin/loadAndMessage';
import imageLoadBaseURL from '@/mixin/imgBaseUrl';
import {
  createBarrage,
  getAllBarrages,
  updateBarrageById,
  deleteBarrageById,
} from '@/service/barrage/barrage';

// NDataTable Columns
const createColumns = ({ editRow, deleteRow }) => {
  return [
    {
      type: 'selection',
    },
    {
      title: '弹幕内容',
      key: 'content',
      align: 'center',
      render: (row) =>
        h(
          NGradientText,
          {
            type: 'warning',
          },
          {
            default: () => row.content,
          },
        ),
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
  setup() {
    // 初始化数据
    const data = ref([]);
    // 模态框开关
    const showModal = ref(false);
    // 模态框数据
    const modalData = reactive({
      id: -1,
      title: '',
      barrage: '',
      submit: null,
    });
    // 编辑 更新 弹幕
    const editRow = (row) => {
      showModal.value = !showModal.value;
      modalData.title = '😏😣😒';
      modalData.barrage = row.content;
      modalData.id = row.id;
      modalData.submit = updateBarrage;
    };
    const updateBarrage = () => {
      updateBarrageById(modalData.id, { content: modalData.barrage }).then(
        () => {
          data.value.find((row) => row.id === modalData.id).content =
            modalData.barrage;
        },
      );
    };
    // 新增 提交 弹幕
    const newBarrage = () => {
      showModal.value = !showModal.value;
      modalData.barrage = '';
      modalData.title = '管理员专属弹幕😎';
      modalData.submit = createSubmit;
    };
    const createSubmit = () => {
      createBarrage({ content: modalData.barrage }).then(() => {
        getAllBarrages().then((res) => {
          data.value = res.data.data;
        });
      });
    };
    // 删除弹幕
    const deleteRow = (row) => {
      deleteBarrageById(row.id).then(() => {
        data.value.splice(
          data.value.findIndex((item) => item.id === row.id),
          1,
        );
      });
    };
    // 数据初始化
    onMounted(() => {
      getAllBarrages().then((res) => {
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
      newBarrage,
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
