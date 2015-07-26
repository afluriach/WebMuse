var pitchWidth = 5;
var pitchCenter = 5;

const baseNote = 'C';
const baseOctave = 3;
const baseFrequency = 130.813;

const backgroundSeparatorWidth = 5;
const backgroundSeparatorDash =[10,20];
const backgroundSeparatorColor ='rgb(230,230,230)';

//Elements should be {obj: jquery obj or selector, f: function}
var resizeHandlers = [];

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
    window.addEventListener("resize", function(){
        //Only call the callback once if the selector matches any object
        for(var callback of resizeHandlers){
            if($(callback.obj).length){
                callback.f();
            };
        }
    });
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

function makeTypedArray(arrType, input)
{
    var typed = new arrType(input.length);
    typed.set(input);
    return typed;
}
