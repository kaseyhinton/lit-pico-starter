import { html } from "../dependencies/lit-html.js";
import { accountView } from "./account.js";

import store from "../services/store.js";

const homeView = () => html`
  <main class="container">
    <header>
      <hgroup>
        <h1>Generate Secure UID</h1>
        <p>Free and fast UID generation</p>
      </hgroup>
    </header>

    <hr />
    <article>
      <h2>Options</h2>
      <form>
        <fieldset>
          <label>
            How many to generate (${store?.state?.numberOfUUIDS})
            <input
              type="range"
              .value=${store?.state?.numberOfUUIDS?.toString()}
              @input=${(e) => {
                store.setState({
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
                store.setState({
                  isAgreedToTerms: !store.state.isAgreedToTerms,
                });
              }}
              ?checked=${store?.state?.isAgreedToTerms}
            />
            I agree to the Terms
          </label>
        </fieldset>
        <button
          right
          ?disabled=${!store?.state?.isAgreedToTerms}
          aria-busy="${store?.state?.isLoading ? "true" : "false"}"
          type="button"
          @click=${() => {
            store.setState({ isLoading: true });

            const uuids = [];
            for (let i = 0; i < store?.state?.numberOfUUIDS; i++) {
              const uuid = crypto?.randomUUID();
              uuids.push(uuid);
            }

            setTimeout(() => {
              store.setState({ isLoading: false, UUIDS: uuids });
            }, 1200);
          }}
        >
          Generate
        </button>
      </form>
    </article>
    <article ?hidden=${!store?.state?.UUIDS?.length}>
      <h2>Results</h2>
      <table class="striped">
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

export default () => {
  const route = store.state.route?.name;
  if (route === "account") return accountView();
  return homeView();
};
