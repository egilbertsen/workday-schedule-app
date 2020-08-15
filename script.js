$(document).ready(function(){
    
    currentDateDisp();

    function currentDateDisp() {
        // got a lot of help from https://devhints.io/datetime
        var currentDateStr = moment().format('dddd, MMMM Do YYYY');
        $('#currentDay').text(currentDateStr);
    }
    
    generateTimeBlocks();
    
    function generateTimeBlocks() {
        var timeContainer = $(".container");

        for (var i = 6; i < 18; i++) {
            var newTimeRow = $("<div>");
            newTimeRow.addClass("row time-block");
            newTimeRow.attr("data-hour", i);

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

    var rowArr = $(".time-block");

    var currentHour = moment().format('HH');
    var currentHourParsed = parseInt(currentHour);

    rowArr.each(function() {
        
        var thisHour = parseInt($(this).data("hour"));
        console.log(thisHour);

        if (thisHour == currentHourParsed) {
            $(this).addClass("present")
        } else if (thisHour < currentHourParsed) {
            $(this).addClass("past")
        } else if (thisHour > currentHourParsed) {
            $(this).addClass("future")
        }
    })
    
});
