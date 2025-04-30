<template>
  <div class="app-container wifi5">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">主WI-FI设置</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <div class="item-sort">5G WI-FI配置</div>
        <el-col :span="24" class="card-box">
          <el-card>
            <el-form ref="form" :model="info" label-width="200px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="Wi-Fi功能：">
                    <el-switch v-model="info.Active" active-value="1" inactive-value="0" active-color="#13ce66" inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="SSID广播：">
                    <el-switch v-model="info.BroadcastSSID" active-value="1" inactive-value="0" active-color="#13ce66" inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <div v-if="info.Active">
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="无线网络识别（SSID）：">
                      <el-input v-model="info.SSID" />
                    </el-form-item>
                  </div>
                </el-row>
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="认证类型：">
                      <el-select v-model="info.WpaType" style="width: 100%;">
                        <el-option label="WPA_NONE" value="0" />
                        <el-option label="WPA1 " value="1" />
                        <el-option label="WPA2_PSK" value="2" />
                        <el-option label="WPA_WPA2_PSK" value="3" />
                        <el-option label="WPA3_PSK" value="4" />
                        <el-option label="WPA2_WPA3_PSK" value="6" />
                      </el-select>
                    </el-form-item>
                  </div>
                </el-row>

                <el-row>
                  <div class="widthValue">
                    <el-form-item label="安全密钥：">
                      <el-input type="password" show-password v-model="info.Password" />
                    </el-form-item>
                  </div>
                </el-row>
                <!-- <el-row>
                  <div class="widthValue">
                    <el-form-item label="WI-FI二维码：">
                      <el-input type="password" />
                    </el-form-item>
                  </div>
                </el-row> -->
              </div>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="setData">保存</el-button>
                  </el-form-item>
                </div>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <div class="item-sort">5G WI-FI高级配置</div>
        <el-col :span="24" class="card-box">
          <el-card>
            <el-form ref="form" :model="info" label-width="200px" size="mini">
              <!-- <div v-if="info.value"> -->
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="发送功率：">
                      <el-select v-model="info.TransmitPower" style="width: 100%;">
                        <el-option label="100%" value="100" />
                        <el-option label="70%" value="70" />
                        <el-option label="50%" value="50" />
                        <el-option label="35%" value="35" />
                        <el-option label="15%" value="15" />
                      </el-select>
                    </el-form-item>
                  </div>
                </el-row>
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="信道：">
                      <el-select v-model="info.Channel" style="width: 100%;">
                        <el-option label="自动" value="0" />
                        <el-option label="36" value="36" />
                        <el-option label="40" value="40" />
                        <el-option label="44" value="3" />
                        <el-option label="48" value="4" />
                        <el-option label="52" value="5" />
                        <el-option label="56" value="6" />
                        <el-option label="60" value="7" />
                        <el-option label="64" value="8" />
                        <el-option label="149" value="9" />
                        <el-option label="153" value="10" />
                        <el-option label="157" value="11" />
                        <el-option label="161" value="12" />
                        <el-option label="165" value="13" />
                      </el-select>
                    </el-form-item>
                  </div>
                </el-row>
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="WI-FI工作模式：">
                      <el-select v-model="info.WorkMode" style="width: 100%;">
                        <el-option label="MODE_5G_11A" value="1" />
                        <el-option label="MODE_5G_11N" value="2" />
                        <el-option label="MODE_5G_11A_N" value="3" />
                        <el-option label="MODE_5G_11AC" value="4" />
                        <el-option label="MODE_5G_11A_AC" value="5" />
                        <el-option label="MODE_5G_11N_AC" value="6" />
                        <el-option label="MODE_5G_11A_N_AC" value="7" />
                      </el-select>
                    </el-form-item>
                  </div>
                </el-row>
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="带宽：">
                      <el-select v-model="info.Bandwidth" style="width: 100%;">
                        <el-option label="20M" value="1" />
                        <el-option label="40M" value="2" />
                        <el-option label="80M" value="4" />
                        <el-option label="20,40,80M" value="7" />
                      </el-select>
                    </el-form-item>
                  </div>
                </el-row>

                <el-row>
                  <div class="widthValue">
                    <el-form-item label="最大连接用户数：">
                      <el-input type="text" v-model="info.MaxUserCount" />
                    </el-form-item>
                  </div>
                </el-row>
              <!-- </div> -->
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="setData">保存</el-button>
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
         //5Wi-Fi配置
        info: {
          BroadcastSSID: '1',
          Active: '1',
          SSID: '',
          WpaType: '',
          Password: '',
          TransmitPower: '',
          Channel: '0',
          WorkMode: '',
          Bandwidth: '',
          MaxUserCount: ''
        },
        chosetempTab: '0',
      };
    },
    created() {
      var data = {
          "m":        1,
          "n":        22,
          "timestamp":    123421312,
          "token":	sessionStorage.getItem("token"),
          "value":  {
          }
      };
      this.getData(data);
      // this.openLoading();
    },
    methods: {
       // /** 查询WI-Fi配置 */
       getData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.info = res.value;
          this.info.BroadcastSSID = this.info.BroadcastSSID + '';
          this.info.Active = this.info.Active + '';
          this.info.WpaType = this.info.WpaType + '';
          this.info.TransmitPower = this.info.TransmitPower + '';
          this.info.Channel = this.info.Channel + '';
          this.info.WorkMode = this.info.WorkMode + '';
          this.info.Bandwidth = this.info.Bandwidth + '';
        });
      },
      // /** 配置WI-Fi配置 */
      setData(data){
        this.info.BroadcastSSID = Number(this.info.BroadcastSSID);
        this.info.Active = Number(this.info.Active);
        this.info.WpaType = Number(this.info.WpaType);
        this.info.TransmitPower = Number(this.info.TransmitPower);
        this.info.Channel = Number(this.info.Channel);
        this.info.WorkMode = Number(this.info.WorkMode);
        this.info.Bandwidth = Number(this.info.Bandwidth);
        this.info.BroadcastSSID = Number(this.info.BroadcastSSID);
        var data = {
            "m":        1,
            "n":        23,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value": this.info
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置成功");
          var data = {
              "m":        1,
              "n":        22,
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
  .wifi5 .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .wifi5 .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .wifi5 .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .wifi5 .item-sort {
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
    margin-bottom: 0px;
    /* margin-top: 10px; */
  }

  .wifi5 .card-box {
    margin-top: 20px;
  }

  .wifi5 .widthValue {
    width: 30%;
  }

  /* 适用于比6.7寸屏幕小的机型，使用的样式 */
  @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .wifi5 .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .wifi5 .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }

    .wifi5 .widthValue {
      width: 95%;
    }


  }

</style>
