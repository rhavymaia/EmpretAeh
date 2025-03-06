import { clientesDataset } from './dataset.js';

function loadLocalStorage() {
  let clientesLocalStorage = localStorage.getItem('clientes');
  if (clientesLocalStorage == null) {
    localStorage.setItem('clientes', JSON.stringify(clientesDataset));
    clientesLocalStorage = localStorage.getItem('clientes');
  }
  return JSON.parse(clientesLocalStorage);
}

let clientesTable = document.getElementById('clientesTable');

for (const cliente of loadLocalStorage()) {
  clientesTable.insertAdjacentHTML(
    'beforeend',
    `<tr>
      <td>${cliente.id}</td>
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.cpf}</td>
    </tr>`,
  );
}

let clienteForm = document.getElementById('clienteForm');
clienteForm.onsubmit = (event) => {
  event.preventDefault();
  console.log('Submeteu o formulário');
};
