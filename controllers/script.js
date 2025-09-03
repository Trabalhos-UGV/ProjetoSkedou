async function carregarDados() {
    const response = await fetch('locahost:3000/a');
    const usuarios = await response.json();
    preencherTabela(myTable);
}

function preencherTabela(dados) {
    const corpoTabela = document.getElementById('myTable');
    corpoTabela.innerHTML = ''; // Limpa a tabela

    // Usando forEach para percorrer os dados
    dados.forEach(view => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
                    <td>${view.nome_cliente}</td>
                    <td>${view.ultimo_agendamento}</td>
                    <td>${view.quan_servicos}</td>
                    <td>${view.valor_solicitacao}</td>
                `;

        corpoTabela.appendChild(linha);
    });
}