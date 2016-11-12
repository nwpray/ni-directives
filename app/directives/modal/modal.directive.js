angular.module('app')
.directive
(
    'niModal',
    function()
    {
        return {
            restrict : 'E',
            scope :
            {
                niView : '@',
                niAlias : '@',
                niBind : '='
            },
            link : function($scope, $element, $attrs)
            {
                $element.css
                (
                    {
                        position: 'fixed',
                        background: 'rgba(0,0,0,0.6)',
                        width: '100%',
                        height: '100%',
                        top: '0',
                        left: '0',
                        overflow: 'hidden',
                        'z-index': '7000'
                    }
                );
            },
            templateUrl: function(element, attrs)
            {
                return attrs['niView'];
            },
            controllerAs: 'Modal',
            controller: function($scope, $element)
            {
                if(!('niBind' in $scope))
                    return;

                //Allow for parent to add data to modal
                this.data = {};
                this.events = {};

                this.Init = function()
                {
                    $($element).addClass('hidden');

                    var alias = ($scope.niAlias != undefined) ? $scope.niAlias : 'Modal';

                    $scope.niBind[alias] = this;

                    if('onModalReady' in $scope.niBind)
                        $scope.niBind.onModalReady(alias);
                };

                //Getters
                this.Scope = function()
                {
                    return $scope;
                };
                this.Element = function()
                {
                    return $element;
                };

                //Open Close
                this.Open = function()
                {
                    this.Trigger('on.modal.show', {});
                    $('html, body').addClass('prevent-scroll');
                    $($element).css('opacity', '0');
                    $($element).removeClass('hidden');
                    $($element).animate({opacity: 1}, 200, function(){this.Trigger('on.modal.shown');}.bind(this));

                };
                this.Close = function()
                {
                    console.log('Close');
                    this.Trigger('on.modal.hide', {});
                    $('html, body').removeClass('prevent-scroll');
                    this.data = {};
                    this.events = {};
                    $($element).animate({opacity:0}, 200, function(){$($element).addClass('hidden'); this.Trigger('on.modal.hidden');}.bind(this));
                };

                //Events
                this.On = function(event, callback)
                {
                    if(!(event in this.events))
                        this.events[event] = [];

                    this.events[event].push(callback);
                };
                this.Trigger = function(event, data)
                {
                    if(event in this.events)
                    {
                        for(var e in this.events[event])
                        {
                            this.events[event][e](data);
                        }
                    }
                };

                this.Init();
            }
        }
    }
);