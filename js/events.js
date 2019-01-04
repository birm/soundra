// a single object which deals with playback related events
// potential mode values: 'pause', 'play', 'record'
var allowed_states = ['pause', 'play', 'record']
// time is current position in ms from start of track (TODO is this a good time method?)
// (maybe we want measures or beats for time instead)?
// (maybe we want time to be a callback function of some sort)?
var PLAYER_STATE = {
    'mode': 'paused',
    'time': 0
}

// these functions fire a PLAYER_STATE event, which contains the player state as detail

/*
 * Set the player position with a seek
 * @param {number} - the seek destiniation position
 */
function PLAYER_SEEK(new_position) {
    PLAYER_STATE.time = new_position
    // fire a player event
    let ev = new CustomEvent('PLAYER_STATE', {
        detail: PLAYER_STATE
    })
}

/*
 * Set the player mode (i.e. hit play or record)
 * @param {number} - the new mode
 */
function PLAYER_MODE(new_mode) {
    // TODO only allowed_states
    PLAYER_STATE.mode = new_mode
    // fire a player event
    let ev = new CustomEvent('PLAYER_STATE', {
        detail: PLAYER_STATE
    })
}

// TODO how do we want to keep track of time?
