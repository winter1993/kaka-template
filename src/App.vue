<template>
  <ComponentsRender  />
</template>

<script setup>
import ComponentsRender from "@/common/componentsRender.vue";
// import logo from "@/assets/logo.png";
import { getComponent } from "@/utils/utils";
import { postMsgToParent } from "@/utils/postMsg";
import { useComponentConfigStore } from '@/store/componentsInfo'
// import { useSelectedComponentsStore } from '@/store/selectedComponentsInfo'
const useComponentConfig = useComponentConfigStore()

const sendComponentsInfo = async () => {
  //获取components下的所有组件
  const res = getComponent();
  useComponentConfig.updateComponentConfig(res)
  console.log("Component:", res);
  //通知父级 组件信息
  postMsgToParent({
    type: "defaultComponents",
    data: {
      components: res,
    },
  });
};
//发送模板组件数据给上级页面
sendComponentsInfo();
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* 滚动槽 */
::-webkit-scrollbar {
    display: none;
  }
</style>
