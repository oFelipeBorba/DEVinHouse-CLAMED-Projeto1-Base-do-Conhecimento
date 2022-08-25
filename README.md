# DEVinHouse: Turma CLAMED

> Projeto 1 - Base do Conhecimento

### Desenvolvimento de um sistema de 'Base de Conhecimento'  cujo objetivo é manter dicas de programação armazenadas no LocalStorage de cada usuário.
#### A aplicação foi desenvolvida em HTML, CSS e JavaScript, sem o uso de frameworks.
##### O usuário tem acesso ao cadastro de novas dicas a partir de um formulário que capta as informações mais importantes que serão armazenadas no LocalStorage, ele é capaz de, além de navegar entre as dicas salvas por meio de uma barra de pesquisa, editar, excluir e acessar um vídeo com exemplificação da dica, caso um link tenha sido informado ao cadastrar a dica em questão.

## Conhecimentos utilizados para criação:
#### Além de conceitos básicos de marcação por meio do HTML e estilização por meio do CSS, na parte do JavaScript é possível citar os seguintes conhecimentos:
- Utilização de arrow functions e callback functions;
- Manipulação de elementos com DOM;
- Armazenagem e acesso de informações no LocalStorage;
- Arrays e seus métodos;
- JSON;
- Funções nativas;

##### Foi desenvolvido estilização para melhorar a responsividade do sistema para telas com largura menor que 1160px.

## Principais funções criadas:
#### Para o funcionamento correto do sistema desenvolvido foram criadas as seguintes funções:
- **carregaDicasSalvas()** : Realiza verificação no LocalStorage para saber se deverá ser carregado na página as dicas existentes; *(Linha: 28)*
- **salvaDadosInseridos()** : Busca os valores informados nos inputs do formulário e salva os dados em uma array que é enviada para o LocalStorage; *(Linha: 54)*
- **criaLiAddTexto()** : Função cria os elementos HTML e insere as informações de cada dica que foi cadastrada; *(Linha: 108)*
- **atualizaDicas()** : Atualiza as dicas no LocalStorage e na página, toda vez que alguma modificação é realizada, como cadastro de nova dica, exclusão, edição, etc; *(Linha: 175)*
- **excluiDicaInformada()** : Exclui a dica informada pelo usuário; *(Linha: 192)*
- **editaDicaInformada()** : Edita a dica informada pelo usuário; *(Linha: 241)*
- **pesquisaPorTitulo()** : Filtra e mostra na tela todas as dicas que contenham em seu título a palavra ou letras digitadas no campo de pesquisa; *(Linha: 265)*
- **apagaPesquisa()** : Limpa o campo de pesquisa e o filtro da pesquisa realizada; *(Linha: 307)*

## Visualização do projeto final:
<img src="https://user-images.githubusercontent.com/108702072/186738985-4cdbd0d3-c2bc-48cb-b78e-b0bab1701984.png" width="700px" />


> Desenvolvido por: Felipe de Oliveira Borba
