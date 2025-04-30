<template>
  <div class="app-container simFunction">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">PIN码</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="simPinInfo" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="开启PIN码验证：">
                    <el-switch
                      v-model="simPinInfo.PinRequired"
                      active-value="1"
                      inactive-value="0"
                      @change="toChange($event, simPinInfo)"
                      active-color="#13ce66"
                      inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue" v-if="simPinInfo.PinRequired == '1'">
                  <el-form-item label="旧PIN码：">
                    <el-input type="password" v-model="simPinInfo.oldpin" show-password/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue" v-if="simPinInfo.PinRequired == '1'">
                  <el-form-item label="新PIN码：">
                    <el-input type="password" v-model="simPinInfo.newpin" show-password/>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="">
                    <el-button type="primary" @click="setnewData" :disabled="simPinInfo.PinRequired == 0">修改PIN码</el-button>
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
        //修改PIN码
        simPinInfo: {
          PinRequired: '0',
          pass: "",
          oldpin: "",
          newpass: ""
        },
        chosetempTab: '0',
      };
    },
    created() {
      var data = {
          "m":        1,
          "n":        33,
          "timestamp":    123421312,
          "value":  {
          }
      };
      this.getData(data);
    },
    methods: {
      /** 查询PIN */
      getData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数33',res);
          console.log(res.value);
          var temp = false;
          // res.value.forEach(item => {
          //   if(item.LockedPins.length != 0){
          //       temp = true;
          //   }
          // })
          for(var i=0;i<res.value.length;i++){
            // console.log(Object.keys(res.value[i])[0]);
            if(Object.keys(res.value[i])[0] == "LockedPins"){
              console.log(res.value[i]["LockedPins"]);
              if(res.value[i]["LockedPins"].length != 0){
                  temp = true;
              }
            }
          }
          if(temp == true){
            this.simPinInfo.PinRequired = '1'
          }else{
            this.simPinInfo.PinRequired = '0'
          }
        });
      },
       /** 开启PIN按钮状态改变 */
      toChange(callback, obj){
        if (callback == '0') {
          obj.PinRequired = '1'
        } else {
          obj.PinRequired = '0'
        }
      this.$prompt('请输入PIN码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        if(value == null){
          this.$message({
            type: 'error',
            message: '输入PIN码才能开启'
          }); 
          return;
        }
          if (obj.PinRequired== '0') {
            obj.PinRequired= '1';
            this.simPinInfo.pass = value;
            this.simPinInfo.oldpin = value;
            var data = {
                "m":        1,
                "n":        34,
                "timestamp":    123421312,
                "value":  {
                    pass: this.simPinInfo.pass
                }
            };
            this.setData(data)
          } else {
            obj.PinRequired= '0';
            this.simPinInfo.pass = value;
            this.simPinInfo.oldpin = value;
            var data = {
                "m":        1,
                "n":        35,
                "timestamp":    123421312,
                "value":  {
                    pass: this.simPinInfo.pass
                }
            };
            this.setData(data)
          }
          this.$forceUpdate();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });   
        });
      },
      /** 开启、关闭PIN */
      setData(data){
        this.$message.closeAll()
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          if(res.value.error == null || res.value.error == undefined || res.value.error == '' ){
            this.$message({
              type: 'success',
              message: 'PIN设置成功'
            });
          }else{
            this.$message({
              type: 'error',
              message: 'PIN设置失败'
            }); 
          }
          var data = {
              "m":        1,
              "n":        33,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getData(data);
          // this.simPinInfo.pass = "";
          // this.simPinInfo.newpass = "";
        });
      },
      /** 修改PIN */
      setnewData(){
        var data = {
            "m":        1,
            "n":        36,
            "timestamp":    123421312,
            "value":  {
              "oldpin": this.simPinInfo.oldpin,
              "newpin": this.simPinInfo.newpin
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          if(res.value.error == null || res.value.error == undefined || res.value.error == '' ){
            this.$message({
              type: 'success',
              message: 'PIN修改成功'
            });
          }else{
            this.$message({
              type: 'error',
              message: 'PIN修改失败'
            }); 
          }
          var data = {
              "m":        1,
              "n":        33,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getData(data);
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
  .simFunction .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .simFunction .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .simFunction .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .simFunction .item-sort {
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
  .simFunction .card-box{
    margin-top: 20px;
  }
  .simFunction .widthValue{
      width: 30%;
  }
   /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .simFunction .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .simFunction .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }
    .simFunction .widthValue{
      width: 95%;
    }

   
  }

  
</style>
