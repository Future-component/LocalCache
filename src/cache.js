
import { logger } from './utils'

export const cache = (prefix) => {
  const prefix$1 = prefix || 'lc';
  // cache对象中以键值对的形式存储我们的缓存数据
  const cache = {};
  // index数组中该存储键，这个键是有顺序的，可以方便我们做出超出容量的处理
  const index = [];
  return (key, value) => {
    logger('key', 'start');
    // 如果传了值，就说明是设置值
    if (value !== undefined) {
      // 将数据存入cache对象，做缓存
      cache[`${prefix$1}-${key}`] = value;
      // 将键存入index数组中，以和cache中的数据进行对应
      index.push(`${prefix$1}-${key}`);

      // 判断缓存中的数据数量是不是超出了限制
      if (index.length >= 50) {
        // 如果超出了限制
        // 删除掉最早存储缓存的数据
        // 最早存入缓存的数据的键是在index数组中的第一位
        // 使用数组的shift方法可以获取并删除数组的第一个元素
        var tempKey = index.shift();
        // 获取到最早加入缓存的这个数据的键，可以使用它将数据从缓存各种删除
        delete cache[tempKey];
      }
    }
    logger('key', 'end');

    return cache[`${prefix$1}-${key}`];
  }
}
