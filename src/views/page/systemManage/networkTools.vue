<template>
  <div class="app-container networkTools">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">Ping</div>
      <!-- <div @click="choseTab('1')">抓包</div> -->
      <div @click="choseTab('1')">Trace</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="URL或者IP地址：">
                    <el-input v-model="info.ip" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="PING次数：">
                    <el-input-number type="number" v-model="info.times" :min="1" :max="100" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" style="margin-right:10px;"  @click="startPing">开始</el-button>
                    <el-button type="primary" @click="stopPing">停止</el-button>
                  </el-form-item>
                </div>
              </el-row> 
              <el-row>
                  <el-form-item label="">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 10}"
                      v-model="info.ping"
                      :disabled="true"
                      >
                    </el-input>
                  </el-form-item>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="clear">清除</el-button>
                  </el-form-item>
                </div>
              </el-row> 
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- <div v-if="chosetempTab == 1">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="infoTcpdump" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="接口名称：">
                    <el-select v-model="infoTcpdump.eth" style="width: 100%;">
                      <el-option label="usb0" value="usb0" />
                      <el-option label="eth0" value="eth0" />
                      <el-option label="vna0" value="vna0" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" style="margin-right:10px;" @click="startTcpdump">开始</el-button>
                    <el-button type="primary" @click="stopTcpdump">停止</el-button>
                  </el-form-item>
                </div>
              </el-row> 
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div> -->
    <div v-if="chosetempTab == 1">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="infoTrace" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="URL或者IP地址：">
                    <el-input v-model="infoTrace.ip" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="端口：">
                    <el-input v-model="infoTrace.port" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" style="margin-right:10px;"  @click="startTrace">开始</el-button>
                    <el-button type="primary" @click="stopTrace">停止</el-button>
                  </el-form-item>
                </div>
              </el-row> 
              <el-row>
                  <el-form-item label="">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 10}"
                      v-model="infoTrace.trace"
                      :disabled="true"
                      >
                    </el-input>
                  </el-form-item>
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
        //ping信息
        info: {
          ip: '',
          times: '4',
          ping: ''
        },
        //tcpdump信息
        infoTcpdump: {
          eth: '',
        },
        uploadUrl: process.env.VUE_APP_BASE + "/eth_dump", // 下载地址
        //trace信息
        infoTrace: {
          ip: '',
          port: '',
          trace: ''
        },
        intervalId: null,
        intervalId2: null,
        chosetempTab: '0',
      };
    },
    created() {
      //轮询PING
      this.anotherThis = this;
      this.anotherThis2 = this;
      this.intervalId = setInterval(() => {
        var data2 = {
              "m":        1,
              "n":        12,
              "timestamp":    123421312,
              "value":  {
              }
          };
          console.log('发送请求',data2);
          getDataInfo(data2).then((res) => {
            console.log('接受参数',res);
            this.anotherThis.info.ping = res.value.ping;
          });
      }, 1000);
    },
    beforeDestroy(){
      clearInterval(this.intervalId);
      clearInterval(this.intervalId2);
    },
    methods: {
      /** 开始PING*/
      startPing(data){
        this.info.times = Number(this.info.times);
        this.info.ping = "";
        var data = {
            "m":        1,
            "n":        10,
            "timestamp":    123421312,
            "value":  {
              "ip": this.info.ip,
              "times": this.info.times,
              "loop":true
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("开始PING操作");
        });
      },
      /** 停止Ping*/
      stopPing(data){
        var data = {
            "m":        1,
            "n":        11,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("停止PING操作");
        });
      },
      //查询PING
      getPingInfo(){
        var data2 = {
              "m":        1,
              "n":        12,
              "timestamp":    123421312,
              "value":  {
              }
          };
          console.log('发送请求',data2);
          getDataInfo(data2).then((res) => {
            console.log('接受参数',res);
            this.info.ping = res.value.ping;
          });
      },
      /** 开始Tcpdump*/
      startTcpdump(data){
        var data = {
            "m":        1,
            "n":        16,
            "timestamp":    123421312,
            "value":  {
              "eth": this.infoTcpdump.eth,
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("开始Tcpdump操作");
          var data2 = {
              "m":        1,
              "n":        18,
              "timestamp":    123421312,
              "value":  {
              }
          };
          console.log('发送请求',data2);
          getDataInfo(data2).then((res) => {
            console.log('接受参数',res);
          });
        });
      },
      /** 停止Tcpdump*/
      stopTcpdump(data){        
        var data = {
            "m":        1,
            "n":        17,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("停止Tcpdump操作");
          this.downLog();
        });
      },
      //下载
      downLog(){
        // const blob = new Blob([this.info.logValue],{type:"text/plain"});
        // const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        // 设置target属性为"_blank"以在新页面中打开链接
        link.target = "_blank";
        link.href = this.uploadUrl;
        var dataName = this.formatDate(0,new Date());
        link.download = dataName + ".txt";
        link.click();
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
          return y + MM + d + h + m + s;
        }
        if(val == '1'){
          return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
        // + ' ' + h + ':' + m + ':' + s
      },
      /** 开始Trace*/
      startTrace(data){
        this.infoTrace.port = Number(this.infoTrace.port);
        this.infoTrace.trace = "";
        var data = {
            "m":        1,
            "n":        13,
            "timestamp":    123421312,
            "value":  {
              "ip": this.infoTrace.ip,
              "port": this.infoTrace.port,
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("开始Trace操作");
        });
      },
      /** 停止Trace*/
      stopTrace(data){
        var data = {
            "m":        1,
            "n":        14,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("停止Trace操作");
        });
      },
      clear(){
        this.info.ping = "";
        this.infoTrace.trace = "";
        //清除ping记录
        var data = {
            "m":        1,
            "n":        68,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("成功清除PING记录");
        });
      },
      //论询查询PING信息
      updateMessage(){
        const _this = this;
        var data2 = {
            "m":        1,
            "n":        12,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data2);
        // console.log(_this.info);
        getDataInfo(data2).then((res) => {
          console.log('接受参数',res);
          _this.info.ping = res.value.ping;
        });
      },
      //论询查询trace信息
      updateMessage2(){
        const _this = this;
        var data2 = {
            "m":        1,
            "n":        15,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data2);
        // console.log(_this.info);
        getDataInfo(data2).then((res) => {
          console.log('接受参数',res);
          _this.infoTrace.trace = res.value.trace;
        });
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在加载服务监控数据，请稍候！");
      },
      choseTab(val) {
        this.chosetempTab = val;
        clearInterval(this.intervalId);
        clearInterval(this.intervalId2);
        if(this.chosetempTab == 0){
          //轮询PING
          this.intervalId = setInterval(this.updateMessage, 1000);
        }
        else if(this.chosetempTab == 1){
          //轮询trace
          this.intervalId2 = setInterval(this.updateMessage2, 1000);
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
  .networkTools .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .networkTools .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .networkTools .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .networkTools .item-sort {
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
  .networkTools .card-box{
    margin-top: 20px;
  }
  .networkTools .widthValue{
      width: 30%;
  }
  .networkTools .el-button + .el-button {
    margin-left: 0px;
  }
   /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .networkTools .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .networkTools .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }
    .networkTools .widthValue{
      width: 95%;
    }

   
  }

  
</style>
