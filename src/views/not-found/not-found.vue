<template>
  <div class="not-found">
    <h1 class="title">Not Found Return To Home</h1>
    <el-button
      class="btn"
      type="danger"
      :icon="HomeFilled"
      circle
      @click="backOff"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'

export default defineComponent({
  setup() {
    const router = useRouter()
    const backOff = () => {
      router.push('/main')
    }
    return { HomeFilled, backOff }
  }
})
</script>

<style scoped lang="less">
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  // background: url('https://pic.imgdb.cn/item/623fc2d227f86abb2a7d28d1.png');
  background: url('../../assets/img/login-bg.svg');
  background-size: 100% 100%;
  .title {
    background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
    background-clip: text;
    color: transparent;
  }
  .btn {
    margin-top: 8px;
    margin-left: 10px;
  }
}
</style>
