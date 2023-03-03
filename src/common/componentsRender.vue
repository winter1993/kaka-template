<template>
  <div id="slider-view" class="slider-view">
    <div
      :id="`coco-render-id-_component_${index}`"
      :key="index"
      v-for="(component, index) in state.components"
    >
      <component
        :is="componentGroup[component.name]"
        :key="component.name + index"
        :obj="component.props"
        :config="component.config"
      />
    </div>
  </div>
</template>

<script setup>
import kakaBanner from "@/components/banner/kakaBanner.vue";
import kakaForm from "@/components/form/kakaForm.vue";
import romateComponentsRender from "./romateComponentsRender.vue";
import { reactive } from "vue";
import { useComponentConfigStore } from "@/store/componentsInfo";
import { useSelectedComponentsStore } from "@/store/selectedComponentsInfo";
import { postMsgToParent } from '@/utils/postMsg'
const state = reactive({
  components: [],
  isEdit: false,
  currentIndex: 0,
  init:false
});
//组件的渲染数据
const componentGroup = {
  "kaka-banner": kakaBanner,
  "kaka-form": kakaForm,
  "romate-components-render": romateComponentsRender,
};

const useComponentConfig = useComponentConfigStore();
const useSelectedComponents = useSelectedComponentsStore();

state.components = useSelectedComponents.selectedComponents
//监听父级页面消息
window.addEventListener("message", (e) => {
  // 不接受消息源来自于当前窗口的消息
  if (e.source === window || e.data === "loaded") {
    return;
  }
  state.isEdit = true;
  //   window[e.data.type](e.data.data);
  parentCall[e.data.type](e.data.data);
});

/**
 * 返回内容
 */
const getConfig = (name) => {
  state.init = true;
  const obj = JSON.parse(JSON.stringify({
      components: useComponentConfig.componentConfig,
      userSelectComponents: state.components,
      currentIndex: state.currentIndex,
      // remoteComponents: this.remoteComponents,
      // page: this.page,
    }))
  postMsgToParent({
    type: name,
    data: obj,
  });
};
const parentCall = {
  changeProps: ({item,index}) => {
    state.currentIndex = index
    state.components[index-1] = JSON.parse(item)
    console.log("props:", item);
    getConfig('changeProps');
  },
  changeIndex: (payload) => {
    console.log("changeIndex:", payload);
  },
  addComponent: ({ data, index }) => {
    console.log('child:',JSON.parse(data))
    const res = JSON.parse(data)
   // 没有 schema 是系统组件
   state.currentIndex = (index-1) ? (index-1) + 1 : (index-1);
      if (!res.schema) {
        state.components = [...state.components.slice(0, state.currentIndex), {
          name: 'coco-components-loader',
          props: null,
          config: {
            ...res,
            index: state.currentIndex
          }
        }, ...state.components.slice(state.currentIndex, state.components.length)];
      } else {
        state.components = [...state.components.slice(0, state.currentIndex), {
          name: res.name,
          props: {},
          ...res
        }, ...state.components.slice(state.currentIndex, state.components.length)];
        getConfig('addComponent');
      }
  },
  deleteComponent(index) {
    const i = index - 1
    state.components.splice(i, 1);
    this.changeIndex(i - 1 < 0 ? 0 : i - 1);
    getConfig('deleteComponent');
  },
  sortComponent({ index, op }) {
    const i = index - 1
    const components = JSON.parse(JSON.stringify(state.components));
    console.log('sortComponent:',{index}, {op},components)
    const tmp = components[i];
    const next = i + op;
    components[i] = components[next];
    components[next] = tmp;
    state.components = components;
    this.changeIndex(next);
    getConfig('sortComponent');
  },
  //调用add方法
  copyComponent(index) {
    const i = index - 1
    const comp = JSON.stringify(state.components[i])
    this.addComponent({data:comp,index})
  }
};
</script>
