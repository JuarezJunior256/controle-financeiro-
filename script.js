const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

// busca no localStorage transações
const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))
// se localStorage tiver transações, irá buscar as transações
// se não tiver, inicia com um array vazio
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : []

// remove a transação selecionada
const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    
    updateLocalStorage()
    init()
}

// adiciona no Dom as transações 
const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const cssClass = transaction.amount  < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(cssClass)
    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
          x
        </button>
    `
    transactionUl.append(li)
}

// atuliza o display das receitas 
const updateBalanceValues = () => {
    // mapea os valores das transações 
    const transactionsAmounts = transactions.map(transaction =>  transaction.amount)
    // calcula todas receitas e depesas 
    const total = transactionsAmounts .reduce((acc, transaction) => acc + transaction,  0).toFixed(2)
    // soma todas as receitas positivas 
    const income = transactionsAmounts.filter(value => value > 0)
        .reduce((acc , value) => acc + value, 0).toFixed(2)
     // soma todas despesas negativas    
    const expense = Math.abs(transactionsAmounts.filter(value => value < 0)
        .reduce((acc , value) => acc + value, 0)).toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

// função de inicialização
const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

// inserindo no localStorage
const updateLocalStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(transactions))
}

// irá gerar um id randomico entre 1 a 1000
const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    // recebendo valores dos campos 
    const transactionName = inputTransactionName.value.trim()
    const transactionsAmounts = inputTransactionAmount.value.trim()

    // condição para verificar valores dos campos, caso seja nulo em algum, irá disparar um alerta
    if (inputTransactionName.value.trim() === '' || inputTransactionAmount.value.trim() === '') {
        alert('Por favor, preenchar os campos')
        return
    }

    // criando o objeto transação
    const transaction =  {id: generateID(), name: transactionName, amount: Number(transactionsAmounts)}
    //inserindo a trasanção no array
    transactions.push(transaction)
    init()
    updateLocalStorage()

    // limpando campos depois inserir a transação 
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})