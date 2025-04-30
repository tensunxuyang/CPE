<template>
  <div class="app-container dhcpStatus">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">DHCP</div>
      <div @click="choseTab('1')">设备列表</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row v-for="(item,index) in cardListTemp" :key="index" style="justify-content:start;">
        <div class="item-sort">{{item.title}}</div>
        <el-col :span="4" class="card-box" v-for="(item2,index2) in item.list" :key="index2">
          <el-card>
            <div class="card-item">
              <div class="card-itemTitle">{{item2.name}}</div>
              <div class="card-itemTime">{{item2.value}}</div>
              <div :title="item2.desc" class="card-desc">{{item2.desc != null ? '描述：' : ''}}{{item2.desc}}</div>
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
      <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55" align="center" /> -->
        <el-table-column label="序号" prop="index" width="120" />
        <el-table-column label="主机名" prop="HostName" :show-overflow-tooltip="true" />
        <el-table-column label="MAC" prop="MAC" :show-overflow-tooltip="true" />
        <el-table-column label="IP地址" prop="IP" />
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
        cardList: [
          {
          id: 0,
          title: '分类一',
          list: [{
              name: 'LAN网关',
              value: '-/-',
              desc: 'LAN网关标识的是该LAN网络的网关IP'
            },
            {
              name: 'DHCP服务器',
              value: '-/-'
            },
            {
              name: '子网掩码',
              value: '-/-'
            },
            {
              name: '起始IP',
              value: '-/-',
              desc: '开始IP标识了该LAN网络的IP地址分配范围'
            },
            {
              name: '结束IP',
              value: '-/-',
              desc: '结束IP标识了该LAN网络的IP地址分配范围'
            },
            {
              name: '接口MAC地址',
              value: '-/-',
              desc: '设备的MAC地址是分配给网络接口控制器（NIC）的唯一标识符'
            },
            {
              name: '接口名称',
              value: '-/-',
              desc: '该LAN网络对应的虚拟接口的名称'
            },
          ]
        } ],
        cardList2: [],
        tableList: [],
      };
    },
    created() {
      var data = {
          "m":        1,
          "n":        1,
          "timestamp":    123421312,
          "token":	sessionStorage.getItem("token"),
          "value":  {
          }
      };
      this.getData(data);
    },
    methods: {
      // /** 查询DHCP状态信息 */
      getData(data){
        console.log('发送请求',data);
        this.cardListTemp = [];
        this.tableList = [];
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          if (this.chosetempTab == '0') {
            this.cardListTemp = this.cardList;
            this.cardListTemp[0].list[0].value = res.value.IP;
            this.cardListTemp[0].list[1].value = res.value.Active == 0 ? '关闭' : '开启';
            this.cardListTemp[0].list[2].value = res.value.Netmask;
            this.cardListTemp[0].list[3].value = res.value.IPRange_0;
            this.cardListTemp[0].list[4].value = res.value.IPRange_1;
            this.cardListTemp[0].list[5].value = res.value.InterfaceMac;
            this.cardListTemp[0].list[6].value = res.value.InterfaceName;
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
        var parms = val == 0 ? 1 : val == 1 ? 7 : '';
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
  .dhcpStatus .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .dhcpStatus .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .dhcpStatus .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .dhcpStatus .item-sort {
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

  .dhcpStatus .card-item {
    font-size: 12px;
    height: 90px;
  }

  .dhcpStatus .card-itemTitle {
    font-size: 14px;
    height: 30px;
    font-weight: bold;
  }

  .dhcpStatus .card-itemTime {
    color: #bfcbd9;
  }
  .dhcpStatus .card-desc {
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

  .dhcpStatus .card-table {
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

    .dhcpStatus .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .dhcpStatus .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }

    .dhcpStatus .card-box {
      width: 50%;
      padding-right: 10px;
      padding-left: 10px;
    }
  }

</style>
