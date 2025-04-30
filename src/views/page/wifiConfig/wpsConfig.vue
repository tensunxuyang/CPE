<template>
  <div class="app-container wpsConfig">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">2.4G WI-FI WPS配置</div>
      <div @click="choseTab('1')">5G WI-FI WPS配置</div>
    </div>
    <div>
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="WPS功能开关：">
                    <el-switch
                      v-model="info.wpsState"
                      active-value="1" 
                      inactive-value="0"
                      @change="saveWps"
                      active-color="#13ce66"
                      inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="saveWps">保存</el-button>
                  </el-form-item>
                </div>
              </el-row> 
              <!-- <div v-if="info.WpsState"> -->
              <el-row>
                <div class="widthValue">
                  <el-form-item label="WPS PIN：">
                    <el-input  placeholder="(请输入8位数字)" v-model="info.pin"  />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="apply">应用</el-button>
                  </el-form-item>
                </div>
              </el-row> 
              <el-row>
                <div class="widthValue">
                  <el-form-item label="启动PBC：">
                    <el-button type="primary" @click="startPbc">启动PBC</el-button>
                  </el-form-item>
                </div>
              </el-row> 
              <el-row>
                <div class="widthValue">
                  <el-form-item label="随机PIN码：">
                    <el-button type="primary" @click="createPin">生成PIN码</el-button>
                  </el-form-item>
                </div>
              </el-row> 
            <!-- </div> -->
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
 import { getDataInfo, } from "@/api/cpeApi/system.js";

  export default {
    name: "Server",
    data() {
      return {
        info: {
          wpsState: '0',
          pin: ''
        },
        chosetempTab: '0',
        
      };
    },
    created() {
      var data = {
          "m":        1,
          "n":        20,
          "timestamp":    123421312,
          "token":	sessionStorage.getItem("token"),
          "value":  {
          }
      };
      this.getData(data);
    },
    methods: {
      // /** 查询WI-Fi配置 */
      getData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.info.wpsState = res.value.wpsState + "";
        });
      },
      //设置WPS功能开关
      saveWps(){
        this.info.wpsState = Number(this.info.wpsState);
        if(this.chosetempTab == 0){
          var data = {
              "m":        1,
              "n":        21,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
                wpsState : this.info.wpsState
              }
          };
        }else{
          var data = {
              "m":        1,
              "n":        23,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
                wpsState : this.info.wpsState
              }
          };
        }
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置成功");
          var params = this.chosetempTab == 0 ? 20 : 22;
          var data = {
              "m":        1,
              "n":        params,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getData(data);
          // if(res.value.error != null || res.value.error != undefined || res.value.error != '' ){
          //   this.$message({
          //     type: 'error',
          //     message: '设置失败'
          //   });  
          // }else{
          //   this.$message({
          //     type: 'success',
          //     message: '设置成功'
          //   });
          // }
        });
      },
      //应用PIN
      apply(){
        var type = this.chosetempTab == 0 ? 0 : 1;
        var data = {
            "m":        1,
            "n":        30,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
              "type": type,
              "pin": this.info.pin
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("应用成功");
          // if(res.value.error != null || res.value.error != undefined || res.value.error != '' ){
          //   this.$message({
          //     type: 'error',
          //     message: '设置失败'
          //   });  
          // }else{
          //   this.$message({
          //     type: 'success',
          //     message: '设置成功'
          //   });
          // }
        });
      },
      //启动PBC
      startPbc(){
        var type = this.chosetempTab == 0 ? 0 : 1;
        var data = {
            "m":        1,
            "n":        27,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
              "type": type,
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("应用成功");
          // if(res.value.error != null || res.value.error != undefined || res.value.error != '' ){
          //   this.$message({
          //     type: 'error',
          //     message: '设置失败'
          //   });  
          // }else{
          //   this.$message({
          //     type: 'success',
          //     message: '设置成功'
          //   });
          // }
        });
      },
      //随机生成PIN
      createPin(){
        var data = {
            "m":        1,
            "n":        29,
            "timestamp":    123421312,
            "token":	"893835255",
            "value":  {
              "type": this.chosetempTab,
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          var title = '请在手机端输入PIN码为' + '1234，' + '设置过程可能需要两分钟。'
          this.$alert(title, '随机PIN码', {
            confirmButtonText: '确定',
            callback: action => {
              
            }
          });
        });
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在加载服务监控数据，请稍候！");
      },
      choseTab(val) {
        this.chosetempTab = val
        if(this.chosetempTab == 0){
          var data = {
              "m":        1,
              "n":        20,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getData(data);
        }else{
          var data = {
              "m":        1,
              "n":        22,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getData(data);
        }
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
  .wpsConfig .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .wpsConfig .tab>div {
    width: 150px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    margin-right: 20px;
  }

  .wpsConfig .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .wpsConfig .item-sort {
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
  .wpsConfig .card-box{
    margin-top: 20px;
  }
  .wpsConfig .widthValue{
      width: 30%;
    }
   /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .wpsConfig .tab {
      width: 90%;
      height: 40px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .wiwpsConfigfi5 .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }
    .wpsConfig .widthValue{
      width: 95%;
    }

   
  }

  
</style>
