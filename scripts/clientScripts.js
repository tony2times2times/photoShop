//TonyPeraza 11/04/16
//Prime Weekend 2
var debug = true;
var roster = [];
var count = 0;

if (debug) {
    console.log('JS standing by!');
}
var studentTimmer = setInterval(function(){forward();}, 10000);
$(document).ready(function functionName() {
    if (debug) {
        console.log('Document standing by!');
    }

    function getRoster() {
        $.ajax({
            url: 'http://devjana.net/support/tau_students.json',
            dataType: 'JSON',
            success: function(data) {
                if (debug) {
                    console.log('Data standing by!');
                }
                roster = data.tau;
                console.log(roster);
                displayStudent();
                displayNav();
            }
        });
    }
    getRoster();
});

function displayNav() {
    var studentNames = [];
    for (var i = 0; i < roster.length; i++) {
        studentNames[i] = '<button class="student_buttons" onclick="changeStudent(' + i + ')">' +
            roster[i].first_name + ' ' + roster[i].last_name + '</button>';
    }
    if (debug) {
        console.log('Student names: ' + studentNames);
    }
    $('#studentButtons').html(studentNames);
    $('#back').click(back);
    $('#forward').click(forward);
}

function back() {
    $('#tau').fadeOut('slow', function() {
        if (debug) {
            console.log('current student number is : ' + count + ' subtracting 1');
        }
        if (count > 0) {
            count--;
        } else {
            count = roster.length - 1;
        }
        if (debug) {
            console.log('Student number is now : ' + count);
        }
        displayStudent();
    });

}

function forward() {
    $('#tau').fadeOut('slow', function() {
        if (debug) {
            console.log('current student number is : ' + count + ' adding 1');
        }
        if (count < (roster.length - 1)) {
            count++;
        } else {
            count = 0;
        }
        if (debug) {
            console.log('Student number is now : ' + count);
        }
        displayStudent();
    });
}

function displayStudent() {
    if (debug) {
        console.log('displayStudent standing by!');
    }
    var nameDisplay = '<p class="name">' + roster[count].first_name + ' ' + roster[count].last_name + '</p>' + '<br>';
    var picDisplay = '<img src="' + roster[count].picUrl + '"</img>' + '<br>';
    var infoDisplay = '<p class="info">About me: ' + roster[count].info + '</p>';
    var countDisplay = '<p id="count">' + (count + 1) + ' / ' + roster.length + '</p>' + '<br>';
    $('#tau').fadeIn('slow').html(nameDisplay + picDisplay + infoDisplay + countDisplay);
    //reset timmer everytime new student is displayed
    clearInterval(studentTimmer);
    studentTimmer = setInterval(function(){forward();}, 10000);
}

function changeStudent(idNumber) {
    $('#tau').fadeOut('slow', function() {
        count = idNumber;
        if (debug) {
            console.log('indexed at:' + idNumber);
        }
        displayStudent();
    });
}
