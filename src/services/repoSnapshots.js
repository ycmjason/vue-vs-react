import { repoSnapshots } from '../firebase';

export default {
  subscribe(fn) {
    return repoSnapshots.onSnapshot(snapshot => {
      fn(snapshot.docs.map(d => d.data()))
    });
  },
};
