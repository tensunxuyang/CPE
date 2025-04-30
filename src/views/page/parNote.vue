<template>
    <div class="app-container parNote">
      <div class="tab" id="tab">
        <div class="choseTab" @click="choseTab('0')">参数注解</div>
      </div>
      <div v-if="chosetempTab == 0">
        <el-row v-for="(item,index) in cardListTemp" :key="index">
          <div class="item-sort">{{item.title}}</div>
          <div class="card-box" v-for="(item2,index2) in item.list" :key="index2">
            <el-card>
              <div class="card-item">
                <div class="card-itemTitle">{{item2.name}}</div>
                <ul>
                  <li><div :title="item2.value" class="card-itemTime">{{item2.value}}</div></li>
                </ul>
                <!-- <div :title="item2.desc" class="card-desc">描述：{{item2.desc}}</div> -->
              </div>
            </el-card>
          </div>
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
          chosetempTab: '0',
          cardListTemp: [],
          cardList: [{
              id: 0,
              title: '移动网络配置',
              list: [{
                  name: '4G Only',
                  value: '只支持LTE网络',
                },
                {
                  name: '5G SA+NSA/4G',
                  value: '支持SA、NSA、LTE网络'
                },
                {
                  name: '5G NSA Only',
                  value: '支持NSA、LTE网路',
                },
                {
                  name: '5G SA Only',
                  value: '只支持SA网络'
                },
                {
                  name: '链路检测开关',
                  value: '开启、关闭链路检测功能',
                },
                {
                  name: '链路检测开关',
                  value: '选择链路检测方式',
                },
                {
                  name: 'IP',
                  value: '链路检测Server IP地址',
                },
                {
                  name: '检测间隔时间',
                  value: '链路检测间隔时间，单位秒，默认10秒',
                },
                {
                  name: '单路模式',
                  value: '链路检测固定检测主路',
                },
                {
                  name: '混合模式',
                  value: '不设置响应式作为重启时，链路检测仅检测用户设置的优先链路；设置响应动作作为重启时，链路检测对主链路和备份链路都进行检测',
                },
              ]
            },
            {
              id: 1,
              title: 'APN配置',
              list: [{
                  name: 'NAT',
                  value: 'NAT开关，默认是开启的',
                },
                {
                  name: 'MTU',
                  value: '设置MTU，PDP类型为IPV4时范围时576～1500，PDP类型时IPV6时范围时1280～1500，默认是1500，非专业人员不建议修改此值，修改后可能造成无法上网',
                },
                {
                  name: 'PDP类型',
                  value: '选择PDP的类型，包括IPV4、IPV6以及IPV4&V6',
                },
                {
                  name: '恢复默认APN',
                  value: '点击【恢复默认】按钮，可恢复系统初始的APN信息',
                },
                {
                  name: '自动',
                  value: '选中后会从网络侧获取APN信息并激活',
                },
                {
                  name: '鉴权方式',
                  value: '选择APN的鉴权方式；PAP、CHAP、PAP&CHAP，或者是NONE',
                },
                {
                  name: '用户名',
                  value: '设置APN鉴权的用户名',
                },
                {
                  name: '密码',
                  value: '设置APN鉴权的密码',
                },
                {
                  name: '移动网络设置',
                  value: '接入名称（APN）是您的设备读取的设置信息名称，该信息用于设置与运营商的手机网络和公共网络之间的网关的连接，大多数情况下，您的设备已在系统文件中进行了这些设置，并且可以在连接时自动填写APN信息，如果自动APN无法上网，您可以自己更改APN',
                },
              ]
            },
            {
              id: 2,
              title: '流量控制',
              list: [{
                  name: '流量限制',
                  value: '注意：流量限制功能开启后当本月流量使用超出设置阈值将自动关闭5G网络通信切换为有线网络',
                },
              ]
            },
            {
              id: 3,
              title: 'WI-FI配置',
              list: [{
                  name: '5G优先',
                  value: '2.4G和5G信号合并显示，同等信号下优选更快的5G，关闭此开关可单独设置',
                },
                {
                  name: 'WI-FI功能',
                  value: '选中时开启无线路由器Wi-Fi功能；不选中时关闭无线路由器WI-FI功能，网络只能使用有线方式连接',
                },
                {
                  name: 'SSID广播',
                  value: '选中时开启SSID广播，其他无线设备可以通过搜索网络搜索到本机的SSID；不选中时关闭SSID广播，不能搜索到本机的SSID，但是通过手工输入SSID，其他客户端可以连接上',
                },
                {
                  name: '无线网络标识（SSID）',
                  value: 'SSID可以简单理解为无线网络的名称，机身及包装标识可见此SSID默认名称，SSID名称由最多不超过32个字符的字母和数字组成区分大小写',
                },
                {
                  name: '认证类型',
                  value: 'WI-FI连接选用的安全形式',
                },
                {
                  name: '安全密钥',
                  value: '设置无线连接的网络密码',
                },
                {
                  name: '发射功率',
                  value: '专业人员设置项，用户一般不用更改',
                },
                {
                  name: '信道',
                  value: '设置无线路由器使用的信道，默认为自动，无线路由器讲自动搜索当前可用的最佳信道，您也可以指定无线网络工作的信道',
                },
                {
                  name: 'WI-FI工作模式',
                  value: '设置无线路由器使用的工作模式',
                },
                {
                  name: '带宽',
                  value: '可以选择20MHz，20或者40MHz或者40MHz',
                },
                {
                  name: '最大连接用户数',
                  value: '允许连接到此设备的最大用户数',
                },
                {
                  name: '按键启动',
                  value: '设备上长按WPS按钮6秒启动2.4G WPS功能，若无按键请尝试网页启动WPS功能',
                },
                {
                  name: 'WPS PIN',
                  value: '输入WPS的PIN码进行WI-FI连接',
                },
                {
                  name: '启动PBC',
                  value: '使用WPS的PBC方式进行WI-FI连接',
                },
                {
                  name: '随机PIN码',
                  value: '生成随机PIN码，客户端输入该PIN码进行WI-FI连接',
                },
              ]
            },
            {
              id: 3,
              title: '设备配置',
              list: [{
                  name: 'LAN IP',
                  value: '设置无线路由器本地IP地址',
                },
                {
                  name: '子网掩码',
                  value: '子网掩码为IP地址中的网络号',
                },
                {
                  name: 'DHCP服务器',
                  value: '设置是否启用DHCP服务，启用时为本路由器上连接的所有客户端自动分配IP地址',
                },
                {
                  name: 'IP地址池',
                  value: '启动DHCP服务时，设置租期时间，非专业人士不建议修改',
                },
                {
                  name: 'IP地址预留',
                  value: '保留地址只是在启用DHCP服务器时有效，单击【添加】按钮给指定MAC地址绑定固定IP地址，此IP地址将只会分配给该MAC地址所属客户端，保存后会自动添加相应的规则到IP-MAC绑定中',
                },
              ]
            },
            {
              id: 4,
              title: '防火墙',
              list: [{
                  name: '远程端口',
                  value: '设置后需要重新登录WEB，如果时本地网络登录，依然可以使用80端口，否则需要用新端口登录！',
                },
              ]
            },
          ],
          // 服务器信息
          server: []
        };
      },
      created() {
        // this.getList();
        // this.openLoading();
        this.cardListTemp = this.cardList
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
          this.cardListTemp = []
          if (this.chosetempTab == '0') {
            this.cardListTemp = this.cardList
          } else {
            // this.cardListTemp = this.cardList2
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
    .parNote .tab {
      width: 50%;
      height: 50px;
      display: flex;
      align-items: center;
      margin-left: 15px;
      color: #999999;
    }
  
    .parNote .tab>div {
      width: 100px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
    }
  
    .parNote .choseTab {
      background: #efefef;
      padding: 5px 0;
      color: #165DFF;
      border-radius: 20px;
    }
  
    .parNote .item-sort {
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
  
    .parNote .card-box {
      width: 25%;
      float: left;
    }

    .parNote .el-card__body{
      /* background: #ecf1f4; */
    }
  
    .parNote .card-item {
      font-size: 14px;
      height: 90px;
    }

    .parNote ul,li {
      padding: 0;
      margin:0 0 0 8px;
    }
  
    .parNote .card-itemTitle {
      font-size: 16px;
      height: 30px;
      font-weight: bold;
      width: 100%;
      /* line-height: 30px; */
      /* background: #d9e5f5; */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    .parNote .card-itemTime {
      color: #838c97;
      font-size: 14px;
      margin-bottom: 10px;
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
      -webkit-line-clamp: 3;
    }
  
    .parNote .card-desc {
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
  
    .parNote .card-table {
      width: 100%;
      padding: 10px 15px;
    }
  
    .parNote .item-sort2 {
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
  
    /* 适用于比6.7寸屏幕小的机型，使用的样式 */
    @media screen and (min-width: 393px) and (max-width: 768px) {
      .app-container {
        padding: 0;
      }
  
      .parNote .tab {
        width: 60%;
        height: 40px;
        margin-top: 10px;
      }
  
      .parNote .item-sort {
        width: calc(100% - 20px);
        margin-left: 10px;
  
      }
  
      .parNote .card-box {
        width: 50%;
        padding-right: 10px;
        padding-left: 10px;
      }
    }
  
  </style>
  