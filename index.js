import { html, render } from "./dependencies/lit-html.js";

import navbar from "./components/navbar.js";
import store from "./services/store.js";
import main from "./components/main.js";

const getRoute = () => {
  const [root, param] = window.location.hash
    .replace(/^#/, "")
    .split("/")
    .filter(Boolean);

  const routes = {
    account: () => ({ name: "account", params: {} }),
  };

  return routes[root]?.(param);
};

const handleRouteChange = () => {
  store.setState({ route: getRoute() });
  window.scrollTo(0, 0);
};

handleRouteChange();
window.addEventListener("hashchange", handleRouteChange);

const rerender = () => {
  document.body.setAttribute("data-theme", store.state.theme);
  render(html` ${navbar()} ${main()} `, document.body);
};

rerender();
store.subscribe(rerender);
