import { html, render } from "./dependencies/lit-html.js";

import navbar from "./components/navbar.js";
import store from "./services/store.js";
import main from "./components/main.js";
import createRouter from "./create-router.js";

(() => {
  const app = document.createElement("div");
  document.body.appendChild(app);

  createRouter();

  const rerender = () => {
    document.body.setAttribute("data-theme", store.state.theme);
    render(
      html`
        ${navbar()}
        ${main()}
      `,
      app
    );
  };

  rerender();
  store.subscribe(rerender);
})();
