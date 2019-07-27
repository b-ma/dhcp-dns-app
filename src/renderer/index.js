import { ipcRenderer, remote } from 'electron';
import { html, render } from 'lit-html';

const template = (data, listeners) => {
  return html`
    <header>
      <button @click="${listeners.start}">Start</button>
      <button @click="${listeners.stop}">Stop</button>
    </header>
    <section>
      <h2>DHCP</h2>
      <!-- list configs (delete button) -->
      <!-- create new config (Name, IP start, IP end, Mask, DNS server IP) -->
      <!-- see client list (only trigger from uesr, no automatic refresh) -->
      <!-- set / delete static ip for client (Name, Alias, MAC, IP) -->
    </section>

    <section>
      <h2>DNS</h2>
      <!-- list configs (delete button) -->
      <!-- create new entry (domain, ip)
    </section>
  `;
}

const eventListeners = {
  async start() {
    ipcRenderer.send('rpc', 'dhcp', 'add', 3, 4);
  },
  stop() {},
  dhcpSelect() { /* noop if running */ },
  dhcpDelete() {},
  dhcpCreate() {},
  dnsCreate() {},
  dnsDelete() {},
}

let $appContainer;
console.log(document.querySelector('#app'));

const refresh = (model = {}) => {
  const appTemplate = template({}, eventListeners);
  render(appTemplate, $appContainer);
}

ipcRenderer.on('loaded', (event, data) => {
  $appContainer = document.querySelector('#app');
  const $infos = document.querySelector('#infos');

  refresh($appContainer);
});

ipcRenderer.on('update', (event, model) => {
  console.log(model);
  refresh(model);
});
