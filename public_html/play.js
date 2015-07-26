webMuse.controller('PlayView', function($scope){
	loadInstrumentsList();
	onResize();
    attachElementCallbacks();
    
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
