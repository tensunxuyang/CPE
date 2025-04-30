<template>
  <div class="app-container routerConfig">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">静态路由表</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box">
          <el-card>
            <div class="myButton">
              <el-button type="primary">添加静态路由表</el-button>
              <el-button type="primary">保存并应用规则</el-button>
              <el-button type="primary">清空所有规则</el-button>
            </div>
            <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
              <!-- <el-table-column type="selection" width="55" align="center" /> -->
              <el-table-column label="序号" prop="roleId" width="120" />
              <el-table-column label="状态" prop="roleName" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="接口名称" prop="roleKey" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="目的IP地址" prop="roleKey" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="子网掩码" prop="roleKey" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="网关" prop="roleKey" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="操作" prop="SSID" />
            </el-table>
          </el-card>
        </el-col>

      </el-row>

    </div>
  </div>
</template>

<script>
  import {
    getServer
  } from "@/api/monitor/server";

  export default {
    name: "Server",
    data() {
      return {
        info: {
          tplCategory: '',
          value: true,
          value1: true,
          value2: true,
          value3: true,
        },
        chosetempTab: '0',



        // 服务器信息
        server: []
      };
    },
    created() {
      // this.getList();
      // this.openLoading();
    },
    methods: {
      /** 查询服务器信息 */
      getList() {
        getServer().then(response => {
          this.server = response.data;
          this.$modal.closeLoading();
        });
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在加载服务监控数据，请稍候！");
      },
      choseTab(val) {
        this.chosetempTab = val
        document.getElementById('tab').childNodes.forEach(item => {
          item.removeAttribute('class');
        })
        document.getElementById('tab').childNodes[val].classList.add('choseTab')
        console.log(document.getElementById('tab').childNodes[val]);

      }
    }
  };

</script>
<style>
  .routerConfig .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .routerConfig .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .routerConfig .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .routerConfig .item-sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
    color: #fff;
    font-weight: bold;
    background: #6287ee;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .routerConfig .card-box {
    margin-top: 20px;
  }

  .routerConfig .myButton {
    margin-bottom: 20px;
  }


  /* 适用于比6.7寸屏幕小的机型，使用的样式 */
  @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .routerConfig .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .routerConfig .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }

    .routerConfig .widthValue {
      width: 95%;
    }

    .routerConfig .el-button {
      margin-bottom: 10px;
      margin-right: 10px;

    }

    .routerConfig .el-button+.el-button {
      margin-left: 0px;

    }

    .routerConfig .myButton {
      margin-bottom: 10px;
    }


  }

</style>
