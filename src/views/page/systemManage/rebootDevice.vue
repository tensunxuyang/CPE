<template>
  <div class="app-container rebootDevice">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">重启设备</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="" label-width="0px">
                    <el-button type="primary" @click="getData">重启设备</el-button>
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
        info: {

        },
        chosetempTab: '0',
      };
    },
    created() {
      // this.openLoading();
    },
    methods: {
      /** 重启设备信息 */
      getData(data){
        var data = {
            "m":        1,
            "n":        45,
            "timestamp":    123421312,
            "value":  {
            }
        };
        console.log('发送请求',data);
        this.openLoading();
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          if(res.value.error != null && res.value.error != undefine){
            setTimeout(() => {
             this.$modal.closeLoading();
             this.$modal.msgSuccess("重启失败");
            },2000)
          }else{
            setTimeout(() => {
             this.$modal.closeLoading();
             this.$modal.msgSuccess("重启成功");
             location.href = "/";
            },100000)
          }
        });
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在设备重启，请稍候！");
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
  .rebootDevice .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .rebootDevice .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .rebootDevice .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .rebootDevice .item-sort {
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
  .rebootDevice .card-box{
    margin-top: 20px;
  }
  .rebootDevice .widthValue{
      width: 30%;
    }
   /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .rebootDevice .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .rebootDevice .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }
    .rebootDevice .widthValue{
      width: 95%;
    }

   
  }

  
</style>
