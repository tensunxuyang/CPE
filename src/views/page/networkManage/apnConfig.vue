<template>
  <div class="app-container apnConfig">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">主APN</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="apnInfo" label-width="150px" size="mini">
              <!-- <el-row>
                <div class="widthValue">
                  <el-form-item label="NAT：">
                    <el-switch
                      v-model="apnInfo.NatEnable"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row> -->
              <el-row>
                <div class="widthValue">
                  <el-form-item label="MTU：">
                    <el-input v-model="apnInfo.MTU" />
                    <div class="timeDesc">*非专业人员不建议修改MTU，可能造成无法上网</div>
                  </el-form-item>
                </div>
              </el-row>
              <!-- <el-row>
                <div class="widthValue">
                  <el-form-item label="PDP类型：">
                    <el-select v-model="apnInfo.PDPType" style="width: 100%;">
                      <el-option label="IPV4" value="0" />
                      <el-option label="IPV6" value="1" />
                      <el-option label="IPV4&V6" value="2" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-row> -->
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="saveApnConfig">保存</el-button>
                  </el-form-item>
                </div>
              </el-row> 
            </el-form>
            <div class="item-sort">
              <div>APN列表</div>
              <div>
                <el-button type="text" style="color: #efefef;font-size: 12px;
              font-weight: bold;" @click="addApn">添加APN</el-button>
                <!-- <el-button type="text" style="color: #efefef;font-size: 12px;
              font-weight: bold;" click="submitApn">保存</el-button> -->
                <el-button type="text" style="color: #efefef;font-size: 12px;
              font-weight: bold;" @click="restoreDefault">恢复默认</el-button>
              </div>
            </div>
            <el-table v-loading="loading" :data="apnList">
              <!-- <el-table-column type="selection" width="55" align="center" /> -->
              <el-table-column label="序号" prop="ID" width="120" />
              <el-table-column label="APN名称" prop="Name" :show-overflow-tooltip="true"  />
              <el-table-column label="APN" prop="AccessPointName" :show-overflow-tooltip="true" />
              <el-table-column label="鉴权方式" prop="AuthenticationMethod" />
              <!-- <el-table-column label="PDP类型" prop="PDPType"/> -->
              <el-table-column
                label="PDP类型"
                >
                <template slot-scope="scope">
                  <span>{{scope.row.Protocol == 'ip' ? 'IPV4' : scope.row.Protocol == 'ipv6' ? 'IPV6' : 'IPV4&V6' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="用户激活"
                >
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.Active"
                    @change="changeActive(scope.row)"
                    active-value="1"
                    inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#bfcbd9">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
              label="激活状态"
              >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.IsActived"
                  active-value="1"
                  inactive-value="0"
                  active-color="#13ce66"
                  inactive-color="#bfcbd9"
                  :disabled="true">
                </el-switch>
              </template>
            </el-table-column>
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
       <!-- 添加APN列表 -->
    <el-dialog :title="title" :visible.sync="openDataScope" append-to-body>
      <el-form :model="addApnform" label-width="100px">
        <el-form-item label="APN名称">
          <el-input v-model="addApnform.Name" />
        </el-form-item>
        <el-form-item label="APN">
          <el-input v-model="addApnform.AccessPointName" />
        </el-form-item>
        <el-form-item label="授权方式">
          <el-select v-model="addApnform.AuthenticationMethod" style="width: 100%;">
            <el-option label="pap" value="pap" />
            <el-option label="chap" value="chap" />
            <el-option label="none" value="none" />
          </el-select>
        </el-form-item>
        <el-form-item label="PDP类型：">
          <el-select v-model="addApnform.Protocol" style="width: 100%;">
            <el-option label="IPV4" value="ip" />
            <el-option label="IPV6" value="ipv6" />
            <el-option label="IPV4&V6" value="dual" />
          </el-select>
        </el-form-item>
           
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDataScope">确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
 import { getDataInfo, } from "@/api/cpeApi/system.js";

  export default {
    name: "Server",
    data() {
      return {
        //APN设置查询
        apnInfo: {
          NatEnable: '1',
          MTU: '1500',
        },
        apnList: [
        ],
        //APN添加模态框
        openDataScope: false,
        title: '添加APN',
        addApnform: {
          Name: '',
          AccessPointName: '',
          AuthenticationMethod: '',
          Protocol: '0',
        },
        chosetempTab: '0',
        loading: false        
      };
    },
    created() {
      var data = {
          "m":        1,
          "n":        24,
          "timestamp":    123421312,
          "token":	sessionStorage.getItem("token"),
          "value":  {
          }
      };
      this.getData(data);
      var data2 = {
          "m":        1,
          "n":        44,
          "timestamp":    123421312,
          "token":	sessionStorage.getItem("token"),
          "value":  {
          }
      };
      this.getApnListData(data2);
      // this.openLoading();
    },
    methods: {
      /** 查询APN */
      getData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.apnInfo = res.value;
          this.apnInfo.NatEnable = this.apnInfo.NatEnable + '';
        });
      },
      /** 查询APN列表 */
      getApnListData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.apnList = res.value.ContextsList;
          this.apnList.forEach(item => {
            item.Active = item.Active + '';
            item.IsActived = item.IsActived + '';
            // item.PDPType = item.PDPType + '';
          })
        });
      },
      /** 设置APN */
      saveApnConfig(){
        this.apnInfo.NatEnable = Number(this.apnInfo.NatEnable);
        var data = {
            "m":        1,
            "n":        25,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  this.apnInfo
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置成功");
          var data = {
              "m":        1,
              "n":        24,
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
          //   var data = {
          //       "m":        1,
          //       "n":        24,
          //       "timestamp":    123421312,
          //       "token":	sessionStorage.getItem("token"),
          //       "value":  {
          //       }
          //   };
          //   this.getData(data);
          // }
        });
      },
      //添加APN
      addApn(){
        this.reset();
        this.title = "添加APN";
        this.openDataScope = true;
      },
      /** 确定按钮（添加ANP） */
      submitDataScope: function () {
        // this.$modal.msgSuccess("修改成功");
        if(this.title == "添加APN"){
          // this.addApnform.ID = this.apnList.length;
          // this.apnList.push(this.addApnform);
          this.submitApn();
        }else{  
          this.submiteditApn();
          // this.apnList[this.addApnform.ID].Name = this.addApnform.Name;
          // this.apnList[this.addApnform.ID].AccessPointName = this.addApnform.AccessPointName;
          // this.apnList[this.addApnform.ID].AuthenticationMethod = this.addApnform.AuthenticationMethod;
          // this.$forceUpdate();
        }
        this.cancelDataScope();
      },
      //保存上传APN列表数据
      submitApn(){
        var data = {
            "m":        1,
            "n":        55,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
                "Name": this.addApnform.Name,
		          	"AccessPointName": this.addApnform.AccessPointName,
                "AuthenticationMethod": this.addApnform.AuthenticationMethod,
                "Protocol": this.addApnform.Protocol
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置成功");
          var data2 = {
              "m":        1,
              "n":        44,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getApnListData(data2);
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
          //   var data2 = {
          //       "m":        1,
          //       "n":        44,
          //       "timestamp":    123421312,
          //       "token":	sessionStorage.getItem("token"),
          //       "value":  {
          //       }
          //   };
          //   this.getApnListData(data2);
          // }
        });
      },
      //修改上传APN列表数据
      submiteditApn(){
        var data = {
            "m":        1,
            "n":        58,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
                "ID": this.addApnform.ID,
                "Name": this.addApnform.Name,
		          	"AccessPointName": this.addApnform.AccessPointName,
                "AuthenticationMethod": this.addApnform.AuthenticationMethod,
                "Protocol": this.addApnform.Protocol,
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("修改成功");
          var data2 = {
              "m":        1,
              "n":        44,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getApnListData(data2);
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
          //   var data2 = {
          //       "m":        1,
          //       "n":        44,
          //       "timestamp":    123421312,
          //       "token":	sessionStorage.getItem("token"),
          //       "value":  {
          //       }
          //   };
          //   this.getApnListData(data2);
          // }
        });
      },
      //表格修改
      edit(row){
        console.log(row);
        this.title = "修改APN";
        this.addApnform = Object.assign({},row);
        this.$forceUpdate();
        this.openDataScope = true;
      },
      //表格删除
      del(row){
        console.log(row);
        var data = {
            "m":        1,
            "n":        56,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
                "ID":	row.ID
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          if(res.value.error == null || res.value.error == undefined || res.value.error == '' ){
            // this.$modal.msgSuccess("删除成功");
            var data2 = {
                "m":        1,
                "n":        44,
                "token":	sessionStorage.getItem("token"),
                "timestamp":    123421312,
                "value":  {
                }
            };
            this.getApnListData(data2);
          }else{
            // this.$message({
            //   type: 'error',
            //   message: '删除失败'
            // }); 
          }
          
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
        // this.apnList.splice(row.ID,1);
      },
      //恢复默认
      restoreDefault(){
        var data = {
            "m":        1,
            "n":        59,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("恢复默认成功");
          var data2 = {
              "m":        1,
              "n":        44,
              "token":	sessionStorage.getItem("token"),
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getApnListData(data2);
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
      //激活与去激活
      changeActive(row){
        console.log(row);
        var temp;
        if(row.Active == '1'){
           temp = 62;
        }else{
           temp = 63;
        }
        var data = {
            "m":        1,
            "n":        temp,
            "token":	sessionStorage.getItem("token"),
            "timestamp":    123421312,
            "value":  {
               "id": row.ID
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          // this.$modal.msgSuccess("设置成功");
          var data2 = {
              "m":        1,
              "n":        44,
              "timestamp":    123421312,
              "token":	sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getApnListData(data2);
        });
      },
      // 取消按钮（数据权限）
      cancelDataScope() {
        this.openDataScope = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.addApnform = {
          Name: '',
          AccessPointName: '',
          AuthenticationMethod: '',
          Protocol: '',
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
      }
    }
  };

</script>
<style>
  .apnConfig .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .apnConfig .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .apnConfig .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .apnConfig .item-sort {
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
  .apnConfig .card-box{
    margin-top: 20px;
  }
  .apnConfig .widthValue{
      width: 30%;
  }
  .apnConfig .timeDesc{
    font-size: 12px;
    color: #E6A23C;
    margin-top: 5px;
  }
 /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .apnConfig .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .apnConfig .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }
    .apnConfig .widthValue{
      width: 95%;
    }

   
  }
  
</style>
