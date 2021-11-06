<template>
  <div>
    <h2 class="title">blog's info</h2>
    <div class="info">
      <!-- 基本信息 -->
      <n-card title="基本信息" :segmented="{ content: 'soft' }">
        <div class="base-info">
          <Upload img-name="avatar" />
          <InfoPopChange :maxlength="15" info-name="nickname" />
        </div>
      </n-card>

      <!-- 博客封面相关 -->
      <n-card title="博客封面" :segmented="{ content: 'soft' }">
        <n-list class="blog-cover-list">
          <n-list-item v-for="(v, k) in covers" :key="k">
            <template #prefix>
              <i class="iconfont icon-tupian"></i>
            </template>
            <n-thing :title="k">
              <Upload :img-name="k" />
            </n-thing>
          </n-list-item>
        </n-list>
      </n-card>

      <!-- 其他信息 -->
      <n-card title="其他信息" :segmented="{ content: 'soft' }">
        <n-list>
          <n-list-item v-for="(v, k) in contact" :key="k">
            <template #prefix>
              <i class="iconfont icon-info"></i>
            </template>
            <n-thing :title="k">
              <info-pop-change :info-name="k" />
            </n-thing>
          </n-list-item>
          <!-- 密码 -->
          <n-list-item key="password">
            <template #prefix>
              <i class="iconfont icon-info"></i>
            </template>
            <n-thing title="密码修改">
              <span>😵😵😵😵😵</span>
              <n-popconfirm
                :show-icon="false"
                positive-text="确认"
                negative-text="取消"
                @positive-click="changePass"
              >
                <template #trigger>
                  <i class="iconfont icon-xiugai"></i>
                </template>
                <n-input
                  type="password"
                  :maxlength="30"
                  :minlength="10"
                  placeholder="🙄🙄🙄"
                  v-model="password"
                  clearable
                />
              </n-popconfirm>
            </n-thing>
          </n-list-item>
        </n-list>
      </n-card>

      <!-- PV UV -->
      <n-card title="博客数据" :segmented="{ content: 'soft' }">
        <n-row>
          <n-col :span="12">
            <n-statistic label="PV">
              <countTo :startVal="0" :endVal="2355" :duration="3000" />
            </n-statistic>
          </n-col>
          <n-col :span="12">
            <n-statistic label="UV">
              <countTo :startVal="0" :endVal="356" :duration="3000" />
            </n-statistic>
          </n-col>
          <n-col :span="12">
            <n-statistic label="访问量">
              <div style="width: 400px; height: 300px" id="statas"></div>
            </n-statistic>
          </n-col>
          <n-col :span="12">
            <n-statistic label="访问量">
              <div style="width: 400px; height: 300px" id="pie"></div>
            </n-statistic>
          </n-col>
        </n-row>
      </n-card>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';
import countTo from 'vue-count-to/src/vue-countTo.vue';
import * as echarts from 'echarts';
import echartsInit from '@/utils/echarts/init';
import store from '@/store';
import sha256 from 'sha256';

import Upload from 'components/service/upload/Upload.vue';
import InfoPopChange from 'components/service/infoPopChange/InfoPopChange.vue';
import loadAndMessage from '@/mixin/loadAndMessage';
import imageLoadBaseURL from '@/mixin/imgBaseUrl';
import { setBaseInfo } from '@/service/info/baseInfo';
import { useMessage } from 'naive-ui';

export default defineComponent({
  mixins: [loadAndMessage, imageLoadBaseURL],
  components: {
    echarts,
    Upload,
    InfoPopChange,
    countTo,
  },
  setup() {
    const message = useMessage();
    const password = ref('');
    // store info 初始化
    const contact = computed(() => {
      const { qq, email, github, description, motto, aboutMotto, ..._ } =
        store.state;
      return { qq, email, github, description, motto, aboutMotto };
    });
    const covers = computed(() => {
      const { cover, about, ..._ } = store.state;
      return { cover, about };
    });
    // 长度>10 & commit
    const changePass = () => {
      if (password.value.length < 10) {
        message.error('密码长度(>10?)不安全！');
        return;
      }
      setBaseInfo({ key: 'password', value: sha256(password.value) });
    };
    onMounted(() => {
      echartsInit(); // echarts init
      store.dispatch('getBaseInfo');
    });
    return {
      contact,
      covers,
      password,
      changePass,
    };
  },
});
</script>

<style lang="less" scoped>
.info {
  margin-left: 30px;
  margin-right: 40px;
}
.base-info {
  display: flex;
  align-items: center;
}
.blog-cover-list {
  .n-thing {
    display: inline-block;
  }
}
</style>
