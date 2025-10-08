import { html } from "../dependencies/lit-html.js";
import store from "../services/store.js"; // Import the singleton store

export default function navbar() {
  return html`
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
              ${store.state.theme === "dark"
                ? html` <i class="ti ti-moon-filled"></i> `
                : html` <i class="ti ti-sun-filled"></i> `}
            </button>
          </li>
          <li>
            <details class="dropdown">
              <summary><i class="ti ti-user-filled"></i> Account</summary>
              <ul>
                <li>
                  <a href="#"> <i class="ti ti-settings-filled"></i> Settings</a>
                </li>
                <li>
                  <a href="#"> <i class="ti ti-logout"></i> Logout</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </div>
  `;
}
