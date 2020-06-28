if (!Recorder.isRecordingSupported()) {
  console.error("Recording features are not supported in your browser.");
}

else {
  init.addEventListener( "click", async function(){
    init.disabled = true;
    start.disabled = false;
    document.getElementById("fromfile").disabled = false;
    await Tone.start()
    var recorder = new Recorder({
      monitorGain: 0,
      recordingGain: 1,
      numberOfChannels: 1,
      wavBitDepth: 16,
      encoderPath: "./js/waveWorker.min.js"
    });

    stopButton.addEventListener( "click", function(){ recorder.stop(); });
    start.addEventListener( "click", function(){
      recorder.start().catch(function(e){
        console.error(e.message)
      });
    });

    recorder.onstart = function(){
      Tone.Transport.clear()
      console.log('Recorder is started');
      start.disabled = true;
      stopButton.disabled = false;
    };

    recorder.onstop = function(){
      start.disabled = false;
      stopButton.disabled = true;
    };

    recorder.onstreamerror = function(e){
      console.error(e.message);
    };
    recorder.ondataavailable = function( typedArray ){
      var dataBlob = new Blob( [typedArray], { type: 'audio/ogg' } );
      var url = URL.createObjectURL( dataBlob );
      console.log(url)
      var player = new Tone.Player(url).sync().start(0);
      var ps = new Tone.PitchShift({
        pitch: -7
      }).toMaster();
      player.connect(ps)
      Tone.Transport.start();
    };
  });
  // from file
  document.getElementById('file-input').onchange = function(e) {
      Tone.Transport.clear()
      var fr = new FileReader();
      console.log(fr)
      fr.onload = function(){
        //let url = fr.result
        console.log(fr.result)
        var dataBlob = new Blob([fr.result], { type: 'audio/mpeg' } );
        var url = URL.createObjectURL( dataBlob );
        console.log(url)
        var player = new Tone.Player(url).sync().start(0)
        var ps = new Tone.PitchShift({
          pitch: -7
        }).toMaster();
        player.connect(ps)
        Tone.Transport.start();
        console.log("h")
      }
      fr.readAsArrayBuffer(this.files[0]);
  };
  // stop sounds
  document.getElementById("shutdown").onclick = function(){
    Tone.Transport.stop()
    //Tone.Transport.clear()
  }
}
