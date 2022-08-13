// Realizando atribuição dos inputs e botoes do form a variaveis
let valorInputTitulo = document.querySelector("#titulo-dica");
let valorInputLinguagem = document.querySelector("#linguagem-skill");
let valorInputCategoria = document.querySelector("#categoria");
let valorInputDescricao = document.querySelector("#descricao-dica");
let valorInputLinkYt = document.querySelector("#urlyoutube");
const btnSalvarForm = document.querySelector("#btn-salvar");
// Realizando atribuição do card que informa as quantidades totais e de cada categoria
let numTotal = document.querySelector("#num-total");
let numFrontend = document.querySelector("#num-frontend");
let numBackend = document.querySelector("#num-backend");
let numFullstack = document.querySelector("#num-fullstack");
let numSoftskill = document.querySelector("#num-softskill");
// Crio um array para receber os objetos(Dicas), os objetos da pesquisa, os contadores de categoria especifica e flags de navegação globais
let arrayContemDicas = [],
  arrayDadosPesquisados = [],
  contadorFrontEnd = 0,
  contadorBackEnd = 0,
  contadorFullStack = 0,
  contadorSoftSkill = 0,
  flagPesquisaFalhou = 0,
  flagEditaDica = 0,
  flagApagaDicaAnterior,
  indiceDicaEditando,
  dicaExcluir;

// Função que é chamada no onload, caso o localStorage já tenha algum valor salvo,  ela garante que vá carregas sem problemas, caso contrário ele deixa a array preparada
function carregaDicasSalvas() {
  if (localStorage.getItem("arrayCompleta")) {
    // Confere se já existem dados salvos, caso existe carrega a array correta e chama a function atualizaDicas
    arrayContemDicas = JSON.parse(localStorage.getItem("arrayCompleta"));
    contadorFrontEnd = localStorage.getItem("numFrontEnd");
    contadorBackEnd = localStorage.getItem("numBackEnd");
    contadorFullStack = localStorage.getItem("numFullStack");
    contadorSoftSkill = localStorage.getItem("numSoftSkill");
    // Coloco o valor total de objetos de cada categoria nos cards informativos
    numTotal.innerHTML = arrayContemDicas.length;
    numFrontend.innerHTML = contadorFrontEnd;
    numBackend.innerHTML = contadorBackEnd;
    numFullstack.innerHTML = contadorFullStack;
    numSoftskill.innerHTML = contadorSoftSkill;
    return atualizaDicas();
  } else {
    arrayContemDicas = [];
    contadorFrontEnd = 0;
    contadorBackEnd = 0;
    contadorFullStack = 0;
    contadorSoftSkill = 0;
  }
}
// Cria um evento para o botão btnSalvarForm, ao ser clicado ele envia todos dados da dica para o localstorage e acrescente na arrayContemDicas
btnSalvarForm.addEventListener("click", salvaDadosInseridos);
function salvaDadosInseridos() {
  if (
    valorInputTitulo.value != "" &&
    valorInputLinguagem.value != "" &&
    valorInputCategoria.value != "" &&
    valorInputDescricao.value != "" &&
    valorInputTitulo.value.length >= 8 &&
    valorInputLinguagem.value.length >= 4 &&
    valorInputDescricao.value.length >= 32
  ) {
    let novaDica = {
      titulo: valorInputTitulo.value,
      linguagem: valorInputLinguagem.value,
      categoria: valorInputCategoria.value,
      descricao: valorInputDescricao.value,
      urlyt: valorInputLinkYt.value,
      indice: parseInt(arrayContemDicas.length) + 1,
    };
    // Faço uma conferencia de qual categoria foi selecionada e envio esse obj para o local reservado
    switch (valorInputCategoria.value) {
      case "FrontEnd":
        contadorFrontEnd = parseInt(contadorFrontEnd) + 1;
        break;
      case "BackEnd":
        contadorBackEnd = parseInt(contadorBackEnd) + 1;
        break;
      case "FullStack":
        contadorFullStack = parseInt(contadorFullStack) + 1;
        break;
      case "Comportamental/Soft":
        contadorSoftSkill = parseInt(contadorSoftSkill) + 1;
        break;
    }
    arrayContemDicas.push(novaDica);
    // Faço envio de todas as arrays de dicas criadas para localStorage
    localStorage.setItem("arrayCompleta", JSON.stringify(arrayContemDicas));
    localStorage.setItem("numFrontEnd", contadorFrontEnd);
    localStorage.setItem("numBackEnd", contadorBackEnd);
    localStorage.setItem("numFullStack", contadorFullStack);
    localStorage.setItem("numSoftSkill", contadorSoftSkill);
    // Confirmo se o usuário está salvando uma nova dica ou editando uma existente, uso a flagEditaDica para conferencia 
    if (flagEditaDica == 0) {
      alert("SUCESSO!\n\nDica cadastrada na base do conhecimento.");
    } else {
      // Caso o salvar seja clicado para editar uma dica existente, o usuario deverá informar se ele quer duplicar ou não a dica que está editando 
      window.alert(
        "SUCESSO!\n\nVocê acabou de editar uma dica."
      );
      excluiDicaInformada();
    }
  }
}
// Função irá criar uma li para cada elemento do array de dicas e fará a inserção do texto no html para cada item criado
function criaLiAddTexto(elemento) {
  // Deixo todos novos elementos criados e com seus atributos definidos
  let novaDicaLi = document.createElement("li");
  novaDicaLi.setAttribute("class", "box-dados");
  let novoTitulo = document.createElement("h2");
  let novaDivLinguagem = document.createElement("div");
  novaDivLinguagem.setAttribute("class", "box-dados-ling");
  let novoParafLinguagem = document.createElement("p");
  novoParafLinguagem.setAttribute("id", "dados-ling");
  let novaDivCategoria = document.createElement("div");
  novaDivCategoria.setAttribute("class", "box-dados-cat");
  let novoParafCategoria = document.createElement("p");
  novoParafCategoria.setAttribute("id", "dados-cat");
  let novaDescricao = document.createElement("p");
  novaDescricao.setAttribute("id", "dados-descricao");
  let novaDivBotoes = document.createElement("div");
  novaDivBotoes.setAttribute("class", "botoes-box-dados");
  let indiceDica = document.createElement("div");
  indiceDica.setAttribute("class", "indice-da-dica");

  // Faço inserção de cada novo elemento no seu devido lugar na lista e adiciono as informações de cada dica da arrayContemDicas
  document.querySelector(".dados-pesquisados").appendChild(novaDicaLi);
  document
    .querySelector(".dados-pesquisados")
    .lastElementChild.appendChild(novoTitulo).innerHTML = elemento.titulo;
  document
    .querySelector(".dados-pesquisados")
    .lastElementChild.appendChild(
      indiceDica
    ).innerHTML = `<strong>Índice de registro: </strong> ${elemento.indice}`;
  document
    .querySelector(".dados-pesquisados")
    .lastElementChild.appendChild(novaDivLinguagem)
    .appendChild(
      novoParafLinguagem
    ).innerHTML = `<strong>Linguagem/Skill: </strong> ${elemento.linguagem}`;
  document
    .querySelector(".dados-pesquisados")
    .lastElementChild.appendChild(novaDivCategoria)
    .appendChild(
      novoParafCategoria
    ).innerHTML = `<strong>Categoria: </strong> ${elemento.categoria}`;
  document
    .querySelector(".dados-pesquisados")
    .lastElementChild.appendChild(novaDescricao).innerHTML = elemento.descricao;

  // Para inserir os botões faço uma conferencia se foi adicionado link do yt, caso não tenha sido não crio o botão vídeo
  if (elemento.urlyt == "") {
    document
      .querySelector(".dados-pesquisados")
      .lastElementChild.appendChild(
        novaDivBotoes
      ).innerHTML = `<button class="btn-cards" onclick="excluiDicaInformada()">Excluir</button>
  <button class="btn-cards" onclick="editaDicaInformada()">Editar</button>`;
  } else {
    document
      .querySelector(".dados-pesquisados")
      .lastElementChild.appendChild(
        novaDivBotoes
      ).innerHTML = `<button class="btn-cards" onclick="excluiDicaInformada()">Excluir</button>
    <button class="btn-cards" onclick="editaDicaInformada()">Editar</button>
    <a href="${elemento.urlyt}" target="_blank" rel="noopener noreferrer">
    <button class="btn-cards">Vídeo</button></a>`;
  }
}

// Crio uma função que irá atualizar o arrayContemDicas caso seja excluido ou editado qualquer valor de atributo, ela também atualiza os dados apresentados na tela
function atualizaDicas() {
  // Busco os dados já salvos no localStorage
  arrayContemDicas = JSON.parse(localStorage.getItem("arrayCompleta"));
  // Se houver alguma informação carregada eu limpo o que está no container que mostra dica
  document.querySelector(".dados-pesquisados").innerHTML = "";
  // Realizo a adição dos elementos e informações de cada dica salva pelo formulario, utilizando o forEach
  arrayContemDicas.forEach(function (elemento, i) {
    // Chamo função que cria um li na ul para cada elemento da arrayContemDicas, a função já adiciona o texto no html
    criaLiAddTexto(elemento);

    // Realizo atualização do indice, para caso alguma dica seja excluida os valores sejam reajustados no localStorage
    elemento.indice = `${i + 1}`;
    localStorage.setItem("arrayCompleta", JSON.stringify(arrayContemDicas));
  });
}

// Função acionada quando o botão de excluir dica é clicado, pede confirmação do usuário que deve passar o indice do card que quer excluir
function excluiDicaInformada() {
  // Confirmo com a flagEditaDica se a dica a ser excluida veio a partir de uma edição de dica salva ou não 
  if (flagEditaDica == 0) {
    dicaExcluir = window.prompt(
      `ATENÇÃO!\n\nVocê está prestes a excluir uma dica.\n\nPara prosseguir por favor informe o número de registro da dica que gostaria de apagar: `
    );
  } else {
    // Caso seja exclusão de dica que foi editada eu busco no localStorage o indice da dica em questão e limpo a flag 
    dicaExcluir = localStorage.getItem("dicaEditandoIndex");
  }
  // Confere qual indice foi informado e exclui da array, ajusta o conteúdo mostrado na tela e chama função callback
  arrayContemDicas.forEach(function (elemento) {
    if (elemento.indice == dicaExcluir) {
      arrayContemDicas.splice(dicaExcluir - 1, 1);

      switch (elemento.categoria) {
        case "FrontEnd":
          contadorFrontEnd = parseInt(contadorFrontEnd) - 1;
          break;
        case "BackEnd":
          contadorBackEnd = parseInt(contadorBackEnd) - 1;
          break;
        case "FullStack":
          contadorFullStack = parseInt(contadorFullStack) - 1;
          break;
        case "Comportamental/Soft":
          contadorSoftSkill = parseInt(contadorSoftSkill) - 1;
          break;
      }
      // Envio para o localStorage as atualizações no array e contadores de categoria
      localStorage.setItem("arrayCompleta", JSON.stringify(arrayContemDicas));
      localStorage.setItem("numFrontEnd", contadorFrontEnd);
      localStorage.setItem("numBackEnd", contadorBackEnd);
      localStorage.setItem("numFullStack", contadorFullStack);
      localStorage.setItem("numSoftSkill", contadorSoftSkill);

      if(flagEditaDica == 0){
      alert("SUCESSO!\n\nDica excluida da base do conhecimento.");
      }else{
      flagEditaDica = 0;
      }
    }
    document.querySelector(".dados-pesquisados").innerHTML = "";
    
  });
  carregaDicasSalvas()
}

// Função que edita a dica informada por meio do indice digitado pelo usuário, assim como a excluiDicaInformada
function editaDicaInformada() {
  // Confirmo com o usuário qual dica ele gostaria de editar 
  let dicaEditar = window.prompt(
    `EDITANDO!\n\nVocê está prestes a editar uma dica.\n\nPara prosseguir por favor informe o número de registro da dica que gostaria de editar. Ela será carregada no formulário para que os dados sejam alterados. `
  );
  // Carrego no formulário as informações da dica que o usuário digitou 
  arrayContemDicas.forEach(function (elemento) {
    if (elemento.indice == dicaEditar) {
      valorInputTitulo.value = elemento.titulo;
      valorInputLinguagem.value = elemento.linguagem;
      valorInputCategoria.value = elemento.categoria;
      valorInputDescricao.value = elemento.descricao;
      valorInputLinkYt.value = elemento.urlyt;
      // Salvo no localStorage o indice dessa dica para usar futuramente 
      localStorage.setItem("dicaEditandoIndex", elemento.indice);
    }
  });
  // Uso uma variavel como flag, para que ao clicar em salvar no formulario o programa entenda que é a edição de uma dica já existente (Processo finaliza na função do botão salvar do form)
  flagEditaDica = 1;
}

// Faço atribuição do id do botão de pesquisa com uma variavel e crio um evento para chamar a função pesquisaPorTitulo ao ser clicado
btnPesquisa = document.querySelector("#btn-pesquisa");
btnPesquisa.addEventListener("click", pesquisaPorTitulo);
function pesquisaPorTitulo() {
  // Faço link do id da barra de pesquisa ocm uma variavel e ajusto o valor digitado
  inputBarraPesquisa = document.querySelector("#barra-pesquisa").value;
  filtraValorInput = inputBarraPesquisa.toUpperCase();
  // Crio um loop em todos os itens da lista e escondo aqueles que não são compatíveis
  arrayContemDicas.forEach((elemento) => {
    let elementoAjustadoUpperCase = elemento.titulo.toUpperCase();
    if (filtraValorInput == elementoAjustadoUpperCase) {
      arrayDadosPesquisados.push(elemento);
      localStorage.setItem(
        "dadosPesquisados",
        JSON.stringify(arrayDadosPesquisados)
      );
      // Se houver o item pesquisado limpo a tela para receber a informação apenas dele
      document.querySelector(".dados-pesquisados").innerHTML = "";
      flagPesquisaFalhou = 1;
    }
  });
  localStorage.getItem("dadosPesquisados");
  arrayDadosPesquisados.forEach((elemento) => {
    // Chamo a função que cria os elementos da lista e adiciona no html os dados do localStorage
    criaLiAddTexto(elemento);
  });
  // Ao final limpo o array de pesquisa para não acumular com as pesquisas anteriores
  arrayDadosPesquisados = [];
  localStorage.setItem(
    "dadosPesquisados",
    JSON.stringify(arrayDadosPesquisados)
  );
  // Utilizei uma variavel como flag para chamar um alert caso o usúario digite um título inválido
  if (flagPesquisaFalhou == 0) {
    alert(
      "Não foi possível encontrar o título informado. Por favor tente novamente."
    );
  }
  flagPesquisaFalhou = 0;
}

// Faço atribuição do id do botão de reset da pesquisa e adiciono evento limparPesquisa
btnPesquisa = document.querySelector("#btn-apaga");
btnPesquisa.addEventListener("click", apagaPesquisa);
// Limpa o que está digitado na barra de pesquisa e recarrega o container onde são apresentadas as dicas, usando função reload
function apagaPesquisa() {
  location.reload();
}



