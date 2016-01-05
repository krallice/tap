// When Document is Ready:
$(document).ready(function(){
  // Load our JSON Config:
  loadConfig();

  // Delay Value between tick()s:
  var metronomeDelay=3000;

  // Setup our Start Button:
  var metronomeEnabled=0;
  var metronomeHandle=0;
  $("#startButton").click(function() {
    metronomeEnabled = 1 - metronomeEnabled;
    if ( metronomeEnabled == 1 ) {
      metronomeDelay=calculateDelay($("#bpmSelector").val());
      metronomeTick();
      metronomeHandle = setInterval(metronomeTick, metronomeDelay);
    } else {
      clearInterval(metronomeHandle);
    }
  });

});

// Only calculates based on crotchet notes to start with:
function calculateDelay(bpm) {
  var delay = 60000 / bpm;
  return delay;
}

function metronomeTick() {
  $("#click1").trigger('play');
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
