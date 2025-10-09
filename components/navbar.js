import { html } from "../dependencies/lit-html.js";
import { moonIcon, sunIcon } from "./icons.js";

import store from "../services/store.js";

export default () => html`
  <progress ?hidden=${!store.state.isLoading}></progress>
  <div class="container">
    <nav>
      <ul>
        <li><strong>GEN</strong> <kbd>UID</kbd></li>
      </ul>
      <ul>
        <li>
          <button
            @click=${() =>
              store.setState({
                theme: store.state.theme === "light" ? "dark" : "light",
                isDirty: true,
              })}
            class="secondary"
          >
            ${store.state.theme === "dark" ? moonIcon : sunIcon}
          </button>
        </li>
        <li>
          <details class="dropdown">
            <summary>Account</summary>
            <ul>
              <li>
                <a href="#"> Settings</a>
              </li>
              <li>
                <a href="#"> Logout</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  </div>
`;
