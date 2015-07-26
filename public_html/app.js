var pitchWidth = 5;
var pitchCenter = 5;

const baseNote = 'C';
const baseOctave = 3;
const baseFrequency = 130.813;

const backgroundSeparatorWidth = 5;
const backgroundSeparatorDash =[10,20];
const backgroundSeparatorColor ='rgb(230,230,230)';

var webMuse = angular.module('webMuse', ['ngRoute']);

webMuse.controller('GraphView', function($scope){

});

webMuse.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.when('/play', {
			templateUrl: 'play_view.html',
			controller: 'PlayView'
		});
		$routeProvider.when('/graph', {
			templateUrl: 'graph_view.html',
			controller: 'GraphView'
		});
		$routeProvider.otherwise({redirectTo: '/play'});
	}]);

function init()
{
    initAudio();
    addControlCallbacks();
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

function initTypedArray(arrType, input)
{
    var typed = new arrType(input.length);
    typed.set(input);
    return typed;
}
