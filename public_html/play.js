webMuse.controller('PlayView', function($scope){
	loadInstrumentsList();
	playViewResize();
    $("#instruments").change(function(){
        loadInstrument($("#instruments").val());
    });
    
    new CanvasMouseListener(playMouseEvents, 'playCanvas');
});

var playMouseEvents = {
    mousedown: function(pos)
    {
        //console.log("mouse down at " + pos.x + ", " + pos.y);
        mousePos = pos;
        mousePressed = true;
        startAudio();
    },
    mousemove: function(pos)
    {
        mousePos = pos;
        if(mousePressed){
            //console.log("mouse moved to " + pos.x + ", " + pos.y);
            changeNote();
        }
    },
    mouseup: function()
    {
        mousePressed = false;
        endAudio();
    },
    mouseleave: function()
    {
        mousePressed = false;
        endAudio();
    }
};

function playViewResize()
{
    resizePlayCanvas();
    renderPlayBackground();
}
resizeHandlers.push({obj: "#playCanvas", f: playViewResize});

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
