var audioContext;
var oscillator;

function OscillatorWithGain(type, initialGain, dest)
{
    this.oscillator = audioContext.createOscillator();
    this.oscillator.type = type;

    this.gainNode = audioContext.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(dest);

    this.gainNode.gain.value = initialGain;
    this.oscillator.start();
}
//set frequency and start
OscillatorWithGain.prototype = {
    start: function()
    {
        this.gainNode.gain.value = 1;
    },
    setFreq: function(f)
    {
        this.oscillator.frequency.value = f;
    },
    setNote: function(n)
    {
        this.setFreq(computeFrequency(n));
    },
    stop: function ()
    {
        this.gainNode.gain.value = 0;
    },
};

function initAudio()
{
    audioContext = new AudioContext();

    oscillator = new OscillatorWithGain('triangle', 0, audioContext.destination);
}            

function computeFrequency(note)
{
    var offsetToBase = note-baseOctave;

    return baseFrequency*Math.pow(2,offsetToBase);
}

function startAudio()
{
    oscillator.setNote(getNoteFromCanvas());
    oscillator.start();
}

function changeNote()
{
    oscillator.setNote(getNoteFromCanvas());
}

function endAudio()
{
    oscillator.stop();
}

//Get current note to play from mouse pos
function getNoteFromCanvas()
{
    var octaveInterval = canvas.width / pitchWidth;
    var startNote = pitchCenter - pitchWidth/2;

    return mousePos.x / octaveInterval + startNote;
}
