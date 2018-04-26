const functions = require('firebase-functions');
const admin = require("firebase-admin");

const octokit = require('@octokit/rest')();

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const makeSnapshotFromResponse = ({ full_name, forks_count, stargazers_count, subscribers_count }) => ({
  repo: full_name,
  forks: forks_count,
  stars: stargazers_count,
  watches: subscribers_count,
  timestamp: admin.firestore.FieldValue.serverTimestamp(),
});

const getRepo = (owner, repo) => octokit.repos.get({ owner, repo }).then(({ data }) => data).then(makeSnapshotFromResponse);
const addRepoSnapshot = snapshot => db.collection('repo-snapshots').add(snapshot);

exports.makeSnapshot = functions.https.onRequest((request, response) => {
  const promises = [
    getRepo('vuejs', 'vue').then(addRepoSnapshot),
    getRepo('facebook', 'react').then(addRepoSnapshot),
  ];
  return Promise.all(promises).then(() => response.send("Done")).catch(console.error);
});
