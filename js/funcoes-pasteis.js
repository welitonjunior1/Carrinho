 // Estou criando a variavel valorTotal e pego o valor que esta com o #total do HTML
 let valorTotal = document.querySelector("#total");
            
           
 //criando uma função para alterar o valor do número para padrão do real por que temos que usar 
 function moedaParaFloat(valor){
     //O replace serve para subistituir posso fazer em uma linha ou em mais linhas
     let textoLimpo = valor.replace('R$' , '').replace(',' , '.');;
     //textoLimpo = textoLimpo.replace(',' , '.');
     //altero para Float
     return parseFloat(textoLimpo);
 }
 //criando uma função para alterar de fLOAT para moeda usando o valor
 function floatParaMoeda(valor){
     //
     let valorFormatado = (valor < 1 ? '0' : '') + Math.floor(valor*100);
     valorFormatado = 'R$ ' + valorFormatado;
     //O substr (-2) pega o final do que estiver dentro da variavel valorFormatado 
     return valorFormatado.substr(0, valorFormatado.length-2) + ',' + valorFormatado.substr(-2);
 }
 //Retorna o total do valor interno do HTML que está com id="total"
 function retornaTotal(){
     let valorTotal = document.querySelector("#total");
     //Converte o que esta em HTML para float
     return moedaParaFloat(valorTotal.innerHTML);
    
 }
 function escreveTotal(valor){
     let valorTotal = document.querySelector('#total');
     valorTotal.innerHTML = floatParaMoeda(valor);

 }

// Essa function serve para trazer os valores de todos elementos produtos *  a quantidade 
function calcularTotalProdutos(){
    //O querySelectorAll tras todos os elementos do html com seletor class="preco-produto"
    let todosProdutos = document.querySelectorAll(".preco-produto");
    //Me trás todas as quantidades com o identificador class="quantidade no sistema"
    let todasQuantidades = document.querySelectorAll(".quantidade");
    let totalProdutos = 0;
    //esse for serve para pegar todos os valores do array
    // O posicao vai do zero até o tamanho do array  
    for(let posicao = 0; posicao < todosProdutos.length ; posicao++){
        //Pego todos HTML de preco em todas as posicoes 
        let umPreco = moedaParaFloat(todosProdutos[posicao].innerHTML);
        // Pego todos os valores de quantidades dos produtos coloco no array e transformo em float
        let umaQuantidade = moedaParaFloat(todasQuantidades[posicao].value);
        //faço O preço * a quantidade de produtos
        let subtotal = umPreco * umaQuantidade;
        totalProdutos += subtotal; 
    }
    return totalProdutos;    
}

//Essa functio serve para quando o usúario modificar a quantidade de produtos para comprar
function quantidadeMudou(){
    //escreve o total na tela dos produtos escolhidos 
    escreveTotal(calcularTotalProdutos());
}

//Quando clicar no input para aumentar ou diminuir a quantidade dos produtos ele modifica o valor total automaticamente
function aoCarregarPagina(){
    let camposQuantidade = document.querySelectorAll('.quantidade');
    //O for serve para continuar mudando enquanto i for menor que o tamanho do array camposQuantidade
    for(let i = 0; i <  camposQuantidade.length; i++){
        //Estou usando o nome da function quantidadeMudou como argumento para este evento onchenge
        //onchenge serve para quando mudar o valor dos campos quantidades ele muda automaticamente a quantidade total de produtos
        //Parte final eu chamo ela como uma function anonima, serve para fazer mais uma chamada de mais uma function ou 
        //atribuir mais uma function ou fazer mais alguma programação. 
        camposQuantidade[i].onchange = (function(){
            quantidadeMudou();
        })
    }
}

//Criar um evento para carregar quando a pagina ele executar a function de alterar o valor total do preço total
window.onload = (function(){
    //chamando a function aoCarregarPagina() para quando carregar a pagina
    aoCarregarPagina();
    //chamando a function quantidadeMudou() para quando carregar a pagina
    quantidadeMudou();
});

