var audioContext;
var oscillator;
var gainNode;

function initAudio()
{
    audioContext = new AudioContext();

    oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle';

    gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.value = 0;
    oscillator.start();
}            

function computeFrequency(note)
{
    var offsetToBase = note-baseOctave;

    return baseFrequency*Math.pow(2,offsetToBase);
}

function startAudio()
{
    oscillator.frequency.value = getFrequency();
    gainNode.gain.value = 1;
}

function changeNote()
{
    oscillator.frequency.value = getFrequency();
}

function endAudio()
{
    gainNode.gain.value = 0;
}

//Get current note to play from mouse pos
function getNote()
{
    var octaveInterval = canvas.width / pitchWidth;
    var startNote = pitchCenter - pitchWidth/2;

    return mousePos.x / octaveInterval + startNote;
}
function getFrequency()
{
    return computeFrequency(getNote());
}