<template>
  <el-container class="home_container">
    <!--   头部区-->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--   页面主体区-->
    <el-container>
      <!--  左侧边栏  折叠如果isCollapse为ture 就折起来 不然就宽度为200-->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="toggle-but" @click="toggle"> >>>></div>
        <el-menu :router="true" background-color="#333744" text-color="#fff" active-text-color="#409EFF"
                 :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" :default-active="activePath">
          <!--一级菜单 循环 -->
          <el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
            <!--一级菜单模板区 -->
            <template slot="title">
              <!--图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--文本-->
              <span>{{item.authName}}</span>
            </template>
            <!--二级菜单 template菜单模板-->
            <el-menu-item :index="'/'+tuiTem.path" v-for="tuiTem in item.children" :key="tuiTem.id"
                          @click="saveNav('/'+tuiTem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{tuiTem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        // 激活链接高亮
        activePath: '',
        // 左边菜单数据
        isCollapse: false,
        menulist: [],
        iconsObj: {
          125: 'iconfont icon-user',
          103: 'iconfont icon-tijikongjian',
          101: 'iconfont icon-shangpin',
          102: 'iconfont icon-danju',
          145: 'iconfont icon-baobiao'
        }
      }
    },
    //  调用生命周期函数打开立即请求
    created () {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      logout () {
        // 清空token
        window.sessionStorage.clear()
        // 编程式导航跳转
        this.$router.push('/login')
      },
      async getMenuList () {
        const res = await this.$axios.get('menus')
        console.log(res)
        if (res.data.meta.status !== 200) {
          this.$message.error(res.data.meta.msg)
        } else {
          this.menulist = res.data.data
        }
      },
      // 点击折叠菜单
      toggle () {
        this.isCollapse = !this.isCollapse
      },
      // 保存链接激活状态
      saveNav (activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      }
    }
  }
</script>
<style scoped lang="less">
  .el-header {
    background-color: #373d41;
    display: flex;
    /*左右贴边对其*/
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .home_container {
    height: 100%;
  }

  // 菜单图标间距
  .iconfont {
    margin-right: 10px;
  }

  .toggle-but {
    display: flex;
    background-color: #4A5064;
    justify-content: center;
    line-height: 24px;
    // 间距
    letter-spacing: 0.2em;
    //触碰变小手
    cursor: pointer;
  }

</style>
