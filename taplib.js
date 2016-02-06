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
      $("#startButton").attr("value", "Stop!");
      $("#startButton").removeClass("btn-default").addClass("btn-primary");
    } else {
      clearInterval(metronomeHandle);
      $("#startButton").attr("value", "Start!");
      $("#startButton").removeClass("btn-primary").addClass("btn-default");
    }
  });

  // Handler for when the BPM is changed:
  $("#bpmSelector").change(function() {
    if ( metronomeEnabled == 1 ) {
      $("#startButton").trigger("click");
      $("#startButton").trigger("click");
    }
  });

});

// Stop space double triggering our button:
$("#startButton").keydown(function(e) {
  switch(e.which) {

    case 32:
    e.preventDefault();
    e.stopPropagation();
    $("#startButton").trigger("click");
    break;

    default: return;
  }

});

// Bind our keydown presses:
$(document).keydown(function(e) {
  switch(e.which) {

    case 32: // SPACE
    e.preventDefault();
    e.stopPropagation();
    $("#startButton").trigger("click");
    break;

    case 83: // S
    $("#startButton").trigger("click");
    break;

    case 39: // LEFT
    $("#bpmSelector option:selected").next().attr("selected", "selected");
    $("#bpmSelector").trigger("change");
    //$("#bpmSelector :selected")[prev]().prop("selected", true);
    break;

    case 68: // D
    $("#bpmSelector option:selected").next().attr("selected", "selected");
    $("#bpmSelector").trigger("change");
    //$("#bpmSelector :selected")[prev]().prop("selected", true);
    break;

    case 37: // RIGHT
    $("#bpmSelector option:selected").prev().attr("selected", "selected");
    $("#bpmSelector").trigger("change");
    //$("#bpmSelector :selected")[next]().prop("selected", true);
    break;

    case 65: // A
    $("#bpmSelector option:selected").prev().attr("selected", "selected");
    $("#bpmSelector").trigger("change");
    //$("#bpmSelector :selected")[next]().prop("selected", true);
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

    // Populate our BPM Selector:
    $.each(json.pattern, function(entryIndex, entry) {
      $('#patternSelector').append($('<option>', {
        value: this.value,
        text: this.name
      }));
    });

  });

}
