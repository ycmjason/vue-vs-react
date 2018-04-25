<template>
  <main>
    <Vs :vue="vue" :react="react"/>
  </main>
</template>

<script>
import repoSnapshots from './services/repoSnapshots';
import Vs from './components/Vs.vue';

export default {
  components: {
    Vs,
  },
  data() {
    return {
      snapshots: [],
    };
  },
  methods: {
    findLatestSnapshot(repo) {
      const latestTimestampSeconds = Math.max(...this.snapshots
        .filter(snapshot => snapshot.repo === repo)
        .map(snapshot => snapshot.timestamp.seconds));

      return this.snapshots.find(snapshot => {
        return snapshot.repo === repo && snapshot.timestamp.seconds === latestTimestampSeconds;
      });
    }
  },
  computed: {
    vue() {
      return this.findLatestSnapshot('vuejs/vue') || {
        repo: 'vuejs/vue',
        stars: 0,
      };
    },
    react() {
      return this.findLatestSnapshot('facebook/react') || {
        repo: 'facebook/react',
        stars: 0,
      };
    },
  },
  created() {
    repoSnapshots.subscribe(snapshots => this.snapshots = snapshots);
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
