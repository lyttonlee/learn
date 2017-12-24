import avatarLee from '../assets/avatar.jpg'
import avatarZhang from '../assets/avatar2.jpg'
import {dateArray} from '../common/js/common'
import Mock from 'mockjs'
const users = [
  {
    username: 'lytton',
    password: '123456',
    email: '123@163.com',
    tel: '15181589155',
    name: '李小白',
    time: '2017-11-11',
    avatar: avatarLee
  },
  {
    username: 'zhangsan',
    password: '123456',
    email: '321@163.com',
    tel: '13789546327',
    name: '张三',
    time: '2017-08-17',
    avatar: avatarZhang
  }
]
// 。。。。。。。。。。。。
const prodnames = []
for (let index = 0; index < 25; index++) {
  prodnames.push(Mock.mock(
    Mock.Random.ctitle()
  ))
}

// 数据扩展
Mock.Random.extend({
  productclass: function () {
    let classes = ['石榴', '松子', '火腿', '其它']
    return this.pick(classes)
  },
  status: function () {
    let states = ['待发货', '正在发货', '已发货', '已签收']
    return this.pick(states)
  },
  bename: function () {
    let benames = ['李小白', '张三']
    return this.pick(benames)
  },
  senddate: function () {
    let senddate = dateArray
    return this.pick(senddate)
  },
  prodname: function () {
    return this.pick(prodnames)
  }
  // sendprod: function () {
  //   let prods = products.productname
  //   console.log(prods)
  //   return this.pick(prods)
  // }
})
const products = [
  {
    class: 'pomegranate',
    name: '石榴',
    prods: []
  },
  {
    class: 'pine',
    name: '松子',
    prods: []
  },
  {
    class: 'ham',
    name: '火腿',
    prods: []
  },
  {
    class: 'other',
    name: '其它',
    prods: []
  }
]
for (let index = 0; index < 4; index++) {
  products[index].prods.push(Mock.mock({
    productname: Mock.Random.prodname(),
    productclass: Mock.Random.productclass(),
    'productprice|100-200': 1,
    productintro: Mock.Random.cparagraph(),
    productimage: Mock.Random.image('400x400', '@color'),
    'productsells|20-700': 1,
    producrselling: Mock.Random.boolean()
  }))
}
const sends = []
for (let i = 0; i < 45; i++) {
  sends.push(Mock.mock({
    bename: Mock.Random.bename(),
    sendname: Mock.Random.cname(),
    sendaddr: Mock.Random.city(),
    'sendtel|0-9': 11,
    recepname: Mock.Random.cname(),
    recepaddr: Mock.Random.city(),
    'receptel|0-9': 11,
    sendprod: Mock.Random.prodname(),
    'sendprice|100-200': 1,
    sendmsg: Mock.Random.ctitle(),
    sendstatus: Mock.Random.status(),
    'sendcode|1-9': 13,
    date: Mock.Random.senddate(),
    sendprodtype: Mock.Random.productclass()
  }))
}

export {users, products, sends}
