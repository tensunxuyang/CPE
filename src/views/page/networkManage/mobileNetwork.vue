<template>
  <div class="app-container mobileNetwork">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">网络模式</div>
      <div @click="choseTab('1')">网络配置</div>
      <div @click="choseTab('2')">链路检测</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="网络模式：">
                    <el-select v-model="networkMode" style="width: 100%;">
                      <el-option label="nr" value="nr" />
                      <el-option label="lte" value="lte" />
                      <el-option label="nr,lte" value="nr,lte" />
                      <!-- <el-option label="5G SA Only" value="sub" /> -->
                    </el-select>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="setButton">设置</el-button>
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
            <el-form ref="form" :model="networkConfigInfo" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="飞行模式：">
                    <el-switch
                      v-model="networkConfigInfo.FlyMode"
                      @change="setconfigData('FlyMode')"
                      active-value="1" 
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue" v-if="networkConfigInfo.FlyMode == '0'">
                  <el-form-item label="数据开关：">
                    <el-switch
                      v-model="networkConfigInfo.DataServiceEnable"
                      @change="setconfigData('DataServiceEnable')"
                      active-value="1" 
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                  <el-row>
                    <div class="widthValue" v-if="networkConfigInfo.DataServiceEnable == '1'">
                      <el-form-item label="漫游数据开关：">
                        <el-switch
                          v-model="networkConfigInfo.RoamingDataEnable"
                          @change="setconfigData('RoamingDataEnable')"
                          active-value="1" 
                          inactive-value="0"
                          active-color="#13ce66"
                          inactive-color="#bfcbd9">
                        </el-switch>
                      </el-form-item>
                    </div>
                  </el-row>
                </div>
              </el-row>
              <hr>
              <el-row style="margin-top: 20px;">
                <div class="widthValue" >
                  <el-form-item label="重新搜网：">
                    <el-button type="primary" @click="searchData">搜索</el-button>
                  </el-form-item>
                </div>
              </el-row> 
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="chosetempTab == 2">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="linkInfo" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="链路检测开关：">
                    <el-switch
                      v-model="linkInfo.enable"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <div v-if="linkInfo.enable == 1">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="链路检测方式：">
                    <el-select v-model="linkInfo.method" style="width: 100%;">
                      <el-option label="PING" value="0" />
                      <!-- <el-option label="DNS" value="1" />
                      <el-option label="NTP" value="2" /> -->
                    </el-select>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="检测服务器IP1：">
                    <el-input v-model="linkInfo.server1" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="检测服务器IP2：">
                    <el-input v-model="linkInfo.server2" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="检测服务器IP3：">
                    <el-input v-model="linkInfo.server3" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="检测间隔时间：">
                    <div style="display: flex;">
                      <el-input min="1" max="864000" @input="handleInput" type="number" v-model="linkInfo.interval" 
                       />
                      <div class="unit">秒</div>
                    </div>
                    <div class="timeDesc">提示：间隔时间为1～864000s</div>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="链路检测响应动作：">
                    <el-select v-model="linkInfo.action" style="width: 100%;">
                      <el-option label="不做动作" value="0" />
                      <el-option label="整机重启" value="1" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-row>
            </div>
            <el-row>
              <div class="widthValue">
                <el-form-item label="链路检测状态：">
                  <div style="width: 20px;height: 20px;border-radius: 50%;margin-right: 5px;margin-top: 3px;" :style="{ 'background': detection_result == 0 ? 'gray' : detection_result == 1 ? 'green' : 'red'}"></div>
                </el-form-item>
              </div>
            </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="setSave">保存</el-button>
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
 import { getDataInfo, } from "@/api/cpeApi/system.js";

  export default {
    name: "Server",
    data() {
      return {
        //网络模式
        networkMode: '',
        //网络配置
        networkConfigInfo: {
          FlyMode: '0',
          DataServiceEnable: '0',
          RoamingDataEnable: '0'
        },
        //链路检测配置
        linkInfo: {
          enable: '1',
          method: '0',
          server1: '8.8.8.8',
          server2: '114.114.114.114',
          server3: 'baidu.com',
          interval: '10',
          action: '0'
        },
        detection_result: 1,
        //切换tab
        chosetempTab: '0',
      };
    },
    created() {
      var data = {
          "m":        1,
          "n":        41,
          "timestamp":    123421312,
          "token":	sessionStorage.getItem("token"),
          "value":  {
          }
      };
      this.getnetworkData(data);
      setTimeout(() => {
        this.getnetworkData(data);
      }, 1000);
      // this.openLoading();
    },
    methods: {
      //校验
      handleInput(value) {
        if (Number(value) <=  1) {
          this.linkInfo.interval = 1; // 或者设置为之前的值 this.prevValue
        } else if(Number(value) >= 864000){
          this.linkInfo.interval = '864000'; // 或者设置为之前的值 this.prevValue
        }
        else {
          // 保存当前值为之后可能需要的参考
          this.linkInfo.interval = value;
        }
      },
      /** 查询网络模式 */
      getnetworkData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.networkMode = res.value.TechnologyPreference
        });
      },
       /** 查询网络配置 */
       getnetworkconfigData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.networkConfigInfo = res.value;
          this.networkConfigInfo.FlyMode = this.networkConfigInfo.FlyMode + '';
          this.networkConfigInfo.DataServiceEnable = this.networkConfigInfo.DataServiceEnable + '';
          this.networkConfigInfo.RoamingDataEnable = this.networkConfigInfo.RoamingDataEnable + '';
        });
      },
      /** 查询链路检测配置 */
      getlinkData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.linkInfo = res.value
          this.linkInfo.enable = this.linkInfo.enable + '';
          this.linkInfo.method = this.linkInfo.method + '';
          this.linkInfo.interval = this.linkInfo.interval + '';
          this.linkInfo.action = this.linkInfo.action + '';
        });
      },
       /** 查询链路检测状态 */
       getlinkStatusData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.detection_result = res.value.detection_result
        });
      },
      /** 设置通用接口 */
      setData(data){
        this.$message.closeAll()
        console.log('发送请求',data);
        this.openLoading();
        setTimeout(() => {
          this.$modal.closeLoading();
        }, 25000);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          // this.$modal.msgSuccess("设置成功");
          if(res.value.error == null || res.value.error == undefined || res.value.error == '' ){
            this.$message({
              type: 'success',
              message: '设置成功'
            });
          }else{
            this.$message({
              type: 'error',
              message: '设置失败'
            }); 
           
          }
          this.$modal.closeLoading();
          if(this.chosetempTab == '0'){
            var data = {
                "m":        1,
                "n":        41,
                "timestamp":    123421312,
                "token":	sessionStorage.getItem("token"),
                "value":  {
                }
            };
            this.getnetworkData(data);
          }
          if(this.chosetempTab == '1'){
            var data = {
                "m":        1,
                "n":        24,
                "timestamp":    123421312,
                "token":	sessionStorage.getItem("token"),
                "value":  {
                }
            };
            this.getnetworkconfigData(data);
          }
          if(this.chosetempTab == '2'){
            var data = {
                "m":        1,
                "n":        49,
                "timestamp":    123421312,
                "token":	sessionStorage.getItem("token"),
                "value":  {
                }
            };
            this.getlinkData(data);
            var data2 = {
                "m":        1,
                "n":        66,
                "timestamp":    123421312,
                "token":	sessionStorage.getItem("token"),
                "value":  {
                }
            };
            this.getlinkStatusData(data2);
          }
        });
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在提交数据，请稍候！");
      },
      choseTab(val) {
        this.chosetempTab = val
        if(this.chosetempTab == '0'){
          var data = {
              "m":        1,
              "n":        41,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getnetworkData(data);
        }
        if(this.chosetempTab == '1'){
              var data = {
              "m":        1,
              "n":        24,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getnetworkconfigData(data);
        }
        if(this.chosetempTab == '2'){
            var data = {
                "m":        1,
                "n":        49,
                "timestamp":    123421312,
                "token":	sessionStorage.getItem("token"),
                "value":  {
                }
            };
          this.getlinkData(data);
          var data2 = {
              "m":        1,
              "n":        66,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getlinkStatusData(data2);
        }
        document.getElementById('tab').childNodes.forEach(item => {
          item.removeAttribute('class');
        })
        document.getElementById('tab').childNodes[val].classList.add('choseTab')
        console.log(document.getElementById('tab').childNodes[val]);
      },
      //设置网络模式
      setButton(){
      this.openLoading();
      setTimeout(() => {
        this.$modal.closeLoading();
      }, 25000);
      setTimeout(() => {
        //设置网络模式，先下线
        var data = {
            "m":        1,
            "n":        60,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        getDataInfo(data).then((res) => {
           //设置网络模式
           setTimeout(() => {
           var data2 = {
                "m":        1,
                "n":        42,
                "timestamp":    123421312,
                "token":	sessionStorage.getItem("token"),
                "value":  {
                  "property":"TechnologyPreference",
                  "value": this.networkMode
                }
            };
            getDataInfo(data2).then((res) => {
              setTimeout(() => {
              //查询网络模式
              var data3 = {
                  "m":        1,
                  "n":        41,
                  "timestamp":    123421312,
                  "token":	sessionStorage.getItem("token"),
                  "value":  {
                  }
              };
              // this.networkMode = res.value.TechnologyPreference;
              getDataInfo(data3).then((res) => {
                this.$modal.closeLoading();
                this.$modal.msgSuccess("设置成功");
                //查询上线
                setTimeout(() => {
                var data4 = {
                    "m":        1,
                    "n":        61,
                    "timestamp":    123421312,
                    "token":	sessionStorage.getItem("token"),
                    "value":  {
                    }
                };
                getDataInfo(data4).then((res) => {
                });
                }, 1500);
              })
            }, 1000);
            })
          }, 500);
        });
      }, 250);
        // this.setData(data);
        // var data = {
        //     "m":        1,
        //     "n":        42,
        //     "timestamp":    123421312,
        //     "token":	sessionStorage.getItem("token"),
        //     "value":  {
        //       "property":"TechnologyPreference",
	      //     	 "value": this.networkMode
        //     }
        // };
        //  this.setData(data);
      },
       /** 设置网络配置 */
       setconfigData(val){
        if(val == 'FlyMode'){
          this.networkConfigInfo.FlyMode = Number(this.networkConfigInfo.FlyMode);
          var temp = {
            "FlyMode": this.networkConfigInfo.FlyMode
          }
        }
        else if(val == 'DataServiceEnable'){
          this.networkConfigInfo.DataServiceEnable = Number(this.networkConfigInfo.DataServiceEnable);
          var temp = {
            "DataServiceEnable": this.networkConfigInfo.DataServiceEnable
          }
        }
        else{
          this.networkConfigInfo.RoamingDataEnable = Number(this.networkConfigInfo.RoamingDataEnable);
          var temp = {
            "RoamingDataEnable": this.networkConfigInfo.RoamingDataEnable
          }
        }
     
        var data = {
            "m":        1,
            "n":        25,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  temp
        };
        this.setData(data);
      },
      // 重新搜网
      searchData(){
        var data = {
            "m":        1,
            "n":        54,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {}
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          if(res.value.error == undefined || res.value.error == null || res.value.error == ''){
            this.$modal.msgSuccess("搜网成功");
          
          }else{
            this.$modal.msgSuccess(res.value.error);

          }
        });
      },
      // 设置链路检测配置
      setSave(){
        this.linkInfo.enable = Number(this.linkInfo.enable);
        this.linkInfo.method = Number(this.linkInfo.method);
        this.linkInfo.interval = Number(this.linkInfo.interval);
        this.linkInfo.action = Number(this.linkInfo.action);
        var data = {
            "m":        1,
            "n":        50,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  this.linkInfo
        };
        if(data.value.enable == '0'){
          data.value = {
            enable: 0,
          }
        }
        this.setData(data);
      }
    }
  };

</script>
<style>
  .mobileNetwork .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .mobileNetwork .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .mobileNetwork .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .mobileNetwork .item-sort {
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
  .mobileNetwork .card-box{
    margin-top: 20px;
  }
  .mobileNetwork .widthValue{
    width: 30%;
  }
  .mobileNetwork .unit{
    font-size: 12px;
    margin-left: 10px;
  }
  .mobileNetwork .timeDesc{
    font-size: 12px;
    color: green;
    margin-top: 5px;
  }
 /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .mobileNetwork .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .mobileNetwork .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }
    .mobileNetwork .widthValue{
      width: 95%;
    }

   
  }
  
</style>
