<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
      v-if="!topNav && device !== 'mobile'"
    />
    <top-nav  id="topmenu-container" class="topmenu-container" v-if="topNav" />

    <div class="center-menu">
      <!-- <img width="15px" src="../../assets/icon/xinhao.png"> -->
      <!-- <img width="20px" src="../../assets/icon/icon_dot-2.png"> -->
      <span>SIM:</span>
      <div style="width: 20px;height: 20px;border-radius: 50%;margin-right: 15px;background:#bfcbd9 ;" :class="[ simStatus == 1 ? 'topColor' : '']"></div>
      <!-- <img width="20px" src="../../assets/icon/yigexinhao3.png">
      <span>2.4G</span>
      <img width="20px" src="../../assets/icon/yigexinhao2.png">
      <span>5G</span> -->
      <!-- <div style="width: 20px;height: 20px;border-radius: 50%;margin-right: 5px;background:#bfcbd9 ;" :class="[ simStatus == 1 ? 'topColor' : '']"></div> -->
      <span >eth0:</span>
      <img v-if="eCurrentRxRate != 0" width="20px" src="../../assets/icon/shanghang.png">
      <img v-else width="20px" src="../../assets/icon/shanghang-2.png">
      <img v-if="eCurrentTxRate != 0"  width="20px" src="../../assets/icon/xiahang.png">
      <img v-else width="20px" src="../../assets/icon/xiahang-2.png">
      <span >usb0:</span>
      <img v-if="uCurrentRxRate != 0" width="20px" src="../../assets/icon/shanghang.png">
      <img v-else width="20px" src="../../assets/icon/shanghang-2.png">
      <img v-if="uCurrentTxRate != 0"  width="20px" src="../../assets/icon/xiahang.png">
      <img v-else width="20px" src="../../assets/icon/xiahang-2.png">
      <!-- <span>上行</span> -->
    </div>
   

    <div class="right-menu">
      <!-- <div style="display: flex;justify-content: center;align-items: center;float: left;">
          <div style="margin-right: 2px;">{{moduleMode== '0'? 'mifi': 'modem'}} 模式：</div>
          <el-switch
            v-model="moduleMode"
            @change="setconfigData"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            inactive-color="#bfcbd9">
          </el-switch>
      </div> -->
      <template v-if="device !== 'mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />
        </el-tooltip> -->

        <!-- <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip> -->

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <!-- <img :src="avatar" class="user-avatar" /> -->
          <span>admin</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item> -->
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import TopNav from "@/components/TopNav";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";
import { getDataInfo, } from "@/api/cpeApi/system.js";
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },
  data(){
    return {
      simStatus: 0,
      moduleMode: 0,
      eCurrentRxRate: 0,
      eCurrentTxRate: 0,
      uCurrentRxRate: 0,
      uCurrentTxRate: 0,
      intervalId: null,
    }
  },
  created() {
    // this.intervalId = setInterval(() => {
      this.getnetworkData();
      this.getLanData();
    // }, 5000);
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.$store.dispatch("LogOut").then(() => {
            // sessionStorage.removeItem("token");
            // commit('SET_ROLES', [])
            // commit('SET_PERMISSIONS', [])
            removeToken()
            location.href = "/";
            // next(`/login`) // 否则全部重定向到登录页
          // });
        })
        .catch(() => {});
    },
    /** 查询顶部状态 */
    getnetworkData(data){
      var data = {
          "m":        1,
          "n":        24,
          "timestamp":    123421312,
          "value":  {
          }
      };
      console.log('发送请求',data);
      getDataInfo(data).then((res) => {
        console.log('接受参数',res);
        this.simStatus = res.value.SimStatus;
        this.moduleMode = res.value.ModuleMode;
      });
    },
    //查询栏状态
    getLanData(data){
      var data = {
          "m":        1,
          "n":        43,
          "timestamp":    123421312,
          "value":  {
          }
      };
      console.log('发送请求',data);
      getDataInfo(data).then((res) => {
        console.log('接受参数',res);
        this.eCurrentRxRate = res.value.EthInfoList[0].CurrentRxRate;
        this.eCurrentTxRate = res.value.EthInfoList[0].CurrentTxRate;
        this.uCurrentRxRate = res.value.EthInfoList[1].CurrentRxRate;
        this.uCurrentTxRate = res.value.EthInfoList[1].CurrentTxRate;
      });
    },
     /** 设置网络配置 */
     setconfigData(data){
        this.moduleMode = Number(this.moduleMode);
        var data = {
            "m":        1,
            "n":        25,
            "timestamp":    123421312,
            "value":  {
               "moduleMode": this.moduleMode
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置工作模式成功");
          this.getnetworkData();
        });
     }

  },
};
</script>

<style lang="scss" scoped>
.topColor{
  background: rgb(70, 219, 70) !important;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .center-menu{
    position: absolute;
    left: calc(50% - 110px);
    height: 50px;
    display: flex;
    align-items: center;
    img{
      /* margin-right: 5px; */
    }
    span{
      margin-right: 5px;
      font-size: 12px;
      color: #bfcbd9;
      font-weight: 700;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
