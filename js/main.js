$(document).ready(function() {
  /* ======= Header Background Slideshow - Flexslider ======= */

  /* Ref: https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties */

  $('#bg-slider').flexslider({
    animation: 'fade',
    directionNav: false, //remove the default direction-nav - https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
    controlNav: false, //remove the default control-nav
    slideshowSpeed: 6000,
  });

  /* ======= FAQ accordion ======= */
  $('.collape-tab').on('click', function() {
    if (
      $(this)
        .find('svg')
        .attr('data-icon') == 'plus-square'
    ) {
      $(this)
        .find('svg')
        .attr('data-icon', 'minus-square');
    } else {
      $(this)
        .find('svg')
        .attr('data-icon', 'plus-square');
    }
  });

  /* ======= Header box shadow ======= */

  $(window).on('scroll load', function() {
    if ($(window).scrollTop() > 0) {
      $('#header').addClass('header-box-shadow');
    } else {
      $('#header').removeClass('header-box-shadow');
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
  $('#sendEmailButton').on('click', e => {
    const contactName = $('#name').val();
    const contactEmail = $('#email').val();
    const contactOrganization = $('#orgName').val();
    const contactComment = $('#comment').val();

    //Format data object to send to the backend ok
    // let requestData = {
    //     name: contactName,
    //     email: contactEmail,
    //     organization: contactOrganization,
    //     message: contactComment
    // };
    //Debug
    // console.log("contactName: " + contactName);
    // console.log("contactEmail: " + contactEmail);
    // console.log("contactOrganization: " + contactOrganization);
    // console.log("contactComment: " + contactComment);
    //Send Post Request to Duet Backend <3
    $.ajax({
      // Old code using our duet api
      // url: 'https://duet-develop.herokuapp.com/1/functions/inquiryEmail',
      // type: 'POST',
      // data: JSON.stringify(requestData),
      // headers: {
      //     'X-Parse-Application-Id': 'cuM6t1j3fKQAKMKnRwdPp8m0KhnKNlF1K5EkJ9cD',
      //     'X-Parse-REST-API-Key': 'V0Cpg1nY33kdCqxGtcwzSsYbfFHQ7FH7Ov7pOXTN',
      //     'Content-Type': 'application/json'
      // },
      // dataType: 'json',

      // Updated code using Mandrill
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        key: '_jL53XKu9G05-JuNIjk_1w',
        message: {
          from_email: contactEmail,
          to: [
            {
              email: 'ride@duetinc.com',
              type: 'to',
            },
          ],
          text: `Name: ${contactName}
                        \n\n Email: ${contactEmail}
                        \n\n Organization: ${contactOrganization}
                        \n\n Message: ${contactComment}`,
          subject: `Duet Project Inquiry by ${contactName} from ${contactOrganization}`,
        },
      },
    })
      .done(() => {
        $('#submissionSuccessModal').modal('show');
        $('#submissionSuccessModalClose').click(() => {
          $('#myModal').modal('hide');
          $('#myModal').on('hidden.bs.modal', () => {
            $('#name').val('');
            $('#email').val('');
            $('#orgName').val('');
            $('#comment').val('');
          });
        });
        $('#submissionSuccessModalCloseButton').click(() => {
          $('#myModal').modal('hide');
          $('#myModal').on('hidden.bs.modal', () => {
            $('#name').val('');
            $('#email').val('');
            $('#orgName').val('');
            $('#comment').val('');
          });
        });
      })
      .fail(() => {
        $('#submissionFailModal').modal('show');
      });
  });

  $('#subscribeNewsletters').on('click', e => {
    const contactEmail = $('#subsEmail').val();

    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        key: '_jL53XKu9G05-JuNIjk_1w',
        message: {
          from_email: contactEmail,
          to: [
            {
              email: 'ride@duetinc.com',
              type: 'to',
            },
          ],
          autotext: 'true',
          subject: 'Subscribe Newsletters',
          html: contactEmail,
        },
      },
    })
      .done(function(response) {
        const status = response[0].status;

        if (status == 'sent') {
          $('#subsSuccess').addClass('show');

          setTimeout(() => {
            $('#subsSuccess').removeClass('show');
          }, 3000);
        } else {
          $('#subsFailed').addClass('show');

          setTimeout(() => {
            $('#subsFailed').removeClass('show');
          }, 3000);
        }
      })
      .fail(function() {
        $('#subsFailed').addClass('show');

        setTimeout(() => {
          $('#subsFailed').removeClass('show');
        }, 3000);
      });
  });
});
