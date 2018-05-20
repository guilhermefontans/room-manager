function showCalendar(reserves) {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaWeek,agendaDay'
        },
        defaultView: 'agendaWeek',
        navLinks: true,
        minTime: "06:00:00",
        maxTime: "20:00:00",
        editable: true,
        selectable: true,
        allDaySlot: false,
        selectHelper: true,
        forceEventDuration: true,
        defaultTimedEventDuration: "01:00:00",
        eventLimit: true,
        eventClick:  function(event, jsEvent, view) {
            endtime = $.fullCalendar.moment(event.end).format('h:mm');
            starttime = $.fullCalendar.moment(event.start).format('dddd, MMMM Do YYYY, h:mm');
            var mywhen = starttime + ' - ' + endtime;
            $('#modalTitle').html(event.title);
            $('#modalWhen').text(mywhen);
            $('#eventID').val(event.id);
            $('#calendarModal').modal();
        },
        select: function(start, end, jsEvent) {
            endtime = $.fullCalendar.moment(end).format('h:mm');
            starttime = $.fullCalendar.moment(start).format('dddd, MMMM Do YYYY, h:mm');
            var mywhen = starttime + ' - ' + endtime;
            start = moment(start).format();
            end = moment(end).format();
            $('#createEventModal #startTime').val(start);
            $('#createEventModal #endTime').val(end);
            $('#createEventModal #when').text(mywhen);
            $('#createEventModal').modal('toggle');
        },
        events : reserves,
        eventRender: function(event, element) {
            element.find('.fc-title').append("<br/>Room: " + event.room + "<br/>User: " + event.user);
            if (event) {
                element.qtip({
                    content: "Reserve: " + event.title + "<br/>"
                    + "User: " + event.user + "<br/>"
                    + "Room: " + event.room,
                    show: {
                        effect: function(offset) {
                            $(this).slideDown(100);
                        }
                    }
                });
            }
        }
    });
}

function doSubmit() {


    var title = $('#title').val();
    var startTime = $('#startTime').val();
    var endTime = $('#endTime').val();
    var room = $('#room').val();

    $.ajax({
        url: '/reserves/new',
        data: 'action=add&title='+title+'&start='+startTime+'&end='+endTime+'&room='+room,
        type: "POST",
        success: function(json) {
            $("#createEventModal").modal('hide');
            clearError("errorsCreate", "msgCreate");
            $("#calendar").fullCalendar(
                'renderEvent',
                {
                    id: json.id,
                    title: json.title,
                    room: json.room,
                    user: json.user,
                    start: json.start,
                    end: json.end,
                },
                true)
            ;
        },
        error: function(data) {
            $("#errorsCreate").attr('class', 'd-block');
            $("#msgCreate").text(data.responseText);
        }
    });
}

function doDelete(){
    var eventID = $('#eventID').val();
    $.ajax({
        url: '/reserves/'+eventID,
        data: eventID,
        method:"DELETE",
        success: function(json) {
            $("#createEventModal").modal('hide');
            clearError("errorsDelete", "msgDelete");
            $("#calendar").fullCalendar('removeEvents', eventID);
        },
        error: function(data) {
            $("#errorsDelete").attr('class', 'd-block');
            $("#msgDelete").text(data.responseText);
        }
    });
}

function clearError(div, label) {
    $("#" + div).attr('class', 'd-none');
    $("#" + label).text("");
}