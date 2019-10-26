var artists = [];

async function deleteFromServer(id) {
    // Default options are marked with *
    const url = '/delete';
    const data = {"id" : id};

    try {
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
    } catch (error) {
        console.error('Error:', error);
    }
}

async function readTextFile(filePath) {
    return new Promise(resolve => fetch(filePath).then(function (response) {
        response.json().then(async function (text) {
            resolve(text);
            return text;
        });
    }));

}

async function addToServer(aName, aQuote, aImg, id) {
    
    const url = '/add';
    const data = { "name":  aName, "quote": aQuote, "image": aImg, "id" : id};

    try {
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
    } catch (error) {
        console.error('Error:', error);
    }
}

async function initialize() {
    // if (storage.getItem('names') != null) {
    //     artistNames = JSON.parse(storage.getItem('names'));
    //     artistQuote = JSON.parse(storage.getItem('quotes'));
    //     artistImage = JSON.parse(storage.getItem('images'));
    //     updateStorage();
    //     displayArtist();
    // }
    artists = await readTextFile("./data.json");
    displayArtist();
}

function openPopup() {
    document.getElementById("popup").style.display = "inline-block";
    document.getElementById("openForm").setAttribute("onclick", "closePopup()");
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("openForm").setAttribute("onclick", "openPopup()");
}

async function addArtist() {
    var name = document.getElementById("artistName").value;
    var quote = document.getElementById("artistQuote").value;
    var img = document.getElementById("artistImage").value;

    var now = (new Date()).valueOf();
    var id = (new Date()).valueOf();
    while(id == now){
        id = (new Date()).valueOf();
    }

    id = parseInt(id);

    artists.push(
        {
            'name': name,
            'quote' : quote,
            'image' : img,
            'id' : id
        });

    addToServer(name, quote, img, id);
    document.getElementById("artistName").value = "";
    document.getElementById("artistQuote").value = "";
    document.getElementById("artistImage").value = "";
    closePopup();
    deleteAllArtists();
    displayArtist();
}

function deleteAllArtists() {
    var allCards = document.getElementsByClassName("card");
    while (allCards.length > 0) {
        allCards[0].parentNode.removeChild(allCards[0]);
    }
}

function displayArtist() {
    for (var i = 0; i < artists.length; ++i) {
        displaySelectArtist(artists[i].name, artists[i].quote, artists[i].image, artists[i].id);
    }
}

function displaySelectArtist(name, quote, imagesrc, id) {
    var newDiv = createDiv("div", "card");
    newDiv.id = id;
    var buttonDiv = createDiv("div", "button");
    var deleteButton = document.createElement("button");
    deleteButton.type = "submit";
    deleteButton.className = "delete btn";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("onclick", "deleteCard(" + id + ")");

    var containerDiv = createDiv("div", "container");

    var imageDiv = createDiv("div", "image");
    var image = document.createElement("img");
    image.src = imagesrc;
    imageDiv.appendChild(image);

    var textDiv = createDiv("div", "text");
    var nameDiv = createDiv("div", "name");
    nameDiv.textContent = name;
    textDiv.appendChild(nameDiv);
    var quoteDiv = createDiv("div", "quote");
    quoteDiv.textContent = quote;

    containerDiv.appendChild(imageDiv);
    textDiv.appendChild(nameDiv);
    textDiv.appendChild(quoteDiv);
    containerDiv.appendChild(textDiv);
    newDiv.appendChild(containerDiv);
    buttonDiv.appendChild(deleteButton);
    containerDiv.appendChild(buttonDiv);
    document.body.appendChild(newDiv);
}

function deleteCard(id) {
    var card = document.getElementById(id);
    card.parentNode.removeChild(card);
    var index = artists.findIndex(obj => obj.id == id);
    artists.splice(index, 1);
    deleteFromServer(id);
    deleteAllArtists();
    displayArtist();
}

function createDiv(tag, name) {
    var newDiv = document.createElement(tag);
    newDiv.className = name;
    return newDiv;
}

function search() {
    var text = document.getElementById("searchbar").value.toLowerCase();
    deleteAllArtists();
    var textLength = text.length;
    for (var i = 0; i < artists.length; ++i) {
        if (artists[i].name.toLowerCase().substring(0, textLength) === text) {
            displaySelectArtist(artists[i].name, artists[i].quote, artists[i].image, artists[i].id);
        }
    }
}