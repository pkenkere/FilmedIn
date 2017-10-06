$( document ).ready(function() {
    $('.my-input').each(function() {
        $(this).on('keyup', function() {
            var major = $('#userMajor').val() == '' ? '---' : $('#userMajor').val();
            $('#result').html("Major: " + major);
            var year = $('#userYear').val() == '' ? '---' : $('#userYear').val();
            $('#resultY').html("Year: " + year);
            var interest = $('#userInterests').val() == '' ? '---' : $('#userInterests').val();
            $('#resultI').html("Interests: " + interest);
            /*document.getElementById("result").innerHTML="Major: " + major;
            var userVer = $('#result').innerHTML;
            localStorage.userMajorEdit = userVer;*/
        });
    });
});
