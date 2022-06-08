## Documentação

### Breve Resumo da Aplicação:
<br>
<br> 

- Esta aplicação, em nodejs, atualmente em sua versão `1.0`, tem por responsabilidade consumir api do site `https://pokeapi.co/`, entregar em interface amigável as informações mais importantes sobre cada persoangem pokemon selecionado e, por fim, armazenar dados dos albuns criados pelo usuário e dos pokemons linkados a eles, salvando-os em banco de dados MongoDB e buscando estes dados através do botão "VEJA ESTE ÁLBUM".
<br>
<br>

### Recursos Utilizados:
<br>

- Para edição de arquivos foi utilizado a ferramenta `Visual Studio Code`, em plataforma `Windows 11` e, também, foi utilizado a ferramenta `Postman` para testes e verificações em APIs e banco de dados.
<br>
<br> 

- Para correta execução da aplicação, são necessárias as seguintes dependências que já foram descritas no arquivo `package.json` que se encontra na raiz deste repositório, mas que destaco com o comando de instalação de cada uma via gerenciador de pacotes `NPM`:
<br>
<br> 


1. node em sua versão 17.7.2| para instalar digite `npm install node@17.7.2` no console.
2. express em sua versão 4.18.1| para instalar digite `npm install express@4.18.1` no console.
3. mongoose em sua versão 6.3.5| para instalar digite `npm install mongoose@6.3.5` no console.
<br>
<br> 

- A aplicação exige, também, a instalação do banco de dados `mongoDB`, ele pode ser instalado localmente via `MongoDBCompass`, ou via cloud service através do `Atlas`, ou via container através da ferramenta `Docker`. Neste caso, utilizei a ferramenta MongoDBCompass para edição e subi na plataforma `Okteto` aproveitando imagem de container da própria plataforma via docker-compose.
<br>
<br>

Links das aplicações mencionadas neste campo `Recursos Utilizados`.

- [Windows 11](https://www.microsoft.com/pt-br/software-download/windows11)

- [Visual Studio Code](https://code.visualstudio.com/)

- [Okteto](https://www.okteto.com/)

- [Docker](https://www.docker.com/)

- [NPM](https://www.npmjs.com/)

- [NodeJS](https://www.npmjs.com/package/node)

- [Express](https://www.npmjs.com/package/express)

- [Mongoose](https://www.npmjs.com/package/mongoose)

- [MongoDB](https://www.mongodb.com/)

- [Atlas](https://www.mongodb.com/atlas/database)

- [MongoDBCompass](https://www.mongodb.com/pt-br/products/compass)

- [Postman](https://www.postman.com/)
<br>
<br> 

### Funcionalidades:
<br>
Foi utilizado, nesta aplicação, framework EXPRESS, seguindo a prática do sistema MVC (Model, Views e Controller).
<br><br>

### MODELS

Quanto aos Models, separei tabelas distintas de Albuns e Pokemons, dessa forma é possível salvar diversos pokemons em um único álbum, sem, necessariamente, salvar mais vezes esses pokemons nos albuns.
<br>


O Schema do album conta com os seguintes campos:

~~~javascript
    id: {type: String},
    nomeAlbum: {type: String, required: true},
    pokemonsIds: {type: String}
~~~~
<br>

- Nota-se que cada álbum terá um id próprio, bem como terá um nome especificado pelo usuário (campo obrigatório para criação) e, por fim, um, ou vários pokemonsIds, em formato string, com o número dos respectivos pokemons. 
<br>
<br>


Já no Schema dos Pokemons constam os seguintes campos:

~~~javascript
    id: {type: String},
    nomePokemon: {type: String, required: true},
    numeroPokemon: {type: Number, required: true},
    velocidade: {type: Number, required: true},
    hp: {type: Number, required: true},
    ataque: {type: Number, required: true},
    defesa: {type: Number, required: true},
    ataqueEspecial: {type: Number, required: true},
    defesaEspecial: {type: Number, required: true},
    linkDaFoto: {type: String, required: true}
~~~
<br>

- Basicamente as informações que são coletadas e armazenadas no banco de dados, a respeito dos pokemons, são as seguintes. Todas são obrigatórias para criação do objeto Pokemon no banco de dados Pokemons, lembrando que o ID é gerado pelo próprio sistema no momento do post.

1. Nome do Pokemon
2. Número do Pokemon
3. Velocidade
4. HP
5. Ataque
6. Defesa
7. Ataque Especial
8. Defesa Especial
9. Imagem do pokemon

<br>

### CONTROLLERS

Nos arquivos de controle decidi, apenas, manter o controle do meu banco de dados via API, dessa forma criei o controle para `CRUD` tanto dos Albuns quanto dos Pokemons, utilizei comandos como o `.findById`, `.save`, `.findByIdAndUpdate` e o `.findByIdAndDelete` indicando nos arquivos Routes os endpoints e métodos para tais execuções. Dessa forma não foi necessário, durante e edição do restante da aplicação, nenhuma preocupação quanto a métodos e comandos do mongodb.

Os Endpoints e funções para o controller são encontrados nos arquivos de rotas, são estes:

~~~javascript
//pokemonsRoutes.js

  .get("/pokemons", PokemonController.listarPokemons)
  .get("/pokemons/:id", PokemonController.listarPokemonPorId)
  .post("/pokemons", PokemonController.cadastrarPokemon)
  .put("/pokemons/:id", PokemonController.atualizarPokemon)
  .delete("/pokemons/:id", PokemonController.excluirPokemon)

//albunsRoutes.js

  .get("/albuns", AlbumController.listarAlbuns)
  .get("/albuns/:id", AlbumController.listarAlbumPorId)
  .post("/albuns", AlbumController.cadastrarAlbum)
  .put("/albuns/:id", AlbumController.atualizarAlbum)
  .delete("/albuns/:id", AlbumController.excluirAlbum)
~~~

Destaco que a aplicação principal que, na atividade relacionada a sprint anterior, resumia-se a um `index.html` e um `index.js` foi, nessa aplicação, acrescentada de outros arquivos .js por razão de modularização do código. Para isso ela ficou dividida, basicamente, nos arquivos `index.html` que faz basicamente todo front-end da aplicação, e os arquivos `server.js` que faz a chamada do módulo express e início da conexão ao servidor, `aplicacao.js` que ficou responsável pela parte inicial de exibição dos dados consumidos via API pública e externa, como exibição das informações dos pokemons buscados e dos botões de avanço e retrocesso no pokemon selecionado, e `editarAlbum.js` que fez o intercâmbio entre as informações recebidas e o banco de dados via endpoints já mencionados, este arquivo foi responsável por realizar funções mais complexas como buscar os dados da api externa e colocar da forma necessária no banco de dados e, também, buscar os dados do banco de dados e exibir naquele arquivo index.html supramencionado. Em complemento com o arquivo `app.js`, `dbConnect.js` e `index.js`que tratam, basicamente, das funções com o banco de dados.
<br>
<br>

## Observações importantes

Para subir a aplicação no sistema Okteto, foi necessário a elaboração dos arquivos `Dockerfile`, `docker-compose.yml` e, também, no manifesto `okteto.yml`. Eles foram subidos com as seguintes configurações:

- Dockerfile:

~~~
FROM node:latest
LABEL maintainer="Anderson Oliveira"
COPY . /var/www
WORKDIR /var/www
RUN npm install node@17.7.2
RUN npm install express@4.18.1
RUN npm install mongoose@6.3.5
ENTRYPOINT node server.js
EXPOSE 3000
~~~

- docker-compose.yml
~~~
services:
    web:
        build:
            context: .
            dockerfile: Dockerfile
        image: andersonoliveira/api-mongodb-pokemon
        container_name: api-mongodb-pokemon
        depends_on:
            - mongodb
        ports:
            - 8080:8080
        networks:
            - prod

    mongodb:
        image: mongo
        container_name: db
        ports: 
            - 27017:27017
        networks:
            - prod
        environment:
            MONGO_INITDB_ROOT_USERNAME: root
            MONGO_INITDB_ROOT_PASSWORD: root
            MONGO_INITDB_DATABASE: test

networks: 
    prod:
        driver: bridge
~~~

- okteto.yml
~~~
name: apicommongodb
image: okteto/node:14
command: bash
sync:
- .:/usr/src/app
forward:
- 9229:9229
- 3000:3000
autocreate: true
~~~

Destaco que não houveram grandes mudanças nos arquivos `okteto.yml` e `Dockerfile` em relação ao desafio da Sprint 1, razões estas pela qual não irei detalhar suas informações, quanto ao arquivo `docker-compose.yml` é importante destacar que ele serve para unificar mais de um container na mesma rede "local", neste caso, a rede definida como `Bridge`, outro detalhe importante é que para aplicação funcionar corretamente, é necessário que o banco de dados esteja instalado e funcionando quando a aplicação principal iniciar, por este motivo, foi colocado aquele `depends_on: - mongodb` e, também, aponto que atribui a aplicação web a porta 8080 e, para o mongo, utilizei a porta padrão e pré-definida 27017.
<br>
<br>
<br>
Código inteiramente produzido e escrito por:
- `Anderson de Aguiar de Oliveira`
