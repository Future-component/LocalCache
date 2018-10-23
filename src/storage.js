
export default (prefix, type) => {
  const prefix$1 = prefix || 'lc';
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