//======================================******START OF FACTORIES******=====================================================//

app.factory('deets', function() {
    return {
        number: '555-5555'
    }
})

app.factory('misc', function() {
    return {
        myBookingsReady: false,
        hasCard: false,
        reviewCardRoute: false,
        dirtModalHack: false,
    }
})

app.factory("views", function(){
    return {
        currentView: '',
        currentType: '',
    };
});

app.factory("email", function(){
    return {
        emailAddress: '',
        subject: '',
        message: '',
        sentTo: 'hello@moverspro.co.uk',
    };
});

app.factory("dashInstant", function(){
    return {
        jobName: '',
        vanType: '',
        vanName: '',
        jobDate: '',
        jobHoursEsti: '',
        estiCalc: '',
        fuelPrice: '',
        suggestedPrice: '',
        driverNote: '',
        address: {
            "start_location": {
		        "name": '',
		        "lat": '',
		        "lng": ''
		    },
            "end_location": {
		        "name": '',
		        "lat": '',
		        "lng": ''
		    },
            "pickup1": {
		        "name": '',
		        "lat": '',
		        "lng": ''
		    },
            "dropoff1": {
		        "name": '',
		        "lat": '',
		        "lng": ''
		    },
            "pickup2": {
		        "name": '',
		        "lat": '',
		        "lng": ''
		    },
            "dropoff2": {
		        "name": '',
		        "lat": '',
		        "lng": ''
		    },
        },
        distance: 0,
        payment_method: 'cash',
        pk: '',
        recieptUrl: '',
        status: '',
        finalCost: ''
    };
});



app.factory("dashVans", function(){
    return {
        0: {
            vanType: 'Small Van',
            weight: '660kg',
            length: '1523m',
            width: '1473',
            height: '1181',
            MPG: '68.2',
            hourPriceDriver: '15',
            hourPricePorter: '10',
            tdID: '5093aff36e77c305510003a5',
            tdAlias: 'Coupe'
        },
        1: {
            vanType: 'Medium Van',
            weight: '1114kg',
            length: '2555',
            width: '1775',
            height: '1406',
            MPG: '40.4',
            hourPriceDriver: '20',
            hourPricePorter: '12',
            tdID: '521258566e77c363f306e803',
            tdAlias: '4 Seater'
        },
        2: {
            vanType: 'Large Van',
            weight: '1337kg',
            length: '3494',
            width: '1784',
            height: '2025',
            MPG: '33.2',
            hourPriceDriver: '20',
            hourPricePorter: '12',
            tdID: '50c612796e77c3380a00dac9',
            tdAlias: 'MPV 6'
        },
        3: {
            vanType: 'Jumbo Van',
            weight: '1031kg',
            length: '4144',
            width: '1960',
            height: '2184',
            MPG: '33.6',
            hourPriceDriver: '35',
            hourPricePorter: '12',
            tdID: '509bb44c6e77c343eb0008d5',
            tdAlias: 'MPV 5'
        }
    };
});

app.factory("driver", function(){
    return {
        username: '',
        password: '',
        password2: '',
        email: '',
        firstname: '',
        lastname: '',
        mobile: '',
        day: '',
        month: '',
        year: '',
        address: '',
        city: '',
        postcode: '',
        vehicle: '',
        reg: '',
        porters: '',
        vehiclenumber: '',
        bank: '',
        acc: '',
        sc: '',
    };
});

app.factory("staff", function(){
    return {
        username: '',
        password: '',
        password2: '',
        email: '',
        firstname: '',
        lastname: '',
    };
});

app.factory("bookings", function(){
    return{
        address: {},
        bookingKey: "",
        distance: {},
        driverNote: "",
        fuelPrice: '',
        jobDate: "",
        jobName: "",
        pk: "",
        status: "",
        suggestedPrice: '',
        userID: "",
        vanType: "",
        driverName: "",
        driverPlate: "",
        driverColor: "",
        driverPK: "",
        driverPhone: "",
    }
});

app.factory("currBooking", function(){
    return{
        address: {},
        bookingKey: "",
        distance: {},
        driverNote: "",
        fuelPrice: '',
        jobDate: "",
        jobName: "",
        pk: "",
        status: "",
        suggestedPrice: '',
        userID: "",
        vanType: "",
        driverName: "",
        driverPlate: "",
        driverColor: "",
        driverPK: "",
        driverPhone: "",
    }
});

app.factory("admin", function(){
    return {
        currentView: 'admin-home',
    };
});

app.factory("contractor", function(){
    return {
        currentView: 'contractor-home',
    };
});

app.factory("user", function(){
    return {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        mobile: '',
        cardAdded: 'none'
    };
});

app.factory("cardDetails", function(){
    return {
        brand: '',
        last4: '',
    };
});


//======================================******END OF FACTORIES******=====================================================//



//======================================******START OF SERVICES ******=====================================================//


//app.service('bookingInfo', function($http){
//    console.log("the service works");
//    var bookingInfo = {};
//
//    bookingInfo.displayBookingInfo = function(id, colName) {
//        $http.post('/api/grab-booking-info', {"id":id, "colName":colName}).success(function(response){
//            console.log(response);
//        });
//    };
//
//    return bookingInfo;
//});

app.service('hackTools', function() {
    var hackTools = {};

    hackTools.fixModalScroll = function(eleID) {
        $('#'+eleID+'').css('overflow', 'auto');
        $('body').css('overflow', 'auto');
    }

    return hackTools;
})




app.service('stripeForm', function($http, user, cardDetails) {

    var stripeForm = {};

    stripeForm.getCardForm = function(callback) {
        $('#payment-form').submit(function(event) {
            event.preventDefault();
            var $form = $(this);

            Stripe.setPublishableKey('pk_test_GrFP5ytVZ9Df9ZKztAJbiOmc');

            Stripe.card.createToken($form, function(status, res) {
               // console.log(res);
                $http.post("/api/add-card", res).success(function(status){
                    stripeForm.checkCard();
                    callback(status);
                });
            });
        })
    }

    stripeForm.getCardFormRes = function(callback) {
        $('#payment-form').submit(function(event) {
            event.preventDefault();
            var $form = $(this);

            Stripe.setPublishableKey('pk_test_GrFP5ytVZ9Df9ZKztAJbiOmc');

            Stripe.card.createToken($form, function(status, res) {
               // console.log(res);
                $http.post("/api/add-card", res).success(function(status){
                    stripeForm.checkCard();
                    callback(status.success);
                });
            });
        })
    }

    stripeForm.checkCard = function() {
        if(user.cardAdded == 'added' && cardDetails.last4 !== '') {
            //
        } else {
            $http.post('/api/check-card').success(function(res) {
                user.cardAdded = res.message;
                cardDetails.brand = res.data.brand;
                cardDetails.last4 = res.data.last4;
            })
        }
    }

    // With Response
    stripeForm.checkCardRes = function(callback) {
        if(user.cardAdded == 'added') {
            callback(true);
        } else {
            $http.post('/api/check-card').success(function(res) {
                callback(res.success);
            })
        }
    }

    stripeForm.removeCard = function(callback) {
        $http.post('/api/remove-card').success(function(res) {
            callback(res.success);
        })
    }
    return stripeForm;
})


app.service('infoGrab', function($http, user){
    var infoGrab = {};

     infoGrab.displayOneRecord = function(id, colName) {

         $http.post('/api/grab-one-record', {"id":id, "colName":colName}).success(function(response) {
             if(response.success == true) {
                 user.firstname = response.data.firstname;
                 user.username = response.data.username;
                 user.mobile = response.data.mobile;
                 user.email = response.data.email;
                 if(user.cardAdded == '') {user.cardAdded = 'none'} else {
                     user.cardAdded = response.data.cardAdded;
                 }
             } else {
                 toastr.error('Profile not found.');
             }
        });
    };
    return infoGrab;
});


app.service('bookingGrab', function($http, bookings){
    var bookingGrab = {};

    bookingGrab.displayAllRecords = function(id, colName, callback) {
         $http.post('/api/grab-bookings', {"id":id, "colName":colName}).success(function(response) {
             //bookings = response.data;
             callback(response);
        });
    };
    return bookingGrab;
});


app.service('auth', function($location, $http){
    var auth = {};

    auth.intercept = function(callback) {
        $http.post('/api/check-auth').success(function(response) {
            callback(response);
       });
    }
    return auth;
});


app.service('maps', function(dashInstant, $timeout, $window) {
    var maps = {};

    // Set Vars
    maps.init = function() {
        $timeout(function(){
            directionsService = new google.maps.DirectionsService(),
            directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: true
            })
            var latlng = new google.maps.LatLng(51.3030, 0.0732);
            var myOptions = {
                zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
            directionsDisplay.setMap(map);

            google.maps.event.trigger(map, 'resize');
        }, 100);
    }

    // Render Directions
    maps.setDirections = function(address, callback) {
        //console.log(address);
        var tempWay = [];
        if(address.pickup1.name !== '') {
            tempWay.push({location: address.pickup1.name+', UK', stopover:false});
        }
        if(address.dropoff1.name !== '') {
            tempWay.push({location: address.dropoff1.name+', UK', stopover:false});
        }
        if(address.pickup2.name !== '') {
            tempWay.push({location: address.pickup2.name+', UK', stopover:false});
        }
        if(address.dropoff2.name !== '') {
            tempWay.push({location: address.dropoff2.name+', UK', stopover:false});
        }
        var waypointCount = Object.keys(tempWay).length || 0;

        /*if(waypointCount == 0) {
            var destination = address.dropoff1.name;
        } else {
            tempWay.push({location: address.dropoff1.name+', UK', stopover:false});
            var destination = tempWay[waypointCount-1]['location'];
        }*/

        request = {
            origin: address.start_location.name+', UK',
            destination: address.end_location.name+', UK',
            waypoints: tempWay,
            travelMode: 'DRIVING',
            provideRouteAlternatives: false,
            unitSystem: google.maps.UnitSystem.METRIC,
            optimizeWaypoints: false
        };

        directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                dashInstant.distance = response.routes[0].legs[0].distance.value;
                dashInstant.address.pickup1.lat = response.routes[0].legs[0].start_location.lat();
                dashInstant.address.dropoff1.lng = response.routes[0].legs[0].start_location.lng();
                dashInstant.address.pickup2.lat = response.routes[0].legs[0].end_location.lat();
                dashInstant.address.dropoff2.lng = response.routes[0].legs[0].end_location.lng();
            } else {
                console.log(status);
            }
            google.maps.event.trigger(map, 'resize');
            callback(dashInstant.distance);
        });
    }
    return maps;
})


app.service('tdispatch', function($http, dashInstant) {
    var tdispatch = {};
    dashInstant.authWindow = '';
    /*var url = 'http://api.tdispatch.org.uk/passenger/oauth2/auth';
    var clientID = 'iesgbqOcGs';
    var secret = 'PeYQRXDWWFAa3WQR7UwHJRs2DZD5eKsP';
    var apiKey = 'c5c13f4fe1aac89e417c879c0d8554ae';
    var params1 = {
        'code': 'Authorization code',
        'client_id': clientID,
        'client_secret': secret,
        'redirect_uri': '',
        'grant_type': 'authorization_code'
    }
    var params2 = {
        'key': apiKey,
        'response_type': clientID,
        'client_id': secret,
        'redirect_uri': '',
        'scope': ''
    }*/

    /*tdispatch.book = function() {
        $.ajax({
            url: "/api/tdispatch-book",
            method: 'GET'
        }).done(function(data) {
            dashInstant.authWindow = data.data;
            var new_window = window.open();
            $(new_window.document.body).append(dashInstant.authWindow);
            //window.open("http://api.tdispatch.org.uk/passenger/oauth2/auth","mywindow");
            //$('#o-auth-window').html(dashInstant.authWindow);
        });
    }*/

    return tdispatch;
})


app.service('validation', function() {

    var validation = {};

    validation.checkVal = function(valiOptions, callback) {
        var flag = 0

        $.each(valiOptions, function(key, value) {

            var name = value.eleName;
            var val = $('[name="'+value.eleName+'"]').val();
            var type = value.type;
            var msg = value.msg;
            var passwordSave = '';

            $('[name="'+name+'"]').closest('div').removeClass('has-success');
            $('[name="'+name+'"]').closest('div').removeClass('has-error');

            if(type == 'text') {
                if(val.length > 0 ) {
                    $('[name="'+name+'"]').closest('div').addClass('has-success');
                    flag += 0;
                } else {
                    toastr.error(msg);
                    $('[name="'+name+'"]').closest('div').addClass('has-error');
                    flag += 1;
                }
            }

            if(type == 'number') {
                val = $('[name="'+name+'"]').val() || $('input:hidden[name="'+name+'"]').val();
                if(val > 0) {
                    $('[name="'+name+'"]').closest('div').addClass('has-success');
                    flag += 0;
                } else {
                    toastr.error(msg);
                    $('[name="'+name+'"]').closest('div').addClass('has-error');
                    flag += 1;
                }
            }

            if(type == 'select') {
                var val = $('[name="'+value.eleName+'"]').val();
                if(val !== null) {
                    if(val.length > 0 ) {
                        $('[name="'+name+'"]').closest('div').addClass('has-success');
                        $('[name="'+name+'"]').addClass('success-placeholder');
                        flag += 0;
                    } else {
                        toastr.error(msg);
                        $('[name="'+name+'"]').closest('div').addClass('has-error');
                        flag += 1;
                    }
                } else {
                    toastr.error(msg);
                    $('[name="'+name+'"]').closest('div').addClass('has-error');
                    flag += 1;
                    $('[name="'+name+'"]').addClass('error-placeholder');
                }
            }

            if(type == 'name') {
                if(val.length > 3 ) {
                    $('[name="'+name+'"]').closest('div').addClass('has-success');
                    flag += 0;
                } else {
                    toastr.error(msg);
                    $('[name="'+name+'"]').closest('div').addClass('has-error');
                    flag += 1;
                }
            }

            if(type == 'email') {
                if(validateEmail(val) == true) {
                    $('[name="'+name+'"]').closest('div').addClass('has-success');
                    flag += 0;
                } else {
                    toastr.error(msg);
                    $('[name="'+name+'"]').closest('div').addClass('has-error');
                    flag += 1;
                }
            }

            if(type == 'postcode') {
                if(validatePostcode(val) == true) {
                    $('[name="'+name+'"]').closest('div').addClass('has-success');
                    flag += 0;
                } else {
                    toastr.error(msg);
                    $('[name="'+name+'"]').closest('div').addClass('has-error');
                    flag += 1;
                }
            }

            if(type == 'phone') {
                if(validatePhone(val) == true) {
                    $('[name="'+name+'"]').closest('div').addClass('has-success');
                    flag += 0;
                } else {
                    toastr.error(msg);
                    $('[name="'+name+'"]').closest('div').addClass('has-error');
                    flag += 1;
                }
            }

            if(type == 'password') {
                if(val.length > 0) {
                    $('[name="'+name+'"]').closest('div').addClass('has-success');
                    flag += 0;
                } else {
                    toastr.error(msg);
                    $('[name="'+name+'"]').closest('div').addClass('has-error');
                    flag += 1;
                }
            }

            if(type == 'passwordConfirm') {
                if(val.length > 0) {
                    if( val == $('[name="'+value.confirmName+'"]').val() ) {
                        $('[name="'+name+'"]').closest('div').addClass('has-success');
                        flag += 0;
                    } else {
                        toastr.error(msg);
                        $('[name="'+name+'"]').closest('div').addClass('has-error');
                        flag += 1;
                    }
                } else {
                    toastr.error(msg);
                    $('[name="'+name+'"]').closest('div').addClass('has-error');
                    flag += 1;
                }
            }

        });

        callback(flag);


        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }

        function validatePhone(phone) {
            var re = /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/i;
            return re.test(phone);
        }

        function validatePostcode(postcode) {
            // Permitted letters depend upon their position in the postcode.
            var alpha1 = "[abcdefghijklmnoprstuwyz]";                       // Character 1
            var alpha2 = "[abcdefghklmnopqrstuvwxy]";                       // Character 2
            var alpha3 = "[abcdefghjkpmnrstuvwxy]";                         // Character 3
            var alpha4 = "[abehmnprvwxy]";                                  // Character 4
            var alpha5 = "[abdefghjlnpqrstuwxyz]";                          // Character 5
            var BFPOa5 = "[abdefghjlnpqrst]";                               // BFPO alpha5
            var BFPOa6 = "[abdefghjlnpqrstuwzyz]";                          // BFPO alpha6

            // Array holds the regular expressions for the valid postcodes
            var pcexp = new Array ();

            // BFPO postcodes
            pcexp.push (new RegExp ("^(bf1)(\\s*)([0-6]{1}" + BFPOa5 + "{1}" + BFPOa6 + "{1})$","i"));

            // Expression for postcodes: AN NAA, ANN NAA, AAN NAA, and AANN NAA
            pcexp.push (new RegExp ("^(" + alpha1 + "{1}" + alpha2 + "?[0-9]{1,2})(\\s*)([0-9]{1}" + alpha5 + "{2})$","i"));

            // Expression for postcodes: ANA NAA
            pcexp.push (new RegExp ("^(" + alpha1 + "{1}[0-9]{1}" + alpha3 + "{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$","i"));

            // Expression for postcodes: AANA  NAA
            pcexp.push (new RegExp ("^(" + alpha1 + "{1}" + alpha2 + "{1}" + "?[0-9]{1}" + alpha4 +"{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$","i"));

            // Exception for the special postcode GIR 0AA
            pcexp.push (/^(GIR)(\s*)(0AA)$/i);

            // Standard BFPO numbers
            pcexp.push (/^(bfpo)(\s*)([0-9]{1,4})$/i);

            // c/o BFPO numbers
            pcexp.push (/^(bfpo)(\s*)(c\/o\s*[0-9]{1,3})$/i);

            // Overseas Territories
            pcexp.push (/^([A-Z]{4})(\s*)(1ZZ)$/i);

            // Anguilla
            pcexp.push (/^(ai-2640)$/i);

            // Assume we're not going to find a valid postcode
            var valid = false;

            // Check the string against the types of post codes
            for ( var i=0; i<pcexp.length; i++) {
                if(pcexp[i].test(postcode)) {
                    // The post code is valid - split the post code into component parts
                    pcexp[i].exec(postcode);

                    // Copy it back into the original string, converting it to uppercase and inserting a space
                    // between the inward and outward codes
                    postcode = RegExp.$1.toUpperCase() + " " + RegExp.$3.toUpperCase();

                    // If it is a BFPO c/o type postcode, tidy up the "c/o" part
                    postcode = postcode.replace (/C\/O\s*/,"c/o ");

                    // If it is the Anguilla overseas territory postcode, we need to treat it specially
                    if(postcode.toUpperCase() == 'AI-2640') {postcode = 'AI-2640'};

                    // Load new postcode back into the form element
                    valid = true;

                    // Remember that we have found that the code is valid and break from loop
                    break;
                }
            }

            // Return with either the reformatted valid postcode or the original invalid postcode
            if (valid) {
                return true;
            } else {
                return false;
            }

        }

    }

    return validation;

})



app.service('func', function(dashInstant) {
    var func = {};

    func.resetQuote = function() {
        dashInstant.jobName = '';
        dashInstant.vanType = '';
        dashInstant.vanName = '';
        dashInstant.jobDate = '';
        dashInstant.fuelPrice = '';
        dashInstant.suggestedPrice = '';
        dashInstant.driverNote = '';
        dashInstant.address.start_location.name = '';
        dashInstant.address.start_location.lat = '';
        dashInstant.address.start_location.lng = '';
        dashInstant.address.end_location.name = '';
        dashInstant.address.end_location.lng = '';
        dashInstant.address.end_location.lng = '';
        dashInstant.distance = 0;
        dashInstant.payment_method = 'cash';
        dashInstant.pk = '';
        dashInstant.recieptUrl = '';
        dashInstant.status = '';
        dashInstant.finalCost = '';
    }

    return func;
})


//======================================******END OF SERVICES ******=====================================================//
