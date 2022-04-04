import type { App } from 'vue'
import 'element-plus/dist/index.css'
// 导入图标组件
import {
  UserFilled,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  Plus
} from '@element-plus/icons-vue'

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
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElPagination
} from 'element-plus'

const components = [
  UserFilled,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  Plus,
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
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElPagination
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
