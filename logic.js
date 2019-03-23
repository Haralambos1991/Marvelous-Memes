console.log('logic.js linked');

// Globals to reference the current meme picture and text:
let memeImageSRC, memeCaption, memeURL;

function displayMemeCreation() {
    // Display the initial state, create-a-meme
    $('#initial-mode').show();
    $('#edit-mode').hide();
    $('#share-mode').hide();
    getRandomMarvelCharacters(6);
}

function displayMemeEditor() {
    // Display the edit-meme state:
    $('#initial-mode').hide();
    $('#edit-mode').show();
    $('#share-mode').hide();
    let imageToMeme = $('<img>');
    imageToMeme.attr('src', memeImageSRC);
    imageToMeme.attr('width', '100%');
    $('#photo-to-edit').append(imageToMeme);
}

function displayPermalink() {
    // Display the final created meme along with permalink.
    // Also loads if someone visits the page via a permalink.
    $('#initial-mode').hide();
    $('#edit-mode').hide();
    $('#share-mode').show();
    let url = $(location).attr('href');
    let memeId = null;
    if (url.includes('?')) {
        memeId = url.substring(url.indexOf('?') + 1, url.length); // strips out the beginning of the URL, up to the ?
        if (memeId.includes('&')) {
            memeId = memeId.substring(0, memeId.indexOf('&')); // strips out the &blkadfj that Facebook appends to links you share.
        }
        console.log('memeID is', memeId);
        console.log('retrieving stored data...');
        retrieveMeme(memeId);
        console.log('returned')
    }
    else {
        appendPicInPermalink();
    }
}

function appendPicInPermalink() {
    // actually append pic to page
    // separate function because we want to run it AFTER I download the meme if someone visits a permalink
    let imageToMeme = $('<img>');
    imageToMeme.attr('src', memeImageSRC);
    imageToMeme.attr('width', '90%');
    $('#meme-image-share').empty();
    $('#meme-image-share').append(imageToMeme);
    $('#meme-text-share').empty();
    $('#meme-text-share').append(memeCaption);
    $('#meme-URL').val('https://rhoang57.github.io/Team7/index.html?' + memeURL);
    console.log('Speaking meme...');
    speak(memeCaption);
}

$("#refresh").on("click", function () {
    // Display new characters.
    getRandomMarvelCharacters(6);
});

$('#speak-entered-text').on('click', function() {
    // Speak when someone clicks the preview button.
    event.preventDefault();
    let textToSpeak = $("#meme-text-to-speak").val().trim();
    speak(textToSpeak);
});

$('#meme-image-share').on('click', function() {
    speak(memeCaption);
});

$(document).on('click', '.thumbnail-to-meme', function() {
    // Select a character to create a meme.
    // (When a user clicks on any div that has class 'thumbnail-to-meme')
    console.log('clicked', this);
    memeImageSRC = $(this).find('img').attr('src');
    console.log('src is', memeImageSRC);
    displayMemeEditor();
});

$(document).on('click', '#save-meme', function() {
    // Saves the completed meme to firebase.
    event.preventDefault();
    memeCaption = $('#meme-text-to-speak').val();
    console.log('Saving meme...');
    console.log('src is', memeImageSRC);
    console.log('caption is', memeCaption);
    saveMemeToFirebase();
    displayPermalink();
});

$(document).on('click', '#copy-url', function() {
    event.preventDefault();
    var copyText = document.getElementById("meme-URL");
    /* Select the text field */
    copyText.select();
    /* Copy the text inside the text field */
    document.execCommand("copy");
    /* Alert the copied text */
    console.log("Copied the text: " + copyText.value);
});

$(document).ready(function(event) {
    // When page loads, determine if we should display a completed meme (via permalink)
    // or alternately, the default meme creation mode:

    let url = $(location).attr('href');
    console.log('url is', url);
    if (url.includes('?')) {
        console.log('displaying permalink...');
        displayPermalink();
    }
    else {
        displayMemeCreation();
    }
});