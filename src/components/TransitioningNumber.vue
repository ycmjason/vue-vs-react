<template>
  <span>{{ displayNumber }}</span>
</template>

<script>
import { $wait } from '../utils/timer';
const FPS = 22;
const SPF = 1 / FPS;

export default {
  props: {
    number: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      displayNumber: this.number,
      cancel: () => {},
    };
  },
  methods: {
    animateFrom(start, end) {
      this.cancel();
      const numberOfFrames = this.duration * FPS;
      const step = Math.round((end - start) / numberOfFrames);
      const frames = [
        start,
        ...Array.from({ length: numberOfFrames - 2 }, (u, i) => start + step * (i + 1)),
        end
      ];

      let canceled = false;
      this.cancel = () => canceled = true;
      frames.forEach(async (f, i) => {
        await $wait(i * SPF * 1000);
        if (canceled) return;
        this.displayNumber = f;
      });
    },
  },
  created() {
    this.animateFrom(this.displayNumber, this.number);
  },
  watch: {
    number(newN) {
      this.animateFrom(this.displayNumber, newN);
    },
  },
};
</script>
