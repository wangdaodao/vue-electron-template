<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 组件名称 from '组件路径';
// const { ipcRenderer } = window.require('electron');
// import { ipcRenderer } from "electron";
export default {
  name: 'App',
  //引入组件
  props: {},
  //引入混淆
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    autoUpdate() {
      //用来触发更新函数
      ipcRenderer.send('checkForUpdate');
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //用来监听是否更新
    // ipcRenderer.on('message', (event, { message, data }) => {
    //   if (message === 'isUpdateNow') {
    //     if (confirm('是否现在更新？')) {
    //       ipcRenderer.send('updateNow');
    //     }
    //   }
    // });
    // ipcRenderer.on('message', (event, text) => {
    //   console.log(arguments);
    //   this.tips = text;
    // });
    // //注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
    // ipcRenderer.on('downloadProgress', (event, progressObj) => {
    //   console.log(progressObj);
    //   this.downloadPercent = progressObj.percent || 0;
    // });
    // ipcRenderer.on('isUpdateNow', () => {
    //   ipcRenderer.send('isUpdateNow');
    // });
    // this.autoUpdate();
  },
  //生命周期 - 创建之前
  beforeCreate() {},
  //生命周期 - 挂载之前
  beforeMount() {},
  //生命周期 - 更新之前
  beforeUpdate() {},
  //生命周期 - 更新之后
  updated() {},
  //生命周期 - 销毁之前
  beforeDestroy() {},
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
