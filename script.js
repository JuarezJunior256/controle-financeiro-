const transactionUl = document.querySelector('#transactions')
const dummyTransactions = [
    {id:1, name: "seguro carro", amount: -500},
    {id:2, name: "salário", amount: 1500},
    {id:3, name: "peneu", amount: -300}
]

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const cssClass = transaction.amount  < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(cssClass)
    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
    `
    transactionUl.append(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions.map(transaction =>  transaction.amount)
    const total = transactionsAmounts .reduce((acc, transaction) => acc + transaction,  0).toFixed(2)
    console.log(total)
}

const init = () => {
    dummyTransactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

