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