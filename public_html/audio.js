var audioContext;
var oscillator;

function OscillatorWithGain(dest)
{
    this.oscillator = audioContext.createOscillator();

    this.gainNode = audioContext.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(dest);

    this.gainNode.gain.value = 0;
}
//set frequency and start
OscillatorWithGain.prototype = {
    _connectAndStart: function()
    {
        
    },
    setGain: function(gain)
    {
        this.gainNode.gain.value = gain;
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
        this.setGain(0);
    },
};
OscillatorWithGain.createFromBuiltinType = function(dest, type)
{
    var osc = new OscillatorWithGain(dest);
    osc.oscillator.type = type;
    osc.oscillator.start();
    return osc;
};
OscillatorWithGain.createFromWaveformTable = function(dest, real, imag)
{
    var osc = new OscillatorWithGain(dest);
    var wave = audioContext.createPeriodicWave(real, imag);
    
    osc.oscillator.setPeriodicWave(wave);
    osc.oscillator.start();
    return osc;
};

function initAudio()
{
    audioContext = new AudioContext();
    loadInstrument("01_Saw");
}            

function loadInstrument(instrument)
{
    if(oscillator)
        oscillator.stop();
    
    var real = makeTypedArray(Float32Array, waveTables[instrument].real);
    var imag = makeTypedArray(Float32Array, waveTables[instrument].imag);
    
    oscillator = OscillatorWithGain.createFromWaveformTable(audioContext.destination,real,imag);
}

function computeFrequency(note)
{
    var offsetToBase = note-baseOctave;

    return baseFrequency*Math.pow(2,offsetToBase);
}

function startAudio()
{
    oscillator.setNote(getNoteFromCanvas());
    oscillator.setGain(1-getVerticalFromCanvas());
}

function changeNote()
{
    oscillator.setNote(getNoteFromCanvas());
    oscillator.setGain(1-getVerticalFromCanvas());
}

function endAudio()
{
    oscillator.stop();
}

//Get current note to play from mouse pos
function getNoteFromCanvas()
{
    var octaveInterval = $('#playCanvas').get(0).width / pitchWidth;
    var startNote = pitchCenter - pitchWidth/2;

    return mousePos.x / octaveInterval + startNote;
}

function getVerticalFromCanvas()
{
    return mousePos.y / $('#playCanvas').get(0).height;
}
