<template>
  <div class="app-container systemSettings">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">修改密码</div>
      <div @click="choseTab('1')">系统时间设置</div>
      <div @click="choseTab('2')">恢复出厂设置</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="旧密码：">
                    <el-input v-model="info.oldPassword" show-password/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="新密码：" >
                    <el-input v-model="info.newPassword" show-password/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="重复新密码：" >
                    <el-input v-model="info.refPassword" show-password/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="savePassword">保存</el-button>
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
            <el-form ref="form" :model="systemTimeInfo" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="系统当前时间：">
                    <el-input v-model="systemTimeInfo.time"  :disabled="true"/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="时区：">
                    <el-select v-model="systemTimeInfo.time_zone" style="width: 100%;">
                      <el-option label="GMT-12" value="GMT-12" />
                      <el-option label="GMT-11" value="GMT-11" />
                      <el-option label="GMT-10" value="GMT-10" />
                      <el-option label="GMT-9" value="GMT-9" />
                      <el-option label="GMT-8" value="GMT-8" />
                      <el-option label="GMT-7" value="GMT-7" />
                      <el-option label="GMT-6" value="GMT-6" />
                      <el-option label="GMT-5" value="GMT-5" />
                      <el-option label="GMT-4" value="GMT-4" />
                      <el-option label="GMT-3" value="GMT-3" />
                      <el-option label="GMT-2" value="GMT-2" />
                      <el-option label="GMT-1" value="GMT-1" />
                      <el-option label="GMT+1" value="GMT+1" />
                      <el-option label="GMT+2" value="GMT+2" />
                      <el-option label="GMT+3" value="GMT+3" />
                      <el-option label="GMT+4" value="GMT+4" />
                      <el-option label="GMT+5" value="GMT+5" />
                      <el-option label="GMT+6" value="GMT+6" />
                      <el-option label="GMT+7" value="GMT+7" />
                      <el-option label="GMT+8" value="GMT+8" />
                      <el-option label="GMT+9" value="GMT+9" />
                      <el-option label="GMT+10" value="GMT+10" />
                      <el-option label="GMT+11" value="GMT+11" />
                      <el-option label="GMT+12" value="GMT+12" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="客户端时间：">
                    <el-input v-model="localnowTime" :disabled="true" />
                  </el-form-item>
                </div>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" style="margin-right: 10px;" @click="getNowTime">获取客户端时间</el-button>
                    <el-button type="primary" @click="syncTimeData">同步客户端时间</el-button>
                  </el-form-item>
                </div>
              </el-row> 
              <el-row>
                <div class="widthValue">
                  <el-form-item label="NTP开关：">
                    <el-switch
                      v-model="systemTimeInfo.NtpActive"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <div v-if="systemTimeInfo.NtpActive == '1'">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="NTP1：">
                    <el-input v-model="systemTimeInfo.NtpServer1"/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="NTP2：">
                    <el-input v-model="systemTimeInfo.NtpServer2"/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="NTP3：">
                    <el-input v-model="systemTimeInfo.NtpServer3"/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="NTP4：">
                    <el-input v-model="systemTimeInfo.NtpServer4"/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="saveTimeData">保存并更新网络时间</el-button>
                  </el-form-item>
                </div>
              </el-row>
              <!-- <el-row>
                <div class="widthValue">
                  <el-form-item label="检测间隔时间：">
                    <el-input />
                  </el-form-item>
                </div>
              </el-row> -->
            
            </div>
              <!-- <el-row>
                <el-col :span="6">
                  <el-form-item label="">
                    <el-button type="primary">保存</el-button>
                  </el-form-item>
                </el-col>
              </el-row>  -->
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="chosetempTab == 2">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="恢复出厂设置：">
                    <el-button type="primary" @click="recovery">恢复</el-button>
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
        //修改密码
        info: {
          oldPassword: '',
          newPassword: '',
          refPassword: '',
        },
        //系统时间设置
        nowTime: '',
        localnowTime: '',
        localnowTimetype: [],
        systemTimeInfo: {
          time: '',
          time_zone: '',
          NtpActive: '1',
          NtpServer1: '',
          NtpServer2: '',
          NtpServer3: '',
          NtpServer4: '',
        },
        intervalId: null,
        intervalId2: null,
        chosetempTab: '0',
      };
    },
    created() {
      // this.openLoading();
    },
    beforeDestroy(){
      clearInterval(this.intervalId);
      clearInterval(this.intervalId2);
    },
    methods: {
      /** 设置密码 */
      savePassword(){
        if(this.info.newPassword != this.info.refPassword){
          this.$message({
            type: 'error',
            message: '两次密码输入不一致'
          });
          return;
        }
        var data = {
            "m":        1,
            "n":        9,
            "timestamp":    123421312,
            "value":  {
              "new_pass": this.info.newPassword
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          console.log('接受参数',res.value.error);
          if(res.value.error == null || res.value.error == undefined){
            this.$message({
              type: 'success',
              message: '修改密码成功'
            });
            this.reset();
          }else{
            this.$message({
              type: 'error',
              message: '修改密码失败'
            });
          }
        });
      },
      //获取系统时间设置
      getTimeData(data){
        var data = {
            "m":        1,
            "n":        46,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.systemTimeInfo.time = res.value.time;
          this.intervalId2 = setInterval(this.formatDate2, 1000);
          this.systemTimeInfo.time_zone = res.value.time_zone;
        });
      },
      //获取NTP开关信息
      getNTPData(data){
        var data = {
            "m":        1,
            "n":        1,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.systemTimeInfo.NtpActive = res.value.NtpActive + '';
          this.systemTimeInfo.NtpServer1 = res.value.NtpServer1;
          this.systemTimeInfo.NtpServer2 = res.value.NtpServer2;
          this.systemTimeInfo.NtpServer3 = res.value.NtpServer3;
          this.systemTimeInfo.NtpServer4 = res.value.NtpServer4;
        });
      },
      //保存并更新网络时间设置
      saveTimeData(data){
        this.systemTimeInfo.NtpActive = Number(this.systemTimeInfo.NtpActive);
        var data = {
            "m":        1,
            "n":        2,
            "timestamp":    123421312,
            "value":  {
              "NtpActive": this.systemTimeInfo.NtpActive,
              "NtpServer1": this.systemTimeInfo.NtpServer1,
              "NtpServer2": this.systemTimeInfo.NtpServer2,
              "NtpServer3": this.systemTimeInfo.NtpServer3,
              "NtpServer4": this.systemTimeInfo.NtpServer4,
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置成功");
          this.getNTPData();
          this.syncTimeData();
        });
      },
      //获取当前时间
      getNowTime(){
        const _this = this;
        var data = _this.formatDate(1,new Date());
        _this.localnowTime = data;
        // console.log(_this.localnowTimetype);
      },
      //自定义时间格式
      formatDate: function (val,value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0'+ MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        if(val == '0'){
        return y + '-' + MM + '-' + d ;
        }
        if(val == '1'){
          this.localnowTimetype = [date.getFullYear(),date.getMonth() + 1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()];
          return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
        // + ' ' + h + ':' + m + ':' + s
      },
      //自定义时间格式
      formatDate2: function (val,value) {
        const _this = this;
        let date1 = (new Date(_this.systemTimeInfo.time)).getTime()+1000;
        let date = new Date(date1);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0'+ MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;        
        _this.systemTimeInfo.time =  y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      },
      //同步客户端时间
      syncTimeData(){
        var data = {
            "m":        1,
            "n":        47,
            "timestamp":    123421312,
            "value":  {
               "time": this.localnowTimetype
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          var data2 = {
            "m":        1,
            "n":        48,
            "timestamp":    123421312,
            "value":  {
              "time_zone": this.systemTimeInfo.time_zone
            }
          };
          console.log('发送请求',data2);
          getDataInfo(data2).then((res) => {
            console.log('接受参数',res);
            this.$modal.msgSuccess("设置成功");
            this.getTimeData()
            this.getNowTime();
          });
        });
      },
      // 表单重置
      reset() {
        this.info = {
          oldPassword: '',
          newPassword: '',
          refPassword: '',
        }
      },
      //恢复出厂设置
      recovery(){
        var data2 = {
            "m":        1,
            "n":        51,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data2);
        getDataInfo(data2).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置成功");
        });
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在加载服务监控数据，请稍候！");
      },
      choseTab(val) {
        this.chosetempTab = val
        if(this.chosetempTab == '1'){
          this.getTimeData()
          // this.getNowTime();
          this.intervalId = setInterval(this.getNowTime, 1000);
          this.getNTPData();
        }
        // this.getData(data)
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
  .systemSettings .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .systemSettings .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .systemSettings .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .systemSettings .item-sort {
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
  .systemSettings .card-box{
    margin-top: 20px;
  }

  .systemSettings .widthValue{
      width: 30%;
  }
  .systemSettings .el-button + .el-button {
    margin-left: 0px;
  }
   /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .systemSettings .tab {
      width: 80%;
      height: 40px;
      margin-top: 10px;
    }

    .systemSettings .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }
    .systemSettings .widthValue{
      width: 95%;
    }

   
  }

  
</style>
