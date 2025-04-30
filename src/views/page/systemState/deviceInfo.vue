<template>
    <div class="app-container deviceInfo">
      <div class="tab" id="tab">
        <div class="choseTab" @click="choseTab('0')">设备信息</div>
      </div>
      <div v-if="chosetempTab == 0">
        <el-row v-for="(item,index) in cardListTemp" :key="index">
          <div class="item-sort">{{item.title}}</div>
          <div class="card-box" v-for="(item2,index2) in item.list" :key="index2">
            <el-card>
              <div class="card-item">
                <div :title="item2.name" class="card-itemTitle">{{item2.name}}</div>
                <div class="card-itemTime">{{item2.value}}</div>
                <el-progress v-if="item2.progress" :percentage="item2.progressValue" status="success" :show-text="false" stroke-width="8"></el-progress>
                <!-- <div :title="item2.desc" class="card-desc">描述：{{item2.desc}}</div> -->
              </div>
            </el-card>
          </div>
        </el-row>
        <div class="nodeta" v-if="this.cardListTemp.length == 0">
          <img src="../../../assets/icon/zanwushuju1.png">
          <span>暂无数据</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getDataInfo, } from "@/api/cpeApi/system.js";
  
    export default {
      name: "Server",
      data() {
        return {
          chosetempTab: '0',
          cardListTemp: [],
          cardList: [
            {
              id: 0,
              title: '运行状态',
              list: [{
                  name: '运行时间',
                  value: '-/-',
                },
                {
                  name: '平均负载',
                  value: '-/-'
                },
                {
                  name: '内存使用情况',
                  value: '101.89MB已用/196.48MB总量',
                  progress: true
                },
                {
                  name: '空闲内存',
                  value: '71.51MB'
                },
                {
                  name: '内存缓存',
                  value: '21.84MB',
                },
                {
                  name: 'Flash使用情况',
                  value: '5.00MB已用/77.05MB总量',
                  progress: true
                },
                {
                  name: 'AP CPU温度',
                  value: '-/-°C',
                  progress: true
                },
                // {
                //   name: 'AP CPU1温度',
                //   value: '-/-°C',
                //   progress: true
                // },
                // {
                //   name: 'AP CPU TOP温度',
                //   value: '-/-°C',
                //   progress: true
                // },
              ]
            },
            {
              id: 1,
              title: '设备和版本信息',
              list: [
                {
                  name: '设备型号',
                  value: '-/-',
                  progress: false
                },
                {
                  name: '软件版本',
                  value: '-/-',
                  progress: false
                },
                {
                  name: '硬件版本',
                  value: '-/-',
                  progress: false
                },
                {
                  name: 'SN',
                  value: '-/-',
                  progress: false
                },
              ]
            },
            {
              id: 2,
              title: '板块信息',
              list: [{
                  name: 'IMEI',
                  value: '-/-',
                  progress: false
                },
                {
                  name: 'IMSI',
                  value: '-/-',
                  progress: false
                },
                {
                  name: 'ICCID',
                  value: '-/-',
                  progress: false
                },
                // {
                //   name: 'MSISDN',
                //   value: '-/-',
                //   progress: false
                // },
              ]
            }
          ],
          cardList2: [{
            id: 0,
            title: '分类一',
            list: [{
                name: 'APN',
                value: '-/-',
                desc: 'APN指一种网络接入技术，是设备上网时必须配置的一个参数，它决定了手机通过那种接入方式来访问网络'
              },
              {
                name: 'IP地址',
                value: '-/-',
                desc: 'IP地址是分配始连接到使用因特网协议进行通信的计算机网络的每个设备的数字标签'
              },
              {
                name: '信号强度',
                value: '-/-'
              },
              {
                name: '首选DNS',
                value: '-/-'
              },
              {
                name: '备用DNS',
                value: '-/-'
              },
              {
                name: 'IPV6',
                value: '-/-'
              },
              {
                name: '首选IPV6 DNS',
                value: '-/-'
              },
              {
                name: '备选IPV6 DNS',
                value: '-/-'
              },
              {
                name: '已接受包数',
                value: '-/-'
              },
              {
                name: '已发送包数',
                value: '-/-'
              },
              {
                name: '已接受字节数',
                value: '-/-'
              },
              {
                name: '已发送字节数',
                value: '-/-'
              },
              {
                name: '接口名称',
                value: '-/-'
              },
  
            ]
          }, ],
        };
      },
      created() {
        var data = {
            "m":        1,
            "n":        32,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        this.getData(data);
        var data2 = {
            "m":        1,
            "n":        65,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        this.getData(data2);
        var data3 = {
            "m":        1,
            "n":        33,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        this.getData(data3);
        var data4 = {
            "m":        1,
            "n":        39,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        this.getData(data4);
        var data5 = {
            "m":        1,
            "n":        71,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        this.getData(data5);
        var data6 = {
            "m":        1,
            "n":        74,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        this.getData(data6);
      },
      methods: {
        // /** 查询服务器信息 */
        getData(data){
          console.log('发送请求',data);
          this.cardListTemp = []
          this.cardListTemp = this.cardList
          if(data.n == "32"){
            getDataInfo(data).then((res) => {
              console.log('接受参数',res);
              this.cardListTemp[0].list[0].value = res.value.up_time;
              this.cardListTemp[0].list[1].value = res.value.cpu_avg.split(" ")[0] + '%';
              this.cardListTemp[0].list[2].value = Number( res.value.MemoryTotal - res.value.MemoryFree ) + "MB已用/" +  res.value.MemoryTotal + 'MB总量';
              this.cardListTemp[0].list[2].progressValue = Number( res.value.MemoryTotal - res.value.MemoryFree )/res.value.MemoryTotal * 100;
              this.cardListTemp[0].list[3].value = res.value.MemoryFree;
              this.cardListTemp[0].list[4].value = res.value.MemoryCached;
              this.cardListTemp[0].list[5].value = (Math.round(res.value.used_diskspace * 100) / 100) + "MB已用/" +  (Math.round(res.value.avail_diskspace * 100) / 100) + 'MB总量';
              this.cardListTemp[0].list[5].progressValue = (Math.round(res.value.used_diskspace * 100) / 100) / (Math.round(res.value.avail_diskspace * 100) / 100) * 100;
            });
          }
          else if(data.n == "33"){
            getDataInfo(data).then((res) => {
              console.log('接受参数',res.value.length);
              if(res.value.length != undefined && res.value.length !=0){
                // if(res.value[0].Present == true){
                //   this.cardListTemp[2].list[1].value = res.value[1].CardIdentifier;
                //   this.cardListTemp[2].list[2].value = res.value[2].SubscriberIdentity;
                //   if(res.value[7].SubscriberNumbers.length !=0 ){
                //     this.cardListTemp[2].list[3].value = res.value[7].SubscriberNumbers[0];
                //   }
                // }
                res.value.forEach((item,index) => {
                  // console.log(Object.keys(item));
                  if(Object.keys(item)[0] == "Present"){
                    if(item.Present != true){
                      return;
                    }
                  }
                  if(Object.keys(item)[0] == "SubscriberIdentity"){
                    this.cardListTemp[2].list[1].value = item.SubscriberIdentity;
                  }
                  if(Object.keys(item)[0] == "CardIdentifier"){
                    this.cardListTemp[2].list[2].value = item.CardIdentifier;
                  }
                  // if(Object.keys(item)[0] == "Present"){
                  //   console.log("Present"+item);
                    //  if(item.Present == true){
                    //    if(Object.keys(item)[0] == "SubscriberIdentity"){
                    //       this.cardListTemp[2].list[1].value = item.SubscriberIdentity;
                    //    }
                    //    if(Object.keys(item)[0] == "CardIdentifier"){
                    //       this.cardListTemp[2].list[2].value = item.CardIdentifier;
                    //    }
                    //   //  if(Object.keys(item)[0] == "SubscriberNumbers"){
                    //   //     if(item.SubscriberNumbers.length != 0){
                    //   //       this.cardListTemp[2].list[3].value = item.SubscriberNumbers[0];
                    //   //     }
                    //   //  }
                    //  }
                  // }
                })
              }
             
            });
          }
          else if(data.n == "65"){
            getDataInfo(data).then((res) => {
              console.log('接受参数',res.value);
              this.cardListTemp[1].list[0].value = res.value["product_model "];
              this.cardListTemp[1].list[1].value = res.value["sw_version "];
              this.cardListTemp[1].list[2].value = res.value["hw_version "];
            });
          }
          else if(data.n == "39"){
            getDataInfo(data).then((res) => {
              console.log('接受参数',res.value);
              this.cardListTemp[2].list[0].value = res.value.Serial;
            });
          }
          else if(data.n == "71"){
            getDataInfo(data).then((res) => {
              console.log('接受参数',res.value);
              this.cardListTemp[0].list[6].value = res.value.CPU0 + '°C';
              this.cardListTemp[0].list[6].progressValue = Number( res.value.CPU0 / 110 ) * 100;
            });
          }
          else if(data.n == "74"){
            getDataInfo(data).then((res) => {
              console.log('接受参数',res.value);
              this.cardListTemp[1].list[3].value = res.value.sn;
            });
          }
        },
        // 打开加载层
        openLoading() {
          this.$modal.loading("正在加载服务监控数据，请稍候！");
        },
        choseTab(val) {
          this.chosetempTab = val
          this.cardListTemp = []
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
    .deviceInfo .tab {
      width: 50%;
      height: 50px;
      display: flex;
      align-items: center;
      margin-left: 15px;
      color: #999999;
    }
  
    .deviceInfo .tab>div {
      width: 100px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
    }
  
    .deviceInfo .choseTab {
      background: #efefef;
      padding: 5px 0;
      color: #165DFF;
      border-radius: 20px;
    }
  
    .deviceInfo .item-sort {
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
  
    .deviceInfo .card-box {
      width: 20%;
      float: left;
    }
  
    .deviceInfo .card-item {
      font-size: 12px;
      height: 70px;
    }
  
    .deviceInfo .card-itemTitle {
      font-size: 14px;
      height: 30px;
      font-weight: bold;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    .deviceInfo .card-itemTime {
      color: #bfcbd9;
      margin-bottom: 10px;
    }
  
    .deviceInfo .card-desc {
      margin-top: 10px;
      color: #838c97;
      width: 100%;
      overflow: hidden;
      /** 超出部分隐藏**/
      word-break: break-all;
      /** 单词断句 break-all允许将单词换行**/
      text-overflow: ellipsis;
      /** 显示省略符号来代表被修剪的文本。**/
      display: -webkit-box;
      /** 对象作为伸缩盒子模型显示 **/
      -webkit-box-orient: vertical;
      /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 1;
    }
  
    .deviceInfo .card-table {
      width: 100%;
      padding: 10px 15px;
    }
  
    .deviceInfo .item-sort2 {
      width:100%;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      font-size: 12px;
      padding-left: 10px;
      color: #fff;
      font-weight: bold;
      background: #6287ee;
      margin-bottom: 20px;
      /* margin-top: 10px; */
    }
    .nodeta{
    width: 100%;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    font-size: 14px;
    margin-top: 15%;
    font-weight: 900;
    img{
      width: 150px;
    }
    span{
      margin-top: 20px;
      margin-right: 20px;
    }
  }
  
    /* 适用于比6.7寸屏幕小的机型，使用的样式 */
    @media screen and (min-width: 393px) and (max-width: 768px) {
      .app-container {
        padding: 0;
      }
  
      .deviceInfo .tab {
        width: 60%;
        height: 40px;
        margin-top: 10px;
      }
  
      .deviceInfo .item-sort {
        width: calc(100% - 20px);
        margin-left: 10px;
  
      }
  
      .deviceInfo .card-box {
        width: 50%;
        padding-right: 10px;
        padding-left: 10px;
      }
    }
  
  </style>
  