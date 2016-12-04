console.log('JS standing by!');
var debug = true;
var roster = [];
var count = 0;

$(document).ready(function functionName() {
    if (debug){console.log('Document standing by!');}

    function getRoster() {
      $('#back').click(function(){
        if (debug){console.log('current student number is : ' + count + ' subtracting 1');}
        if (count>0) {
          count--;
        }
        else{
          count = roster.length-1;
        }
        if (debug){console.log('Student number is now : ' + count);}
        displayStudent();
      });

      $('#forward').click(function(){
        if (debug){console.log('current student number is : ' + count + ' adding 1');}
        if (count<(roster.length - 1)) {
          count++;
        }
        else{
          count = 0;
        }
        if (debug){console.log('Student number is now : ' + count);}
        displayStudent();
      });

        $.ajax({
            url: 'http://devjana.net/support/tau_students.json',
            dataType: 'JSON',
            success: function(data) {
              if (debug){console.log('Data standing by!');}
                roster = data.tau;
                console.log(roster);
                displayStudent();
            }
        });
    }

    function displayStudent() {
      if (debug){console.log('displayStudent standing by!');}
        $('#tau').html(
        '<p class="name">' +roster[count].first_name +'!'+ roster[count].last_name  +'</p>'+'<br>'+
        '<img src="'+roster[count].picUrl+'"</img>' +'<br>'+
        'About me: ' + roster[count].info );
    }
        getRoster();
});
