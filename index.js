/**
 * localCache
 * 1.0.0
 * Copyright (c) 2018-10-22 11:57:36 Beth
 * 处理常用缓存数据
 * depend [no]
 */

 /**
  * 功能点：
  * 1.数据键值对缓存
  * 2.cookie存储
  * 3.localStorage存储
  * 4.sessionStorage存储
  * 5.indexedDB存储（待定）
  */

((global, factory) => {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.localCache = factory())
})(this, () => {
  'use strict';

  const Version = '1.0.0';

  function localCache({
    debug,
    prefix
  }) {
    const prefix$1 = prefix || 'lc';
    this.Version = Version;

    const logger = (text, type) => {
      if (!debug) {
        return null;
      }
      if (type === 'start') {
        console.time(text);
      } else if (type === 'end') {
        console.timeEnd(text);
      } else {
        console.log(text);
      }
    }

    this.createCache = () => {
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

    // 实现一个cookie框架的封装（注意在把html转换为实体存储的时候这里默认是去掉最末尾的分号）
    this.cookie = {
      getAll: () => {
        const allCookies = document.cookie;
        const cookieTemp = {};
        let ary = [];
        if (allCookies && allCookies.indexOf('; ') > -1) {
          ary = allCookies.split('; ');
        }
        ary.forEach((item) => {
          const co = item.split('=');
          cookieTemp[co[0].replace(`${prefix$1}-`, '')] = co[1];
        });

        return cookieTemp;
      },

      get: (name) => {
        // 读取文档中的所有cookie属性
        const allCookies = document.cookie;

        if (!name) {
          return this.getCookies()
        }

        // 下面是一些Cookie的数据格式信息（默认返回的是一个字符串）
        // H_PS_645EC=af88R0s3e76Ig1PlwkvrhnGGtg4qt5pcZNPKBUntPI2vGearAlyZyjXjmKYn%2BkggUXbNjhg;
        // 1. 查找名称为name的cookie信息script3&amp5;
        //name = name.substring(0, name.length-1);            
        //  当前步骤是为了去除掉末尾的分号(转换为标准形式);
        name = `${prefix$1}-${name}=`;
        // 等号右边的就是获取的数值，左边就是cookie的名称信息
        // 2. 获取'name='这个字符串在整个Cookie信息字符串中出现的位置下标
        const pos = allCookies.indexOf(name);
        // 3. 判断是否存在这个cookie的信息
        if (pos !== -1) {
          // 如果存在的话，就继续处理
          // 3. 计算'cookie='等号后面的位置
          const start = pos + name.length;
          // 3. 从'cookie='的位置开始向后搜索， 一直到;的位置结束, 从start的位置向后搜索信息
          let end = allCookies.indexOf(';', start);
          if (end === -1) {
            // 如果为-1的话， 说明cookie信息列表里面只有一个Cookie信息
            end = allCookies.length;
          }
          // 4. 提取Cookie的数值信息
          const value = allCookies.substring(start, end);
          // 5.处理之后反转义后返回(反转义的目的是将内容进行加密处理，防止攻击)【测试状态OK，由于之前的内部存储，必须先删除所有的，在执行就ok了】
          return value;
        }

        // 默认情况下返回一个空的字符串
        return '';
      },

      set: (name, value, days, path) => {
        const expires = new Date();
        let _expires = null;
        let res = null;

        //name = name.substring(0, name.length-1);            //  当前步骤是为了去除掉末尾的分号(转换为标准形式);

        // 设置cookie的过期时间(单位是毫秒)
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        if (!path) {
          path = '';
        } else {
          path = (';path=' + path);
        }

        if (typeof expires === 'string') {
          _expires = '';
        } else {
          // 使用UTC标准时间
          _expires = (';expires=' + expires.toUTCString());
        }

        // 设置cookie信息，【注意要点：】(设置COokie的时候，只要遇到分号就会立即结束，只会保存分号之前的内容)
        res = prefix$1 + '-' + name + '=' + value + _expires + path;
        // document.cookie="userId=828; userName=hulk";
        document.cookie = res;
      },

      remove: (name, path) => {
        const expires = new Date();
        if (!path) {
          path = '';
        } else {
          path = (';path=' + path);
        }

        // 删除之后重新设置cookie
        document.cookie = prefix$1 + '-' + name + '=' + ';expires=' + expires.toUTCString() + path;
      },

      clear: () => {
        // 1. 获取浏览器中存储的所有cookie信息
        // "name&amp=xiuxiu&amp; name=xiuxiu; script=<script>alert(2); script2=<script>alert(2); script3=<script>alert(2); script3&amp=&ltscript&gtalert(2); script4&amp=&ltscript&gtalert(2); a&amp=&lta&gtalert(2)&lt/a&gt&amp"
        const cookies = document.cookie.split('; ');
        if (cookies.length) {
          cookies.forEach(function (element) {
            // 拿到字符串：name&amp=xiuxiu&amp
            const index = element.indexOf('=');
            const name = element.substring(0, index);

            // 实现思路：要想删除某一个COOkie信息，只需要将cookie的name对应的值设置为空即可
            document.cookie = name + '=' + ';expires=Thu, 01 Jan 1970 00:00:00 GMT/';
          });
        }
      },
    }

    this.storage = (type) => {
      const localStorage = type || window.localStorage;

      return {
        getAll: () => {
          const data = Object.keys(localStorage);
          const storageTemp = {};
          data.forEach((key) => {
            storageTemp[key.replace(`${prefix$1}-`, '')] = localStorage.getItem(key)
          })
          return storageTemp;
        },
  
        get: (name) => {
          return localStorage.getItem(`${prefix$1}=${name}`)
        },
  
        set: (name, value) => {
          localStorage.setItem(`${prefix$1}-${name}`, value)
        },
        
        remove: (name) => {
          localStorage.removeItem(`${prefix$1}-${name}`)
        },
  
        clear: () => {
          const data = Object.keys(localStorage);
          data.forEach((key) => {
            localStorage.removeItem(key) 
          }) 
        },
      } 
    }

    return this;
  }

  /**
  （1）键值对储存。 IndexedDB内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括JavaScript对象。在对象仓库中，数据以“键值对”的形式保存，每一个数据都有对应的键名，键名是独一无二的，不能有重复，否则会抛出一个错误。
  （2）异步。 IndexedDB操作时不会锁死浏览器，用户依然可以进行其他操作，这与localStorage形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。
  （3）支持事务。 IndexedDB支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回到事务发生之前的状态，不存在只改写一部分数据的情况。
  （4）同域限制 IndexedDB也受到同域限制，每一个数据库对应创建该数据库的域名。来自不同域名的网页，只能访问自身域名下的数据库，而不能访问其他域名下的数据库。
  （5）储存空间大 IndexedDB的储存空间比localStorage大得多，一般来说不少于250MB。IE的储存上限是250MB，Chrome和Opera是剩余空间的某个百分比，Firefox则没有上限。
  （6）支持二进制储存。 IndexedDB不仅可以储存字符串，还可以储存二进制数据。
   */
  this.indexDB = {

  }

  const localCache$1 = localCache;

  return localCache$1;
})