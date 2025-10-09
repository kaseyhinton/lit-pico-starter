import { html, render } from "./dependencies/lit-html.js";

import navbar from "./components/navbar.js";
import store from "./services/store.js";
import main from "./components/main.js";

(() => {
  const app = document.createElement("div");
  document.body.appendChild(app);

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
