//webpack 使用require.context获取 components文件下的组件
export const getComponent = () => {
  const componentConfig = [];
  const requireConfig = require.context(
    "../components",
    // 是否查询其子目录
    true,
    /package.json$/
  );
  const keys = requireConfig.keys()
  console.log('keys:',keys)
  keys.reduce((pre,cur)=>{
    const config = requireConfig(cur);
    componentConfig.push(config);
    return cur
  },keys[0])
  return componentConfig;
}
