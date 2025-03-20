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

function clearForm(form) {
  // iterate over all of the inputs for the form
  // element that was passed in
  $(':input', form).each(function () {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); // normalize case
    // it's ok to reset the value attr of text inputs,
    // password inputs, and textareas
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = '';
    // checkboxes and radios need to have their checked state cleared
    // but should *not* have their 'value' changed
    else if (type == 'checkbox' || type == 'radio') this.checked = false;
    // select elements need to have their 'selectedIndex' property set to -1
    // (this works for both single and multiple select elements)
    else if (tag == 'select') this.selectedIndex = -1;
  });
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
  let cliente = Object.fromEntries(clienteFormData);

  let clientes = loadLocalStorage();
  clientes.push(cliente);
  localStorage.setItem('clientes', JSON.stringify(clientes));

  let clientesTable = document.getElementById('clientesTable');
  clientesTable.insertAdjacentHTML('beforeend', getRowClienteTable(cliente));

  Toastify({
    text: 'Cliente cadastrado com sucesso!',
    className: 'success',
  }).showToast();

  clearForm(clienteForm);

  $('#clienteModal').modal('hide');
};

loadClienteTable();
