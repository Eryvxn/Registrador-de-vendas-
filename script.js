let botao = document.getElementById("registrar")
let listaVendas = document.getElementById("lista-vendas")
let totalElemento = document.getElementById("total")
let botaoLimpar = document.getElementById("limpar")
let carrinho = []

let totalDia = 0
let vendas = []

let precos = {
"Sorvete 10L": 80,
"Sorvete 5L": 50,
"Sorvete 1L": 10,
"Sorvete 200ML": 2,
"Sundae": 2.5,

"Açaí 10L": 80,
"Açaí 5L": 50,
"Açaí 1L": 10,

"Ao leite": 2,
"Skimo": 3,
"Paleta Mexicana": 4
}

let botaoAdd = document.getElementById("add")

botaoAdd.addEventListener("click", adicionarProduto)

function adicionarProduto(){

let produto = document.getElementById("produto").value
let quantidade = document.getElementById("quantidade").value

if(quantidade == "" || quantidade <= 0){
alert("Digite uma quantidade válida")
return
}

let preco = precos[produto]
let total = preco * quantidade

carrinho.push({
produto: produto,
quantidade: quantidade,
total: total
})

alert("Produto adicionado ao pedido!")

document.getElementById("quantidade").value = ""
}


botao.addEventListener("click", registrarVenda)


function registrarVenda(){
    console.log("CLIQUE FUNCIONOU")

let cliente = document.getElementById("cliente").value

if(cliente == ""){
alert("Digite o nome do cliente")
return
}

if(carrinho.length == 0){
alert("Adicione produtos ao pedido")
return
}

let totalPedido = 0

let linha = document.createElement("p")

linha.textContent = "Cliente: " + cliente + " | "

carrinho.forEach(function(item){
linha.textContent += item.produto + " (" + item.quantidade + ") | "
totalPedido += item.total
})

linha.textContent += " Total: R$" + totalPedido

listaVendas.appendChild(linha)

totalDia += totalPedido
totalElemento.textContent = "Total do Mês: R$" + totalDia

vendas.push({
cliente: cliente,
itens: carrinho,
total: totalPedido
})

localStorage.setItem("vendas", JSON.stringify(vendas))

carrinho = []
document.getElementById("cliente").value = ""

}

let vendasSalvas = localStorage.getItem("vendas")

if(vendasSalvas){

vendas = JSON.parse(vendasSalvas)

vendas.forEach(function(venda){

let linha = document.createElement("p")

linha.textContent = "Cliente: " + venda.cliente + " | "

venda.itens.forEach(function(item){
linha.textContent += item.produto + " (" + item.quantidade + ") | "
})

linha.textContent += " Total: R$" + venda.total

listaVendas.appendChild(linha)

totalDia += venda.total

})

totalElemento.textContent = "Total do Mês: R$" + totalDia

}



botaoLimpar.addEventListener("click", function(){

if(confirm("Tem certeza que deseja apagar todas as vendas?")){

listaVendas.innerHTML = ""

totalDia = 0
totalElemento.textContent = "Total do Mês: R$0"

vendas = []

localStorage.removeItem("vendas")

}

})
