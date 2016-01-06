// When Document is Ready:
$(document).ready(function(){
  // Load our JSON Config:
  loadConfig();

  $("#bpmSelector option[value='40']").prop("selected", true);

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

// Bind our keydown presses:
$(document).keydown(function(e) {
  switch(e.which) {
    case 38: // UP
    $("#bpmSelector :selected")[prev]().prop("selected", true);
    break;

    case 40: // DOWN
    $("#bpmSelector :selected")[next]().prop("selected", true);
    break;

    default: return;
  }
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
