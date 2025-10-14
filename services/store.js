// store.js
const listeners = new Set();

const storedState = localStorage.getItem("state");
const state = storedState
  ? JSON.parse(storedState)
  : {
      isLoading: false,
      isAgreedToTerms: true,
      numberOfUUIDS: 5,
      UUIDS: [],
      userAccessLevel: "User",
      userEmail: "",
      theme: localStorage.getItem("theme") ?? "light",
    };

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function setState(partial) {
  Object.assign(state, partial);
  localStorage.setItem("state", JSON.stringify(state));

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
