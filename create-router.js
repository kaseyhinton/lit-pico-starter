import store from "./services/store.js";

export default () => {
  function getRoute() {
    const [root, param] = window.location.hash
      .replace(/^#/, "")
      .split("/")
      .filter(Boolean);

    const routes = {
      account: () => ({ name: "account", params: {} }),
    };

    return routes[root]?.(param);
  }

  function handleRouteChange() {
    store.setState({ route: getRoute() });
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }

  handleRouteChange();
  window.addEventListener("hashchange", handleRouteChange);
};
