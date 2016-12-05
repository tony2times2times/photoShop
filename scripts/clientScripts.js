//TonyPeraza 11/04/16
//Prime Weekend 2
var debug = false;
var roster = [];
var count = 0;

if (debug) {
    console.log('JS standing by!');
}
//change the display after it has been shown for 10 seconds
var studentTimmer = setInterval(function() {
    forward();
}, 10000);

$(document).ready(function functionName() {
    if (debug) {
        console.log('Document standing by!');
    }
    //get json object from server and assign it to the global roster variable
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

//display a Power Ranger that student will morph into
function morhphinTime() {
    $('#pic').hide('slow');
    ranger = parseInt(Math.random() * 10);
    if (ranger >= 1 && ranger <= 6) {
        console.log('your number is ' + ranger);
        $('.name').replaceWith('<img src=images/' + getRanger(ranger) + '.jpg>' + '</img>');
    } else {
        morhphinTime();
    }
}
//select a Power Ranger that student will morph into
function getRanger(val) {
    if (val === 1) {
        return 'blue';
    } else if (val === 2) {
        return 'green';
    } else if (val === 3) {
        return 'pink';
    } else if (val === 4) {
        return 'red';
    } else if (val === 5) {
        return 'white';
    } else if (val === 6) {
        return 'yellow';
    } else {
        console.log('Not a know ranger!');
    }
}

//display individual buttons for each student
function displayNav() {
    var studentNames = [];
    for (var i = 0; i < roster.length; i++) {
        studentNames[i] = '<button class="student_buttons" onclick="changeStudent(' + i + ')">' +
            roster[i].first_name + ' ' + roster[i].last_name + '</button>';
    }
    if (debug) {
        console.log('Student names: ' + studentNames);
    }
    //event listeners for each button
    $('#studentButtons').html(studentNames);
    $('#back').click(back);
    $('#forward').click(forward);
}

//define how to move back in the roster array so it loops around after the 0th person is called.
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
//define how to move forward in the roster array so it loops around after the last person is called.
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
//display currently selected student.
function displayStudent() {
    if (debug) {
        console.log('displayStudent standing by!');
    }
    var nameDisplay = '<p class="name">' + roster[count].first_name + ' ' + roster[count].last_name + '</p>' + '<br>';
    var picDisplay = '<img id="pic" src="' + roster[count].picUrl + '"</img>' + '<br>';
    var infoDisplay = '<p class="info">About me: ' + roster[count].info + '</p>';
    var countDisplay = '<p id="count">' + (count + 1) + ' / ' + roster.length + '</p>' + '<br>';
    $('#tau').fadeIn('slow').html(nameDisplay + picDisplay + infoDisplay + countDisplay);
    //reset timmer everytime new student is displayed
    clearInterval(studentTimmer);
    studentTimmer = setInterval(function() {
        forward();
    }, 10000);
}
//function used when individualbutton is pushed
function changeStudent(idNumber) {
    if (count != idNumber) {
        $('#tau').fadeOut('slow', function() {
            count = idNumber;
            if (debug) {
                console.log('indexed at:' + idNumber);
            }
            displayStudent();
        });
    } else {
        morhphinTime();
    }
}
