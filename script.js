const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

let dummyTransactions = [
    {id:1, name: "seguro carro", amount: -500},
    {id:2, name: "salário", amount: 1500},
    {id:3, name: "peneu", amount: -300}
]

const removeTransaction = ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
    init()
}

// lista de receitas e despesas
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
    const transactionsAmounts = dummyTransactions.map(transaction =>  transaction.amount)
    const total = transactionsAmounts .reduce((acc, transaction) => acc + transaction,  0).toFixed(2)
    const income = transactionsAmounts.filter(value => value > 0)
        .reduce((acc , value) => acc + value, 0).toFixed(2)
    const expense = Math.abs(transactionsAmounts.filter(value => value < 0)
        .reduce((acc , value) => acc + value, 0)).toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionUl.innerHTML = ''
    dummyTransactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionsAmounts = inputTransactionAmount.value.trim()

    if (inputTransactionName.value.trim() === '' || inputTransactionAmount.value.trim() === '') {
        alert('Por favor, preenchar os campos')
        return
    }

    const transaction =  {id: generateID(), name: transactionName, amount: Number(transactionsAmounts)}
    dummyTransactions.push(transaction)
    init()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})