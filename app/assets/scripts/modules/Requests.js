import $ from 'jquery';

$("#signupform").submit(function(e) {
    e.preventDefault();
    var datatopost = $(this).serializeArray();
    // send to signup.php
    $.ajax({
        url: "signup.php",
        type: "POST",
        data: datatopost,
        success: function(data) {
            if (data) {
                $(".message").removeClass(".message--hidden").delay(8000).addClass(".message--hidden");
                $("#message-signup").html(data);
            }
        },
        error: function(data) {
            $(".message").removeClass(".message--hidden").delay(8000).addClass(".message--hidden");
            $("#message-signup").html("<div class='modal-message'>There was an error with the Ajax Call. Please try again later.</div>");
        }
    });
});