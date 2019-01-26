<template>
    <div>
        <van-notice-bar
                text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
                left-icon="volume-o"/>
    </div>
</template>

<script>
    import { NoticeBar } from 'vant';

    export default {
        components: {
            [NoticeBar.name]: NoticeBar
        },
        data() {
            return {
            }
        }
    }
</script>

<style scoped>

</style>