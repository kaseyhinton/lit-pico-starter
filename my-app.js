import { html, render } from "lit";

import renderNavbar from "./components/navbar.js";
import store from "./services/store.js";

export const MyAppTemplate = () => html`
  <div id="navbar"></div>
  <main class="container">
    <h3>Generate Secure UID</h3>
    <p>Free and fast UID generation</p>

    <hr />

    <article>
      <header>Options</header>
      <form>
        <fieldset>
          <label>
            How many to generate (${store?.state?.numberOfUUIDS})
            <input
              type="range"
              .value=${store?.state?.numberOfUUIDS?.toString()}
              @input=${(e) => {
                store.dispatch("requestUpdate", {
                  numberOfUUIDS: e?.target?.value
                    ? Number(e?.target?.value)
                    : 0,
                });
              }}
            />
          </label>

          <label>
            <input
              name="terms"
              type="checkbox"
              role="switch"
              @click=${() => {
                store.dispatch("requestUpdate", {
                  isAgreedToTerms: !store.state.isAgreedToTerms,
                });
              }}
              ?checked=${store?.state?.isAgreedToTerms}
            />
            I agree to the Terms
          </label>
        </fieldset>
        <button
          ?disabled=${!store?.state?.isAgreedToTerms}
          aria-busy="${store?.state?.isLoading ? "true" : "false"}"
          type="button"
          @click=${() => {
            store.dispatch("requestUpdate", {
              isLoading: true,
            });

            const uuids = [];
            for (let i = 0; i < store?.state?.numberOfUUIDS; i++) {
              const uuid = crypto?.randomUUID();
              uuids.push(uuid);
            }

            setTimeout(() => {
              store.dispatch("requestUpdate", {
                isLoading: false,
                UUIDS: uuids,
              });
            }, 1200);
          }}
        >
          Generate
        </button>
      </form>
    </article>
    <article ?hidden=${!store?.state?.UUIDS?.length}>
      <header>Results</header>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>UUID</th>
          </tr>
        </thead>
        <tbody>
          ${store?.state?.UUIDS?.map(
            (uuid, idx) =>
              html`<tr>
                <td>#${idx + 1}</td>
                <td>${uuid}</td>
              </tr>`
          )}
        </tbody>
      </table>
    </article>
  </main>
`;

const _render = (container) => {
  console.log("Rendering application", store.state);

  document.body.setAttribute("data-theme", store.state.theme);

  render(MyAppTemplate(), container);

  const navbarContainer = document.getElementById("navbar");
  renderNavbar(navbarContainer);
};

const renderMyApp = (container) => {
  _render(container);
  store.subscribe(() => _render(container));
};

export default renderMyApp;
