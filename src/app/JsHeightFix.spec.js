describe('Directive: JsHeightFix', function() {

    var element, scope, compile, win,
        defaultWidth = 200, defaultHeight = 200;

        $container = angular.element(
            "<div class='js_height_container' style='height: 200px;'>" + 
            "</div>"
        ),
        
        $fixed = angular.element(
            "<div class='js_height_fixed' style='height: 10px;'></div>"
        ),

        $validTemplate = angular.element(
            "<div jsheightfix style='border:1px solid red;'></div>"
        );

    function createDirective(template) {
        var el;
        
        el = compile(template || $validTemplate)(scope);
        scope.$apply()
        return el;
    }

    beforeEach(function() {
        module('js-height-fix');

        inject(function($rootScope, $compile, $window) {
            scope = $rootScope.$new();
            compile = $compile;
            win = $window;
        });

        spyOn($.fn, "parent").andCallFake(function() {
            return $container.append($fixed);
        });

    });

    describe("when created", function() {

        it("element height should be set to remaining height of container", function() {
            var $jsHeightFix = $validTemplate.clone();
            $jsHeightFix = createDirective($jsHeightFix); 
            expect($jsHeightFix.height()).toBe(200 - 10);
        });

    });

    describe("when destroyed", function() {
        it("should remove window resize event listener", function() {

            spyOn($.fn, "off");

            var $jsHeightFix = $validTemplate.clone();
            $jsHeightFix = createDirective($jsHeightFix); 
            var _scope = $jsHeightFix.scope();
            _scope.$destroy();

            expect($.fn.off).toHaveBeenCalled();

        }); 
    });
});