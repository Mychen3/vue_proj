<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      logout () {
        // 清空token
        window.sessionStorage.clear()
        // 编程式导航跳转
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped lang="less">

</style>
