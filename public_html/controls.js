var mousePressed = false;
var mousePos;

function onMouseDown(pos)
{
    //console.log("mouse down at " + pos.x + ", " + pos.y);
    mousePos = pos;
    mousePressed = true;
    startAudio();
}
function onMouseMove(pos)
{
    mousePos = pos;
    if(mousePressed){
        //console.log("mouse moved to " + pos.x + ", " + pos.y);
        changeNote();
    }
}
function onMouseUp()
{
    mousePressed = false;
    endAudio();
}
function onMouseLeave()
{
    mousePressed = false;
    endAudio();
}

function mouseEventPos(e, target)
{
    var offset = $(target).offset();
    var x = e.clientX - offset.left;
    var y = e.clientY - offset.top;
    return {x: x, y: y};
}

function addControlCallbacks()
{
    window.addEventListener("resize", onResize);
}

function addPlayViewMouseListeners()
{
    $("#playCanvas").mousedown(function(e){
        onMouseDown(mouseEventPos(e, this));
    });
    $("#playCanvas").mousemove(function(e){
        onMouseMove(mouseEventPos(e, this));
    });
    $("#playCanvas").mouseup(function(){
        onMouseUp();
    });
    $("#playCanvas").mouseleave(function(){
        onMouseLeave();
    });
}
