<template>
  <div class="app-container dmz">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">DMZ</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="DMZ开关：">
                    <el-switch
                      v-model="info.value"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary">保存</el-button>
                  </el-form-item>
                </div>
              </el-row> 
            </el-form>
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
  .dmz .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .dmz .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .dmz .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .dmz .item-sort {
    width: calc(100% - 30px);
    height: 30px;
    line-height: 30px;
    margin-left: 15px;
    box-sizing: border-box;
    font-size: 12px;
    padding-left: 10px;
    color: #fff;
    font-weight: bold;
    background: #6287ee;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .dmz .card-box{
    margin-top: 20px;
  }
  .dmz .widthValue{
      width: 30%;
    }
 /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .dmz .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .dmz .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }
    .dmz .widthValue{
      width: 95%;
    }

   
  }
  
</style>
