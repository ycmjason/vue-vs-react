<template>
  <main v-if="vue && react">
    <section class="vue" :style="flexBasis(ratios.vue)">
      <img src="../assets/vue.png" class="logo">
      <TransitioningNumber :number="vue.stars" class="vue stars"></TransitioningNumber>
    </section>
    <section class="sep"></section>
    <section class="react" :style="flexBasis(ratios.react)">
      <img src="../assets/react.svg" class="logo">
      <TransitioningNumber :number="react.stars" class="react stars"></TransitioningNumber>
    </section>
  </main>
</template>

<script>
import TransitioningNumber from './TransitioningNumber.vue';

const cutoff = 60000;
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

.vue.stars {
  color: $vue-color;
}

.react.stars {
  color: $react-color;
}
.stars {
  font-size: 2rem;
  font-family: 'Do Hyeon', sans-serif;
}

.vue.stars::before, .react.stars::before {
  content: '★ ';
}

main {
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

.vue {
  background: lighten($vue-color, 25%);
  color: white;
}

.react {
  background: lighten($react-color, 20%);
}

.sep {
  flex-basis: 4px;
  flex-grow: 0;
  flex-shrink: 0;
}

@media only screen and (min-width: 812px)  {
  main {
    flex-direction: row;
  }
}
</style>
