<template>
  <div id="slider-view" class="slider-view">
    <div
      :id="`coco-render-id-_component_${index}`"
      :key="index"
      v-for="(component, index) in parentCall.components"
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
import { useParentCall } from "@/store/useParentCall";


//组件的渲染数据
const componentGroup = {
  "kaka-banner": kakaBanner,
  "kaka-form": kakaForm,
  "romate-components-render": romateComponentsRender,
};

const parentCall = useParentCall()();
//监听父级页面消息
window.addEventListener("message", (e) => {
  // 不接受消息源来自于当前窗口的消息
  if (e.source === window || e.data === "loaded") {
    return;
  }
  //   window[e.data.type](e.data.data);
  parentCall[e.data.type](e.data.data)
});
</script>
