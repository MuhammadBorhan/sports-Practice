

// toggler Image
const noneImage = (Male, Female) => {
    document.getElementById(Male).style.display = 'none';
    document.getElementById(Female).style.display = 'none';
}
noneImage('male-img', 'female-img');

// toggler spinner none and block
const spinner = Display => {
    document.getElementById('spinner').style.display = Display
}
spinner('none');

// when loading spinner showing then everything else none
const spinnersToggler = (playerDetailStyle) => {
    windoPlayer.innerHTML = '';
    document.getElementById(playerDetailStyle).innerHTML = '';
    noneImage('male-img', 'female-img');
}

const windoPlayer = document.getElementById('windo-player');

const searchPlayer = () => {
    const inputField = document.getElementById('input-box');
    spinner('block');
    spinnersToggler('player-details');
    document.getElementById('nai-kichu').innerText = '';
    const inputName = inputField.value;
    inputField.value = '';
    if (inputName == '') {
        document.getElementById('nai-kichu').innerText = "Please write player's name";
        spinner('none');
    } else {
        fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputName}`)
            .then(res => res.json())
            .then(data => displayPlayers(data.player))
    }
}
const displayPlayers = players => {
    if (!players) {
        document.getElementById('nai-kichu').innerText = "Name doesn't matched";

    } else {
        players?.forEach(player => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.classList.add('player');
            div.innerHTML = `
        <img src="${player.strThumb}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${player.strPlayer}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the
                bulk
                of the card's content.</p>
            <button onclick="deletButton()" class="btn btn-danger">Delete</button>
            <button onclick="playerDetails('${player.idPlayer}')" class="btn btn-success">Details</button>
        </div>
        `;
            windoPlayer.appendChild(div);
            document.getElementById('nai-kichu').innerText = '';
        })
    }
    spinner('none');
}
const playerDetails = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`)
        .then(res => res.json())
        .then(data => playersInfo(data.players[0]))
}
const playersInfo = info => {
    if (info.strGender == 'Male') {
        blockNone('male-img', 'female-img');
    } else {
        noneBlock('male-img', 'female-img');
    }
    document.getElementById('player-details').innerHTML = `
    <div class="card">
    <img src="${info.strThumb}" class="card-img-top img-fluid" alt="...">
    <div class="card-body">
        <h3 class="card-title">${info.strPlayer}</h3>
        <h4 class="card-title">${info.strNationality}</h4>
        <h4 class="card-title">${info.strBirthLocation}</h4>
        <p class="card-text">${info.strDescriptionIT}</p>

    </div>
</div>
    `;
}

const blockNone = (Male, Female) => {
    document.getElementById(Male).style.display = 'block';
    document.getElementById(Female).style.display = 'none';
}
const noneBlock = (Male, Female) => {
    document.getElementById(Male).style.display = 'none';
    document.getElementById(Female).style.display = 'block';
}