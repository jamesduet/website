$(document).ready(async () => {
    $('.alertValidation').css('display', 'none');
    $('.dateError').css('display', 'none');
    $('.exportSuccess').css('display', 'none');
    $('.exportFail').css('display', 'none');
    $('.programFail').css('display', 'none');
    $('.getBookingFail').css('display', 'none');

    $('#datepickerStart').datetimepicker({
        format:'L'
    });

    $('#dateSpanStart').on('click', function() {
        $('#datepickerStart').focus();
    });

    $('#datepickerEnd').datetimepicker({
        format:'L'
    });

    $('#dateSpanEnd').on('click', function() {
        $('#datepickerEnd').focus();
    });

    $(document).on({
        ajaxStart: function(){
            $("body").addClass("loading");
        },
        ajaxStop: function(){
            $("body").removeClass("loading");
        }
    });

    // Retrieve programs
    getAllPrograms();
});


validateExportForm = () => {
    // Remove existing validation
    var elems = document.querySelectorAll('.is-invalid');

    [].forEach.call(elems, function(el) {
        el.classList.remove('is-invalid');
    });

    $('.alertValidation').css('display', 'none');
    $('.dateError').css('display', 'none');
    $('.exportSuccess').css('display', 'none');
    $('.exportFail').css('display', 'none');
    $('.programFail').css('display', 'none');
    $('.getBookingFail').css('display', 'none');
    // End - Remove existing validation

    let errorFound = false;
    let dateError = false;
    let reqFld = {
        datepickerStartError: false,
        datepickerEndError: false,
        programError: false,
    }

    let datepickerStart = document.forms['exportBookingForm']['datepickerStart'].value;
    let datepickerEnd = document.forms['exportBookingForm']['datepickerEnd'].value;
    let program = document.forms['exportBookingForm']['program'].value;

    // Date validations
    if (datepickerStart == '') {
        reqFld.datepickerStartError = true;
    } else {
        $('.dateTimeSpanStart').css({
            'border-top-color': '#ccc',
            'border-right-color': '#ccc',
            'border-bottom-color': '#ccc'
        });
    }

    if (datepickerEnd == '') {
        reqFld.datepickerEndError = true;
    } else {
        $('.dateTimeSpanEnd').css({
            'border-top-color': '#ccc',
            'border-right-color': '#ccc',
            'border-bottom-color': '#ccc'
        });
    }

    // Compare dates - start date should be less than end date
    const startDate = new Date(datepickerStart);
    const endDate = new Date(datepickerEnd);

    if (startDate > endDate) {
        dateError = true;
    }

    // Program validation
    if (program == '') {
        reqFld.programError = true;
    }

    for (let [key, value] of Object.entries(reqFld)) {
        if (value) {
            let fldError = `#${key}`;
            let fldName = fldError.replace('Error', '');

            if (fldName == '#program') {
                $('#program').addClass('is-invalid');
            } else {
                $(fldName).addClass('is-invalid');

                if (fldName == '#datepickerStart') {
                    $('.dateTimeSpanStart').css({
                        'border-top-color': 'red',
                        'border-right-color': 'red',
                        'border-bottom-color': 'red'
                    });
                }

                if (fldName == '#datepickerEnd') {
                    $('.dateTimeSpanEnd').css({
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
    } else if (dateError) {
        $('.dateError').css('display', 'block');

        return false;
    } else {
        let data = {
            datepickerStart,
            datepickerEnd,
            program
        }

        exportBooking(data);
        return false;
    }
};

exportBooking = (data) => {
    console.log(data);

    const startDate = new Date (data.datepickerStart);
    const formattedStartDate = moment(startDate).format('YYYY-MM-DDT10:00:00Z');

    const endDate = new Date (data.datepickerEnd);
    const formattedEndDate = moment(endDate).format('YYYY-MM-DDT10:00:00Z');

    const programId = data.program;
    const dataObj = {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        program_id: programId
    };

    $.ajax({
        method: 'POST',
        async: false,
        url: 'https://duet-apacaus.herokuapp.com/1/functions/v1_webapp_get_booking_data_for_export', // duet-apacaus.herokuapp.com - duet-predev.herokuapp.com
        headers: {
            'X-Parse-Application-Id': 'fq8nKFTGz1GGlvTxURmzVRgScVrDNlwULy4Uzort', // fq8nKFTGz1GGlvTxURmzVRgScVrDNlwULy4Uzort - cuM6t1j3fKQAKMKnRwdPp8m0KhnKNlF1K5EkJ9cD
            'X-Parse-REST-API-Key': 's9DDOuZoW8IDxIkWdKrZz4LAtUziE3PltLwemZ4P', // s9DDOuZoW8IDxIkWdKrZz4LAtUziE3PltLwemZ4P - V0Cpg1nY33kdCqxGtcwzSsYbfFHQ7FH7Ov7pOXTN
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(dataObj),
        success : function (response) {
            console.log('Retrieving booking data...');

            try {
                let csv = '';
                const result = response.result.data;
                const data = result.bookings;

                for (let row = 0; row < data.length; row++) {
                    // Create header
                    if (row === 0) {
                       for (let key in data[row]) {
                            if (key === 'booking_id' || key === 'status_str') {
                            continue;
                            }

                            const formattedKey = humanize(key);

                            if (key === 'driver') {
                                csv += formattedKey + '\r\n';
                            } else {
                                csv += formattedKey + ',';
                            }
                        }
                    }

                    // Format the data
                    for (let key in data[row]) {
                        let fieldVal = data[row][key];

                        if (key === 'booking_id' || key === 'status') {
                          continue;
                      }

                      if (fieldVal === null) {
                          fieldVal = '';
                      }

                        if (key === 'driver') {
                          fieldVal = `"` + fieldVal.map((driver) => `${driver.firstname} ${driver.lastname}`).join(', ') + `"`;

                        csv += fieldVal + '\r\n';
                      } else {
                          if (key === 'ride_fee') {
                            fieldVal = '$' + fieldVal;
                        } else if (key === 'paid' && fieldVal) {
                            fieldVal = 'Yes';
                        } else if (key === 'paid' && !fieldVal) {
                            fieldVal = 'No';
                        } else if (key === 'mobility_assistance') {
                            fieldVal = `"` + fieldVal.join(', ') + `"`;
                        }

                        csv += fieldVal + ',';

                      }
                    }
                }

                // Export csv file
                try {
                    const currentTimestamp = Date.now();
                    const startDateFormat = moment(startDate).format('MM-DD-YYYY');
                    const endDateFormat = moment(endDate).format('MM-DD-YYYY');
                    const fileName = `Booking_${startDateFormat}_to_${endDateFormat}_${programId}_${currentTimestamp}.csv`;

                    let link = document.createElement('a')
                    link.id = 'download-csv'
                    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    document.querySelector('#download-csv').click();

                    $('.exportSuccess').css('display', 'block');
                } catch (error) {
                    console.log('try catch error - exportCSV');
                    console.log(error);

                    $('.exportFail').css('display', 'block');
                }
            } catch (error) {
                console.log('try catch error - exportBooking response');
                console.log(error);

                $('.getBookingFail').css('display', 'block');
            }
        },
        error : function (error) {
            console.log('error - exportBooking ajax call');
            console.log(error);

            $('.getBookingFail').css('display', 'block');
        }
    });
};

getAllPrograms = async () => {
    $.ajax({
        method: 'POST',
        async: false,
        url: 'https://duet-apacaus.herokuapp.com/1/functions/get_all_programs', // duet-apacaus.herokuapp.com - duet-predev.herokuapp.com
        headers: {
            'X-Parse-Application-Id': 'fq8nKFTGz1GGlvTxURmzVRgScVrDNlwULy4Uzort', // fq8nKFTGz1GGlvTxURmzVRgScVrDNlwULy4Uzort - cuM6t1j3fKQAKMKnRwdPp8m0KhnKNlF1K5EkJ9cD
            'X-Parse-REST-API-Key': 's9DDOuZoW8IDxIkWdKrZz4LAtUziE3PltLwemZ4P', // s9DDOuZoW8IDxIkWdKrZz4LAtUziE3PltLwemZ4P - V0Cpg1nY33kdCqxGtcwzSsYbfFHQ7FH7Ov7pOXTN
            'Content-Type': 'application/json'
        },
        success : function (response) {
            console.log('Getting program from the db...');

            try {
                const data = response.result.data;

                for (const program of data) {
                    $('#program').append($('<option>', {
                        value: program.id,
                        text: program.name
                    }));
                }
            } catch (error) {
                console.log('try catch error - get_all_programs response');
                console.log(error);

                $('.programFail').css('display', 'block');
            }
        },
        error : function (error) {
            console.log('error - get_all_programs ajax call');
            console.log(error);

            $('.programFail').css('display', 'block');
        }
    });
};

humanize = (str) => {
    let i, frags = str.split('_');

    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }

    return frags.join(' ');
};
