import store from '../vuex/store'
const getPath = pathName => {
  return new Promise(resolve => {
    const route = store.state.addRoutes[0].children
    const culRoute = route.filter(r => {
      return r.name === pathName
    })
    // console.log(culRoute)
    resolve(culRoute[0].children)
  })
}
export default getPath
