/*
export const $interval = (fn, ms) => {
  const id = setInterval(fn, ms);
  return () => clearInterval(id);
};

export const $timeout = (fn, ms) => {
  const id = setTimeout(fn, ms);
  return () => clearTimeout(id);
};
*/

export const $wait = (ms) => new Promise(res => setTimeout(res, ms));
