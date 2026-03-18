let botao = document.getElementById("registrar")
let listaVendas = document.getElementById("lista-vendas")
let totalElemento = document.getElementById("total")
let botaoLimpar = document.getElementById("limpar")

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

botao.addEventListener("click", registrarVenda)

function registrarVenda(){

let produto = document.getElementById("produto").value
let quantidade = document.getElementById("quantidade").value

if(quantidade == "" || quantidade <= 0){
alert("Digite uma quantidade válida")
return
}

let preco = precos[produto]
let totalVenda = preco * quantidade

totalDia += totalVenda

let linha = document.createElement("p")

linha.textContent =
produto + " | " +
quantidade + " unidades vendidas | R$" +
totalVenda + " "

let botaoRemover = document.createElement("button")
botaoRemover.textContent = "❌"

linha.appendChild(botaoRemover)

listaVendas.appendChild(linha)

totalElemento.textContent = "Total do Dia: R$" + totalDia

botaoRemover.addEventListener("click", function(){

linha.remove()

totalDia -= totalVenda

totalElemento.textContent = "Total do Dia: R$" + totalDia
})

 vendas.push({
produto: produto,
quantidade: quantidade,
total: totalVenda
})

localStorage.setItem("vendas", JSON.stringify(vendas))

}

let vendasSalvas = localStorage.getItem("vendas")

if(vendasSalvas){

vendas = JSON.parse(vendasSalvas)

vendas.forEach(function(venda){

let linha = document.createElement("p")

linha.textContent =
venda.produto + " | " +
venda.quantidade + " unidades vendidas | R$" +
venda.total

listaVendas.appendChild(linha)

totalDia += venda.total

})

totalElemento.textContent = "Total do Mês: R$" + totalDia

} 

botaoLimpar.addEventListener("click", function(){

if(confirm("Tem certeza que deseja apagar todas as vendas?")){

listaVendas.innerHTML = ""

totalDia = 0
totalElemento.textContent = "Total do Dia: R$0"

vendas = []

localStorage.removeItem("vendas")

}

})
