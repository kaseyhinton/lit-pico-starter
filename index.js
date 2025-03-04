import { navbar } from "./components/navbar.js";

import { html, render } from "lit";
import { STATE_CHANGED } from "./services/publications.js";

import mitt from "mitt";

export const emitter = mitt();

export const MyApp = () => html`
  ${navbar(State, emitter)}
  <main class="container">
    <h3>Generate Secure UID</h3>
    <p>Free and fast UID generation</p>

    <hr />

    <article>
      <header>Options</header>
      <form>
        <hgroup>
          <label>
            How many to generate (${State?.numberOfUUIDS})
            <input
              type="range"
              .value=${State?.numberOfUUIDS?.toString()}
              @input=${(e) => {
                const _state = {
                  ...State,
                  numberOfUUIDS: e?.target?.value
                    ? Number(e?.target?.value)
                    : 0,
                  isDirty: true,
                };
                emitter.emit(STATE_CHANGED, _state);
              }}
            />
          </label>
        </hgroup>

        <fieldset>
          <label>
            <input
              name="terms"
              type="checkbox"
              role="switch"
              @click=${() => {
                const _state = {
                  ...State,
                  isAgreedToTerms: !State.isAgreedToTerms,
                  isDirty: true,
                };
                emitter.emit(STATE_CHANGED, _state);
              }}
              ?checked=${State?.isAgreedToTerms}
            />
            I agree to the Terms
          </label>
        </fieldset>
        <button
          ?disabled=${!State?.isAgreedToTerms}
          aria-busy="${State?.isLoading ? "true" : "false"}"
          type="button"
          @click=${() => {
            const _state = {
              ...State,
              isLoading: !State.isLoading,
              isDirty: true,
            };
            emitter.emit(STATE_CHANGED, _state);

            const uuids = [];
            for (let i = 0; i < _state?.numberOfUUIDS; i++) {
              const uuid = crypto?.randomUUID();
              uuids.push(uuid);
            }

            setTimeout(() => {
              const _state = {
                ...State,
                isLoading: !State.isLoading,
                isDirty: true,
                UUIDS: uuids,
              };
              emitter.emit(STATE_CHANGED, _state);
            }, 1200);
          }}
        >
          Generate
        </button>
      </form>
    </article>
    <article ?hidden=${!State?.UUIDS?.length}>
      <header>Results</header>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>UUID</th>
          </tr>
        </thead>
        <tbody>
          ${State?.UUIDS?.map(
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

let State = {
  isLoading: false,
  isDirty: false,
  isAgreedToTerms: true,
  numberOfUUIDS: 5,
  UUIDS: [],
  theme: "light",
};

emitter.on(STATE_CHANGED, (state) => {
  State = { ...state };

  if (State?.theme !== document.body?.getAttribute("data-theme")) {
    document.body?.setAttribute("data-theme", State?.theme);
  }

  if (State.isDirty) {
    render(MyApp(), document.body);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  render(MyApp(), document.body);
});
