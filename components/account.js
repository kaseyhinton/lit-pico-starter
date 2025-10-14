import { html } from "../dependencies/lit-html.js";
import store from "../services/store.js";

export const accountView = () => html`
  <main class="container">
    <header>
      <hgroup>
        <h1>Account</h1>
        <p>Manage your account</p>
      </hgroup>
    </header>

    <form>
      <fieldset>
        <label>
          Email
          <input
            .value=${store.state.userEmail || ""}
            @input=${(e) => {
              store.setState({ userEmail: e.target.value });
            }}
            type="email"
            id="email"
            placeholder="Email"
            autocomplete="email"
          />
        </label>

        <label>
          Access Level
          <select
            name="accessLevel"
            aria-label="Select your access level..."
            required
            @change=${(e) => {
              store.setState({ userAccessLevel: e.target.value });
            }}
            .value=${store.state.userAccessLevel}
          >
            <option selected disabled value="">Select your access level...</option>
            <option>User</option>
            <option>Admin</option>
          </select>
        </label>
      </fieldset>
    </form>
  </main>
`;
