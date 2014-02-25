# Angular JSHeightFix #
 
Angular directive for applying height to a child element to occupy the remaining height of the page.

Designed for web applications the layout takes up the full height of the browser window while allowing for a "bar" element to have varying height which may change window resize.

### Dependencies ######

- [jQuery](http://jquery.com)

- [Angular](http://angularjs.org/)

## Usage ####

### Loading Dependencies #####
    
    <!-- styles -->
    <link rel="stylesheet" type="text/css" href="jsheightfix.css"></link>

    <!-- scripts -->
    <script src="jquery.min.js"></script>
    <script src="angular.min.js"></script>

    <script src="jsheightfix.js"></script>
    
### Layout #####

    <!-- container div, height: 100% -->
    <div class="js_height_container"> 

        <!-- fixed div, height is set by its contents -->
        <div class="js_height_fixed"></div>

        <!-- remaining div, height is set to container.height - fixed.height -->
        <div jsheightfix class="js_height_remaining"></div>
    </div>

