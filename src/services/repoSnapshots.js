import { repoSnapshots } from '../firebase';

export default {
  subscribe: (fn) => repoSnapshots
    .orderBy("timestamp", "desc")
    .limit(20)
    .onSnapshot(snapshot => fn(snapshot.docs.map(d => d.data()))),
};
