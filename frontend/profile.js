$( document ).ready(function() {
    $('.my-input').each(function() {
        $(this).on('keyup', function() {
            var major = $('#userMajor').val() == '' ? '---' : $('#userMajor').val();
            $('#result').html("Major: " + major);
            /*document.getElementById("result").innerHTML="Major: " + major;
            var userVer = $('#result').innerHTML;
            localStorage.userMajorEdit = userVer;*/
        });
    });
});
