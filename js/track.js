/** Class representing a workspace, a set of recordings **/
__default_recording_settings = {};
__default_workspace_settings = {};

class Workspace {
    /**
     * Create a workspace
     * @param {object} settings - workspace settings
     */
    constructor(settings) {
        this.settings = settings || __default_workspace_settings
        this.finalized = false;
        this.recordings = [];
    }
    init(){
      // add state listener
      return this
    }
    bounce() {
        // bounce the recordings in the track
        // return a single recording representing the whole workspace
        return 0
    }
    addRecording(offset) {
        let rec = new Recording(this, offset, this.settings)
        this.recordings.push(rec)
    }
}

/** Class representing a recording, audio belonging to a workspace**/
class Recording {
    /**
     * Create a recording
     * @param {object} settings - Track settings
     */
    constructor(track, offset, settings) {
        this.track = track;
        this.offset = 0;
        this.settings = settings || __default_recording_settings
        this.data = "";
        this.armed = false;
        this.muted = false;
        this.ready = false;
        // prepare recorder
        navigator.mediaDevices.getUserMedia({
          audio: true
        }).then(x=>{
          this.buffer = x;
          this.ready = true;
          this.armed = true;
          this.recorder = new MediaRecorder(this.buffer);
          this.recorder.addEventListener('dataavailable', e=>{
            this.ready = false;
            this.data = e.data
            let _reader = new window.FileReader();
            _reader.readAsDataURL(e.data);
            _reader.onloadend = x=>{
             let base64 = _reader.result;
             base64 = base64.split(',')[1];
             this.base64 = base64
             this.ready = true
            }
          });
        })
    }
    record() {
        this.recorder.start()
    }
    stop(){
        this.recorder.stop()
    }
    play() {
      // TODO replace audio playback method
      var audio = document.getElementById('audio');
      audio.src = URL.createObjectURL(e.data);
      audio.play();
    }
    // return as base64
    stringify() {
      return this.base64
    }


}

// testing
a = new Recording()
a.record()
