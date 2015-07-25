var pitchWidth = 5;
var pitchCenter = 5;

const baseNote = 'C';
const baseOctave = 3;
const baseFrequency = 130.813;

const backgroundSeparatorWidth = 5;
const backgroundSeparatorDash =[10,20];
const backgroundSeparatorColor ='rgb(230,230,230)';

function init()
{
    onResize();
    initAudio();
    addControlCallbacks();
}
