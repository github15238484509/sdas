<template>
    <div id="app">
        <div class="player-container">
            <vue-core-video-player autoplay :src="videoSource" :key="videoSource" controls="auto"
                logo="https://www.devpoint.cn/Apps/Site/View/devpoint/public/images/logo.png">
            </vue-core-video-player>
        </div>

        <div v-for="item in list" :key="item.path" @click="videoClick(item)">
            {{ item.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            videoSource: '',
            list: []
        };
    },
    async mounted() {
        let result = await fetch("http://127.0.0.1:8100/getAllVideo")
        result = await result.json()
        this.list = result
    },
    methods: {
        videoClick(data) {
            this.videoSource = data.path.replace(/\\/g, '/').replace('http:', 'http://')
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.player-container {
    width: 800px;
    margin: 20px auto;
}
</style>
