<template>
  <main v-if="vue && react">
    <section class="vue" :class="{ won: vue.stars > react.stars }" :style="flexBasis(ratios.vue)">
      <img src="../assets/vue.png" class="logo">
      <TransitioningNumber :number="vue.stars" class="stars"></TransitioningNumber>
    </section>
    <section class="sep"></section>
    <section class="react" :class="{ lost: vue.stars > react.stars }" :style="flexBasis(ratios.react)">
      <img src="../assets/react.svg" class="logo">
      <TransitioningNumber :number="react.stars" class="stars"></TransitioningNumber>
    </section>
  </main>
</template>

<script>
import TransitioningNumber from './TransitioningNumber.vue';

const cutoff = 95000;
export default {
  props: ['vue', 'react'],
  components: {
    TransitioningNumber,
  },
  methods: {
    flexBasis: v => ({ flexBasis: v + '%' }),
  },
  computed: {
    ratios() {
      if (!this.vue || !this.react) return {};
      const vueStars = this.vue.stars - cutoff;
      const reactStars = this.react.stars - cutoff;
      const totalStars = vueStars + reactStars;
      const getPercentage = ratio => Math.round(100 * ratio / totalStars)
      return {
        vue: getPercentage(vueStars),
        react: getPercentage(reactStars),
      };
    },
  },
}
</script>

<style lang="scss" scoped>
$vue-color: #47B784;
$react-color: #66DBF9;

@import url('https://fonts.googleapis.com/css?family=Do+Hyeon');

.vue .stars {
  color: $vue-color;
}

.react .stars {
  color: $react-color;
}
.stars {
  font-size: 2rem;
  font-family: 'Do Hyeon', sans-serif;
}

.stars::before {
  content: '★ ';
}

main {
  z-index: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-basis: 50%;
  transition: flex-basis 2s;
  flex-shrink: 1;
  flex-direction: column;
  position: relative;
}

.sep {
  background: #efefef;
}

.logo {
  width: auto;
  height: auto;
  max-width: 80vw;
  max-height: 26vh;
  margin-bottom: 1em;
  margin-top: 1em;
}

.vue::before, .react::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 1;
  transition: opacity 2s;
}

.vue.won::before, .react.lost::before {
  opacity: 0;
}

.vue::before {
  background: lighten($vue-color, 25%);
}

.react::before {
  background: lighten($react-color, 25%);
}

.sep {
  flex-basis: 4px;
  flex-grow: 0;
  flex-shrink: 0;
}

@media only screen and (min-width: 100vh)  {
  main {
    flex-direction: row;
  }
}
</style>
