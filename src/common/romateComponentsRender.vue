<template>
    <component
    v-if="props.component"
    :is="props.component"
    :obj="props.obj"
    />
</template> 
<script setup>
import {reactive,defineProps} from 'vue'
const props = defineProps(['config','obj'])
const data = reactive({
    component:""
})
console.log('data:',data)
</script>
