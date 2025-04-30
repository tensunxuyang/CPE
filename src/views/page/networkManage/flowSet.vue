<template>
  <div class="app-container flowSet">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">流量限制</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box">
          <el-card>
            <el-form ref="form" :model="flowInfo" label-width="150px" size="mini">
              <el-row>
                <div class="widthValue">
                  <el-form-item label="限制开关：">
                    <el-switch v-model="flowInfo.FlowStatisticsEnable"  
                      @change="savesetData()" 
                      active-value="1"
                      inactive-value="0" 
                      active-color="#13ce66" 
                      inactive-color="#bfcbd9">
                    </el-switch>
                  </el-form-item>
                </div>
              </el-row>
              <div v-if="flowInfo.FlowStatisticsEnable == 1">
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="流量限制：">
                      <div style="display: flex;">
                        <el-input-number style="width:100%" v-model="flowInfo.MaxMonthFlow" controls-position="right" 
                        :min="1" :max="999999"></el-input-number>
                        <div class="unit">(范围：0～999999MB)</div>
                      </div>
                    </el-form-item>
                  </div>
                </el-row>
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="计费周期开始日：">
                      <div style="display: flex;">
                        <el-input  v-model="flowInfo.MonthFlowStartDate"/>
                        <div class="unit">(范围：1～31)</div>
                      </div>
                    </el-form-item>
                  </div>
                </el-row>
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="">
                      <el-button type="primary" @click="setData">保存</el-button>
                    </el-form-item>
                  </div>
                </el-row>
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="本次开机后使用流量：">
                      <el-input :disabled="true" v-model="flowInfo.CurrentPoweronFlow"/>
                    </el-form-item>
                  </div>
                </el-row>
                <el-row>
                  <div class="widthValue">
                    <el-form-item label="">
                      <div class="chart-wrapper">
                        <pie-chart ref="piechart" :pieData="pieData"/>
                      </div>
                    </el-form-item>
                  </div>
                </el-row>
                <!-- <el-row>
                  <div class="widthValue">
                    <el-form-item label="">
                      <el-button type="primary" @click="flowCalibration">流量校准</el-button>
                    </el-form-item>
                  </div>
                </el-row> -->
              </div>
              
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { getDataInfo, } from "@/api/cpeApi/system.js";
  import PieChart from '../../dashboard/PieChart2.vue'

  export default {
    name: "Server",
    components: {
      PieChart,
    },
    data() {
      return {
        //流量设置参数
        flowInfo: {
          FlowStatisticsEnable: '1',
          MaxMonthFlow: '',
          MonthFlowStartDate: '1',
          CurrentPoweronFlow: ''
        },
        //流量校准图标数据
        pieData: [
          {
            value: 0,
            name: '本月已使用',
          },
          {
            value: 0,
            name: '本月剩余流量'
          },
        ],
        intervalId: null,
        chosetempTab: '0',
      };
    },
    created() {
      var data = {
          "m":        1,
          "n":        24,
          "timestamp":    123421312,
          "token":sessionStorage.getItem("token"),
          "value":  {
          }
      };
      this.getData(data);
    },
    methods: {
      /** 查询流量设置信息 */
      getData(data){
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.flowInfo.FlowStatisticsEnable = res.value.FlowStatisticsEnable + '';
          this.flowInfo.MaxMonthFlow = res.value.MaxMonthFlow;
          this.flowInfo.CurrentPoweronFlow = res.value.CurrentPoweronFlow + 'MB';
          this.flowInfo.MonthFlowStartDate = res.value.MonthFlowStartDate;
          setTimeout(() => {
            this.pieData[0].value = res.value.CurrentMonthFlow;
            this.pieData[1].value = res.value.MaxMonthFlow - res.value.CurrentMonthFlow;
            this.$refs.piechart.initChart();
          }, 100)
          this.$forceUpdate();
        });
      },
      /** 轮询查询流量设置信息 */
      getPollingData(){
        const _this = this;
        var data = {
              "m":        1,
              "n":        24,
              "timestamp":    123421312,
              "token":sessionStorage.getItem("token"),
              "value":  {
              }
          };
        getDataInfo(data).then((res) => {
          console.log('轮询接受参数',res.value.FlowCalibrationStatus);
          if(res.value.FlowCalibrationStatus == 0){
            _this.$modal.msgSuccess("流量校准成功");
            clearInterval(_this.intervalId);
            _this.$modal.closeLoading();
          }
          if(res.value.FlowCalibrationStatus < 0){
            _this.$modal.msgSuccess("流量校准失败");
            clearInterval(_this.intervalId);
            _this.$modal.closeLoading();
          }
          _this.flowInfo.FlowStatisticsEnable = res.value.FlowStatisticsEnable + '';
          _this.flowInfo.MaxMonthFlow = res.value.MaxMonthFlow;
          _this.flowInfo.CurrentPoweronFlow = res.value.CurrentPoweronFlow + 'MB';
          _this.flowInfo.MonthFlowStartDate = res.value.MonthFlowStartDate;
          setTimeout(() => {
            _this.pieData[0].value = res.value.CurrentMonthFlow;
            _this.pieData[1].value = res.value.MaxMonthFlow - res.value.CurrentMonthFlow;
            _this.$refs.piechart.initChart();
          }, 100)
          _this.$forceUpdate();
        });
      },
      /** 设置流量设置信息 */
      setData(){
        this.flowInfo.FlowStatisticsEnable = Number(this.flowInfo.FlowStatisticsEnable);
        this.flowInfo.MaxMonthFlow = Number(this.flowInfo.MaxMonthFlow);
        this.flowInfo.MonthFlowStartDate = Number(this.flowInfo.MonthFlowStartDate);
        var data = {
            "m":        1,
            "n":        25,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  this.flowInfo
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置成功");
          var data = {
              "m":        1,
              "n":        24,
              "timestamp":    123421312,
              "token":sessionStorage.getItem("token"),
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
      //按钮保存流量按钮
      savesetData(){
        this.flowInfo.FlowStatisticsEnable = Number(this.flowInfo.FlowStatisticsEnable);
        var data = {
            "m":        1,
            "n":        25,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
              FlowStatisticsEnable:  this.flowInfo.FlowStatisticsEnable,
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$modal.msgSuccess("设置成功");
          var data = {
              "m":        1,
              "n":        24,
              "timestamp":    123421312,
              "token":sessionStorage.getItem("token"),
              "value":  {
              }
          };
          this.getData(data);
        });
      },
      /** 流量校验 */
      flowCalibration(){
        this.openLoading();
        var data = {
            "m":        1,
            "n":        53,
            "timestamp":    123421312,
            "token":	sessionStorage.getItem("token"),
            "value":  {
            }
        };
        console.log('发送请求',data);
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          this.$message.closeAll()
          // this.$modal.msgSuccess("校准成功");
          if(res.value.error == null || res.value.error == undefined || res.value.error != '' ){
            this.intervalId = setInterval(this.getPollingData, 1000);
          }else{
            this.$message({
              type: 'error',
              message: res.value.error
            });  
            this.$modal.closeLoading();
          }
          // if(res.value.error != null || res.value.error != undefined || res.value.error != '' ){
          //   this.$message({
          //     type: 'error',
          //     message: '流量校准失败'
          //   });  
          // }else{
          //   this.$message({
          //     type: 'success',
          //     message: '流量校准成功'
          //   });
          // }
        });
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在流量校准，请稍候！");
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
  .flowSet .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .flowSet .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .flowSet .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .flowSet .item-sort {
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

  .flowSet .card-box {
    margin-top: 20px;
  }

  .flowSet .widthValue {
    width: 40%;
  }
  .flowSet .unit{
    width: 200px;
    font-size: 12px;
    color: green;
    margin-left: 20px;
  }

  /* 适用于比6.7寸屏幕小的机型，使用的样式 */
  @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .flowSet .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .flowSet .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;

    }

    .flowSet .widthValue {
      width: 95%;
    }


  }

</style>
