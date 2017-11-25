import avatarLee from '../assets/avatar.jpg'
import avatarZhang from '../assets/avatar2.jpg'
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
const products = []
Mock.Random.extend({
  productclass: function () {
    let classes = ['pomegranate', 'pine', 'ham', 'other']
    return this.pick(classes)
  }
})
for (let index = 0; index < 25; index++) {
  products.push(Mock.mock({
    productname: Mock.Random.ctitle(),
    productclass: Mock.Random.productclass(),
    'productprice|100-200': 1,
    productintro: Mock.Random.cparagraph(),
    productimage: Mock.Random.image('400x400', '@color'),
    'productsells|20-700': 1,
    producrselling: Mock.Random.boolean()
  }))
}

export {users, products}
