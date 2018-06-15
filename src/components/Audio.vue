<template>
  <main>
    <img v-if="muted" class="muteControl" src="../assets/unmute.svg" @click="unmute()">
    <img v-else class="muteControl" src="../assets/mute.svg" @click="mute()">

    <audio ref="audio" :src="src" loop muted autoplay></audio>
  </main>
</template>

<script>
export default {
  props: ['play', 'src'],
  data: () => ({
    muted: true,
    playing: false,
  }),
  mounted() {
    this.$refs.audio.muted = this.muted;
  },
  watch: {
    play() {
      this.$refs.audio.currentTime = 0;
    },
    muted() {
      this.$refs.audio.muted = this.muted;
    },
  },
  methods: {
    mute() {
      this.muted = true; 
    },
    unmute() {
      this.muted = false;
      if (!this.playing) {
        this.playing = true;
        this.$refs.audio.play();
      }
    },
  },
};
</script>

<style scoped>
main {
  position: absolute;
}

.muteControl {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: white;
  cursor: pointer;
  width: 1rem;
  padding: 1rem;
  border-radius: 50%;
}

audio:not([controls]) {
  display: none;
}
</style>
