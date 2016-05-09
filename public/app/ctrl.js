// Ctrl For Home
app.controller('HomeCtrl', function($scope) {

})

app.controller('WebsiteCtrl', function($scope) {

})

app.controller('DashProfileCtrl', function($scope) {

})

app.controller('DashMessageCtrl', function($scope) {

})

app.controller('DashPaymentCtrl', function($scope) {

})


app.controller('DashStatusCtrl', function() {

})


// Ctrl For Signup
app.controller('DashSignupCtrl', function($scope, $http, $rootScope, validation, $location) {
    $scope.user = {};
    $scope.user.businesstype = 'Business Type';
    $scope.bizType = {
        availableOptions: [
          {name: 'Business Type', dis: true},
          {name: 'Removal Company'},
          {name: 'Courier'},
          {name: 'Clearance'},
          {name: 'Logistics'}
        ],
    };

    $scope.register = function(user){
        console.log("im in the controller");
        $http.post('/api/register', $scope.user).success(function(user){
            $location.url("/dash");
            $rootScope.currentUser = user;
            console.log(user);
        });


        /*var valiOptions = [
            {eleName: 'userAddress1', type: 'text', msg: 'Please enter your address!'},
            {eleName: 'userDoorNumber', type: 'text', msg: 'Please enter your door number!'},
            {eleName: 'userCity', type: 'text', msg: 'Please enter your city!'},
            {eleName: 'userPostcode', type: 'postcode', msg: 'Please enter a valid from postcode!'},
            {eleName: 'userFirstname', type: 'name', msg: 'Please enter a valid Firstname!'},
            {eleName: 'userLastname', type: 'name', msg: 'Please enter a valid Lastname!'},
            {eleName: 'userMobile', type: 'number', msg: 'Please enter a valid Mobile Number!'},
            {eleName: 'userEmail', type: 'email', msg: 'Please enter a valid email address!'},
            {eleName: 'userUsername', type: 'text', msg: 'Please enter a username!'},
            {eleName: 'userPassword', type: 'password', msg: 'Please enter a password!'},
            {eleName: 'userPassword2', type: 'passwordConfirm', msg: 'Please confirm password!'},
        ]
        validation.checkVal(valiOptions, function(callback) {
            if(callback > 0) {
                return false
            } else {
                $http.post('/api/register', $scope.user)
                .success(function(user){
                    $rootScope.currentUser = user;
                    console.log(user);
                });
            }
        })*/
    };
})

// Ctrl For Signup
app.controller('DashLoginCtrl', function($scope, $http, $rootScope, $location) {
    $scope.login = function(user, $event){
        $event.preventDefault();
        $http.post('/api/login', user).success(function(response){
            $location.url("/dash");
            $rootScope.currentUser = user;
        });
    };
})

app.controller('StaffSigninCtrl', function($scope, $http, $rootScope, $location) {
    $scope.signin = function(staff, $event){
        $event.preventDefault();
        $http.post('/api/signin', staff).success(function(response){
            $location.url("/admin");
            $rootScope.currentStaff = staff;
        });
    };
})

app.controller('DriverSigninCtrl', function($scope, $http, $rootScope, $location) {
    console.log("radio Phone");
    $scope.driversignin = function(driver, $event){
        $event.preventDefault();
        $http.post('/api/driversignin', driver).success(function(response){
            $location.url("/contractor-home");
            $rootScope.currentDriver = driver;
        });
    };
})


app.controller('DashUsersCtrl', function($scope, $http) {
      $scope.displayOneUser = function(id) {
        var temp = $scope.users.filter(function(ele){
            return ele._id == id;
        })
        $scope.username = temp[0]["username"];
        $scope.email = temp[0]["email"];
        $scope.address = temp[0]["address"];
        $scope.city = temp[0]["city"];
        $scope.postcode = temp[0]["postcode"];
        $scope.bank = temp[0]["bank"];
        $scope.acc = temp[0]["acc"];
        $scope.sc = temp[0]["sc"];
    };
    var refresh = function() {
        $http.post('/api/userlist').success(function(response) {
            $scope.users = response.data;
        });
    };
    refresh();
})

app.controller('DashDriversCtrl', function($scope, $http) {
    $scope.displayOneDriver = function(id) {
        var temp = $scope.drivers.filter(function(ele){
            return ele._id == id;
        })
        $scope.username = temp[0]["username"];
        $scope.email = temp[0]["email"];
        $scope.day = temp[0]["day"];
        $scope.month = temp[0]["month"];
        $scope.year = temp[0]["year"];
        $scope.address = temp[0]["address"];
        $scope.city = temp[0]["city"];
        $scope.postcode = temp[0]["postcode"];
        $scope.reg = temp[0]["reg"];
        $scope.bank = temp[0]["bank"];
        $scope.acc = temp[0]["acc"];
        $scope.sc = temp[0]["sc"];
    };
    var refresh = function() {
        $http.post('/api/driverlist').success(function(response) {
            $scope.drivers = response.data;
        });
    };
    refresh();
})

app.controller('DashStaffCtrl', function($scope, staff, $http, $rootScope) {
    $scope.staff = staff;
    $scope.addstaff = function(){
        //todo verify if the passwords are the same
        if(staff.password == staff.password2){
            $http.post('/api/addstaff', staff)
            .success(function(staff){
                $rootScope.currentUser = staff;
            });
        };
    };
    var refresh = function() {
        $http.post('/api/stafflist').success(function(response) {
            $scope.stafflist = response.data;
        });
    };
    refresh();
})

app.controller('ContractorSignupCtrl', function($scope, $http, $rootScope, driver) {

    $scope.driver = driver;
    $scope.signup = function(){
        //todo verify if the passwords are the same
            $http.post('/api/signup', driver).success(function(driver){
                $rootScope.currentUser = driver;
            });
    };
})

app.controller('AdminHomeCtrl', function($scope, $http) {
     var refresh = function() {
        $http.post('/api/driverlist').success(function(response) {
            var driverCount = Object.keys(response.data).length
            $scope.drivers = driverCount;
        });
    };
    var refine = function() {
        $http.post('/api/userlist').success(function(response) {
            var userCount = Object.keys(response.data).length
            $scope.users = userCount;
        });
    };
    refresh();
    refine();
})

// Ctrl For Dash
app.controller('DashHomeCtrl', function($scope) {
})

// Ctrl For Dash
app.controller('DashInstantCtrl', function($scope, $location, dashInstant, dashVans, maps, $http, tdispatch, bookingGrab, bookings, misc, user, stripeForm) {

    var realTime = new Date();
    $('#job-date-picker').datetimepicker({
        format: 'dd-mm-yy hh:ii',
        startDate: realTime,
        initialDate: realTime,
        todayHighlight: true,
    });

    $scope.dashInstant = dashInstant;
    $scope.dashVans = dashVans;
    $scope.tdispatch = tdispatch;
    $scope.booking = bookings;
    $scope.misc = misc;
    $scope.stripeForm = stripeForm;

    // Set up autocomplete
    $scope.address = dashInstant.address;

    $scope.autocompleteOptions = {
        componentRestrictions: { country: 'uk' },
        types: ['geocode']
    }
    // Start GMaps
    maps.init();

    // Hide Picker When selected
    $('#job-date-picker').datetimepicker().on('changeDate', function(ev){
        $('#job-date-picker').datetimepicker('hide');
    });

    $scope.showWaypointField = function(type) {
        var waypointFields = $('[data-address-type="'+type+'"]').length;
        var hiddenWaypointFields = $('[data-address-type="'+type+'"].hide').length;
        var waypointId = (waypointFields - hiddenWaypointFields) + 2;
        $('[data-address-type="'+type+'"][data-address-id="'+waypointId+'"]').removeClass("hide");
    }

    $scope.chooseVan = function(vanType, $event) {
        $scope.dashInstant.vanType = $scope.dashVans[vanType]['tdID'];
        $scope.dashInstant.vanName = $scope.dashVans[vanType]['vanType'];

        // Mark Chosen Van Box
        $('.panel-borders').removeClass('bord-picked');
        $.each($('.panel-borders'), function(i,v) {
            if($(v).attr('data-van') == vanType) {
                $(v).addClass('bord-picked');
            }
        });
    }

    $scope.reviewBooking = function() {
        $scope.stripeForm.checkCardRes(function(status) {
            if(status == true) {
                $scope.misc.hasCard = true;
            } else {
                $scope.misc.hasCard = false;
            }
        });
    }



    $scope.updateMaps = function() {
        if($scope.dashInstant.address.start_location.name.formatted_address) {
            $scope.dashInstant.address.start_location.lat =
            $scope.dashInstant.address.start_location.name.geometry.location.lat();
            $scope.dashInstant.address.start_location.lng =
            $scope.dashInstant.address.start_location.name.geometry.location.lng();
            $scope.dashInstant.address.start_location.name = $scope.dashInstant.address.start_location.name.formatted_address;
        }
        if($scope.address.end_location.name.formatted_address) {
            $scope.dashInstant.address.end_location.lat =
            $scope.dashInstant.address.end_location.name.geometry.location.lat();
            $scope.dashInstant.address.end_location.lng =
            $scope.dashInstant.address.end_location.name.geometry.location.lng();
            $scope.dashInstant.address.end_location.name = $scope.dashInstant.address.end_location.name.formatted_address;
        }
        if($scope.address.pickup1.formatted_address) {
            $scope.address.pickup1.name = $scope.address.pickup1.formatted_address;
        }
        if($scope.address.dropoff1.formatted_address) {
            $scope.address.dropoff1.name = $scope.address.dropoff1.formatted_address;
        }
        if($scope.address.pickup2.formatted_address) {
            $scope.address.pickup2.name = $scope.address.pickup2.formatted_address;
        }
        if($scope.address.dropoff2.formatted_address) {
            $scope.address.dropoff2.name = $scope.address.dropoff2.formatted_address;
        }
        if($scope.address.start_location.name !== '' && $scope.address.end_location.name !== '') {
            maps.setDirections($scope.address, function(distance) {
                var tempMiles = 0.000621371192237 * distance;
                dashInstant.fuelPrice = Math.round(tempMiles * 0.72);
            });
        }
    }



    $scope.tester = function(){
        // SAVES JOB TO DB
        $scope.misc.myBookingsReady = true;
        /*$http.post('/api/tester', {data: dashInstant}, function(data) {
            console.log(data);
        }, function(response){
            // DID NOT SAVE
        });*/
    }

    // NO SAVE ButTON
    $scope.saveInstantjob = function(){
        $http.post('/api/save-instant-job', {data: dashInstant}).then(function(res){
            // $scope.matchFields(res);
        }, function(response){
            // failure callback
        });
    }

    $scope.calcInstantJob = function() {
        $http.post('/api/tdispatch-calc', {data: dashInstant}).then(function(res){
            $scope.matchFields(res);
        }, function(response){
            // failure callback
        });
    }

    $scope.matchFields = function(res) {
        $scope.dashInstant.waitTime = 'Wait Time: '+res.data.data.fare.time_to_wait / 60+' Mins';
        $scope.dashInstant.suggestedPrice = res.data.data.fare.total_cost;
        dashInstant = $scope.dashInstant;
    }

    $scope.$watch('misc.dirtModalHack', function(newVal, oldVal) {
        console.log('hack '+newVal);
        if(newVal == true) {
            $('#review-booking-button').click();
        }
    })

})

app.controller('DashScheduleCtrl', function($scope, $location, dashInstant) {
    //
})

app.controller('DashRecurringCtrl', function($scope, $location, dashInstant) {
    //
})

app.controller('DashProjectCtrl', function($scope, $location, dashInstant) {
    //
})

app.controller('DashAddressBookCtrl', function($scope, $location, dashInstant) {
    //
})

app.controller('DashdriversearningsCtrl', function($scope, $http) {
    //
})

app.controller('DashAddressBookCtrl', function($scope, $http, $rootScope) {
    var idGrab = function() {
        return $rootScope.currentUser._id;
    }
    var refresh = function() {
        $http.post('/api/contactlist', {data:idGrab()}).success(function(response) {
            $scope.conlist = response.data;
            console.log($scope.conlist);
        });
    };
    refresh();
    $scope.addContact =function() {
        $http.post('/api/add-contact', {
            contact: $scope.contact,
            user: $rootScope.currentUser._id
        }).success(function(response){
            refresh();
        });
     };
})

app.controller('DashJobCompleteCtrl', function($scope, $location, dashInstant) {
    //
})

// Ctrl For Navigation
app.controller('NaviCtrl', function($scope, views, $route, auth, $http, user, infoGrab, bookings, bookingGrab, bookings, email, $location, misc, stripeForm, cardDetails, currBooking, dashInstant) {
    auth.intercept(function(response) {
        // Grab appRoute.js Action Param
        $scope.views = views;
        views.currentView = $route.current.action;
        views.currentType = $route.current.type;
        views = $scope.views;
        $scope.bookings = bookings;
        $scope.misc = misc;
        $scope.stripeForm = stripeForm;
        $scope.cardDetails = cardDetails;
        $scope.currBooking = currBooking;
        $scope.email = email;
        $scope.isEmailSent = '';
        $scope.dashInstant = dashInstant;

        if(response.message !== 'authenticated' && views.currentType == 'dash') {
            $location.path('/login');
        } else {
            $scope.user = user;
            $scope.email = email;
            $scope.isCardAdded = '';
        }
    })

    $scope.cancelJob = function(jobPK) {
        $http.post('/api/cancel-job', {data: jobPK}).success(function(resp) {
            if(resp.success == true) {
                $scope.misc.myBookingsReady = true;
            }
        })
    }

    $scope.checkCard = function() {
        console.log('chek');
        //$scope.stripeForm.checkCard();
    }

    $scope.contactSend = function(){
        $http.post("/api/contact-send/", {email: $scope.email}).success(function(response){
            if(response.success == true) {
                // valid
                $scope.email.emailAddress = '';
                $scope.email.subject = '';
                $scope.email.message = '';
                $scope.isEmailSent = true;
            } else {
                $scope.isEmailSent = false;
            }
        });
        console.log("test to see if email")
    };

   $scope.logout = function(){
       $http.post("/api/logout").success(function(){
           $location.url("/login");
       });
   };

    $scope.displayOneBooking = function(id){
        var temp = $scope.bookings.filter(function(ele){
            return ele._id == id;
        })
        $scope.currBooking.jobID = temp[0]["_id"];
        $scope.currBooking.jobPK = temp[0]["pk"];
        $scope.currBooking.jobName = temp[0]["jobName"];
        $scope.currBooking.pickUp = temp[0]["address"]["start_location"]["name"];
        $scope.currBooking.dropOff = temp[0]["address"]["end_location"]["name"];
        $scope.currBooking.jobDate = temp[0]["jobDate"];
        $scope.currBooking.driverNote = temp[0]["driverNote"];
        $scope.currBooking.vanType = temp[0]["vanType"];
        $scope.currBooking.fuelPrice = temp[0]["fuelPrice"];
        $scope.currBooking.suggestedPrice = temp[0]["suggestedPrice"];
        $scope.currBooking.userID = temp[0]["userID"];
        $scope.currBooking.driverName = temp[0]["driverName"];
        $scope.currBooking.driverPlate = temp[0]["driverPlate"];
        $scope.currBooking.driverColor = temp[0]["driverColor"];
        $scope.currBooking.driverPK = temp[0]["driverPK"];
        $scope.currBooking.driverPhone = temp[0]["driverPhone"];
    };

    /*var refresh = function() {
        $http.post('/api/grab-booking-info').success(function(response) {
            $scope.bookings = response.data;
        });
    };
    refresh();*/

    $scope.displayProfile = infoGrab.displayOneRecord(null, "User");

    $scope.displayBooking = bookingGrab.displayAllRecords(null, "Quote", function(resp){
        $scope.bookings = resp;
    });

    $scope.$watch('misc.myBookingsReady', function(newValue, oldValue) {
        if(newValue == true) {
            $scope.displayBooking = bookingGrab.displayAllRecords(null, "Quote", function(resp){
                $scope.bookings = resp;
                $scope.misc.myBookingsReady = false;
            });
        }
    });
})


// Ctrl For Navigation
app.controller('NaviAdminCtrl', function($scope, views, $route, admin, $route, $http, $location, auth) {
    $scope.admin = admin;
    // Grab appRoute.js Action Param
    admin.currentView = $route.current.action;

//    $scope.views = views;
//    // Grab appRoute.js Action Param
//    views.currentType = $route.current.action.type;
//    views.currentView = $route.current.action.view;
//    views = $scope.views;
//    auth.intercept(views);
})

app.controller('DashDaccountCtrl', function($scope, $location) {
    //
})

app.controller('DashDearningsCtrl', function($scope, $location) {
    //
})

app.controller('DashDnaviCtrl', function($scope, contractor, $route, $http, $location) {
    $scope.contractor = contractor;
    // Grab appRoute.js Action Param
    contractor.currentView = $route.current.action;
})

app.controller('CardAddedCtrl', function($scope, user, stripeForm, misc) {
    $scope.user = user;
    $scope.stripeForm = stripeForm;
    $scope.misc = misc;

    $scope.addCard = function() {
        if($scope.misc.reviewCardRoute == true) {
            $scope.stripeForm.getCardFormRes(function(resp) {
                if(resp == true) {
                    misc.reviewCardRoute == true
                    //$('#add-card-close-icon').click();
                    //$('#review-booking-modal')click();
                }
            });
        } else {
            $scope.stripeForm.getCardForm();
        }
    }

    $scope.removeCard = function() {
        $scope.stripeForm.removeCard(function(resp) {
            $scope.user.cardAdded = resp;
        });
    }

})


app.controller('ReviewBookingCtrl', function($scope, user, stripeForm, misc, dashInstant, $http, bookings) {
    $scope.dashInstant = dashInstant;
    $scope.stripeForm = stripeForm;
    $scope.bookings = bookings;
    $scope.user = user;
    $scope.misc = misc;

    $scope.showAddCard = function() {
        $('#payment-button').click();
        $scope.misc.reviewCardRoute = true;
    }

    // FROM BOOK BUTTON TO SERVER ROUTES (DATA IT SENDS: DASHINSTANT)
    $scope.bookInstantJob = function(){
        // if customer has card in mongo
        if(user.cardAdded == 'added') {
            // SAVES JOB TO DB
            $http.post('/api/tdispatch-book', {data: dashInstant}).then(function(data){
                console.log(data);
                bookingGrab.displayAllRecords(null, "Quote", function(resp){
                    $scope.bookings = resp;
                    $scope.misc.myBookingsReady = true;
                });
            }, function(response){
                // failure callback
            });
        } else {
            // cant book need card
            document.getElementById('payment-button').click();
            $scope.stripeForm.checkCard();
        }
    }
})
