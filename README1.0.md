## LocalCache
> LocalCache 是一个处理缓存数据的工具库，包含对象缓存，cookie存储，localStorage和seesionStorage存储
  
### Example
[GitHub地址:https://github.com/Future-component/LocalCache](https://github.com/Future-component/LocalCache)

[demo地址:https://github.com/Future-component/LocalCache/blob/master/example/index.html](https://github.com/Future-component/LocalCache/blob/master/example/index.html)

### 实例化对象
> new localCache({ debug: true, prefix: 'prefix' });

参数 | 类型 | 含义 | 默认值
:---|:---|:---|:----
debug | boolean | 是否开启debug模式 | false
prefix | string | key的前缀 | 'lc'

### 实例的API

参数 | 类型 | 含义 | 默认值
:---|:---|:---|:----
createCache | function | 创建cache对象 | 无
cookie | object | 基于cookie的存储 | 无
storage | function | 基于storage的存储 | localStorage

### createCache样例
```js
var cache = new localCache({ debug: true });

var typeCache = cache.createCache();
typeCache('name');
typeCache('name', 'beth');
```

### cookie样例
```js
var cache = new localCache({ debug: true });

// 获取所有的cookie对象
var cookies = cache.cookie.getAll();

// 设置cookie
cache.cookie.set('xq', JSON.stringify({ name: 'beth' }), 1);

// 获取cookie
var xq = cache.cookie.get('xq');
console.log(xq && JSON.parse(xq))

// 删除cookie
cache.cookie.remove('xq');

// 设置cookie
cache.cookie.set('xq', JSON.stringify({ name: 'beth' }), 1);

// 清除所有cookie
cache.cookie.clear();
```

### storage样例
```js
var cache = new localCache({ debug: true });

// 初始化storage对象
var cacheStorage = cache.storage();

// 设置storage
cacheStorage.set('xq', JSON.stringify({ name: 'beth' }))

// 获取所有storage对象
var storages = cacheStorage.getAll();

// 获取storage
var xq = cacheStorage.get('xq');
console.log(xq && JSON.parse(xq))

// 移除storage
cacheStorage.remove('xq');

// 设置storage
cacheStorage.set('xq', JSON.stringify({ name: 'beth' }))

// 清空所有storage
cacheStorage.clear();
```
