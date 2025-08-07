$("#phoneForm").submit( function( event ) {
      //prevent submit from finishing before Parse async method call
      event.preventDefault();


      var phone = $("#phoneNumber").val();

      phone = "+1" + phone.replace(/\D/g,'');
    if(phone.toString().length !== 12){
       alert("Not a valid number. Please try again.");
        return;
    }
      var data = { "phone" : phone };
      $.post("sendtext.php", data, function(successMessage) {
          if( successMessage.replace(/\s/g, '') ){
              alert("We have sent you the download link!");
          } else {
              alert("Can't send text. Please try again.");
          }
          location.reload();
      }).fail(function() {
          alert("Can't send text. Please try again.");
          location.reload();
      });

 });

 $("#subscribeForm").submit( function( event ) {
       //prevent submit from finishing before Parse async method call
       event.preventDefault();
       var email = $("#subscribe").val();
       var data = { "email" : email };
       $.post("newNewsletterSubscriber.php", data, function(successMessage) {
           if( successMessage.replace(/\s/g, '') ){
               alert("You have successfully subscribed to our News Letter.");
           } else {
               alert("Cannot add your email.");
           }
           location.reload();
       }).fail(function() {
           alert("Server Unreachable");
           location.reload();
       });

  });
