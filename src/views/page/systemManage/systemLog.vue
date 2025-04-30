<template>
  <div class="app-container systemLog">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">系统日志</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row style="margin-bottom: 10px;">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 20}"
                  v-model="info.logValue"
                  :disabled="true"
                  >
                </el-input>
                <!-- <div style="background: #cbcbcc;padding: 10px;margin-bottom: 20px;" v-html="info.logValue"></div> -->
              </el-row>
              <el-row>
                <div class="widthValue">
                  <el-form-item label="" label-width="0px">
                    <el-button type="primary" @click="clearLog">清除</el-button>
                    <el-button type="primary" @click="downLog">导出</el-button>
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
        //获取日志信息
        info: {
          logValue: "",
        },
        chosetempTab: '0',
      };
    },
    created() {
      var data = {
          "m":        1,
          "n":        19,
          "timestamp":    123421312,
          "value":  {
          }
      };
      this.getData(data);
    },
    methods: {
       /** 查询日志信息 */
       getData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.info.logValue = res.value.log;
        });
      },
      //清除日志
      clearLog(){
        var data = {
            "m":        1,
            "n":        52,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("清除成功");
          var data2 = {
              "m":        1,
              "n":        19,
              "timestamp":    123421312,
              "value":  {
              }
          };
          this.getData(data2);
        });
      },
      //导出日志
      downLog(){
        const blob = new Blob([this.info.logValue],{type:"text/plain"});
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "系统日志.txt";
        link.click();
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
  .systemLog .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .systemLog .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .systemLog .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .systemLog .item-sort {
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
  .systemLog .card-box{
    margin-top: 20px;
  }

  .systemLog .widthValue{
      width: 30%;
    }
   /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .systemLog .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .systemLog .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }
    .systemLog .widthValue{
      width: 95%;
    }

   
  }

  
</style>
