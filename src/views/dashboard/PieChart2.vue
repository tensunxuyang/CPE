<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      pieData: {
        type: Array,
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          // title: {
          //   // text: 'Referer of a Website',
          //   // subtext: 'Fake Data',
          //   left: 'center'
          // },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            // orient: 'vertical',
            left: 'center'
          },
          label: {
            alignTo: 'edge',
            formatter: '{name|{b}}\n{time|{c} MB}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#999'
              }
            }
          },
          series: [{
            // name: 'Access From',
            type: 'pie',
            radius: '50%',
            color: ["red","#2c343c"],
            center: ['45%', '55%'],
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        })
      }
    }
  }

</script>
