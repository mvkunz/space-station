# 🚀 International Space Station Location Tracker 🚀

## Criando a funcão fetch:
Antes de implementar a função, é necessário entender o que a API vai retornar. Ao analisar a documentação, é possível encontrar o endpoint utilizado para buscar as informações de localização da ISS. Para visualizar seu retorno, você pode simplesmente acessar o endpoint em seu navegador.
Ao acessar o endpoint, é possível descobrir que a API retornará um objeto com o seguinte formato:
{
  "name": "iss",
  "id": 25544,
  "latitude": 50.11496269845,
  "longitude": 118.07900427317,
  "altitude": 408.05526028199,
  "velocity": 27635.971970874,
  "visibility": "daylight",
  "footprint": 4446.1877699772,
  "timestamp": 1364069476,
  "daynum": 2456375.3411574,
  "solar_lat": 1.3327003598631,
  "solar_lon": 238.78610691196,
  "units": "kilometers"
}
Como o objetivo da aplicação é apresentar as coordenadas da Estação Espacial Internacional, os dados utilizados são as chaves latitude e longitude retornados pela API.

Uma boa prática a ser seguida na implementação de aplicações é criar um arquivo chamado services, que será o responsável por armazenar e exportar todos os serviços da aplicação – no caso, todas as requisições às APIs.

No exemplo, o arquivo /src/services.ts deverá exportar a função que realiza o fetch para o endpoint https://api.wheretheiss.at/v1/satellites/25544. Essa função deve retornar os valores de latitude e longitude recebidos pela API.

O código acima está criando e exportando uma função fetchCoordinates, que realiza o fetch à API e retorna um objeto que contém as chaves latitude e longitude. Nesse caso, foi utilizado .toFixed(4), pois você vai renderizar apenas o valor com quatro números depois da vírgula e utilizar Number() para garantir que o valor armazenado será do tipo number.

👀 A lógica da aplicação deverá ser a seguinte: ao renderizar o componente App, a função fetchCoordinates deve ser executada. Após a execução dela, os valores retornados pela função deverão ser armazenados no estado do componente. Com isso, a aplicação deverá renderizar esses valores.

## Passo 1:
Primeiramente, crie o estado do componente, que deverá armazenar um objeto que contém as chaves latitude e longitude. Assim, crie o tipo Coordinates para indicar ao TypeScript o que se espera como valor do estado.

## Passo 2:
O próximo passo é importar a função fetchCoordinates criada anteriormente, a fim de que você tenha acesso aos valores retornados pela API e armazene-os no estado coordinates.

Conforme apresentado anteriormente, não se pode realizar requisições diretamente no corpo da aplicação. Portanto, utilize o hook useEffect para isso. Para utilizá-lo, importe-o do React.

O objetivo é que a requisição seja feita apenas uma vez, assim que o componente for renderizado. Portanto, o useEffect deve ter dois parâmetros:

O primeiro será a callback que contém o código que será executado:
Neste momento, deve-se chamar a função fetchCoordinates e armazenar o valor de seu retorno no estado coordinates.
O segundo será uma lista sem parâmetros, para informar que o hook será executado apenas uma vez após a primeira renderização do componente.
Um detalhe muito importante é que não se pode transformar a callback do useEffect em função assíncrona! Contudo, se a função fetchCoordinates for assíncrona, como fazer para executá-la dentro do useEffect? 🤔

Uma opção seria utilizar o método .then, mas, caso você queira utilizar o async/await, é necessário criar uma função assíncrona dentro do useEffect e executar essa função logo em seguida.

No código, está sendo criada a função assíncrona fetchData dentro do useEffect. Essa função vai aguardar o retorno de fetchCoordinates e armazená-lo no estado do componente. Na sequência, execute fetchData.

Como o segundo parâmetro do hook é uma lista vazia ([]), a callback será executada apenas uma vez após a primeira renderização do componente App.

## Passo 3:
Agora que os valores estão armazenados no estado do componente, basta renderizá-los. Porém, é preciso ter cuidado com um detalhe! Antes de executar o useEffect, o componente é renderizado pela primeira vez. Porém, nesse momento, o valor do estado coordinates ainda é vazio. Portanto, a fim de que a aplicação funcione corretamente, é necessário verificar se o estado já estará preenchido com as informações.

Pronto! Desse modo, o componente vai retornar as coordenadas apenas quando o estado coordinates estiver com os valores armazenados, ou seja, apenas após a execução do useEffect.
