<template>
  <div class="app-container vanStatus">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">移动网络</div>
      <div @click="choseTab('1')">主APN信息</div>
      <div @click="choseTab('2')">邻区信息</div>
    </div>
    <div v-if="chosetempTab == 0 || chosetempTab == 1">
      <el-row v-for="(item,index) in cardListTemp" :key="index">
        <div class="item-sort">{{item.title}}</div>
        <div class="card-box" v-for="(item2,index2) in item.list" :key="index2">
          <el-card>
            <div class="card-item">
              <div :title="item2.name" class="card-itemTitle">{{item2.name}}</div>
              <div class="card-itemTime">{{item2.value}}</div>
              <div :title="item2.desc" class="card-desc">{{item2.desc != null ? '描述：' : ''}}{{item2.desc}}</div>
            </div>
          </el-card>
        </div>
      </el-row>
      <div class="nodeta" v-if="this.cardListTemp.length == 0">
        <img src="../../../assets/icon/zanwushuju1.png">
        <span>暂无数据</span>
      </div>
    </div>
    <div class="card-table" v-else>
      <div class="item-sort2">4G邻区信息</div>
      <el-table v-loading="loading" :data="new4GList">
        <el-table-column label="Technology" prop="Technology" width="120" :show-overflow-tooltip="true" />
        <el-table-column label="PhysicalCellId" prop="PhysicalCellId" width="120" :show-overflow-tooltip="true"/>
        <el-table-column label="TrackingAreaCode" prop="TrackingAreaCode" width="140" />
        <el-table-column label="EARFCN" prop="EARFCN" width="120" />
        <el-table-column label="EBand" prop="EBand" />
        <el-table-column label="RSRQ" prop="RSRQ" />
        <el-table-column label="RSRP" prop="RSRP" />
        <el-table-column label="SINR" prop="SINR" />
        <el-table-column label="RSSI" prop="RSSI" />
      </el-table>
      <div class="item-sort2">5G邻区信息</div>
      <el-table v-loading="loading" :data="newList">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <!-- <el-table-column label="序号" prop="roleId" width="120" /> -->
        <el-table-column label="Technology" prop="Technology" width="120" :show-overflow-tooltip="true" />
        <el-table-column label="PhysicalCellId" prop="PhysicalCellId" width="120" :show-overflow-tooltip="true"/>
        <el-table-column label="TrackingAreaCode" prop="TrackingAreaCode" width="140" />
        <el-table-column label="NR-ARFCN" prop="NR-ARFCN" width="120"/>
        <el-table-column label="NR-Band" prop="NR-Band" />
        <el-table-column label="SS-RSRQ" prop="SS-RSRQ" />
        <el-table-column label="SS-RSRP" prop="SS-RSRP" />
        <el-table-column label="SS-SINR" prop="SS-SINR" />
        <el-table-column label="CSI-RSRQ" prop="CSI-RSRQ" />
        <el-table-column label="CSI-RSRP" prop="CSI-RSRP" />
        <el-table-column label="CSI-SINR" prop="CSI-SINR" />
      </el-table>
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
        operatorsList: {
          "46000": "中国移动",
          "46001": "中国联通",
          "46002": "中国移动",
          "46003": "中国电信",
          "46004": "中国移动",
          "46005": "中国电信",
          "46006": "中国联通",
          "46007": "中国移动",
          "46008": "中国移动",
          "46009": "中国联通",
          "46010": "中国联通",
          "46011": "中国电信",
          "46012": "中国电信",
          "46013": "中国移动",
          "46015": "中国广电",
          "46020": "中国移动",
        },
        cardList: [
          {
            id: 0,
            title: '分类一',
            list: [{
                name: '运营商',
                value: '-/-',
              },
              {
                name: '当前系统时间',
                value: '-/-'
              },
              {
                name: '网络模式',
                value: '-/-'
              },
              {
                name: '信号强度',
                value: '-/-',
                desc: '信号强度百分比'
              },
              {
                name: 'RSRP',
                value: '-/-',
                desc: 'LTE参考信号接受功率'
              },
              {
                name: 'RSSI',
                value: '-/-',
                desc: 'LTE接受的信号强度指示'
              },
              {
                name: 'RSRQ',
                value: '-/-',
                desc: 'LTE参考信号接受质量'
              },
              {
                name: 'SINR',
                value: '-/-',
                desc: 'LTE信号与干扰加噪音声比'
              },
              {
                name: 'PCI',
                value: '-/-',
                desc: '物理小区ID'
              },
              {
                name: '频点',
                value: '-/-',
              },
              {
                name: 'eNodeB/gNodeB ID',
                value: '-/-',
                desc: '4G/5G基站ID'
              },
              {
                name: 'EUTRAN/NR Cell ID',
                value: '-/-',
              },
              {
                name: 'CQI',
                value: '-/-',
                desc: '信道质量的信息指示'
              },
              {
                name: '上行MCS',
                value: '-/-',
                desc: '调制与编码策略'
              },
              {
                name: '下行MCS',
                value: '-/-',
                desc: '调制与编码策略'
              },
              {
                name: 'SS-RSRP',
                value: '-/-',
                desc: 'NR SS 参考信号接收功率'
              },
              {
                name: 'SS-RSRQ',
                value: '-/-',
                desc: 'NR SS 参考信号接收质量'
              },
              {
                name: 'SS-SINR',
                value: '-/-',
                desc: 'NR SS 信号与干扰加噪声比'
              },
              {
                name: 'CSI-RSRP',
                value: '-/-',
                desc: 'NR CSI 参考信号接收功率'
              },
              {
                name: 'CSI-RSRQ',
                value: '-/-',
                desc: 'NR CSI 参考信号接收质量'
              },
              {
                name: 'CSI-SINR',
                value: '-/-',
                desc: 'NR CSI 信号与干扰加噪声比'
              },
              {
                name: 'Timing Advance',
                value: '-/-',
                desc: '定时提前量'
              },
             
            ]
          },
          {
            id: 1,
            title: '分类二',
            list: [
              {
                name: '上行带宽',
                value: '-/-',
                desc: '移动网络的带宽'
              },
              {
                name: '下行带宽',
                value: '-/-',
                desc: '移动网络的带宽'
              },
              {
                name: 'ECGI/NCGI',
                value: '-/-',
                desc: 'E-UTRAN/NR小区全局标识符'
              },
              {
                name: '当前频段',
                value: '-/-'
              },
              {
                name: 'Rank类型',
                value: '-/-'
              },
              {
                name: '下行BLER',
                value: '-/-',
                desc: '下行误块率'
              },
              // {
              //   name: '本次开机业务总流量',
              //   value: '-/-'
              // },
              // {
              //   name: '月流量',
              //   value: '-/-'
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
            // {
            //   name: '信号强度',
            //   value: '-/-'
            // },
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
        nareaList: 	[],
        new4GList: [],
        newList: [],
        loading: false,
        intervalId: null,
        timeTemp: ''
      };
    },
    created() {
      this.cardListTemp = this.cardList;
      var data = {
          "m":        1,
          "n":        46,
          "timestamp":    123421312,
          "value":  {
          }
      };
      this.getTimeData(data);
      var data2 = {
          "m":        1,
          "n":        37,
          "timestamp":    123421312,
          "value":  {
          }
      };
      this.getOperatorsData(data2)
      // var data3 = {
      //     "m":        1,
      //     "n":        41,
      //     "timestamp":    123421312,
      //     "value":  {
      //     }
      // };
      // this.getnetworkData(data3);
      var data4 = {
          "m":        1,
          "n":        24,
          "timestamp":    123421312,
          "value":  {
          }
      };
      this.getFlowData(data4);
      var data5 = {
          "m":        1,
          "n":        70,
          "timestamp":    123421312,
          "value":  {
          }
      };
      this.getlteData(data5);
      var data6 = {
          "m":        1,
          "n":        72,
          "timestamp":    123421312,
          "value":  {
          }
      };
      this.getSignalData(data6)
    },
    beforeDestroy(){
      clearInterval(this.intervalId);
    },
    methods: {
      /** 查询当前系统时间接口 */
      getTimeData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.cardListTemp[0].list[1].value = res.value.time;
          this.timeTemp = res.value.time;
          this.intervalId = setInterval(this.formatDate2, 1000);
        });
      },
      //自定义时间格式
      formatDate2: function (val,value) {
        const _this = this;
        let date1 = (new Date(_this.timeTemp)).getTime()+1000;
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
        _this.timeTemp =  y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        _this.cardListTemp[0].list[1].value = _this.timeTemp
      },
      /** 查询频点接口 */
      getlteData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.cardListTemp[0].list[2].value = res.value.Technology;
          this.cardListTemp[0].list[4].value = res.value.RSRP;
          this.cardListTemp[0].list[5].value = res.value.RSSI;
          this.cardListTemp[0].list[6].value = res.value.RSRQ;
          this.cardListTemp[0].list[7].value = res.value.SINR;
          this.cardListTemp[0].list[8].value = res.value.PhysicalCellId;
          this.cardListTemp[0].list[11].value = res.value.CellId;
          this.cardListTemp[0].list[12].value = res.value["ChannelQualityIndicator"];
          this.cardListTemp[0].list[13].value = res.value["UL-MCS"];
          this.cardListTemp[0].list[14].value = res.value["UL-MCS"];
          this.cardListTemp[0].list[15].value = res.value["SS-RSRP"];
          this.cardListTemp[0].list[16].value = res.value["SS-RSRQ"];
          this.cardListTemp[0].list[17].value = res.value["SS-SINR"];
          this.cardListTemp[0].list[18].value = res.value["CSI-RSRP"];
          this.cardListTemp[0].list[19].value = res.value["CSI-RSRQ"];
          this.cardListTemp[0].list[20].value = res.value["CSI-SINR"];
          this.cardListTemp[0].list[21].value = res.value["TimingAdvance"];
          this.cardListTemp[1].list[0].value = res.value["UL-Bandwidth"];
          this.cardListTemp[1].list[1].value = res.value["DL-Bandwidth"];
          this.cardListTemp[1].list[2].value = res.value.MobileCountryCode + ' ' + res.value.MobileNetworkCode + ' ' + res.value.CellId;
          this.cardListTemp[1].list[4].value = res.value["Rank"];
          this.cardListTemp[1].list[5].value = res.value["DL-BlockErrorRate"];
          if(res.value.Technology == "lte"){
            this.cardListTemp[0].list[9].value = res.value.EARFCN;
            this.cardListTemp[0].list[10].value = res.value["eNB-ID"];
            this.cardListTemp[1].list[3].value = res.value.EBand;
          }else{
            this.cardListTemp[0].list[9].value = res.value["NR-ARFCN"];
            this.cardListTemp[0].list[10].value = res.value["gNB-ID"];
            this.cardListTemp[1].list[3].value = res.value["NR-Band"];
          }
        });
      },
      /** 查询运营商 */
      getOperatorsData(data){
        console.log('发送请求',data);
        // console.log(this.operatorsList[undefined])
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          var nameCode = res.value.MobileCountryCode  + res.value.MobileNetworkCode + '';
          this.cardListTemp[0].list[0].value = (this.operatorsList[nameCode] == undefined || this.operatorsList[nameCode] == null)  ? nameCode : this.operatorsList[nameCode];
          // this.cardListTemp[0].list[3].value = res.value.Strength;
        });
      },
      /** 查询信号强度 */
      getSignalData(data){
        console.log('发送请求',data);
        // console.log(this.operatorsList[undefined])
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.cardListTemp[0].list[3].value = res.value;
        });
      },
      // /** 查询网络模式 */
      // getnetworkData(data){
      //   console.log('发送请求',data);
      //   getDataInfo(data).then((res) => {
      //     console.log('接受参数',res);
      //     this.cardListTemp[0].list[2].value = res.value.TechnologyPreference;
      //   });
      // },
      /** 查询流量设置信息 */
      getFlowData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.cardListTemp[1].list[6].value = res.value.MaxMonthFlow + "MB";
          this.cardListTemp[1].list[7].value = res.value.CurrentMonthFlow + "MB";
        });
      },
      /** 查询APN信息 */
      getApnListData(){
        var data = {
            "m":        1,
            "n":        69,
            "timestamp":    123421312,
            "value":  {
              "ethName":"vna0"
            }
        };
        getDataInfo(data).then((res) => {
          this.cardListTemp[0].list[4].value = res.value.IPV6;
        })
        var data = {
            "m":        1,
            "n":        64,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.cardListTemp[0].list[0].value = res.value.PdpInfoList[0].Name;
          this.cardListTemp[0].list[1].value = res.value.PdpInfoList[0].Ipv4Addr;
          if(res.value.PdpInfoList[0].Ipv4DNSCount != 0){
            this.cardListTemp[0].list[2].value = res.value.PdpInfoList[0].Ipv4DNS[0];
            this.cardListTemp[0].list[3].value = res.value.PdpInfoList[0].Ipv4DNS[1];
          }
          // this.cardListTemp[0].list[4].value = res.value.PdpInfoList[0].Ipv6Addr;
          if(res.value.PdpInfoList[0].Ipv6DNSCount != 0){
            this.cardListTemp[0].list[5].value = res.value.PdpInfoList[0].Ipv6DNS[0];
            this.cardListTemp[0].list[6].value = res.value.PdpInfoList[0].Ipv6DNS[1];
          }
          this.cardListTemp[0].list[11].value = res.value.PdpInfoList[0].AccessPointName;
        });
        //包数、节数
        var data2 = {
            "m":        1,
            "n":        24,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data2);
        getDataInfo(data2).then((res) => {
          console.log('接受参数',res);
          this.cardListTemp[0].list[7].value = res.value.DownlinkPackets
          this.cardListTemp[0].list[8].value = res.value.UplinkPackets
          this.cardListTemp[0].list[9].value = res.value.CurrentPoweronDownlinkFlow + 'MB'
          this.cardListTemp[0].list[10].value = res.value.CurrentPoweronUplinkFlow + 'MB'
        });
        //信号强度
        var data3 = {
            "m":        1,
            "n":        37,
            "timestamp":    123421312,
            "value":  {
            }
        };
        // getDataInfo(data3).then((res) => {
        //   console.log('接受参数',res);
        //   this.cardListTemp[0].list[2].value = res.value.Strength;
        // });
      },
      //查询邻区信息
      getNareaData(data){
        var data = {
            "m":        1,
            "n":        73,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.nareaList = [];
          this.newList = [];
          this.new4GList = [];
          this.nareaList = res.value;
          this.nareaList.forEach((item,index) => {
            if(item[0][0]["Technology"] == "lte"){
              var str = {
                "Technology": item[0][0]["Technology"],
                "PhysicalCellId": item[0][1].PhysicalCellId,
                "TrackingAreaCode": item[0][2].TrackingAreaCode,
                "EARFCN": item[0][3]["EARFCN"],
                "EBand": item[0][4]["EBand"],
                "RSRQ": item[0][5]["RSRQ"],
                "RSRP": item[0][6]["RSRP"],
                "SINR": item[0][7]["SINR"],
                "RSSI": item[0][8]["RSSI"],
              }
              this.new4GList.push(str);
            }
            if(item[0][0]["Technology"] == "nr"){
              var str = {
                "Technology": item[0][0]["Technology"],
                "PhysicalCellId": item[0][1].PhysicalCellId,
                "TrackingAreaCode": item[0][2].TrackingAreaCode,
                "NR-ARFCN": item[0][3]["NR-ARFCN"],
                "NR-Band": item[0][4]["NR-Band"],
                "SS-RSRQ": item[0][5]["SS-RSRQ"],
                "SS-RSRP": item[0][6]["SS-RSRP"],
                "SS-SINR": item[0][7]["SS-SINR"],
                "CSI-RSRQ": item[0][8]["CSI-RSRQ"],
                "CSI-RSRP": item[0][9]["CSI-RSRP"],
                "CSI-SINR": item[0][10]["CSI-SINR"],
              }
              this.newList.push(str);
            }
          })
          // this.$modal.closeLoading();
        });
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在加载服务监控数据，请稍候！");
      },
      choseTab(val) {
        this.chosetempTab = val
        if(this.chosetempTab == '0'){
          this.cardListTemp = this.cardList;
          var data = {
              "m":        1,
              "n":        46,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getTimeData(data);
          var data2 = {
              "m":        1,
              "n":        37,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getOperatorsData(data2)
          var data3 = {
              "m":        1,
              "n":        24,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getFlowData(data3);
          var data4 = {
              "m":        1,
              "n":        72,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getSignalData(data4)
        }
        else if(this.chosetempTab == '1'){
          this.cardListTemp = this.cardList2;
          clearInterval(this.intervalId);
          this.getApnListData();
        }
        else{
          this.getNareaData();
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
  .vanStatus .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .vanStatus .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .vanStatus .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .vanStatus .item-sort {
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

  .vanStatus .card-box {
    width: 20%;
    float: left;
  }

  .vanStatus .card-item {
    font-size: 12px;
    height: 70px;
  }

  .vanStatus .card-itemTitle {
    font-size: 14px;
    height: 30px;
    font-weight: bold;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .vanStatus .card-itemTime {
    color: #bfcbd9;
  }

  .vanStatus .card-desc {
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

  .vanStatus .card-table {
    width: 100%;
    padding: 10px 15px;
  }

  .vanStatus .item-sort2 {
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

    .vanStatus .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .vanStatus .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }

    .vanStatus .card-box {
      width: 50%;
      padding-right: 10px;
      padding-left: 10px;
    }
  }

</style>
