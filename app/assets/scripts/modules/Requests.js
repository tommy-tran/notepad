import $ from 'jquery';

var activeNote = 0;
var editMode = false;

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
                $(".message").removeClass("message--hidden");
                $(".message-content").html(data);
            }
        },
        error: function(data) {
            $(".message").removeClass("message--hidden");
            $(".message-content").html("<div class='message-content'>There was an error with the Ajax Call. Please try again later.</div>");
        }
    });
});

$("#loginform").submit(function(e) {
    e.preventDefault();
    var datatopost = $(this).serializeArray();
    $.ajax({
        url: "login.php",
        type: "POST",
        data: datatopost,
        success: function(data) {
            if (data=="success") {
                $(".message").removeClass("message--hidden");
                $(".message-content").html("<p>Login Successful!</p>");
                setInterval(function() {
                    window.location = "main.php";
                }, 600);
            } else {
                $(".message").removeClass("message--hidden");
                $(".message-content").html(data);
            }
        },
        error: function(data) {
            $(".message").removeClass("message--hidden");
            $(".message-content").html("<div class='message-content'>There was an error with the Ajax Call. Please try again later.</div>");
        }
    });
});

$("#forgotform").submit(function(e) {
    e.preventDefault();
    var datatopost = $(this).serializeArray();
    $.ajax({
        url: "forgot-password.php",
        type: "POST",
        data: datatopost,
        success: function(data) {
            $(".message").removeClass("message--hidden");
            $('.message-content').html(data);
        },
        error: function(data) {
            $(".message").removeClass("message--hidden");
            $(".message-content").html("<div class='message-content'>There was an error with the Ajax Call. Please try again later.</div>");
        }
    });
});

$("#passwordreset").submit(function(e) {
    e.preventDefault();
    var datatopost = $(this).serializeArray();
    $.ajax({
        url: "storeresetpassword.php",
        type: "POST",
        data: datatopost,
        success: function(data) {
            $('.message-content').html(data);
            $(".message").removeClass("message--hidden");
        },
        error: function(data) {
            $(".message").removeClass("message--hidden");
            $(".message-content").html("<div class='message-content'>There was an error with the Ajax Call. Please try again later.</div>");
        }
    });
});

$("#addnote").click(function() {
    $.ajax({
        url: "createnote.php",
        success: function(data) {
            $(".message").removeClass("message--hidden");
            if (data == 'error') {
                $('.message-content').html("<div class='message-content'><p>There was an issue with adding the new note.</p></div>");
            } else {
                activeNote = data;
                $("#notepad").val("");
                $("#notepad").focus();
            }
        },
        error: function(data) {
            $(".message").removeClass("message--hidden");
            $('.message-content').html("<div class='message-error'><p>There was an error with the ajax call.</p></div>");
        } 
    });
});

$("#title").keyup(function() {
    var title = $("#title");
    var notepad = $("#notepad");
    $.ajax({
        type: 'POST',
        url: "updatenote.php",
        data: {title:title.text(),note:notepad.val(),id: activeNote},
        success: function(data) {
            if (data == 'error') {
                $('.message-content').html("<div class='message-error'><p>There was an error updating the note into the database.</p></div>");
            }
        },
        error: function(data) {
            $('.message-content').html("<div class='message-error'><p>" + data + "</p></div>");
        }
    });
});

function updateNote() {
    var title = $("#title").text();
    if (title == "") {
        title = "Untitled";
    }
    var notepad = $("#notepad");
    $.ajax({
        type: 'POST',
        url: "updatenote.php",
        data: {title:title,note:notepad.val(),id: activeNote},
        success: function(data) {
            if (data == 'error') {
                $('.message-content').html("<div class='message-error'><p>There was an error updating the note into the database.</p></div>");
            }
        },
        error: function(data) {
            $('.message-content').html("<div class='message-error'><p>" + data + "</p></div>");
        }
    });
}

$("#notepad").keyup(function() {
    updateNote()
});
$("#title").keyup(function() {
    updateNote()
});
$(".notes__button-save").click(updateNote());

setInterval(function() {
    $(".notes__item").click(function() {
        var main = $('.notes__extra-main');
        main.addClass("notes--hidden");
        var edit = $(".notes__extra-edit");
        edit.addClass("notes--hidden");
        var add = $(".notes__extra-add");
        add.removeClass("notes--hidden");
        var noteList = $(".notes__list");
        noteList.addClass("notes__list--hide");
        var activeNote = $(this).attr("id");
        $("#notepad").val($(this).find('.notes__item-note').text());
        $(".notes__notepad").removeClass("notes__notepad--hide");
    });    
}, 100);

