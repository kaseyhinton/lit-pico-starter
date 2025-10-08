// store.js
const listeners = new Set();

const state = {
  isLoading: false,
  isDirty: false,
  isAgreedToTerms: true,
  numberOfUUIDS: 5,
  UUIDS: [],
  theme: localStorage.getItem("theme") ?? "light",
};

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function setState(partial) {
  Object.assign(state, partial);
  if (Object.prototype.hasOwnProperty.call(partial, "theme")) {
    localStorage.setItem("theme", state.theme);
  }
  notify();
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export default {
  state,
  setState,
  subscribe,
};
