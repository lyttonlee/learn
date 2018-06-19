const files = require.context('.', false, /\.js$/)
const modules = {}
console.log(files)
files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
