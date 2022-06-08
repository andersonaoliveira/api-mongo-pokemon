//Coloca o nome do Album na tela e cria o Album (se não existir antes)
async function salvarAlbum(nomeDoAlbum) {
    alertError.innerHTML = "";
    if (nomeDoAlbum == ""){
        alertError.innerHTML += `<h1><center> INSIRA UM NOME PARA O SEU ALBUM </center></h1>`;
    } else {
        nomeDoAlbum = nomeDoAlbum.toUpperCase()
        atualAlbum.innerHTML = `SEU ALBUM ATUAL É "<span id="atualCollection">${nomeDoAlbum}</span>"`;
    }
    var todosAlbuns = await carregaAlbum();
    var contadorSeJaExiste = 0;

    todosAlbuns.forEach(element => {
        if (element.nomeAlbum == nomeDoAlbum){
            contadorSeJaExiste = 1;
        }
    });

    if (contadorSeJaExiste != 1){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "nomeAlbum":`${nomeDoAlbum}`,
            "pokemonsIds": ""
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("./albuns/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}

//função que carrega todas informações dos albuns
async function carregaAlbum() {
    var script = './albuns';
    const response = await fetch(script);
    const albunsSalvos = response.json();
    return albunsSalvos;
}

//atualiza lista de pokemons do album selecionado
async function atuaizaAlbumComPokemons() {
    var pokemonAtual = document.getElementById("pokemonAtual");
    pokemonAtual = pokemonAtual.innerText;
    pokemonAtual = pokemonAtual.toLowerCase()

    var collection = document.getElementById("atualCollection");
    collection = collection.innerText;

    alertError.innerHTML = "";

    if (pokemonAtual == null){
        alertError.innerHTML += `<h1><center> PRIMEIRO CONSULTE UM POKEMON </center></h1>`;
    } 
    if (collection == null){
        alertError.innerHTML += `<h1><center> INSIRA UM NOME PARA O SEU ALBUM </center></h1>`;
    }
    if (collection != null & pokemonAtual != null){

        var pokemonObjeto = criaObjetoPokemon();

        var consultaSeJaExiste = await consultaPorNumero();

        if (consultaSeJaExiste != 1){
            var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "nomePokemon": `${pokemonObjeto.nomePokemon}`,
                "numeroPokemon": `${pokemonObjeto.numeroPokemon}`,
                "velocidade": `${pokemonObjeto.velocidade}`,
                "hp": `${pokemonObjeto.hp}`,
                "ataque": `${pokemonObjeto.ataque}`,
                "defesa": `${pokemonObjeto.defesa}`,
                "ataqueEspecial": `${pokemonObjeto.ataqueEspecial}`,
                "defesaEspecial": `${pokemonObjeto.defesaEspecial}`,
                "linkDaFoto": `${pokemonObjeto.linkDaFoto}`
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("./pokemons", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }        

        var atualizarNumero;
        let numeroPokemon = document.getElementById("numeroDoPokemon");
        numeroPokemon = numeroPokemon.innerText;   
        atualizarNumero = await listarPokemonsDoAlbum();
        pegaID = await listarIDsDoAlbum();
        atualizarNumeroEmArray = atualizarNumero.split(" ");
        atualizarNumeroEmArray.push(numeroPokemon);
        const removendoRepetidos = [...new Set(atualizarNumeroEmArray)];
        atualizarNumeroEmArray = removendoRepetidos;
        atualizarNumeroTexto = atualizarNumeroEmArray.join(" ");

        inserePokemonNoAlbum(atualizarNumeroTexto, pegaID)
    }
}

async function consultaPorNumero(){
    let todosPokemons = await carregaPokemons()

    let numeroPokemon = document.getElementById("numeroDoPokemon");
    numeroPokemon = numeroPokemon.innerText;
    numeroPokemon = parseInt(numeroPokemon);

    var retorna = 0;

    todosPokemons.forEach(element => {
        if (element.numeroPokemon == numeroPokemon){
            retorna = 1;
        }
    });
    return retorna
}

//lista todos pokemons inseridos no album atual
async function listarPokemonsDoAlbum(){
    var carregarTudo = await carregaAlbum();
    var nomeDoAlbumAtual = document.getElementById("atualCollection");
    nomeDoAlbumAtual = nomeDoAlbumAtual.innerText;
    var ListaDePokemons;
    carregarTudo.forEach(element => {
        if (element.nomeAlbum == nomeDoAlbumAtual){
            ListaDePokemons = element.pokemonsIds;
        }
    });
    return ListaDePokemons
}

//lista o ID atual do Album
async function listarIDsDoAlbum(){
    var carregarTudo = await carregaAlbum();
    var nomeDoAlbumAtual = document.getElementById("atualCollection");
    nomeDoAlbumAtual = nomeDoAlbumAtual.innerText;
    var IDs;
    carregarTudo.forEach(element => {
        if (element.nomeAlbum == nomeDoAlbumAtual){
            IDs = element._id;
        }
    });
    return IDs
}

//método put na lista de pokemons do album
async function inserePokemonNoAlbum(atualizarNumeroTexto, pegaID){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "pokemonsIds": `${atualizarNumeroTexto}`
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("./albuns/"+pegaID, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}   

//Caso haja pokemons no album e tenha album, abrirá em baixo a lista completa com links
async function meuAlbum(){
    alertError.innerHTML = "";
    let nomeDoAlbum = document.getElementById("atualCollection");
    nomeDoAlbum = nomeDoAlbum.innerText;
    if (nomeDoAlbum == ""){
        alertError.innerHTML += "Você precisa digitar um nome para o Album";
    } else {
        let todosPokemons = await listarPokemonsDoAlbum();
        let todosPokemonsEmArray = todosPokemons.split(" ");

        for (i = 0; i < todosPokemonsEmArray.length; i++){
            pokemonsDoBanco(todosPokemonsEmArray[i]);
        }
    }
}

//imprime na tela as informações dos pokemons do banco
async function pokemonsDoBanco(numero){
    var todosPokemons = await carregaPokemons();
    todosPokemons.forEach(element => {
        if (element.numeroPokemon == numero){
            tabelaDoAlbum.innerHTML += ` NOME ${element.nomePokemon} <br>`;
            tabelaDoAlbum.innerHTML += `<tr><td> HP ${element.hp} <br>`;
            tabelaDoAlbum.innerHTML += ` Velocidade ${element.velocidade} <br>`;
            tabelaDoAlbum.innerHTML += ` Ataque ${element.ataque} <br>`;
            tabelaDoAlbum.innerHTML += ` Defesa ${element.defesa} <br>`;
            tabelaDoAlbum.innerHTML += ` Ataque Especial ${element.ataqueEspecial} <br>`;
            tabelaDoAlbum.innerHTML += ` Defesa Especial${element.defesaEspecial} <br>`;
            tabelaDoAlbum.innerHTML += ` ${element._id} <br>`;
            tabelaDoAlbum.innerHTML += ` ${element.numeroPokemon} <br>`;
            tabelaDoAlbum.innerHTML += ` <img src="${element.linkDaFoto}"> <br>`;
        }
    });
}

//carrega todas informações dos pokemons
async function carregaPokemons() {
    var script = './pokemons';
    const response = await fetch(script);
    const pokemonsSalvos = response.json();
    return pokemonsSalvos;
}

function criaObjetoPokemon() {  
    let nomePokemon = document.getElementById("pokemonAtual");
    nomePokemon = nomePokemon.innerText
    nomePokemon = nomePokemon.toLowerCase();

    let numeroPokemon = document.getElementById("numeroDoPokemon");
    numeroPokemon = numeroPokemon.innerText;
    numeroPokemon = parseInt(numeroPokemon);

    let velocidade = document.getElementById("atributoVelocidade");
    velocidade = velocidade.innerText;
    velocidade = velocidade.substring(12);
    velocidade = parseInt(velocidade);
    
    let hp = document.getElementById("atributoHP");
    hp = hp.innerText;
    hp = hp.substring(4);
    hp = parseInt(hp);

    let ataque = document.getElementById("atributoAtaque");
    ataque = ataque.innerText;
    ataque = ataque.substring(7);
    ataque = parseInt(ataque);

    let defesa = document.getElementById("atributoDefesa");
    defesa = defesa.innerText;
    defesa = defesa.substring(7);
    defesa = parseInt(defesa);

    let ataqueEspecial = document.getElementById("atributoAtaqueEspecial");
    ataqueEspecial = ataqueEspecial.innerText;
    ataqueEspecial = ataqueEspecial.substring(16);
    ataqueEspecial = parseInt(ataqueEspecial);

    let defesaEspecial = document.getElementById("atributoDefesaEspecial");
    defesaEspecial = defesaEspecial.innerText;
    defesaEspecial = defesaEspecial.substring(16);
    defesaEspecial = parseInt(defesaEspecial);

    let linkDaFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${numeroPokemon}.png`
    
    pokemonObjeto = {
        "nomePokemon": `${nomePokemon}`,
        "numeroPokemon": `${numeroPokemon}`,
        "velocidade": `${velocidade}`,
        "hp": `${hp}`,
        "ataque": `${ataque}`,
        "defesa": `${defesa}`,
        "ataqueEspecial": `${ataqueEspecial}`,
        "defesaEspecial": `${defesaEspecial}`,
        "linkDaFoto": `${linkDaFoto}`
    }
    return pokemonObjeto;
}