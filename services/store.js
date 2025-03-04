// store.js
const store = {
  state: {
    isLoading: false,
    isDirty: false,
    isAgreedToTerms: true,
    numberOfUUIDS: 5,
    UUIDS: [],
    theme: "light",
  },
  actions: {
    requestUpdate(state, payload) {
      return { ...state, ...payload };
    },
    toggleTheme(state) {
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
        isDirty: true,
      };
    },
  },
  listeners: new Set(), // Store listeners for state changes
  dispatch(action, payload) {
    if (this.actions[action]) {
      this.state = this.actions[action](this.state, payload); // Update state
      this.notifyListeners(); // Notify all listeners
    } else {
      console.warn(`Action "${action}" not found.`);
    }
  },
  subscribe(listener) {
    this.listeners.add(listener); // Add a listener
    return () => this.listeners.delete(listener); // Return an unsubscribe function
  },
  notifyListeners() {
    for (const listener of this.listeners) {
      listener(); // Call each listener
    }
  },
};

export default store;
