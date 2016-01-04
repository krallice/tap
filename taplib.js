// When Document is Ready:
$(document).ready(function(){

  // Load our JSON Config:
  loadConfig();

});

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
