'use strict'




// Funções para alimentar o CRUD do projeto em um banco local 

const acessarLocal = () => JSON.parse(localStorage.getItem('db_cliente')) ?? []
const enviarLocal = (db_cliente) => localStorage.setItem("db_cliente", JSON.stringify(db_cliente))


// Cria cliente no LocalStorage
const criarCliente = (cliente) => {

    const db_cliente = acessarLocal()
    db_cliente.push(cliente)
    enviarLocal(db_cliente)
    
}

const lerCliente = () => acessarLocal()

// Interação com o layout

const camposValidos = () => {
    return document.getElementById('formularioAdicionar').reportValidity()
}

const salvarCliente = () => {

    // Verificar se os dados foram preenchidos 
    if(camposValidos() ){
        const cliente = {
        
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            suspeita: document.getElementById('asf').value,
            telefone: document.getElementById('telefone').value

        }
        criarCliente(cliente)
    }
}


var data = new Date();
var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" 
    + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();

const criarLinha = (cliente) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
    <td>${cliente.nome}</td>
        <td>${cliente.cpf}</td>
    <td>${cliente.suspeita}</td>
    <td>${cliente.telefone}</td>
    <td>${dataFormatada}</td>
    `

    document.querySelector('#tabelaCliente>tbody').appendChild(novaLinha)
}

const atualizarTabela = () => {
    const db_cliente = lerCliente()

    db_cliente.forEach(criarLinha)
}

atualizarTabela()


// Gerando relatorio da Tabela 
function gerarRelatorio() {
    var table2excel = new Table2Excel();
    table2excel.export(document.querySelectorAll("table.tabela"));
}


// Eventos 
document.getElementById('registrarCliente')
    .addEventListener('click', salvarCliente)
