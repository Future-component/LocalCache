const getOptions = require('loader-utils').getOptions;
const validateOptions = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
}

module.exports = function(source) {
  const options = getOptions(this);

  validateOptions(schema, options, 'Example Loader');
  source = source.replace(/\[name\]/g, options.name);

  // 对资源应用一些转换……

  return `export default ${ JSON.stringify(source) }`;
};


/**
 * # loader的原则
 * 简单易用
 * 使用链式传递
 * 模块化的输出
 * 确保无状态
 * 使用 loader utilities
 * 记录 loader 的依赖
 * 解析模块依赖关系
 * 提取通用代码
 * 避免绝对路径
 * 使用 peer dependencies
 */