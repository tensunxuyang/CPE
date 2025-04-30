<template>
  <div class="app-container filterRules">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">默认设置</div>
      <div @click="choseTab('1')">端口过滤</div>
      <div @click="choseTab('2')">IP-Port过滤</div>
      <div @click="choseTab('3')">MAC过滤</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="默认过滤规则：">
                    <el-radio v-model="radio" label="1">黑名单</el-radio>
                    <el-radio v-model="radio" label="2">白名单</el-radio>
                  </el-form-item>
                </div>
              </el-row>             
              <el-row>
                <div class="widthValue">
                  <el-form-item label="" >
                    <el-button type="primary">保存并应用规则</el-button>
                  </el-form-item>
                </div>
              </el-row> 
            </el-form>    
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="chosetempTab == 1">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <div class="myButton">
              <el-button type="primary">添加规则</el-button>
              <el-button type="primary">保存并应用规则</el-button>
              <el-button type="primary" >清空所有规则</el-button>
            </div>
            <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
              <!-- <el-table-column type="selection" width="55" align="center" /> -->
              <el-table-column label="序号" prop="roleId" width="120" />
              <el-table-column label="启用规则" prop="roleName" :show-overflow-tooltip="true" width="100" />
              <el-table-column label="优先级" prop="roleKey" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="IPv4/IPv6" prop="roleKey" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="协议" prop="roleKey" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="端口" prop="roleKey" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="备注" prop="roleKey" :show-overflow-tooltip="true" width="200" />
              <el-table-column label="操作" prop="SSID"/>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="chosetempTab == 2">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <div class="myButton">
              <el-button type="primary">添加规则</el-button>
              <el-button type="primary">保存并应用规则</el-button>
              <el-button type="primary" >清空所有规则</el-button>
            </div>
            <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
              <!-- <el-table-column type="selection" width="55" align="center" /> -->
              <el-table-column label="序号" prop="roleId" width="120" />
              <el-table-column label="启用规则" prop="roleName" :show-overflow-tooltip="true" width="100" />
              <el-table-column label="优先级" prop="roleKey" :show-overflow-tooltip="true" width="100" />
              <el-table-column label="IPv4/IPv6" prop="roleKey" :show-overflow-tooltip="true" width="100" />
              <el-table-column label="协议" prop="roleKey" :show-overflow-tooltip="true" width="100" />
              <el-table-column label="源端口" prop="roleKey" :show-overflow-tooltip="true" width="150" />
              <el-table-column label="目的IP" prop="roleKey" :show-overflow-tooltip="true" width="150" />
              <el-table-column label="目的端口" prop="roleKey" :show-overflow-tooltip="true" width="150" />
              <el-table-column label="备注" prop="roleKey" :show-overflow-tooltip="true" width="150" />
              <el-table-column label="操作" prop="SSID"/>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="chosetempTab == 3">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <div class="myButton">
              <el-button type="primary">添加规则</el-button>
              <el-button type="primary">批量添加</el-button>
              <el-button type="primary">保存并应用规则</el-button>
              <el-button type="primary" >清空所有规则</el-button>
            </div>
            <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
              <!-- <el-table-column type="selection" width="55" align="center" /> -->
              <el-table-column label="序号" prop="roleId" width="120" />
              <el-table-column label="启用规则" prop="roleName" :show-overflow-tooltip="true" width="100" />
              <el-table-column label="优先级" prop="roleKey" :show-overflow-tooltip="true" width="250" />
              <el-table-column label="IPv4/IPv6" prop="roleKey" :show-overflow-tooltip="true" width="250" />
              <el-table-column label="MAC地址" prop="roleKey" :show-overflow-tooltip="true" width="250" />
              <el-table-column label="备注" prop="roleKey" :show-overflow-tooltip="true" width="250" />
              <el-table-column label="操作" prop="SSID"/>
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
        radio: '1',
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
  .filterRules .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .filterRules .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .filterRules .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .filterRules .item-sort {
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
  .filterRules .card-box{
    margin-top: 20px;
  }
  .filterRules .myButton {
    margin-bottom: 20px;
  }


  /* 适用于比6.7寸屏幕小的机型，使用的样式 */
  @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .filterRules .tab {
      width: 80%;
      height: 40px;
      margin-top: 10px;
    }

    .filterRules .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }

    .filterRules .widthValue {
      width: 95%;
    }

    .filterRules .el-button {
      margin-bottom: 10px;
      margin-right: 10px;

    }

    .filterRules .el-button+.el-button {
      margin-left: 0px;

    }

    .filterRules .myButton {
      margin-bottom: 10px;
    }


  }

  
</style>
