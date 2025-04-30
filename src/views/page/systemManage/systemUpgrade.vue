<template>
  <div class="app-container systemUpgrade">
    <div class="tab" id="tab">
      <div class="choseTab" @click="choseTab('0')">系统升级</div>
    </div>
    <div v-if="chosetempTab == 0">
      <el-row>
        <el-col :span="24" class="card-box" >
          <el-card>
            <el-form ref="form" :model="info" label-width="150px" size="mini">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="" label-width="0px">
                    <el-upload
                      class="upload-demo"
                      drag
                      :before-upload="handleBeforeUpload"
                      :on-success="handleAvatarSuccess"
                      :action="uploadUrl"
                      :headers="customHeaders"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row> 
              <el-row>
                <el-col :span="6">
                  <el-button size="mini" type="primary" @click="remoteFlashingStatus">检测远程刷机包</el-button>
                  <el-button size="mini" type="primary" @click="remoteFlashingFn"  :disabled="remoteFlashing == true">远程刷机</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
        
      </el-row>
      
    </div>
  </div>
</template>

<script>

  import axios from "axios";
  import { getDataInfo, } from "@/api/cpeApi/system.js";


  export default {
    name: "Server",
    data() {
      return {
        uploadUrl: process.env.VUE_APP_BASE_API + "/upload", // 上传的服务器地址
        uploadStartUrl: process.env.VUE_APP_BASE_API + "/upload/start", // 上传的服务器地址
        uploadStopUrl: process.env.VUE_APP_BASE_API + "/upload/stop", // 上传的服务器地址
        upgradeUrl: process.env.VUE_APP_BASE_API + "/upload/update", // 执行升级指令
        customHeaders: {
          'Content-Type': 'application/octet-stream'
        },
        //分段上传
        chunkSize: 1024 * 1024, // 每个分段的大小，这里以1MB为例
        fileChunks: [], // 存储文件分段的数组
        activeChunk: 0, // 当前处理的分段
        info: {
        },
        chosetempTab: '0',
        intervalId: null,
        remoteFlashing: true
      };
    },
    created() {
   
    },
    beforeDestroy(){
      clearInterval(this.intervalId);
    },
    methods: {
      //上传之前的钩子函数
      handleBeforeUpload(file) {
        // const reader = new FileReader();
        // reader.readAsArrayBuffer(file);
        // reader.onload = e => {
        //   const binaryData = e.target.result;
        //   // 使用你的上传方法，这里以 axios 为例
        //   this.uploadFile(this.uploadImgUrl, binaryData, file.name);
        // };
        // return false; // 阻止默认上传行为
        // 创建文件的分段
        const chunkSize = this.chunkSize;
        for (let i = 0; i < file.size; i += chunkSize) {
          const chunk = file.slice(i, i + chunkSize);
          this.fileChunks.push(chunk);
        }
        if (this.fileChunks.length > 0) {
          this.uploadChunk(this.fileChunks[0], 0);
        }
        return false; // 阻止默认上传行为
      },
      //分段上传检查
      uploadChunk(chunk, index) {
        this.$message.closeAll()
        if(this.activeChunk == 0){
          axios.post(this.uploadStartUrl).then(response => {
            // 处理服务器响应
            this.openLoading();
            console.log(response);
          }).catch(error => {
            console.error(error);
          });
        }
        const formData = new FormData();
        formData.append('file', chunk);
        // formData.append('index', index); // 可以用来在服务器端识别分段的顺序
        // formData.append('endLength', this.fileChunks.length); // 文件分段长度
        // 使用axios或者其他HTTP库发送POST请求上传分段
        // 这里使用axios作为示例
        axios.post(this.uploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          // 处理服务器响应
          console.log(response.data);
          this.activeChunk++;
          if (this.activeChunk < this.fileChunks.length) {
            this.uploadChunk(this.fileChunks[this.activeChunk], this.activeChunk);
          }
          if(this.activeChunk == this.fileChunks.length){
            axios.post(this.uploadStopUrl).then(response => {
              // 处理服务器响应
              console.log(response.data.error != undefined);
              console.log(response.data.error != null && response.data.error != undefined && response.data.error != 'undefined' && response.data.error != '');
              this.$modal.closeLoading();
              this.openLoading3();
              // setTimeout(() => {
              //   this.openLoading3();
              // },100)
              if(response.data.error != null && response.data.error != undefined && response.data.error != 'undefined' && response.data.error != '' ){
                this.$message({
                  type: 'error',
                  message: '校验失败'
                });  
                this.$modal.closeLoading();
              }else{
                this.$message({
                  type: 'success',
                  message: '校验成功'
                });
                this.$modal.closeLoading();
                this.openLoading2();
                //执行升级
                axios.post(this.upgradeUrl).then(response => {
                })
                // setTimeout(() => {
                //   this.openLoading2();
                // }, 1000);
                setTimeout(() => {
                  console.log('开始查询刷新结果');
                  this.intervalId = setInterval(this.cheackOutUpgrade, 1000);
                }, 10000);
              }
            }).catch(error => {
              console.error(error);
            });
          }
        }).catch(error => {
          console.error(error);
        });
      },
      //查询升级结果
      cheackOutUpgrade(){
        const _this = this;
        var data = {
            "m":        1,
            "n":        46,
            "timestamp":    123421312,
            "value":  {
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          _this.$modal.closeLoading();
          location.reload();
          clearInterval(_this.intervalId);
        }).catch(error => {
          console.error(error);
        });

      },
      //自定义上传接口函数
      // uploadFile(url, data, fileName) {
        // const formData = new FormData();
        // console.log(new Blob([data]));
        // formData.append('file', new Blob([data]));
        // console.log(formData);

        // // 使用你喜欢的 HTTP 库发送请求
        // axios.post(url, formData, {
        // headers: {
        //   'Content-Type': 'application/octet-stream'
        // }}
        // )
        // .then(response => {
        //   console.log('上传成功', response);
        // })
        // .catch(error => {
        //   console.error('上传失败', error);
        // });
      // },
      //上传成功后的钩子函数
      handleAvatarSuccess(res, file) {
        console.log(res);
      },
      //检测远程刷机包
      remoteFlashingStatus(){
        var data = {
            "m":        1,
            "n":        75,
            "timestamp":    123421312,
            "value":  {
            }
        };
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          if(res.value.error != null && res.value.error != undefined && res.value.error != ''){
            this.remoteFlashing = true;
          } else{
            this.remoteFlashing = false;
          }
        })
      },
      //远程刷机
      remoteFlashingFn(){
        var data = {
            "m":        1,
            "n":        76,
            "timestamp":    123421312,
            "value":  {
            }
        };
        this.openLoading4();
        getDataInfo(data).then((res) => {
          console.log('接受参数',res);
          if(res.value.error != null && res.value.error != undefined && res.value.error != ''){
            this.$message({
              type: 'error',
              message: '远程下载刷机包失败，请重新下载'
            });
          } else{
            this.$message({
              type: 'success',
              message: '远程下载刷机包成功'
            });
            this.$modal.closeLoading();
            this.openLoading2();
            //执行升级
            axios.post(this.upgradeUrl).then(response => {
            })
            setTimeout(() => {
              console.log('开始查询刷新结果');
              this.intervalId = setInterval(this.cheackOutUpgrade, 1000);
            }, 10000);
          }
        })
      },
      // 打开加载层
      openLoading() {
        this.$modal.loading("正在上传文件，请稍候！");
      },
      openLoading2() {
        this.$modal.loading("正在进行刷机，请稍候！");
      },
      openLoading3() {
        this.$modal.loading("正在校验中，请稍候！");
      },
      openLoading4() {
        this.$modal.loading("正在远程下载升级包，请稍候！");
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
  .systemUpgrade .tab {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    color: #999999;
  }

  .systemUpgrade .tab>div {
    width: 100px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  .systemUpgrade .choseTab {
    background: #efefef;
    padding: 5px 0;
    color: #165DFF;
    border-radius: 20px;
  }

  .systemUpgrade .item-sort {
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
  .systemUpgrade .card-box{
    margin-top: 20px;
  }

    /* 适用于比6.7寸屏幕小的机型，使用的样式 */
 @media screen and (min-width: 393px) and (max-width: 768px) {
    .app-container {
      padding: 0;
    }

    .systemUpgrade .tab {
      width: 60%;
      height: 40px;
      margin-top: 10px;
    }

    .systemUpgrade .item-sort {
      width: calc(100% - 20px);
      margin-left: 10px;
    }

   
  }

  
</style>
