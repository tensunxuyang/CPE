<template>
  <div class="app-container dhcpConfig">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">主DHCP配置</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box">
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="LAN IP：">
                    <el-input v-model="info.IP" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="子网掩码：">
                    <el-input v-model="info.Netmask" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="DHCP服务器：">
                    <el-switch v-model="info.Active" 
                    active-value="1" 
                    inactive-value="0"
                    active-color="#13ce66" inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="主DNS：">
                    <el-input v-model="info.DNS_0"  />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="辅DNS：">
                    <el-input v-model="info.DNS_1"/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue2">
                  <el-form-item label="IP地址池：">
                    <el-input v-model="info.IPRange_0" />
                  </el-form-item>
                  <el-form-item label="-" label-width="30px">
                    <el-input v-model="info.IPRange_1" />
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue2">
                  <el-form-item label="租期时间：">
                    <el-input  v-model="info.LeaseTime" />
                  </el-form-item>
                  <span>小时</span>
                </div>
                <!-- <el-col :span="6">
                  <el-form-item label="小时" label-width="50px">
                  </el-form-item>
                </el-col> -->
              </el-row>

              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="saveConfig">保存</el-button>
                  </el-form-item>
                </div>
              </el-row>
            </el-form>
            <div class="item-sort">
              <div>IP地址预留：</div>
              <div>
                <el-button type="text" style="color: #efefef;font-size: 12px;
              font-weight: bold;" @click="addMac">添加</el-button>
                <!-- <el-button type="text" style="color: #efefef;font-size: 12px;
              font-weight: bold;" @click="submitMac">保存</el-button> -->
                <el-button type="text" style="color: #efefef;font-size: 12px;
              font-weight: bold;" @click="delAll">全部删除</el-button>
              </div>
            </div>
            <el-table v-loading="loading" :data="macList">
              <!-- <el-table-column type="selection" width="55" align="center" /> -->
              <!-- <el-table-column label="序号" prop="ID" width="200" /> -->
              <el-table-column label="IP" prop="IP" :show-overflow-tooltip="true"  />
              <el-table-column label="MAC" prop="MAC" :show-overflow-tooltip="true"  />
              <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <!-- <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button> -->
                  <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 添加预留IP地址 -->
    <el-dialog :title="title" :visible.sync="openDataScope" append-to-body>
      <el-form :model="addMacform" label-width="100px">
        <el-form-item label="ip名称">
          <el-input v-model="addMacform.IP" placeholder="示例：192.168.0.2" />
        </el-form-item>
        <el-form-item label="mac地址名称">
          <el-input v-model="addMacform.MAC" placeholder="示例：BB:AC:6F:BB:7E:3F" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDataScope">确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
 import { getDataInfo, } from "@/api/cpeApi/system.js";

  export default {
    name: "Server",
    data() {
      return {
        //主DHCP配置
        info: {
          IP: '',
          Netmask: '',
          Active: '1',
          DNS_0: '',
          DNS_1: '',
          IPRange_0: '',
          IPRange_1: '',
          LeaseTime: ''
        },
        // 预留IP地址列表
        macList: [
        ],
        //MAC添加模态框
        openDataScope: false,
        title: '添加MAC',
        addMacform: {
          IP: '',
          MAC: ''
        },
        chosetempTab: '0',
        // 遮罩层
        loading: false,

      };
    },
    created() {
      var data = {
          "m":        1,
          "n":        1,
          "timestamp":    123421312,
          "value":  {
          }
      };
      this.getData(data);
      var data2 = {
          "m":        1,
          "n":        3,
          "timestamp":    123421312,
          "value":  {
          }
      };
      this.getIpListData(data2);
    },
    methods: {
      /** 查询主DHCP设置 */
      getData(data) {
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.info = res.value;
          this.info.Active = this.info.Active + "";
        });
      },
      /** 查询IP列表 */
      getIpListData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.macList = res.value.FixAddressList;
        });
      },
       /** 设置主DHCP */
       saveConfig(){
        this.info.Active = Number(this.info.Active);
        this.info.LeaseTime = Number(this.info.LeaseTime);
        var data = {
            "m":        1,
            "n":        2,
            "timestamp":    123421312,
            "value":  this.info
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置成功");
          var data = {
              "m":        1,
              "n":        1,
              "timestamp":    123421312,
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
      //添加MAC
      addMac() {
        this.reset();
        this.title = "添加MAC";
        this.openDataScope = true;
      },
      /** 确定按钮（添加MAC） */
      submitDataScope: function () {
        // this.$modal.msgSuccess("修改成功");
        if(this.title == "添加MAC"){
           this.submitMac();
          // this.addMacform.ID = this.macList.length;
          // this.macList.push(this.addMacform);
        }else{        
          // this.macList[this.addMacform.ID].IP = this.addMacform.IP;
          // this.macList[this.addMacform.ID].MAC = this.addMacform.MAC;
          // this.$forceUpdate();
        }
        this.cancelDataScope();
      },
      //保存上传APN列表数据
      submitMac(){
        var data = {
            "m":        1,
            "n":        4,
            "timestamp":    123421312,
            "value":  {
                "mac":	this.addMacform.MAC,
			        	"ip":	this.addMacform.IP
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("添加成功");
          var data2 = {
              "m":        1,
              "n":        3,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getIpListData(data2);
          // if(res.value.error != null || res.value.error != undefined || res.value.error != '' ){
          //   this.$message({
          //     type: 'error',
          //     message: '保存失败'
          //   });  
          // }else{
          //   this.$message({
          //     type: 'success',
          //     message: '保存成功'
          //   });
          // }
        });
      },
      //表格修改
      edit(row){
        console.log(row);
        this.title = "修改APN";
        this.addMacform = Object.assign({},row);
        this.$forceUpdate();
        this.openDataScope = true;
      },
      //表格删除
      del(row){
        console.log(row);
        var data = {
            "m":        1,
            "n":        5,
            "timestamp":    123421312,
            "value":  {
                "mac":	row.MAC,
			        	"ip":	row.IP
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("删除成功");
          var data2 = {
              "m":        1,
              "n":        3,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getIpListData(data2);
          // if(res.value.error != null || res.value.error != undefined || res.value.error != '' ){
          //   this.$message({
          //     type: 'error',
          //     message: '保存失败'
          //   });  
          // }else{
          //   this.$message({
          //     type: 'success',
          //     message: '保存成功'
          //   });
          // }
        });
        // this.macList.splice(row.ID,1);
        // this.macList.forEach((item,index) => {
        //   item.ID = index;
        // })
      },
      //表格删除所有
      delAll(){
        var data = {
            "m":        1,
            "n":        6,
            "timestamp":    123421312,
            "value":  {
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("删除所有IP成功");
          var data2 = {
              "m":        1,
              "n":        3,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getIpListData(data2);
          // if(res.value.error != null || res.value.error != undefined || res.value.error != '' ){
          //   this.$message({
          //     type: 'error',
          //     message: '全部删除失败'
          //   });  
          // }else{
          //   this.$message({
          //     type: 'success',
          //     message: '全部删除成功'
          //   });
          // }
        });
      },
      // 取消按钮（数据权限）
      cancelDataScope() {
        this.openDataScope = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.addMacform = {
          IP: '',
          MAC: ''
        }
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
      },
    }
  };

</script>
<style>
  .dhcpConfig .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .dhcpConfig .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .dhcpConfig .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .dhcpConfig .item-sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
    color: #fff;
    font-weight: bold;
    background: #6287ee;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .dhcpConfig .card-box {
    margin-top: 20px;
  }

  .dhcpConfig .widthValue {
    width: 30%;
  }

  .dhcpConfig .widthValue2 {
    width: 60%;
    display: flex;

    span {
      font-size: 14px;
      color: #606266;
      line-height: 28px;
      margin-left: 10px;
    }
  }

  .el-dialog {
    width: 40%;
  }

  .el-dialog:not(.is-fullscreen) {
    margin-top: 25vh !important;
  }

  /* 适用于比6.7寸屏幕小的机型，使用的样式 */
  @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .dhcpConfig .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .dhcpConfig .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }

    .dhcpConfig .widthValue {
      width: 95%;
    }

    .dhcpConfig .widthValue2 {
      width: 100%;
    }

    .el-dialog {
      width: 90%;
    }

    .el-dialog:not(.is-fullscreen) {
      margin-top: 30vh !important;
    }


  }

</style>
