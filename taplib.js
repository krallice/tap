// When Document is Ready:
$(document).ready(function(){
  // Load our JSON Config:
  loadConfig();

  // Setup our Start Button:
  var metronomeEnabled=0;
  var metronomeHandle=0;
  $("#startButton").click(function() {
    metronomeEnabled = 1 - metronomeEnabled;
    if ( metronomeEnabled == 1 ) {
      metronomeTick();
      metronomeHandle = setInterval(metronomeTick, 3000);
    } else {
      clearInterval(metronomeHandle);
    }
  });

});

function metronomeTick() {
  alert("tick");
}

function loadConfig() {

  $.getJSON("config.json", function(json) {

    // Populate our BPM Selector:
    $.each(json.tempo, function(entryIndex, entry) {
      $('#bpmSelector').append($('<option>', {
        value: this.bpm,
        text: this.bpm + " bpm"
      }));
    });

  });

}
