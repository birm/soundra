// localstorage storage object.
// As it's a template for a future storage without localstorage, it contains notes to things yet unimplemented
class Storage {
    constructor(prefix) {
        this.data = []
        this.unflushed = []
        this.prefix = prefix || "soundra-storage";
        // initalize if data is present
        let _prev_data = window.localStorage.getItem(this.prefix)
        if (_prev_data) {
            try {
                this.data = JSON.parse(_prev_data)
            } catch (err) {
                console.error(err)
                this.data = []
            }
        }
    }
    // write items noted as unwritten to destination (unflushed)
    flush() {
        // *not the paradigm used in localstorage, but...
        // for each in unflushed
        // save it
        // * only for local storage or equivalent
        // just replace old data with data
        window.localStorage.setItem(this.prefix, JSON.stringify(data));
    }
    // stage for writing (add to data and unflushed), return the uuid it's assigned
    save(data) {
        // make a uuid
        return 0
    }
    // get from local data, failing that the origin
    get(uuid) {
        return 0
    }
    dump() {
        return JSON.stringify(data)
    }

    // load locally without flushing.
    load(data, unflushed) {
        this.data = data
        this.unflushed = unflushed || this.unflushed
    }
}
