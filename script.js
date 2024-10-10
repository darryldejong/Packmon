// Kleurcodes Pokemon-types
const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

// Lijst voor Legendary en Mythical Pokemon
const legendaryPokemon = [
    "articuno", "azelf", "calyrex", "chi-yu", "chien-pao", "cobalion", "cosmoem", "cosmog", "cresselia", "dialga", 
    "enamorus", "entei", "eternatus", "fezandipiti", "giratina", "glastrier", "groudon", "heatran", "ho-oh", 
    "koraidon", "kubfu", "kyogre", "kyurem", "landorus", "latias", "latios", "lugia", "lunala", "mesprit", 
    "mewtwo", "miraidon", "moltres", "munkidori", "necrozma", "ogerpon", "okidogi", "palkia", "raikou", "rayquaza", 
    "regice", "regidrago", "regieleki", "regigigas", "regirock", "registeel", "reshiram", "silvally", "solgaleo", 
    "spectrier", "suicune", "tapu-bulu", "tapu-fini", "tapu-koko", "tapu-lele", "terapagos", "terrakion", 
    "thundurus", "ting-lu", "tornadus", "type-null", "urshifu", "uxie", "virizion", "wo-chien", "xerneas", 
    "yveltal", "zacian", "zamazenta", "zapdos", "zekrom", "zygarde","giratina-altered","tornadus-incarnate","thundurus-incarnate"
];

const mythicalPokemon = [
    "deoxys", "celebi", "magearna", "keldeo", "mew", "jirachi", "arceus", "phione", "manaphy", "shaymin", 
    "darkrai", "meloetta", "pecharunt", "meltan", "melmetal", "shaymin","deoxys-normal","shaymin-land","victini",
    "meloetta","shaymin-sky","meloetta-aria","meloetta-pirouette","genesect","zarude"
];

async function openPack() {
    const cardContainer = document.getElementById("cardContainer");
    const button = document.getElementById("openPackButton");
    button.disabled = true;

    cardContainer.innerHTML = '';

    // Genereer (Aantal) Pokemon
    const promises = [];
    for (let i = 0; i < 5; i++) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`));
    }

    const responses = await Promise.all(promises);
    const dataPromises = responses.map(response => response.json());
    const data = await Promise.all(dataPromises);

    data.forEach(pokemon => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        
        let label = '';
        if (legendaryPokemon.includes(pokemon.name)) {
            label = `<span class="legendary-label">Legendary</span>`;
        } else if (mythicalPokemon.includes(pokemon.name)) {
            label = `<span class="mythical-label">Mythical</span>`;
        }

        cardElement.innerHTML = 
            `${label}
            <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
            <div>
                ${pokemon.types.map(type => `<span class="type-badge" style="background-color: ${typeColors[type.type.name]}">${type.type.name}</span>`).join('')}
            </div>`;
        
        cardContainer.appendChild(cardElement);
    });

    button.disabled = false;
}
