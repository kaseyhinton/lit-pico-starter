import { html, render } from "lit";
import store from "../services/store.js"; // Import the singleton store

const navbarTemplate = () => html`
  <style>
    progress {
      position: absolute;
      border-radius: 0;
    }
  </style>
  <progress ?hidden=${!store.state.isLoading}></progress>
  <div class="container">
    <nav>
      <ul>
        <li><strong>GEN</strong> <kbd>UID</kbd></li>
      </ul>
      <ul>
        <li>
          <button
            @click=${() => store.dispatch("toggleTheme")}
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
            <ul dir="rtl">
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

const renderNavbar = (container) => {
  render(navbarTemplate(), container);
  store.subscribe(() => render(navbarTemplate(), container));
};

export default renderNavbar;
