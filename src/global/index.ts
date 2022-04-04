import type { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'

export default {
  install(app: App): void {
    registerElement(app)
    registerProperties(app)
  }
}
// export function globalRegister(app: App): void {
//   app.use(registerElement)
//   app.use(registerProperties)
// }

// 也可以使用函数的方法 app.use() 这里可以传入
// 对象：上面做法就是对象 使用里面的install函数 app.use(xxx)会自动调用install并且传入app作为参数
// 函数：方法一：xxxx(app)使用函数直接将app传入
// 方法二：可以像插件方式使用app.use(xxxx)内部会执行这个函数并且把app作为参数传入
