webMuse.controller('LoginView', function($scope){
    $scope.submitLogin = function()
    {
        if(!$scope.user || !$scope.pass){
            alert("Must supply user and password!");
            return;
        }
        var data = {user: $scope.user, pass: $scope.pass};
        //Cross-domain or absolute URL problems with Angular's HTTP
        //Gets an HTTP status 0.
//        $http.post(shared.appServerHost()+'/login', data)
//            .success(function(data, status, headers){
//                alert(data);
//            })
//            .error(function(data, status, headers){
//                alert('Error sending login request, HTTP status: ' + status);
//            });

        jQuery.ajax(shared.appServerHost()+'/login', {
            data: JSON.stringify(data),
            method: 'POST',
            crossDomain: true,
            error: function(xhr,status,error){
                alert('Error sending login request');
            },
            success: function(data, status, xhr){
                alert(data);
            },
        });
    };
});