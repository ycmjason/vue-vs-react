<template>
  <main>
    <img v-if="muted" class="muteControl" src="../assets/unmute.svg" @click="muted = false">
    <img v-else class="muteControl" src="../assets/mute.svg" @click="muted = true">

    <audio ref="audio" :src="src" loop muted></audio>
  </main>
</template>

<script>
export default {
  props: ['play', 'src'],
  data: () => ({
    muted: true,
  }),
  mounted() {
    this.$refs.audio.muted = this.muted;
  },
  watch: {
    play() {
      const { audio } = this.$refs;
      audio.currentTime = 0;
      audio[this.play? 'play': 'pause']();
    },
    muted() {
      this.$refs.audio.muted = this.muted;
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
