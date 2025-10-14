import { html } from "../dependencies/lit-html.js";
import { moonIcon, sunIcon } from "./icons.js";

import store from "../services/store.js";

export default () => html`
  <progress ?hidden=${!store.state.isLoading}></progress>
  <header class="container">
    <nav>
      <ul>
        <li>
          <a href="/#/"> <kbd>Generator</kbd> </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="/#/account" aria-current="page"> Account </a>
        </li>
        <li>
          <button
            @click=${() =>
              store.setState({
                theme: store.state.theme === "light" ? "dark" : "light",
              })}
          >
            ${store.state.theme === "dark" ? moonIcon : sunIcon}
          </button>
        </li>
      </ul>
    </nav>
  </header>
`;
