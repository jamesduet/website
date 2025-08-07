$(document).ready(function() {
    $('#phone').mask('000 000 0000');

    $('#phone').on('input', function() {
        $('#phone').removeClass('is-invalid');
        $('#phoneError').empty();

        var phoneNum = this.value;

        if (phoneNum == '') {
            $('#phone').addClass('is-invalid');
        } else {
            if (phoneNum.match(/\d/g).length !== 10) {
                $('#phoneError').append('Phone format should be ### ### ####.');
                $('#phone').addClass('is-invalid');
            } else {
                $('#phone').removeClass('is-invalid');
                $('#phoneError').empty();
            }
        }
    });

    $('#email').on('input', function() {
        $('#email').removeClass('is-invalid');
        $('#emailError').empty();

        var email = this.value;

        if (email == '') {
            $('#email').addClass('is-invalid');
        } else {
            if (!validateEmail(email)) {
                $('#emailError').append('Invalid email format.');
                $('#email').addClass('is-invalid');
            } else {
                $('#email').removeClass('is-invalid');
                $('#emailError').empty();
            }
        }         
    });
 
    $('#datepicker').datetimepicker({
        format:'L',
        minDate: new Date(),
        maxDate: getMaxDate(new Date())
    });

    $('#datepicker').on('dp.change', function (e) {
        let newDate = getNewDates(e.date);
        console.log(newDate)

        $('#datepicker').data("DateTimePicker").minDate(newDate.minDate);
        $('#datepicker').data("DateTimePicker").maxDate(newDate.maxDate);
    });

    $('#dateSpan').on('click', function() {
        $('#datepicker').focus();
    });

    $('#time').datetimepicker({
        format: 'hh:mm A',
        stepping: 15,
    });

    $('#timeSpan').on('click', function() {
        $('#time').focus();
    });

    $('select').selectBoxIt({
        theme: "jqueryui",
        showEffect: "fadeIn",
        showEffectSpeed: 400,
        hideEffect: "fadeOut",
        hideEffectSpeed: 400,
        autoWidth: false
    });

    $('#comments').keyup(function() {
        if (this.value.length > 500) {
            return false;
        }
    
        $('#remainingChar').html('Remaining characters : ' + (500 - this.value.length));
    });

    $(document).on({
        ajaxStart: function(){
            $("body").addClass("loading"); 
        },
        ajaxStop: function(){ 
            $("body").removeClass("loading"); 
        }    
    });
});

function initMap() {
    var pickupAddr = document.getElementById('pickupAddr');
    var dropoffAddr = document.getElementById('dropoffAddr');
    
    if (pickupAddr) {
        new google.maps.places.Autocomplete(pickupAddr);
    }

    if (dropoffAddr) {
        new google.maps.places.Autocomplete(dropoffAddr);
    }
}

function validateForm() {
    // Remove existing validation
    var elems = document.querySelectorAll('.is-invalid');

    [].forEach.call(elems, function(el) {
        el.classList.remove('is-invalid');
    });

    $('.invalid-feedback').empty();

    $('.emailFail').css('display', 'none');
    $('.alertValidation').css('display', 'none');
    $('.emailSuccess').css('display', 'none');
    // End - Remove existing validation

    let errorFound = false;
    let formatError = false;
    let reqFld = {
        fNameError: false,
        lNameError: false,
        phoneError: false,
        emailError: false,
        datepickerError: false,
        timeError: false,
        pickupAddrError: false,
        dropoffAddrError: false,
        mobilityError: false,
        passengerError: false,
        roundtripError: false,
        commentsError: false
    }

    let fName = document.forms['bookingForm']['fName'].value;
    let lName = document.forms['bookingForm']['lName'].value;
    let phone = document.forms['bookingForm']['phone'].value;
    let email = document.forms['bookingForm']['email'].value;
    let emailRecipient = document.forms['bookingForm']['emailRecipient'].value;
    let datepicker = document.forms['bookingForm']['datepicker'].value;
    let time = document.forms['bookingForm']['time'].value;
    let pickupAddr = document.forms['bookingForm']['pickupAddr'].value;
    let dropoffAddr = document.forms['bookingForm']['dropoffAddr'].value;
    let mobility = document.forms['bookingForm']['mobility'].value;
    let passenger = document.forms['bookingForm']['passenger'].value;
    let roundtrip = document.forms['bookingForm']['roundtrip'].value;
    let comments = document.forms['bookingForm']['comments'].value;

    if (fName == '') {
        reqFld.fNameError = true;
    }

    if (lName == '') {
        reqFld.lNameError = true;
    }

    if (phone == '') {
        reqFld.phoneError = true;
    } else {
        if (phone.match(/\d/g).length !== 10) {
            $('#phoneError').append('Phone format should be ### ### ####.');
            $('#phone').addClass('is-invalid');
            formatError = true;
        }
    }
    
    if (email == '') {
        reqFld.emailError = true;
    } else {
        if (!validateEmail(email)) {
            $('#emailError').append('Invalid email format.');
            $('#email').addClass('is-invalid');
            formatError = true;
        }
    }

    if (datepicker == '') {
        reqFld.datepickerError = true;
    } else {
        $('.dateTimeSpan').css({
            'border-top-color': '#ccc',
            'border-right-color': '#ccc',
            'border-bottom-color': '#ccc'
        });
    }

    if (time == '') {
        reqFld.timeError = true;
    } else {
        $('.dateTimeSpan').css({
            'border-top-color': '#ccc',
            'border-right-color': '#ccc',
            'border-bottom-color': '#ccc'
        });
    }

    if (pickupAddr == '') {
        reqFld.pickupAddrError = true;
    }

    if (dropoffAddr == '') {
        reqFld.dropoffAddrError = true;
    }

    if (mobility == '') {
        reqFld.mobilityError = true;
    }

    if (passenger == '') {
        reqFld.passengerError = true;
    }

    if (roundtrip == '') {
        reqFld.roundtripError = true;
    }

    // if (comments == '') {
    //     reqFld.commentsError = true;
    // }

    for (let [key, value] of Object.entries(reqFld)) {
        if (value) {
            let fldError = `#${key}`;
            let fldName = fldError.replace('Error', '');

            if (fldName == '#mobility') {
                $('#mobilitySelectBoxIt').addClass('is-invalid');
            } else if (fldName == '#passenger') {
                $('#passengerSelectBoxIt').addClass('is-invalid');
            } else if (fldName == '#returntrip') {
                $('#roundtripSelectBoxIt').addClass('is-invalid');
            } else {
                $(fldName).addClass('is-invalid');

                if (fldName == '#datepicker' || fldName == '#time') {
                    $('.dateTimeSpan').css({
                        'border-top-color': 'red',
                        'border-right-color': 'red',
                        'border-bottom-color': 'red'
                    });
                }
            }

            errorFound = true;
        }
    }

    if (errorFound) {
        $('.alertValidation').css('display', 'block');

        return false;
    } else if (formatError) {
        $('.alertValidation').css('display', 'none');
        return false;
    } else {
        let data = {
            fName,
            lName,
            phone,
            email,
            emailRecipient,
            datepicker,
            time,
            pickupAddr,
            dropoffAddr,
            mobility,
            passenger,
            roundtrip,
            comments
        }
        
        sendEmail(data);
        return false;
    }
}

function sendEmail(data) {
    let created = getCurrentDateTime();

    // Format phone number
    let phoneNum = data.phone;
    let splittedNum = phoneNum.split(" ");
    let phoneStr = `(${splittedNum[0]}) ${splittedNum[1]}-${splittedNum[2]}`;

    // Format Pickup Date
    let pickupDateStr = formatDateIntoString(data.datepicker, true);

    let html = '';
    html += `Booking was submitted at ${created.timeStr},  ${created.dateStr}`;
    html += `<br /><br /><b style="color: #969696 !important;">First name:</b> ${data.fName}`;
    html += `<br /><b style="color: #969696 !important;">Last name:</b> ${data.lName}`;
    html += `<br /><b style="color: #969696 !important;">Phone:</b> ${phoneStr}`;
    html += `<br /><b style="color: #969696 !important;">Email:</b> ${data.email}`;
    html += `<br /><b style="color: #969696 !important;">Pickup date:</b> ${pickupDateStr}`;
    html += `<br /><b style="color: #969696 !important;">Pickup time:</b> ${data.time}`;
    html += `<br /><b style="color: #969696 !important;">Pickup address:</b> ${data.pickupAddr}`;
    html += `<br /><b style="color: #969696 !important;">Drop-off address:</b> ${data.dropoffAddr}`;
    html += `<br /><b style="color: #969696 !important;">Mobility Aid:</b> ${data.mobility}`;
    html += `<br /><b style="color: #969696 !important;">Number of Passengers:</b> ${data.passenger}`;
    html += `<br /><b style="color: #969696 !important;">Round trip:</b> ${data.roundtrip}`;
    html += `<br /><b style="color: #969696 !important;">Comments:</b> ${data.comments}`;

    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
          'key': '_jL53XKu9G05-JuNIjk_1w',
          'message': {
            'from_email': data.email,
            'to': [
                {
                  'email': data.emailRecipient,
                  'type': 'to'
                }
            ],
            'autotext': 'true',
            'subject': 'New booking',
            'html': html
          }
        }
    }).done(function(response) {
        let status = response[0].status;

        if (status == 'sent') {
            $('.emailFail').css('display', 'none');
            $('.alertValidation').css('display', 'none');
            $('.emailSuccess').css('display', 'block');

            $('input, textarea').val('');
            $('#mobility, #passenger, #roundtrip').val(null).trigger('change');
            $('#remainingChar').html('Remaining characters : 500');
        }
    }).fail(function () {
        $('.emailFail').css('display', 'block');
    });
}

function getNewDates(minDate) { 
    minDate = new Date(minDate);
    let currentDate = new Date();
    let difference = minDate > currentDate ? minDate - currentDate : currentDate - minDate;
    let diffDays = Math.floor(difference / (1000 * 3600 * 24));
    let isDateEqual = isSameDay(currentDate, minDate);

    if (isDateEqual && diffDays === 0) {
        minDate = minDate;
    } else if (!isDateEqual && diffDays === 0) {
        minDate.setDate(minDate.getDate() - 1);
    }
    else {
        minDate.setDate(minDate.getDate() - 1);
    }

    let maxDate = getMaxDate(minDate);

    return {
        minDate: minDate,
        maxDate: maxDate
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getMaxDate(minDate) {
    var maxDate = new Date(minDate);
    maxDate.setDate(maxDate.getDate() + 30);

    return maxDate;
}

function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth();
}

function getCurrentDateTime() {
    let dateObj = new Date();

    // Get current date string
    let dateStr = formatDateIntoString(dateObj, false);

    // Get current time in 12H format
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let timeStr = hours + ':' + minutes + ' ' + ampm;

    return {
        dateStr,
        timeStr
    }
}

function formatDateIntoString(dateObj, toBeParsed) {
    if (toBeParsed) {
        dateObj = new Date(dateObj);
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const dateStr = `${month} ${day}, ${year}`;

    return dateStr;
}
