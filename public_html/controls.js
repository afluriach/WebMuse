var mousePressed = false;
var mousePos;

function CanvasMouseListener(events, canvasId)
{
    if(events.mousedown)
        $("#"+canvasId).mousedown(function(e){
            events.mousedown(mouseEventPos(e, this));
        });
    if(events.mousemove)
        $("#"+canvasId).mousemove(function(e){
            events.mousemove(mouseEventPos(e, this));
        });
    if(events.mouseup)
        $("#"+canvasId).mouseup(function(){
            events.mouseup();
        });
    if(events.mouseleave)
        $("#"+canvasId).mouseleave(function(){
            events.mouseleave();
        });
}


function mouseEventPos(e, target)
{
    var offset = $(target).offset();
    var x = e.clientX - offset.left;
    var y = e.clientY - offset.top;
    return {x: x, y: y};
}