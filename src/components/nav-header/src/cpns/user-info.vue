<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar class="avatar" size="small" :src="imgSrc" />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="UserFilled">用户信息</el-dropdown-item>
          <el-dropdown-item :icon="MoreFilled">系统管理</el-dropdown-item>
          <el-dropdown-item
            :icon="CircleCloseFilled"
            divided
            @click="handleLogout"
          >
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
  CircleCloseFilled,
  UserFilled,
  MoreFilled
} from '@element-plus/icons-vue'

import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.login.userInfo.name)
    const imgSrc = 'https://pic.imgdb.cn/item/6246f00c27f86abb2aeab059.jpg'

    const handleLogout = () => {
      localCache.deleteCache('token')
      router.push('/login')
    }
    return {
      name,
      imgSrc,
      handleLogout,
      CircleCloseFilled,
      UserFilled,
      MoreFilled
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 5px;
  }
}
</style>
