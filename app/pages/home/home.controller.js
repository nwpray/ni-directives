angular.module('app')
.controller
(
    'HomeController',
    function()
    {
        this.OpenRawModal = function()
        {
            this.Test.On('on.close.click', function(){this.Test.Close();}.bind(this));
            this.Test.Open();
        };
    }
);