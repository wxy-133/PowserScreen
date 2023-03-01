import { onMounted, onUnmounted } from 'vue'

import _ from 'lodash'

export default function useScalePage() {
    const resizeFunc = _.throttle(function () {
        triggerScale()
    }, 100)
    onMounted(() => {
        triggerScale()
        window.addEventListener('resize', resizeFunc)
    })

    onUnmounted(() => {
        window.rmoveEventListener('resize', resizeFunc)
    })
    function triggerScale() {
        let targetX = 1920
        let targetY = 1080
        let targetRatio = 16 / 9

        let currentX = document.documentElement.clientWidth || document.body.clientWidth
        let currentY = document.documentElement.clientHeight || document.body.clientHeight
        let scaleRatio = currentX / targetX;
        let currentRatio = currentX / currentY

        if (currentRatio >= targetRatio) {
            scaleRatio = currentY / targetY
            document.body.style = `width:${targetX}px;height:${targetY}px;transform: scale(${scaleRatio}) translateX(-50%);left:50%;`
        } else {
            document.body.style = `width:${targetX}px;height:${targetY}px;transform: scale(${scaleRatio})`
        }
    }
}