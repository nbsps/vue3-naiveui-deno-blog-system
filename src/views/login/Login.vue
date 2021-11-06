<template>
  <header :style="{ 'background-image': `url(${cover})` }">
    <!-- 模拟 before 伪元素 -->
    <div
      class="before"
      :style="{ background: `url(${cover}) 0 / cover fixed` }"
    ></div>
    <!-- login form -->
    <div class="content">
      <div class="text">Login</div>
      <form>
        <div class="field">
          <input
            type="text"
            v-model="username"
            @blur="usernameCheck"
            @focus="namefocus"
          />
          <label ref="labelname">Username</label>
        </div>
        <div class="field">
          <input
            type="password"
            v-model="password"
            @blur="passwordCheck"
            @focus="passfocus"
          />
          <label ref="labelpass">Password</label>
        </div>
        <button @click.prevent="loginAction">Sign in</button>
      </form>
    </div>
  </header>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';
import sha256 from 'sha256';

import headerReveal from '@/mixin/headerReveal';
import { useMessage } from 'naive-ui';

export default defineComponent({
  mixins: [headerReveal], // header scrollReveal
  setup() {
    const router = useRouter();
    const message = useMessage();
    const cover = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + store.state.cover,
    );
    // form username
    let username = ref('');
    const labelname = ref(null);
    const usernameCheck = () => {
      if (username.value === '') labelname.value.style.opacity = 1;
      else labelname.value.style.opacity = 0;
    };
    const namefocus = () => {
      labelname.value.style.opacity = 0;
    };
    // form password
    let password = ref('');
    const labelpass = ref(null);
    const passwordCheck = () => {
      if (password.value === '') labelpass.value.style.opacity = 1;
      else labelpass.value.style.opacity = 0;
    };
    const passfocus = () => {
      labelpass.value.style.opacity = 0;
    };
    // login submit
    const loginAction = () => {
      // not ''
      if (!username.value || !password.value) {
        message.warning('Empty: name or pass!');
        return;
      }
      store
        .dispatch('login/LoginAction', {
          username: username.value,
          password: sha256(password.value),
        })
        .then(() => {
          router.push({ path: '/cms/info' });
        });
    };

    return {
      cover,
      username,
      labelpass,
      labelname,
      password,
      usernameCheck,
      passwordCheck,
      namefocus,
      passfocus,
      loginAction,
    };
  },
});
</script>

<style lang="less" scoped>
header {
  width: 100vw;
  height: 100vh;
  background-position: bottom;
  background-size: cover;
  position: relative;
  .before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(2px);
  }
  .content {
    margin: 0 auto;
    padding: 40px 30px;
    border-radius: 10px;
    width: 330px;
    position: relative;
    top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: -3px -3px 7px #ffffff73, 2px 2px 5px rgba(94, 104, 121, 0.288);
    .text {
      font-size: 33px;
      font-weight: 600;
      margin-bottom: 35px;
      color: #000;
    }
    .field {
      height: 50px;
      width: 100%;
      position: relative;
      input {
        height: 100%;
        width: 100%;
        padding-left: 45px;
        font-size: 18px;
        outline: none;
        border: none;
        color: #595959;
        background: rgba(255, 255, 255, 0.65);
        border-radius: 25px;
        box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
      }
      label {
        position: absolute;
        top: 50%;
        left: 45px;
        pointer-events: none;
        color: #666666;
        transform: translateY(-50%);
      }
    }
    .field:nth-child(2) {
      margin-top: 20px;
    }
    button {
      margin: 20px 0 10px;
      width: 100%;
      height: 50px;
      color: #000;
      font-size: 18px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.3);
      border: none;
      outline: none;
      border-radius: 25px;
      box-shadow: 2px 2px 5px #babecc, -5px -5px 10px #ffffff73;
    }
    button:focus {
      color: #3498db;
      box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
    }
  }
}
</style>
