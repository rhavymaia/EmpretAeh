import { clientesDataset } from './dataset.js';

function loadLocalStorage() {
  let clientesLocalStorage = localStorage.getItem('clientes');
  if (clientesLocalStorage == null) {
    localStorage.setItem('clientes', JSON.stringify(clientesDataset));
    clientesLocalStorage = localStorage.getItem('clientes');
  }
  return JSON.parse(clientesLocalStorage);
}

const loadClienteTable = () => {
  let clientesTable = document.getElementById('clientesTable');

  let clientes = loadLocalStorage();
  for (const cliente of clientes) {
    clientesTable.insertAdjacentHTML('beforeend', getRowClienteTable(cliente));
  }
};

const getRowClienteTable = (cliente) => {
  return `<tr>
    <td>${cliente.id}</td>
    <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.cpf}</td>
  </tr>`;
};

const clearForm = () {
  // recupera os campos.
  // atribui vazio aos valores.
}

let clienteForm = document.getElementById('clienteForm');
clienteForm.onsubmit = (event) => {
  event.preventDefault();
  // let nomeInput = document.getElementById('nome');
  // let emailInput = document.getElementById('email');
  // let cpfInput = document.getElementById('cpf');
  let clienteFormData = new FormData(clienteForm);

  // let cliente = {
  //   id: 4,
  //   nome: nomeInput.value,
  //   email: emailInput.value,
  //   cpf: cpfInput.value,
  // };
  cliente = Object.fromEntries(clienteFormData);

  let clientes = loadLocalStorage();
  clientes.push(cliente);
  localStorage.setItem('clientes', JSON.stringify(clientes));

  let clientesTable = document.getElementById('clientesTable');
  clientesTable.insertAdjacentHTML('beforeend', getRowClienteTable(cliente));

  Toastify({
    text: 'Cliente cadastrado com sucesso!',
    className: 'success',
  }).showToast();

  $('#clienteModal').modal('hide');
};

loadClienteTable();
