
// 实现一个cookie框架的封装（注意在把html转换为实体存储的时候这里默认是去掉最末尾的分号）
export default (prefix) => {
  const prefix$1 = prefix || 'lc';

  return {
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
}