<template>
  <div class="app-container wifi2G">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">2.4G</div>
      <div @click="choseTab('1')">连接客户端列表</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row v-for="(item,index) in cardListTemp" :key="index" style="justify-content:start;">
        <div class="item-sort" v-show="item.title != ''">{{item.title}}</div>
        <el-col :span="4" class="card-box" v-for="(item2,index2) in item.list" :key="index2">
          <el-card>
            <div class="card-item">
              <div class="card-itemTitle">{{item2.name}}</div>
              <div class="card-itemTime">{{item2.value}}</div>
              <div :title="item2.desc" class="card-desc">{{item2.desc != undefine ? '描述：' : ''}}{{item2.desc}}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="nodeta" v-if="this.cardListTemp.length == 0">
        <img src="../../../assets/icon/zanwushuju1.png">
        <span>暂无数据</span>
      </div>
    </div>
    <div class="card-table" v-else>
      <el-table v-loading="loading" :data="tableList">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="序号" prop="index" width="120" />
        <el-table-column label="主机名" prop="HostName" :show-overflow-tooltip="true"  />
        <el-table-column label="MAC" prop="MAC" :show-overflow-tooltip="true"  />
        <el-table-column label="IP地址" prop="IP"  />
        <!-- <el-table-column label="SSID" prop="SSID" width="100" />
        <el-table-column label="信号强度(DBm)" prop="SSID" />
        <el-table-column label="发送速率(Mbit/s)" prop="SSID" />
        <el-table-column label="接受速率(Mbit/s)" prop="SSID" /> -->
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
        cardList: [{
          id: 0,
          title: '分类一',
          list: [{
              name: '当前WI-FI模式',
              value: '-/-'
            },
            {
              name: '当前工作模式',
              value: '-/-'
            },
            {
              name: 'WI-FI功能',
              value: '-/-',
              desc: '显示Wi-Fi网络是开启的或者是关闭的'
            },
            {
              name: 'SSID广播',
              value: '-/-',
              desc: '便于无线设备（手机、平板、笔记本、带有无线网卡的台式电脑）搜索到该路由器的无线信号'
            },
            {
              name: 'SSID',
              value: '-/-',
              desc: 'WLAN的名称'
            },
            {
              name: '信道',
              value: '-/-',
              desc: '为了多路通信，把可用的频率段划分成多个小的片段，不同设备只允许使用特定的频段'
            },
            {
              name: '带宽',
              value: '-/-'
            },
            {
              name: '认证类型',
              value: '-/-'
            },
          ]
        }, ],
        cardList2: [],
        WorkModelist:[
          {
            MODE_2_4G_11B: 1,
            MODE_2_4G_11G: 2,
            MODE_2_4G_11B_G: 3,
            MODE_2_4G_11N: 4,
            MODE_2_4G_11B_N: 5,
            MODE_2_4G_11G_N: 6,
            MODE_2_4G_11B_G_N: 7,
          },
          {
            MODE_5G_11A: 1,
            MODE_5G_11N: 2,
            MODE_5G_11A_N: 3,
            MODE_5G_11AC: 4,
            MODE_5G_11A_AC: 5,
            MODE_5G_11N_AC: 6,
            MODE_5G_11A_N_AC: 7,
          }
        ],
        Bandwidth4G: {
          1: '20m',
          2: '40m',
          3: '20+40m',
        },
        Bandwidth5G: {
          1: '20m',
          2: '40m',
          4: '80m',
          7: '20,40,80M',
        },
        WpaTypelist: {
          WPA_NONE : 0,
          WPA1 : 1,
          WPA2_PSK : 2,
          WPA_WPA2_PSK : 3,
          WPA3_PSK  : 4,
          WPA2_WPA3_PSK : 6,
        },
        tableList: [],
        loading: false
      };
    },
    created() {
      // console.log(Object.keys(this.WorkModelist[0])[0]);
      // console.log(this.Bandwidth4G["1"]);
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
       // /** 查询2.4GWIFI信息 */
       getData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          if (this.chosetempTab == '0') {
            this.cardListTemp = this.cardList;
            this.cardListTemp[0].list[0].value = res.value.WifiMode
            this.cardListTemp[0].list[1].value = Object.keys(this.WorkModelist[0])[res.value.WorkMode - 1];
            this.cardListTemp[0].list[2].value = res.value.Active == 0 ? '关闭' : '开启';
            this.cardListTemp[0].list[3].value = res.value.BroadcastSSID == 0 ? '关闭' : '开启';
            this.cardListTemp[0].list[4].value = res.value.SSID;
            this.cardListTemp[0].list[5].value = res.value.Channel;
            this.cardListTemp[0].list[6].value = this.Bandwidth4G[res.value.Bandwidth];
            this.cardListTemp[0].list[7].value = Object.keys(this.WpaTypelist)[res.value.WpaType];
          } else {
            res.value.ConnectedDevice.forEach((item,index) => {
               item.index = index;
            })
            this.tableList = res.value.ConnectedDevice
          }
        });
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在加载服务监控数据，请稍候！");
      },
      choseTab(val) {
        this.chosetempTab = val
        this.chosetempTab = val
        var parms = val == 0 ? 20 : val == 1 ? 7 : 0;
        var data = {
            "m":        1,
            "n":        parms,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        this.getData(data)
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
  .wifi2G .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .wifi2G .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .wifi2G .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .wifi2G .item-sort {
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

  .wifi2G .card-item {
    font-size: 12px;
    height: 90px;
  }

  .wifi2G .card-itemTitle {
    font-size: 14px;
    height: 30px;
    font-weight: bold;
  }

  .wifi2G .card-itemTime {
    color: #bfcbd9;
  }
  .wifi2G .card-desc {
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
    -webkit-line-clamp: 2;
  }

  .wifi2G .card-table {
    width: 100%;
    padding: 10px 15px;
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

  @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .wifi2G .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .wifi2G .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }

    .wifi2G .card-box {
      width: 50%;
      padding-right: 10px;
      padding-left: 10px;
    }
  }

</style>
