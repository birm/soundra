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
        this.stream = {};
        this.armed = true;
        this.muted = false;
    }
    record() {
        // get the new recording
        // TODO if desired, keep end of old recording if new one shorter
        // TODO listen for ""
        return 0
    }
    play() {
        return 0
    }
    stringify() {
        return 0
    }


}
