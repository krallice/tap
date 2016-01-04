$(document).ready(function(){

  $.getJSON("config.json", function(json) {

    $.each(json.tempo, function(entryIndex, entry) {

      $('#bpmSelector').append($('<option>', {
        value: this.bpm,
        text: this.bpm + " bpm"
      }));

    });

  });

});
