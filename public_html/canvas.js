const instrumentEdgeMargin = 60;

function resizePlayCanvas()
{
    var canvas = document.getElementById('playCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight*0.8;

    console.log("playCanvas resized to " + window.innerWidth + ", " + window.innerHeight);
}
function drawLine(ctx,x1,y1,x2,y2,width,style)
{
    ctx.strokeStyle = style;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}
function renderPlayBackground()
{
    var canvas = $("#playCanvas").get(0);
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.fillStyle = "rgb(50,50,80)";
    ctx.strokeStyle = backgroundSeparatorColor;
    ctx.font = '30px serif';

    ctx.fillRect(0,0,canvas.width, canvas.height);

    drawLine(
        ctx,
        0,
        instrumentEdgeMargin,
        canvas.width,
        instrumentEdgeMargin,
        backgroundSeparatorWidth,
        backgroundSeparatorColor
    );

    //draw octave separators
    var lineInterval = canvas.width / pitchWidth;
    var leftEdgeNote = pitchCenter - (lineInterval - canvas.width/2);
    var offsetToFirstOctaveStep = Math.ceil(leftEdgeNote) - leftEdgeNote;
    var offsetPix = offsetToFirstOctaveStep*lineInterval;
    var linesToDraw = Math.floor(pitchWidth - offsetToFirstOctaveStep) + 1;
    var firstOctave = Math.ceil(pitchCenter - pitchWidth/2);

    ctx.setLineDash(backgroundSeparatorDash);
    for(var i=0;i<linesToDraw; ++i)
    {
        var x = offsetPix+lineInterval*i;
        
        drawLine(
            ctx,
            x,
            instrumentEdgeMargin,
            x,
            canvas.height,
            backgroundSeparatorWidth,
            backgroundSeparatorColor
        );
    }
    ctx.setLineDash([]);
    
    for(var i=0;i<linesToDraw; ++i)
    {
        var x = offsetPix+lineInterval*i;
        
        ctx.strokeText(
            baseNote+(firstOctave+i),
            x,
            instrumentEdgeMargin/2
        );
    }
}
