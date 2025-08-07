$(document).ready(function() {
    
    
    /* ======= Header Background Slideshow - Flexslider ======= */    
    /* Ref: https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties */
    
    $('#bg-slider').flexslider({
        animation: "fade",
        directionNav: false, //remove the default direction-nav - https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
        controlNav: false, //remove the default control-nav
        slideshowSpeed: 6000
    });

    
    /* ======= FAQ accordion ======= */
    $('.collape-tab').on('click', function () {
      if ($(this).find('svg').attr('data-icon') == 'plus-square' ) {
        $(this).find('svg').attr('data-icon', 'minus-square');
      } else {
        $(this).find('svg').attr('data-icon', 'plus-square');
      };
    });
    
    
    /* ======= Fixed header when scrolled ======= */
    
    $(window).on('scroll load', function() {
         if ($(window).scrollTop() > 0) {
             $('#header').addClass('fixed-top');
         }
         else {
             $('#header').removeClass('fixed-top');
         }
    });
    
    /* ======= Toggle between Signup & Login & ResetPass Modals ======= */ 
    $('#signup-link').on('click', function(e) {
        $('#login-modal').modal('toggle');
        $('#signup-modal').modal();

        e.preventDefault();
    });
    
    $('#login-link').on('click', function(e) {
        $('#signup-modal').modal('toggle');
        $('#login-modal').modal();
        
        e.preventDefault();
    });
    
    $('#back-to-login-link').on('click', function(e) {
        $('#resetpass-modal').modal('toggle');
        $('#login-modal').modal();
        
        e.preventDefault();
    });
    
    $('#resetpass-link').on('click', function(e) {
        $('#login-modal').modal('hide');
        e.preventDefault();
    });
    
    /* ======= Price Plan CTA buttons trigger signup modal ======= */ 
    
    $('#price-plan .btn-cta').on('click', function(e) {
        $('#signup-modal').modal();
        e.preventDefault();
    });


    /* ======= Duet Marketing Project Inquiry Email modal ======= */
    $('#sendEmailButton').on('click', (e)=>{
        let contactName = $('#name').val();
        let contactEmail = $('#email').val();
        let contactOrganization = $('#orgName').val();
        let contactComment = $('#comment').val();
        //Format data object to send to the backend ok
        let requestData = {
            name: contactName,
            email: contactEmail,
            organization: contactOrganization,
            message: contactComment
        };
        //Debug
        // console.log("contactName: " + contactName);
        // console.log("contactEmail: " + contactEmail);
        // console.log("contactOrganization: " + contactOrganization);
        // console.log("contactComment: " + contactComment);
        //Send Post Request to Duet Backend <3
        $.ajax({
            url: 'https://duettransition.herokuapp.com/1/functions/inquiryEmail',
            type: 'POST',
            data: JSON.stringify(requestData),
            headers: {
                'X-Parse-Application-Id': 'cuM6t1j3fKQAKMKnRwdPp8m0KhnKNlF1K5EkJ9cD',
                'X-Parse-REST-API-Key': 'V0Cpg1nY33kdCqxGtcwzSsYbfFHQ7FH7Ov7pOXTN',
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            success: (response)=>{
                // console.log("Request success");
                $('#submissionSuccessModal').modal('show');
                $('#submissionSuccessModalClose').click(()=>{
                    $('#myModal').modal('hide');
                    $('#myModal').on('hidden.bs.modal',()=>{
                        $('#name').val('');
                        $('#email').val('');
                        $('#orgName').val('');
                        $('#comment').val('');
                    });
                });
                $('#submissionSuccessModalCloseButton').click(()=>{
                    $('#myModal').modal('hide');
                    $('#myModal').on('hidden.bs.modal',()=>{
                        $('#name').val('');
                        $('#email').val('');
                        $('#orgName').val('');
                        $('#comment').val('');
                    });
                });
            },
            error: (err)=>{
                //TODO: Remove later
                // console.log("error: " + err);
                // alert("Email failed to send, please try again!")
                $('#submissionFailModal').modal('show');
            }
        });
    });



});

