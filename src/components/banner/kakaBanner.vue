<template>
  <div class="banner-comp">
      <img :src="props.obj.src??logo" class="banner" alt="图片" />
      <a class="link" :href="props.obj.link??'baidu.com'">
      </a>
  </div>
</template>

<script setup>
import logo from "@/assets/logo.png";
import { defineProps } from "vue";
const props = defineProps(["obj"]);
</script>
<style scoped>
.banner-comp{
  position: relative;
  font-size: 0;
}
.banner{
width: 100%;
}
.link{
  width: 100%;
  height: 20px;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
