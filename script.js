$(document).ready(function(){
    
    currentDateDisp();

    function currentDateDisp() {
        // got a lot of help from https://devhints.io/datetime
        var currentDateStr = moment().format('dddd, MMMM Do YYYY');
        $('#currentDay').text(currentDateStr);
    }

    var minTime = 6;
    var maxTime = 18;

    generateTimeBlocks();
    
    function generateTimeBlocks() {
        var timeContainer = $(".container");

        for (var indexTime = minTime ; indexTime < maxTime; indexTime++) {
            var newTimeRow = $("<div>");
            newTimeRow.addClass("row time-block");
            newTimeRow.attr("data-hour", indexTime);

            var newTimeDiv = $("<div>");
            newTimeDiv.addClass("col-md-1 hour");
            if (indexTime>12) {
                newTimeDiv.text((indexTime - 12) + ":00");
            } else {
                newTimeDiv.text(indexTime+ ":00")
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

        if (thisHour == currentHourParsed) {
            $(this).addClass("present")
        } else if (thisHour < currentHourParsed) {
            $(this).addClass("past")
        } else if (thisHour > currentHourParsed) {
            $(this).addClass("future")
        }
    })

    // adding to local storage
    var calendarEventsArr = []

    var textAreaArr = $("textarea");

    textAreaArr.each(function(){
        calendarEventsArr.push("");
    })
   
    initCalendarEvents();

    $(".saveBtn").click(function(){
        event.preventDefault();

        var timeBlockRow = $(this).parent();
        var timeBlockHour = timeBlockRow.data("hour");
        var timeBlockIndex = timeBlockHour - 6;
        var parsedTimeBlockIndex = parseInt(timeBlockIndex);
        var timeBlockText = timeBlockRow.children("textarea").val();
        
        calendarEventsArr.splice(parsedTimeBlockIndex, 1, timeBlockText);
        
        renderCalendarEvents();
        storeCalEvents();
    });
        
    function renderCalendarEvents(){
        $("textarea").text("");

        textAreaArr.each(function(index){
            $(this).text(calendarEventsArr[index]);
        })
    };

    function initCalendarEvents() {
        var storedCalEvents = JSON.parse(localStorage.getItem("calEvents"));

        if (storedCalEvents !== null) {
            calendarEventsArr = storedCalEvents;
        }
        renderCalendarEvents();
    }

    function storeCalEvents() {
        localStorage.setItem("calEvents", JSON.stringify(calendarEventsArr));
    }

});