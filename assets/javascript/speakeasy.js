// Code taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API#Speech_synthesis by 

var synth = window.speechSynthesis;

function speak(textToSpeak){
    console.log('speakeasy.js is speaking:', textToSpeak);
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (textToSpeak !== '') {
    var utterThis = new SpeechSynthesisUtterance(textToSpeak);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = 'Alex'; //voiceSelect.selectedOptions[0].getAttribute('data-name');
    utterThis.pitch = 1; //pitch.value;
    utterThis.rate = 1; //rate.value;
    synth.speak(utterThis);
  }
}