<template>
  <header :style="{ 'background-image': `url(${cover})` }">
    <!-- barrage container -->
    <div id="barrage-container"></div>
  </header>
  <main>
    <!-- barrage input -->
    <div class="leave-name">
      <h2>麻衣学姐是我的，大家没意见吧！</h2>
      <textarea v-model="textinput" />
      <button @click="sendBarrage">🥳发条弹幕吧！</button>
    </div>
  </main>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue';
import store from '@/store';
import scroxt from 'scroxt';

import { getAllBarrages, createBarrage } from '@/service/barrage/barrage';
import headerReveal from '@/mixin/headerReveal';

export default defineComponent({
  mixins: [headerReveal], // header scrollReveal
  setup() {
    var scroxtLive;
    let barrages = [];
    const cover = computed(
      () => process.env.VUE_APP_IMAGE_LOAD_BASE + store.state.cover,
    );
    const textinput = ref('');
    const sendBarrage = function () {
      if (!scroxtLive) return;
      scroxtLive.addBarrage(textinput.value, true);
      createBarrage({ content: textinput.value });
      textinput.value = '';
    };

    onMounted(() => {
      // get barrages
      getAllBarrages().then((res) => {
        barrages = res.data.data;
      });
      // scroxtLive init
      scroxtLive = new scroxt.Live({
        target: '#barrage-container',
        strongLock: true,
      });
      // 一大波弹幕来袭！！！！
      for (let i = 0; i < 15; i++) {
        setTimeout(
          () => scroxtLive.addBarrage('一大波弹幕来袭！！！！'),
          i * 100,
        );
      }
      // 5s to show a barrage
      setTimeout(() => {
        setInterval(function () {
          scroxtLive.addBarrage(barrages.shift()?.content ?? '');
        }, 1000);
      }, 5000);
    });
    return { cover, textinput, sendBarrage };
  },
});
</script>

<style lang="less" scoped>
header {
  width: 100vw;
  height: 100vh;
  background-position: bottom;
  background-size: cover;
  #barrage-container {
    position: relative;
    height: calc(100vh - 60px);
    width: 100vw;
    top: 60px;
    z-index: 0;
  }
}
.leave-name {
  margin: 10vh auto 0;
  width: 70vw;
  height: 40vh;
  background: linear-gradient(#ffeaa7, transparent),
    linear-gradient(90deg, #fd79a8, transparent),
    linear-gradient(-90deg, coral, transparent);
  border: 2px solid black;
  border-radius: 2vmax;
  text-align: center;
  transition: all ease 0.1s;
  box-shadow: 3px 3px 8px 2px rgba(0, 0, 0, 0.3);
  h2 {
    padding: 1% 0 2%;
    overflow: hidden;
    white-space: nowrap;
  }
  textarea {
    width: 70%;
    height: 45%;
    outline: none;
    border: 2px solid black;
    padding: 5px;
    border-radius: 1vmax;
    resize: none;
    color: #000;
    font-weight: 700;
    font-size: 16px;
  }
  button {
    display: block;
    margin: 1% auto;
    outline: none;
    height: 15%;
    width: 20%;
    min-width: 110px;
    font-weight: 900;
    background: linear-gradient(limegreen, transparent),
      linear-gradient(90deg, skyblue, transparent),
      linear-gradient(-90deg, coral, transparent);
    background-blend-mode: screen;
  }
}
.leave-name:hover {
  box-shadow: 3px 3px 8px 2px rgba(0, 0, 0, 0.4);
}
@media screen and (max-width: 600px) {
  .leave-name {
    height: 30vh;
  }
}
</style>
