<template>
  <main v-if="vue && react">
    <section class="vue" :style="flexBasis(ratios.vue)">
      Vue
      <TransitioningNumber :number="vue.stars"/>
    </section>
    <section class="sep"></section>
    <section class="react" :style="flexBasis(ratios.react)">
      React
      <TransitioningNumber :number="react.stars"/>
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

<style scoped>
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
}

.vue {
  background: #4BC69D;
  color: white;
}

.react {
  background: #43DAF9;
}

.sep {
  flex-basis: 4px;
  flex-grow: 0;
  flex-shrink: 0;
}

@media only screen and (min-width: 400px)  {
  main {
    flex-direction: row;
  }
}
</style>
