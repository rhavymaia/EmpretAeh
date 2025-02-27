let dataset = [
  {
    nome: 'José da Silva',
    email: 'js@mail.com',
    cpf: '738.153.640-43',
  },
  {
    nome: 'Maria Alencar',
    email: 'ma@mail.com',
    cpf: '639.589.750-03',
  },
];

let clientesTable = document.getElementById('clientesTable');

for (const cliente of dataset) {
  clientesTable.insertAdjacentHTML(
    'beforeend',
    `<tr>
      <td></td>
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.cpf}</td>
    </tr>`,
  );
}
