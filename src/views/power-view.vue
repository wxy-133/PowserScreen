<template>
    <main class="screen-bg">
        <!-- 头部 -->
        <div class="header"></div>
        <!-- 左边 -->
        <div class="left-top">
            <PieCharts :echartsData=chargingPile></PieCharts>
        </div>
        <div class="left-bottom">
            <LineCharts :echartDatas=processMonitoring></LineCharts>
        </div>

        <!-- 右边 -->
        <div class="right-top">
            <right-top-panel :panelItems="chargingTop4" :percentage="percentage"></right-top-panel>
        </div>
        <div class="right-center">
            <bar-charts :echartDatas="chargingStatistics"></bar-charts>
        </div>
        <div class="right-bottom">
            <RightBottom :dots="exceptionMonitoring"></RightBottom>
        </div>
        <!-- 中间  底部-->
        <div class="center">
            <CenterSvg></CenterSvg>
        </div>
        <div class="bottom">
            <BottomPancel :panelItems="dataAnalysis"></BottomPancel>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { chargingPileData, processMonitoringData, chargingStatisticsData, exceptionMonitoringData, dataAnalysisData, chargingTop4Data } from './config/home-data'

import PieCharts from '@/components/pie-echarts.vue'
import LineCharts from '@/components/line-echarts.vue'
import BarCharts from '@/components/bar-echarts.vue'
import RightTopPanel from '@/components/right-top-panel.vue'
import RightBottom from '@/components/right-bottom-svg.vue'
import CenterSvg from '@/components/cernter-svg.vue'
import BottomPancel from '@/components/bottom-panel.vue'

// import { getPowerScreenData } from '@/services'
import res from '@/data/data.json'
// 充电桩饱和比例
let chargingPile = ref(chargingPileData)
// 流程监控
let processMonitoring = ref(processMonitoringData)
// 充电桩数据分析
let chargingStatistics = ref(chargingStatisticsData)
// 异常监控
let exceptionMonitoring = ref(exceptionMonitoringData)
// 充电桩数据分析
let dataAnalysis = ref(dataAnalysisData)
// 充电桩Top4占比
let chargingTop4 = ref(chargingTop4Data)
let percentage = ref(0)
// 发起网络请求拿到首页的数据
onMounted(() => {
    // console.log(getPowerScreenData)
    // getPowerScreenData()
    //     .then((res) => {
    //         console.log(res)
    chargingPile.value = res.data.chargingPile.data
    processMonitoring.value = res.data.processMonitoring.data
    chargingStatistics.value = res.data.chargingStatistics.data
    exceptionMonitoring.value = res.data.exceptionMonitoring.data
    dataAnalysis.value = res.data.dataAnalysis.data

    chargingTop4.value = res.data.chargingTop4.data
    percentage.value = res.data.chargingTop4.totalPercentage
    // })
})
</script>
<style scoped>
.screen-bg {
    /* // 定位 */
    position: absolute;
    width: 100%;
    height: 100%;
    /* 背景 */
    background-image: url(@/assets/images/bg.png);
    background-size: cover;
}

.header {
    width: 100%;
    position: absolute;
    top: 21px;
    left: 0;
    height: 56px;
    background-image: url(@/assets/images/bg_header.svg);
}

.left-top {
    width: 536px;
    position: absolute;
    top: 116px;
    left: 16px;
    height: 440px;
    background-image: url(@/assets/images/bg_left-top.svg);
}

.left-bottom {
    width: 536px;
    position: absolute;
    bottom: 49px;
    left: 16px;
    height: 440px;
    background-image: url(@/assets/images/bg_left_bottom.svg);
}

.right-top {
    width: 536px;
    position: absolute;
    top: 116px;
    right: 16px;
    height: 326px;
    background-image: url(@/assets/images/bg_right_top.svg);
}

.right-center {
    width: 536px;
    position: absolute;
    top: 455px;
    right: 16px;
    height: 322px;
    background-image: url(@/assets/images/bg_right_center.svg);
}

.right-bottom {
    width: 536px;
    position: absolute;
    bottom: 49px;
    right: 16px;
    height: 240px;
    background-image: url(@/assets/images/bg_right_bottom.svg);
}

.center {
    width: 788px;
    position: absolute;
    bottom: 272px;
    right: 568px;
    height: 710px;
    background-image: url(@/assets/images/center-bg.svg);
}

.bottom {
    width: 788px;
    position: absolute;
    bottom: 49px;
    right: 568px;
    height: 209px;
    background-image: url(@/assets/images/bg_bottom.svg);
}
</style>