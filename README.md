## LocalCache
> LocalCache 是一个处理缓存数据的工具库，包含对象缓存，cookie存储，localStorage和seesionStorage存储
  
### Example
[GitHub地址:https://github.com/Future-component/LocalCache](https://github.com/Future-component/LocalCache)

[demo地址:https://github.com/Future-component/LocalCache/blob/master/example/index.html](https://github.com/Future-component/LocalCache/blob/master/example/index.html)

### 安装
```js
npm install local-cache-tools
```

### 实例的API

参数 | 类型 | 含义 | 默认值
:---|:---|:---|:----
cache | function | 创建cache对象 | 无
cookie | object | 基于cookie的存储 | 无
storage | function | 基于storage的存储 | localStorage

### cache样例
```js
import as * localCache from 'local-cache-tools'

// 初始化cache
const typeCache = localCache.cache()

typeCache('name');
typeCache('name', 'beth');
```

### cookie样例
```js
import { cookie } from 'local-cache-tools'

// 初始化cookie
const cacheCookie = cookie()

// 获取所有的cookie对象
const cookies = cacheCookie.getAll();

// 设置cookie
cacheCookie.set('xq', JSON.stringify({ name: 'beth' }), 1);

// 获取cookie
const xq = cacheCookie.get('xq');
console.log(xq && JSON.parse(xq))

// 删除cookie
cacheCookie.remove('xq');

// 设置cookie
cacheCookie.set('xq', JSON.stringify({ name: 'beth' }), 1);

// 清除所有cookie
cacheCookie.clear();
```

### storage样例
```js
import { storage } from 'local-cache-tools'

// 初始化storage对象
const cacheStorage = storage();

// 设置storage
cacheStorage.set('xq', JSON.stringify({ name: 'beth' }))

// 获取所有storage对象
const storages = cacheStorage.getAll();

// 获取storage
const xq = cacheStorage.get('xq');
console.log(xq && JSON.parse(xq))

// 移除storage
cacheStorage.remove('xq');

// 设置storage
cacheStorage.set('xq', JSON.stringify({ name: 'beth' }))

// 清空所有storage
cacheStorage.clear();
```
