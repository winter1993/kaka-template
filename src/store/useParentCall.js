import { defineStore } from "pinia";
import { postMsgToParent } from "@/utils/postMsg";
import { useComponentConfigStore } from "@/store/componentsInfo";
import { useSelectedComponentsStore } from "@/store/selectedComponentsInfo";
export const useParentCall = () => {
  const useComponentConfig = useComponentConfigStore();
  const useSelectedComponents = useSelectedComponentsStore();
  return defineStore({
    id: "parentCall",
    state:()=> {
        return {
            components:useSelectedComponents.selectedComponents,
            currentIndex:0,
            init:false
        }
    },
    actions: {
      /**
       * 返回内容
       */
      getConfig(name) {
        this.init = true;
        const obj = JSON.parse(
          JSON.stringify({
            components: useComponentConfig.componentConfig,
            userSelectComponents: this.components,
            currentIndex: this.currentIndex,
            // remoteComponents: this.remoteComponents,
            // page: this.page,
          })
        );
        postMsgToParent({
          type: name,
          data: obj,
        });
      },
      changeProps({ item, index }) {
        this.currentIndex = index - 1;
        this.components[index - 1] = JSON.parse(item);
        console.log("props:", item);
        this.getConfig("changeProps");
      },
      changeIndex(payload) {
        console.log("changeIndex:", payload);
      },
      addComponent({ data, index }) {
        console.log("child:", JSON.parse(data));
        const res = JSON.parse(data);
        this.currentIndex = index - 1 ? index - 1 + 1 : index - 1;
        this.components = [
          ...this.components.slice(0, this.currentIndex),
          {
            name: res.name,
            props: {},
            ...res,
          },
          ...this.components.slice(
            this.currentIndex,
            this.components.length
          ),
        ];
        this.getConfig("addComponent");
      },
      deleteComponent(index) {
        const i = index - 1;
        this.components.splice(i, 1);
        this.changeIndex(i - 1 < 0 ? 0 : i - 1);
        this.getConfig("deleteComponent");
      },
      sortComponent({ index, op }) {
        
        const i = index - 1;
        const next = i + op;
        const components = JSON.parse(JSON.stringify(this.components));
        console.log("sortComponent:", { index }, { op }, components);
        const tmp = components[i];
        
        components[i] = components[next];
        components[next] = tmp;
        this.components = components;
        this.changeIndex(next);
        this.getConfig("sortComponent");
      },
      //调用add方法
      copyComponent(index) {
        const i = index - 1;
        const comp = JSON.stringify(this.components[i]);
        this.addComponent({ data: comp, index });
      },
    },
  });
};
