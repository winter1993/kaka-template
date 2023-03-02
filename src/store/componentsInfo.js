import { defineStore } from 'pinia'
export const useComponentConfigStore = defineStore({
    id:'componentConfig',
    state:()=>{
        return {
            componentConfig:[]
        }
    },
    actions:{
        updateComponentConfig(componentConfig){
            this.componentConfig = componentConfig
        }
    }
})