webMuse.controller('PlayView', function($scope){
	loadInstrumentsList();
	playViewResize();
    $("#instruments").change(function(){
        loadInstrument($("#instruments").val());
    });
    
    new CanvasMouseListener(playMouseEvents, 'playCanvas');
});

webMuse.controller('SongPlayView', function($scope){
    //Used for capture/playback.
    var currentTrack = new Track();
    
    var currentNote = null;
    var recordingStartTime = null;
    
    var playbackHandler = null;
    
    //Get time in milliseconds, corresponding to recording position in the track.
    function getTrackTime()
    {
        return Date.now() - recordingStartTime;
    }
    
    webMuse.getCurrentTrack = function(){
        return currentTrack;
    }
    
    //Corresponds to starting a note on the instrument.
    webMuse.startNote = function(pitch, gain){
        currentNote = new Note(pitch, gain, getTrackTime());
    }
    
    //Corresponds to slurring to another note, i.e. change in pitch or gain.
    //The note is marked as slurring into the next note; it is pushed into the track
    //and then the next one is created.
    webMuse.changeNote = function(pitch, gain){
        var time = getTrackTime();
        currentNote.length = time - currentNote.start;
        currentNote.slurs = true;
        currentTrack.addNote(currentNote);
        currentNote = new Note(pitch, gain, time);
    }
    
    //Corresponds to releasing note on the instrument. Finish the note and push it onto
    //the track.
    webMuse.endNote = function(){
        var time = getTrackTime();
        if(currentNote){
            currentNote.length = time-currentNote.start;
            currentTrack.addNote(currentNote);
            currentNote = null;
        }
    }
    
    function canPlay()
    {
        return currentTrack && currentTrack.notes.length > 0;
    }

    //setEnabled("#record", true); - This is implicit.
    setEnabled("#play", false);
    setEnabled("#stop", false);
    
    //Callbacks for handling playback buttons.    
    assignOnClick("#record", function(){
        webMuse.recording = true;
        recordingStartTime = Date.now();
    
        setEnabled("#record", false);
        setEnabled("#play", false);
        setEnabled("#stop", true);
    });
    
    assignOnClick("#play", function(){        
        if(canPlay()){
            playbackHandler = new PlaybackHandler(currentTrack, onStopPlayback);
            playbackHandler.start();
        
            setEnabled("#record", false);
            setEnabled("#play", false);
            setEnabled("#stop", true);
        }
    });
    
    assignOnClick("#stop", function(){
        if(webMuse.recording){
            onStopRecording();
        }
        else if(playbackHandler){
            onStopPlayback();
        }
    });
    
    //Called in the callback for the stop button, but also when the playback handler
    //stops at the end of the track. 
    function onStopPlayback(){
        playbackHandler.stop();
        playbackHandler = null;
        enableButtonsAfterStop();
    }
    function onStopRecording(){
        webMuse.recording = false;
        enableButtonsAfterStop();
    }
    function enableButtonsAfterStop()
    {
        setEnabled("#record", true);
        setEnabled("#play", true);
        setEnabled("#stop", false);
    } 
});

function PlaybackHandler(track, onStop)
{
    var timerInterval = 1;

    this.track = track;
    this.onStop = onStop;

    //The index of the currently playing note or next upcoming note.
    this.currentNote = 0;
    this.notePlaying = false;
    this.stopped = false;
    
    this.start = function()
    {
        this.playbackTimer.start();
    }
    this.stop = function()
    {
        if(!this.stopped){
            this.playbackTimer.stop();
            endAudio();
            this.stopped = true;
            this.onStop();
        }
    }
    this.tick = function()
    {
        var time = this.playbackTimer.lap();
        var note = this.track.notes[this.currentNote];
        
        if(!note){
            //Note is undefined because it is out of range.
            this.stop();
            return;
        }
        
        if(!this.notePlaying)
        {
            //Is it time to start the next note?
            if(time > note.start)
            {
                this.notePlaying = true;
                startAudio(note.pitch, note.gain);
            }
        }
        else
        {
            //Determine if it is time to end the current note or slur to the next one.
            if(time > note.start + note.length)
            {
                //If note is marked as a slur note, it shouldn't be the last, but check
                //anyways.
                if(note.slurs && this.currentNote < this.track.notes.length-1){
                    var nextNote = this.track.notes[this.currentNote+1];
                    changeAudioNote(nextNote.pitch,nextNote.gain);
                }
                else{
                    endAudio();
                    this.notePlaying = false;
                }
                ++this.currentNote;
            }
        }
    }
        
    this.playbackTimer = new Tock({
        interval: timerInterval,
        callback: this.tick.bind(this)
    });
}

function Note(pitch, gain, start)
{
     this.pitch = pitch;
     this.gain = gain;
     
     this.start = start;
     this.length = 0;
     
     this.slurs = false;
}

function Track()
{
    this.notes = [];
}
Track.prototype.addNote = function(note){
    this.notes.push(note);
}


var playMouseEvents = {
    mousedown: function(pos)
    {
        //console.log("mouse down at " + pos.x + ", " + pos.y);
        mousePos = pos;
        mousePressed = true;
        startNote();
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
        endNote();
    }
};

function startNote()
{
    var note = getNoteFromCanvas();
    var gain = 1-getVerticalFromCanvas();

    if(webMuse.recording)
        webMuse.startNote(note, gain);
    
    startAudio(note, gain);
}

function changeNote()
{
    var note = getNoteFromCanvas();
    var gain = 1-getVerticalFromCanvas();

    if(webMuse.recording)
        webMuse.changeNote(note, gain);
    
    changeAudioNote(note, gain);
}

function endNote()
{
    if(webMuse.recording)
        webMuse.endNote();
    endAudio();
}

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
