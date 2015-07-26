var pitchWidth = 5;
var pitchCenter = 5;

const baseNote = 'C';
const baseOctave = 3;
const baseFrequency = 130.813;

const backgroundSeparatorWidth = 5;
const backgroundSeparatorDash =[10,20];
const backgroundSeparatorColor ='rgb(230,230,230)';

var webMuse = angular.module('webMuse', []);

function init()
{
    loadInstrumentsList();
    onResize();
    initAudio();
    addControlCallbacks();
    attachElementCallbacks();
}

function loadInstrumentsList()
{
    for(var instrument in waveTables)
    {
        var prettyName = instrument.replace(new RegExp("_", "g"), " ");

        var option = $("<option>");
        option.attr('value', instrument);
        option.attr('label', prettyName);

        $("#instruments").append(option);
    }
}

function attachElementCallbacks()
{
    $("#instruments").change(function(){
        loadInstrument($("#instruments").val());
    });
}

function initTypedArray(arrType, input)
{
    var typed = new arrType(input.length);
    typed.set(input);
    return typed;
}
