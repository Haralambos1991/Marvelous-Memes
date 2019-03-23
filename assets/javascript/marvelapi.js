const SCOTT_PUBLIC_KEY = "09270388b0fcc2f9d0996884d57c16a5";
const SCOTT_PRIVATE_KEY = "f1565acbd2ca58ce61b4230f98c9617d545b4964";
console.log("marvelapi.js linked");
let randomMarvelCharacters = [];

function displayCharactersOnPage() {
    // Display the characters from marvel and make them selectable:
    let div = $('#photos-to-meme');
    console.log(randomMarvelCharacters);
    for(let i = 0; i < randomMarvelCharacters.length; i++) {
        let thumbnailDiv = $('<div>');
        thumbnailDiv.attr('class', 'thumbnail-to-meme col-6 col-sm-4 col-lg-3 col-xl-2');
        thumbnailDiv.attr('data-character-name', randomMarvelCharacters[i].name);
        //thumbnailDiv.attr('data-wiki-link', randomMarvelCharacters[i].urls[1].url);
        let img = $('<img>');
        img.addClass('img-responsive p-2 clickable')
        img.attr('src', `${randomMarvelCharacters[i].thumbnail.path}.${randomMarvelCharacters[i].thumbnail.extension}`);
        img.attr('width', '200');
        thumbnailDiv.append(img);
        div.prepend(thumbnailDiv);

        $("#charactersName").text(randomMarvelCharacters[i].name);
        $("#moreInfoName").text(randomMarvelCharacters[i].name);
        
    }
}

function getRandomMarvelCharacters(charactersToretrieve) {
    // Retrieves the first n characters from the marvel api of a given letter. (pseudo-random)
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let date = new Date();
    let timestamp = date.getTime();
    let queryHash = hex_md5(timestamp + SCOTT_PRIVATE_KEY + SCOTT_PUBLIC_KEY).toString();
    let randomAlphabetIndex = Math.floor(Math.random() * 25);
    // Select random letter to grab characters:
    let randomLetter = alphabet[randomAlphabetIndex];
    let queryURL = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&nameStartsWith=${randomLetter}&limit=${charactersToretrieve}&apikey=${SCOTT_PUBLIC_KEY}&hash=${queryHash}`;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      context: document.body,
      method: 'GET'
    }).then(function(result) {
        randomMarvelCharacters = result.data.results;
        displayCharactersOnPage();
    });
}
