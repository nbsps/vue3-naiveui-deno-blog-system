<template>
  <h2 class="title">blogs</h2>
  <div class="blog">
    <!-- blogs table -->
    <n-card title="文章管理" :segmented="{ content: 'soft' }">
      <template #header-extra>
        <n-button type="primary" style="margin-right: 20px" @click="createBlog">
          新建
        </n-button>
        <n-button @click="deleteBlogs" disabled>删除</n-button>
      </template>
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :row-key="rowKeys"
        :single-line="false"
      />
    </n-card>
  </div>
</template>

<script>
import { h, defineComponent, ref, onMounted } from 'vue';
import { NTag, NButton, NImage, NSwitch } from 'naive-ui';
import countTo from 'vue-count-to/src/vue-countTo.vue';
import { useRouter } from 'vue-router';

import loadAndMessage from '@/mixin/loadAndMessage';
import imageLoadBaseURL from '@/mixin/imgBaseUrl';
import { getAllBlogs, deleteBlogById } from '@/service/blog/blogs';

// NDataTable Columns
const createColumns = ({ editRow, deleteRow }) => {
  return [
    {
      type: 'selection',
    },
    {
      title: '标题',
      key: 'title',
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '封面',
      key: 'cover',
      align: 'center',
      width: 65,
      render(row) {
        return h(
          NImage,
          {
            width: 40,
            src: process.env.VUE_APP_IMAGE_LOAD_BASE + row.cover,
          },
          null,
        );
      },
    },
    {
      title: '简介',
      key: 'thumbnail',
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '浏览量',
      key: 'views',
      width: 75,
      align: 'center',
      render: (row) =>
        h(countTo, { startVal: 0, endVal: row.views, duration: 3000 }, null),
    },
    {
      title: '创建时间',
      key: 'createdAt',
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '分类',
      key: 'category',
      align: 'center',
      render(row) {
        const category = Array(row.category).map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              type: 'info',
            },
            {
              default: () => tagKey,
            },
          );
        });
        return category;
      },
    },
    {
      title: '发布',
      key: 'isPublish',
      align: 'center',
      width: 65,
      render(row) {
        return h(NSwitch, { value: row.isPublish === 1, disabled: null }, null);
      },
    },
    {
      title: '加密',
      key: 'password',
      align: 'center',
      width: 65,
      render(row) {
        return h(
          NSwitch,
          { value: row.password ? true : false, disabled: null },
          null,
        );
      },
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      width: 125,
      render(row) {
        return [
          h(
            NButton,
            {
              size: 'small',
              style: 'margin-right: 5px;',
              type: 'info',
              onClick: () => editRow(row.id),
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
    const router = useRouter();
    const data = ref([]);
    // 编辑博客
    const editRow = (id) => {
      router.push({ name: 'blog', params: { id: id } });
    };
    // 删除博客
    const deleteRow = (row) => {
      deleteBlogById(row.id).then(() => {
        data.value.splice(
          data.value.findIndex((item) => item.id === row.id),
          1,
        );
      });
    };
    // 创建博客
    const createBlog = () => {
      router.push({ path: '/cms/blog/newblog' });
    };
    // 初始化数据
    onMounted(() => {
      getAllBlogs().then((res) => {
        data.value = res.data.data;
        console.log(res.data.data);
      });
    });
    return {
      data: data,
      createBlog,
      rowKeys: (row) => row.id,
      columns: createColumns({
        editRow,
        deleteRow,
      }),
      pagination: {
        pageSize: 10,
      },
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
