import { defineStore } from 'pinia'

export const useSelectedComponentsStore = defineStore({
    id:'selectedComponents',
    state:()=>{
        return{
            selectedComponents:[]
        }
    },
    actions:{
        updateSelectedComponents (v) {
            this.selectedComponents = v
        },
    }
})

