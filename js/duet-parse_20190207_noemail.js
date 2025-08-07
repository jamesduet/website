$("#phoneForm").submit( function( event ) {
      //prevent submit from finishing before Parse async method call
      event.preventDefault();
 
      var phone = $("#phoneNumber").val();
      phone = "+1" + phone.replace(/\D/g,'');
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
