$(document).ready(function(){
    $('#newBtn').click(function(){
        $('.newResume').removeClass('newResumeClose').addClass('newResumeOpen');
    });

// Submit Form 
    $("form :button[type='submit']").click(function (){             
        $('.newResume').removeClass('newCardOpen').addClass('newResumeClose');
        
        // call Adding function 
        addResume();

        $("#resumeTitle").val("")
        $("#description").val("")
        $("#resumeUrl").val("")
        $("#frequency").val("")
    });

    $("form :button[type='reset']").click(function (){             
      $('.newResume').removeClass('newResumeOpen').addClass('newResumeClose');

    });
});