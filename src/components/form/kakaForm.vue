<template>
    <form :action="props.obj.action">
        <input type="text" >
        <button>{{ props.obj.btnText??"提交" }}</button>
    </form>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['obj'])
</script>
