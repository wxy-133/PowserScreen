

<template>
    <div ref="divRef" class="home" :style="{width:width,height:height}"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import useEchart from '@/hooks/useEchart.js'

const props = defineProps({
    width: {
        type: String,
        default: "100%"
    },
    height: {
        type: String,
        default: "100%"
    },
    echartsData: {
        type: Array,
        default: function () {
            return []
        }
    }
})

// 监听 echartsData变化
watch(() => props.echartsData, (newV, oldV) => {
    setupEchart(newV)
})
let divRef = ref(null)
let xyChart = null

// 首次加载
onMounted(() => {
    setupEchart(props.echartsData)
})
function setupEchart(echartsData) {
    if (!xyChart) {
        xyChart = useEchart(divRef.value)
    }
    let option = getOption(echartsData)
    xyChart.echartInstance.setOption(option)
}
function getOption(pieData = []) {

    let pieDatas = pieData

    // 将 pieDatas 格式的 数据映射为 系列图所需要的数据格式
    var data = pieDatas.map((item) => {
        return {
            value: item.value,
            name: item.name,
            itemStyle: {
                color: item.color,
            },
        };
    });

    // 求出总数
    let total = pieDatas.reduce((a, b) => {
        return a + b.value * 1;
    }, 0);
    // =====准备数据=====

    // 2.指定图表的配置项和数据
    var option = {
        title: {
            text: `充电桩总数`,
            top: "50%",
            left: "50%",
            padding: [-20, 0, 0, -45],
            textStyle: {
                fontSize: 19,
                color: "white",
            },

            // 副标题使用-富文本语法：{style_name|value}， 注意不能有空格
            subtext: `{totalSty|${total}}`,
            subtextStyle: {
                rich: {
                    totalSty: {
                        fontSize: 19,
                        color: "white",
                        width: 90,
                        align: "center",
                    },
                },
            },
        },
        legend: {
            orient: "vertical",
            right: "10%",
            top: "18%",
            itemGap: 20,
            itemWidth: 16,
            itemHeigth: 16,
            icon: "rect",
            // 自定义图例的名称
            formatter: function (name) {
                // 图例文本格式化 + 富文本定制样式  
                var currentItem = pieDatas.find((item) => item.name === name);
                return (
                    "{nameSty|" +
                    currentItem.name +
                    "}\n" +
                    "{numberSty|" +
                    currentItem.value +
                    "个 }" +
                    "{preSty|" +
                    currentItem.percentage +
                    "}"
                );
            },
            textStyle: {
                rich: {
                    nameSty: {
                        fontSize: 12,
                        color: "#FFFFFF",
                        padding: [10, 14],
                    },
                    numberSty: {
                        fontSize: 12,
                        color: "#40E6ff",
                        padding: [0, 0, 0, 14],
                    },
                    preSty: {
                        fontSize: 12,
                        color: "#40E6ff",
                    },
                },
            },
        },
        series: [
            {
                type: "pie",
                center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
                radius: ["30%", "75%"], // 饼图的半径。数组的第一项是内半径，第二项是外半径。
                label: {
                    show: false,
                },
                data: data,
                roseType: "area", //  area 玫瑰图, 圆心角一样，通过半径展现数据大小( 默认为false )
            },
        ],
    };
    return option
}
</script>

<style scoped>

</style>
  