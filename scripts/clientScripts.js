console.log('JS standing by!');

var roster = [];
var count = 2;

$(document).ready(function functionName() {
    console.log('Document standing by!');
    function getRoster() {
        $.ajax({
            url: 'http://devjana.net/support/tau_students.json',
            dataType: 'JSON',
            success: function(data) {
                console.log('Data standing by!');
                roster = data.tau;
                console.log(roster);
                displayRoster();
            }
        });
    }
    function displayRoster() {
        console.log('displayRoster standing by!');
        $('#tau').html(roster[count].first_name +' '+ roster[count].last_name  +
        '<img src="'+roster[count].picUrl+'"</img>' +
        'About me: ' + roster[count].info );
    }
    function buttonControls(){
      $(#back).click(function{count--});
    }
        getRoster();
});
