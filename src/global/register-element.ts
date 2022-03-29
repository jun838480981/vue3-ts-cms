import type { App } from 'vue'
import 'element-plus/dist/index.css'
import { UserFilled, Iphone } from '@element-plus/icons-vue'

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain
} from 'element-plus'

const components = [
  UserFilled,
  Iphone,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
