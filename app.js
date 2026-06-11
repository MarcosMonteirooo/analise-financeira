const despesaList = []

/**
 * Função construtora de objetos despesa
 * @param {string} desc
 * @param {number} valor
 */
const Despesa = function(desc = "Não informado", valor = 0) {
    this.descricao = desc
    this.valor = valor
}

/**
 * Adiciona uma nova despesa no array de despesas
 * @returns {boolean} true se a despesa foi criada com sucesso
 */
const criarDespesa = () => {
    const descricaoInput = document.querySelector("#descricao")
    const valorInput = document.querySelector("#valor")
    const descricao = descricaoInput.value.trim()
    const valor = parseFloat(valorInput.value)

    if (!descricao || isNaN(valor) || valor <= 0) {
        alert("Por favor, informe uma descrição e um valor válido maior que zero.")
        return false
    }

    const despesaNova = new Despesa(descricao, valor)
    despesaList.push(despesaNova)

    descricaoInput.value = ""
    valorInput.value = ""
    descricaoInput.focus()

    return true
}

const carregarLista = () => {
    const lista = document.querySelector("#lista")
    lista.innerHTML = ""

    if (despesaList.length === 0) {
        lista.textContent = "Nenhuma despesa adicionada."
        return
    }

    despesaList.forEach(despesa => {
        const div = document.createElement("div")
        div.classList.add("item")
        div.textContent = `${despesa.descricao} - R$ ${despesa.valor.toFixed(2)}`
        lista.appendChild(div)
    })
}

const gerarEstatisticas = () => {
    const estatisticas = document.querySelector("#estatisticas")

    if (despesaList.length === 0) {
        estatisticas.innerHTML = "<p>Não há despesas para calcular estatísticas.</p>"
        return
    }

    const totalDeGastos = despesaList.reduce((total, despesa) => total + despesa.valor, 0)
    const valores = despesaList.map(despesa => despesa.valor)
    const maiorGasto = Math.max(...valores)
    const menorGasto = Math.min(...valores)
    const mediaGastos = totalDeGastos / valores.length
    let TotalDeGastosMaiorQue100 = 0
    despesaList.forEach(despesa => {
        if (despesa.valor > 100) {
            TotalDeGastosMaiorQue100++
        }
    })

    estatisticas.innerHTML = `
        <p><strong>Total de gastos:</strong> R$ ${totalDeGastos.toFixed(2)}</p>
        <p><strong>Maior gasto:</strong> R$ ${maiorGasto.toFixed(2)}</p>
        <p><strong>Menor gasto:</strong> R$ ${menorGasto.toFixed(2)}</p>
        <p><strong>Média:</strong> R$ ${mediaGastos.toFixed(2)}</p>
        <p><strong>Total de gastos acima de R$ 100:</strong> R$ ${TotalDeGastosMaiorQue100.toFixed(2)}</p>
        <h2> Percentual de gastos</h2>
        <div id="grafico"></div>
        </div>
    `
}

const btn = document.querySelector("#btnAdicionar")
btn.addEventListener("click", () => {
    if (criarDespesa()) {
        carregarLista()
        gerarEstatisticas()
    }
})

const valorInput = document.querySelector("#valor")
valorInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault()
        btn.click()
    }
})

// Inicializa a lista e as estatísticas vazias
carregarLista()
gerarEstatisticas()
