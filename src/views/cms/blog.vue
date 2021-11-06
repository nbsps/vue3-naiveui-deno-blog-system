<template>
  <div class="blog">
    <!-- 标题 -->
    <n-card title="标题">
      <n-input
        round
        placeholder="每篇博客都值得拥有一个靓丽的名字！"
        v-model:value="blog.title"
      />
    </n-card>
    <!-- 封面 -->
    <n-card title="封面">
      <blog-upload @img-updated="imgUpdated" :cover="blog.cover" />
    </n-card>
    <!-- 基本信息 -->
    <n-card title="基本信息">
      <n-grid :cols="5">
        <n-gi>
          <!-- 暂时禁用，不想写（x -->
          <n-statistic label="加密">
            <n-switch v-model:value="blog.password" disabled />
          </n-statistic>
        </n-gi>
        <n-gi>
          <n-statistic label="发布">
            <n-switch v-model:value="blog.isPublish" />
          </n-statistic>
        </n-gi>
        <n-gi>
          <n-statistic label="分类">
            <n-dropdown :options="categorys" @select="handleSelect">
              <n-input
                v-model:value="blog.category"
                :show-count="true"
                :maxlength="10"
                placeholder="樱岛麻衣"
              />
            </n-dropdown>
          </n-statistic>
        </n-gi>
      </n-grid>
    </n-card>
    <!-- vditor -->
    <n-card title="编辑">
      <template #header-extra>
        <n-button @click="submit" type="info">提交</n-button>
      </template>
      <div id="vditor"></div>
    </n-card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, computed } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { emoji, toolbar } from '@/assets/vditor/vditor';
import { useRoute } from 'vue-router';

import { getBlogById, createBlog, updateBlogById } from '@/service/blog/blogs';
import { getAllCategorys } from '@/service/category/category';
import BlogUpload from 'components/service/upload/BlogUpload.vue';

export default defineComponent({
  components: {
    BlogUpload,
  },
  setup() {
    const contentEditor = ref(null);
    const route = useRoute();
    let category = ref([]);
    const categorys = computed(() => {
      if (
        blog.category &&
        !category.value.some((item) => item.key === blog.category)
      ) {
        const array = Array.from(category.value);
        array.push({ label: blog.category, key: blog.category });
        return array;
      }
      return category.value;
    });
    const submit = () => {
      blog.content = contentEditor.value.getValue();
      blog.thumbnail = contentEditor.value
        .getHTML()
        .replace(/(<.*?>)|(\t|\r|\n)/g, '')
        .slice(0, 100);
      if (route.params.id === 'newblog') createBlog(blog);
      else updateBlogById(route.params.id, blog);
    };
    const handleSelect = (key) => {
      blog.category = key;
    };
    const blog = reactive({
      title: '',
      cover: 'uploads/2021/10/26/b9204125-8ee9-4ef5-b8f9-492f9003189e.png',
      content: '',
      thumbnail: '',
      isPublish: true,
      password: false,
      category: '',
    });
    // img upload emits
    const imgUpdated = (src) => {
      blog.cover = src;
    };

    onMounted(() => {
      contentEditor.value = new Vditor('vditor', {
        height: 540,
        placeholder: '占位🥱🥱🥱',
        toolbarConfig: {
          pin: true,
        },
        hint: {
          emoji,
        },
        cache: {
          enable: false,
        },
        after: () => {
          contentEditor.value.setValue(blog.content);
        },
        toolbar: toolbar,
      });
      if (route.params.id !== 'newblog') {
        getBlogById(route.params.id).then((res) => {
          res.data.data[0].isPublish = res.data.data[0].isPublish === 1;
          res.data.data[0].password = res.data.data[0].password ? true : false;
          Object.assign(blog, res.data.data[0]);
        });
      }
      getAllCategorys().then((res) => {
        category.value = res.data.data.map((item) => {
          return {
            label: item,
            key: item,
          };
        });
      });
    });
    return {
      blog,
      contentEditor,
      categorys,
      imgUpdated,
      handleSelect,
      submit,
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
