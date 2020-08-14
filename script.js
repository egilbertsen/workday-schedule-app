$(document).ready(function(){
    generateTimeBlocks();
    
    function generateTimeBlocks () {
        var timeContainer = $(".container");

        for (var i = 6; i < 18; i++) {
            var newTimeRow = $("<div>");
            newTimeRow.addClass("row time-block");

            var newTimeDiv = $("<div>");
            newTimeDiv.addClass("col-md-1 hour");
            if (i>12) {
                newTimeDiv.text((i - 12) + ":00");
            } else {
                newTimeDiv.text(i + ":00")
            }

            var newTextArea = $("<textarea>");
            newTextArea.addClass("col-md-10");

            var newSaveButton = $("<button>");
            newSaveButton.addClass("saveBtn col-md-1 btn");
            newSaveButton.html('<i class="far fa-save fa-2x"></i>');

            newTimeRow.append(newTimeDiv, newTextArea, newSaveButton);
            timeContainer.append(newTimeRow);
        }
    }
    
});
