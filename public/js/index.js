angular.module('index', [])
    .controller('indexController', function($scope, $http) {
            
            $http({   
                method: 'GET',   
                url: 'voteResult'  
            }).success(function(data) {

                // 排序
                data.votes = data.votes.sort(function (a, b) {
                    return a.vote > b.vote ? 1 : -1;
                });

                $scope.votes=data.votes.reverse();

                // bubbleChart
                $(document).ready(function () {
                var bubbleChart = new d3.svg.BubbleChart({
                    supportResponsive: true,
                    //container: => use @default
                    size: 600,
                    //viewBoxSize: => use @default
                    innerRadius: 600 / 3.5,
                    //outerRadius: => use @default
                    radiusMin: 50,
                    //radiusMax: use @default
                    //intersectDelta: use @default
                    //intersectInc: use @default
                    //circleColor: use @default
                    data: {
                        items: [
                          {text: data.votes[0].company, count: data.votes[0].vote},
                          {text: data.votes[1].company, count: data.votes[1].vote},
                          {text: data.votes[2].company, count: data.votes[2].vote},
                          {text: data.votes[3].company, count: data.votes[3].vote},
                          {text: data.votes[4].company, count: data.votes[4].vote},
                          {text: data.votes[5].company, count: data.votes[5].vote},
                          {text: data.votes[6].company, count: data.votes[6].vote},
                          {text: data.votes[7].company, count: data.votes[7].vote},
                          {text: data.votes[8].company, count: data.votes[8].vote},
                          {text: data.votes[9].company, count: data.votes[9].vote},
                          {text: data.votes[10].company, count: data.votes[10].vote}
                          
                    ],
                    eval: function (item) {return item.count;},
                    classed: function (item) {return item.text.split(" ").join("");}
                    },
                    plugins: [
                        // {
                        //     name: "central-click",
                        //     options: {
                        //         text: "",
                        //         style: {
                        //             "font-size": "12px",
                        //             "font-style": "italic",
                        //             "font-family": "Source Sans Pro, sans-serif",
                        //             //"font-weight": "700",
                        //             "text-anchor": "middle",
                        //             "fill": "white"
                        //         },
                        //         attr: {dy: "65px"},
                        //         centralClick: function() {
                        //             alert("Here is more details!!");
                        //         }
                        //     }
                        // },
                        {
                            name: "lines",
                            options: {
                                format: [
                                    {// Line #0
                                        textField: "count",
                                        classed: {count: true},
                                        style: {
                                          "font-size": "28px",
                                          "font-family": "Source Sans Pro, sans-serif",
                                          "text-anchor": "middle",
                                          fill: "white"
                                        },
                                        attr: {
                                          dy: "0px",
                                          x: function (d) {return d.cx;},
                                          y: function (d) {return d.cy;}
                                        }
                                    },
                                    {// Line #1
                                        textField: "text",
                                        classed: {text: true},
                                        style: {
                                          "font-size": "14px",
                                          "font-family": "Source Sans Pro, sans-serif",
                                          "text-anchor": "middle",
                                          fill: "white"
                                        },
                                        attr: {
                                          dy: "20px",
                                          x: function (d) {return d.cx;},
                                          y: function (d) {return d.cy;}
                                        }
                                    }
                                ],

                                centralFormat: [
                                  {// Line #0
                                    style: {"font-size": "50px"},
                                    attr: {}
                                  },
                                  {// Line #1
                                    style: {"font-size": "30px"},
                                    attr: {dy: "40px"}
                                  }
                                ]
                            }
                        }]
                    });
                }); 
            }).error(function(data) {   
                
            }); 
        $scope.processYoungForm = function() {
          if(!$scope.youngForm[6].age){
            $scope.youngMessage = {fail : "請選擇年齡層"};
            return;

          } else if(!$scope.youngForm[8].email){
            $scope.youngMessage = {fail : "請輸入Email"};
            return;
          }
          else{
          $http({
          method  : 'POST',
          url     : 'postUser',
          data    : $scope.youngForm  // pass in data as strings
           // set the headers so angular passing info as form data (not request payload)
         })
          .success(function(data) {
            $scope.youngMessage = data.message;
          });
          }
        };

        $scope.processHRForm = function() {
          if(!$scope.hrForm.name||!$scope.hrForm.company||!$scope.hrForm.jobtitle){
            $scope.hrMessage = {fail : "請輸入完整資料"};
            return;

          } else if(!$scope.hrForm.email){
            $scope.hrMessage = {fail : "請輸入Email"};
            return;
          } else{
            $http({
            method  : 'POST',
            url     : 'postHR',
            data    : $scope.hrForm  // pass in data as strings
             // set the headers so angular passing info as form data (not request payload)
           })
            .success(function(data) {
              $scope.hrMessage = data.message;
            });
          }
        };

        $scope.processVoteForm = function() {
        if(!$scope.voteForm[18].email){

            $scope.voteMessage = {fail : "請輸入Email"};
            return;

        }else{
              $http({
              method  : 'POST',
              url     : 'vote',
              data    : $scope.voteForm  // pass in data as strings
               // set the headers so angular passing info as form data (not request payload)
             })
              .success(function(data) {
                $scope.showme = data.message.show;
                $scope.voteMessage = data.message;
                $scope.voted = true;
              });
        }
        };

        $scope.youngForm=[
            {label:'資訊科技',name:'it'},{label:'傳產製造',name:'tradition'},{label:'商業服務',name:'business'},{label:'民生服務',name:'services'},{label:'文創教育',name:'culture'},{label:'新創產業',name:'startup'},{},{advice:''}
        ]
        $scope.hrForm={}

        $scope.voteForm=[
            {label:'GOOGLE/谷歌',name:'google'},{label:'Asus/華碩',name:'asus'},{label:'Acer/宏碁',name:'acer'},{label:'Line',name:'line'},{label:'HTC/宏達電',name:'htc'},{label:'BCG Taiwan',name:'bcgtaiwan'},{label:'Gucci/古馳',name:'gucci'},{label:'Citibank/花旗銀行',name:'citibank'},
            {label:'HSBC/匯豐銀行',name:'hsbc'},{label:'Chanel/香奈兒',name:'chanel'},{label:'McKinsey&Company/麥肯錫',name:'mckinseycompany'},{label:'MUJI/無印良品',name:'muji'},{label:'Unilever/聯合利華',name:'unilever'},{label:'Ogilvy&Mather/奧美',name:'ogilvymather'},{label:'Gogoro',name:'gogoro'},{label:'KKBOX',name:'kkbox'},{label:'eslite/誠品',name:'eslite'},{other:''},{}
        ]

        // checkbox limit
        $scope.checked = 0;
        $scope.limit = 5;
        $scope.checkChanged = function(item){
        if(item.winner) $scope.checked++;
        else $scope.checked--;
}

    
}).controller('demoCtrl', function($scope) {
          $scope.disableSticking = false;
        })
    .directive('sticky', ['$window', '$timeout', function($window, $timeout) {
      return {
        restrict: 'A', // this directive can only be used as an attribute.
        scope: {
          disabled: '=disabledSticky'
        },
        link: function linkFn($scope, $elem, $attrs) {

          // Initial scope
          var scrollableNodeTagName = 'sticky-scroll';
          var initialPosition = $elem.css('position');
          var initialStyle = $elem.attr('style') || '';
          var stickyBottomLine = 0;
          var isSticking = false;
          var onStickyHeighUnbind;
          var originalInitialCSS;
          var originalOffset;
          var placeholder;
          var stickyLine;
          var initialCSS;

          // Optional Classes
          var stickyClass = $attrs.stickyClass || '';
          var unstickyClass = $attrs.unstickyClass || '';
          var bodyClass = $attrs.bodyClass || '';
          var bottomClass = $attrs.bottomClass || '';

          // Find scrollbar
          var scrollbar = deriveScrollingViewport ($elem);

          // Define elements
          var windowElement = angular.element($window);
          var scrollbarElement = angular.element(scrollbar);
          var $body = angular.element(document.body);

          // Resize callback
          var $onResize = function () {
            if ($scope.$root && !$scope.$root.$$phase) {
              $scope.$apply(onResize);
            } else {
              onResize();
            }
          };

          // Define options
          var usePlaceholder = ($attrs.usePlaceholder !== 'false');
          var anchor = $attrs.anchor === 'bottom' ? 'bottom' : 'top';
          var confine = ($attrs.confine === 'true');

          // flag: can react to recalculating the initial CSS dimensions later
          // as link executes prematurely. defaults to immediate checking
          var isStickyLayoutDeferred = $attrs.isStickyLayoutDeferred !== undefined
            ? ($attrs.isStickyLayoutDeferred === 'true')
            : false;

          // flag: is sticky content constantly observed for changes.
          // Should be true if content uses ngBind to show text
          // that may vary in size over time
          var isStickyLayoutWatched = $attrs.isStickyLayoutWatched !== undefined
          ? ($attrs.isStickyLayoutWatched === 'true')
          : true;


          var offset = $attrs.offset
            ? parseInt ($attrs.offset.replace(/px;?/, ''))
            : 0;

          /**
           * Trigger to initialize the sticky
           * Because of the `timeout()` method for the call of
           * @type {Boolean}
           */
          var shouldInitialize = true;

          /**
           * Initialize Sticky
           */
          function initSticky() {

            if (shouldInitialize) {

              // Listeners
              scrollbarElement.on('scroll', checkIfShouldStick);
              windowElement.on('resize', $onResize);

              memorizeDimensions(); // remember sticky's layout dimensions

              // Setup watcher on digest and change
              $scope.$watch(onDigest, onChange);

              // Clean up
              $scope.$on('$destroy', onDestroy);
              shouldInitialize = false;
            }
          };

          /**
           * need to recall sticky's DOM attributes (make sure layout has occured)
           */
          function memorizeDimensions() {
            // immediate assignment, but there is the potential for wrong values if content not ready
            initialCSS = $scope.getInitialDimensions();

            // option to calculate the dimensions when layout is 'ready'
            if (isStickyLayoutDeferred) {

              // logic: when this directive link() runs before the content has had a chance to layout on browser, height could be 0
              if (!$elem[0].getBoundingClientRect().height) {

                onStickyHeighUnbind = $scope.$watch(
                    function() {
                      return $elem.height();
                    },

                    // state change: sticky content's height set
                    function onStickyContentLayoutInitialHeightSet(newValue, oldValue) {
                      if (newValue > 0) {
                        // now can memorize
                        initialCSS = $scope.getInitialDimensions();

                        if (!isStickyLayoutWatched) {
                          // preference was to do just a one-time async watch on the sticky's content; now stop watching
                          onStickyHeighUnbind();
                        }
                      }
                    }
               );
              }
            }
          }

          /**
           * Determine if the element should be sticking or not.
           */
          var checkIfShouldStick = function() {
            if ($scope.disabled === true || mediaQueryMatches()) {
              if (isSticking) unStickElement();
              return false;
            }

            // What's the document client top for?
            var scrollbarPosition = scrollbarYPos();
            var shouldStick;

            if (anchor === 'top') {
              if (confine === true) {
                shouldStick = scrollbarPosition > stickyLine && scrollbarPosition <= stickyBottomLine;
              } else {
                shouldStick = scrollbarPosition > stickyLine;
              }
            } else {
              shouldStick = scrollbarPosition <= stickyLine;
            }

            // Switch the sticky mode if the element crosses the sticky line
            // $attrs.stickLimit - when it's equal to true it enables the user
            // to turn off the sticky function when the elem height is
            // bigger then the viewport
            var closestLine = getClosest (scrollbarPosition, stickyLine, stickyBottomLine);

            if (shouldStick && !shouldStickWithLimit ($attrs.stickLimit) && !isSticking) {
              stickElement (closestLine);
            } else if (!shouldStick && isSticking) {
              unStickElement(closestLine, scrollbarPosition);
            } else if (confine && !shouldStick) {
              // If we are confined to the parent, refresh, and past the stickyBottomLine
              // We should 'remember' the original offset and unstick the element which places it at the stickyBottomLine
              // originalOffset = elementsOffsetFromTop ($elem[0]);
              unStickElement (closestLine, scrollbarPosition);
              
            }
          };

          /**
           * determine the respective node that handles scrolling, defaulting to browser window
           */
          function deriveScrollingViewport(stickyNode) {
            // derive relevant scrolling by ascending the DOM tree
            var match =findAncestorTag (scrollableNodeTagName, stickyNode);
            return (match.length === 1) ? match[0] : $window;
          }

          /**
           * since jqLite lacks closest(), this is a pseudo emulator (by tag name)
           */
          function findAncestorTag(tag, context) {
            var m = []; // nodelist container
            var n = context.parent(); // starting point
            var p;

            do {
              var node = n[0]; // break out of jqLite
              // limit DOM territory
              if (node.nodeType !== 1) {
                break;
              }

              // success
              if (node.tagName.toUpperCase() === tag.toUpperCase()) {
                return n;
              }

              p = n.parent();
              n = p; // set to parent
            } while (p.length !== 0);

            return m; // empty set
          }

          /**
           * Seems to be undocumented functionality
           */
          function shouldStickWithLimit(shouldApplyWithLimit) {
            return shouldApplyWithLimit === 'true'
              ? ($window.innerHeight - ($elem[0].offsetHeight + parseInt(offset)) < 0)
              : false;
          }

          /**
           * Finds the closest value from a set of numbers in an array.
           */
          function getClosest(scrollTop, stickyLine, stickyBottomLine) {
            var closest = 'top';
            var topDistance = Math.abs(scrollTop - stickyLine);
            var bottomDistance = Math.abs(scrollTop - stickyBottomLine);

            if (topDistance > bottomDistance) {
              closest = 'bottom';
            }

            return closest;
          }

          /**
           * Unsticks the element
           */
          function unStickElement(fromDirection) {
            if (initialStyle) {
              $elem.attr('style', initialStyle);
            }
            isSticking = false;

            initialCSS.width = $scope.getInitialDimensions().width;

            $body.removeClass(bodyClass);
            $elem.removeClass(stickyClass);
            $elem.addClass(unstickyClass);

            if (fromDirection === 'top') {
              $elem.removeClass(bottomClass);

              $elem
                .css('z-index', 10)
                .css('width', initialCSS.width)
                .css('top', initialCSS.top)
                .css('position', initialCSS.position)
                .css('left', initialCSS.cssLeft)
                .css('margin-top', initialCSS.marginTop)
                .css('height', initialCSS.height);
            } else if (fromDirection === 'bottom' && confine === true) {
              $elem.addClass(bottomClass);

              // It's possible to page down page and skip the 'stickElement'.
              // In that case we should create a placeholder so the offsets don't get off.
              createPlaceholder();

              $elem
                .css('z-index', 10)
                .css('width', initialCSS.width)
                .css('top', '')
                .css('bottom', 0)
                .css('position', 'absolute')
                .css('left', initialCSS.cssLeft)
                .css('margin-top', initialCSS.marginTop)
                .css('margin-bottom', initialCSS.marginBottom)
                .css('height', initialCSS.height);
            }

            if (placeholder && fromDirection === anchor) {
              placeholder.remove();
            }
          }

          /**
           * Sticks the element
           */
          function stickElement(closestLine) {
            // Set sticky state
            isSticking = true;
            $timeout(function() {
              initialCSS.offsetWidth = $elem[0].offsetWidth;
            }, 0);
            $body.addClass(bodyClass);
            $elem.removeClass(unstickyClass);
            $elem.removeClass(bottomClass);
            $elem.addClass(stickyClass);

            createPlaceholder();

            $elem
              .css('z-index', '10')
              .css('width', $elem[0].offsetWidth + 'px')
              .css('position', 'fixed')
              .css('left', $elem.css('left').replace('px', '') + 'px')
              .css(anchor, (offset + elementsOffsetFromTop (scrollbar)) + 'px')
              .css('margin-top', 0);

            if (anchor === 'bottom') {
              $elem.css('margin-bottom', 0);
            }
          }

          /**
           * Clean up directive
           */
          var onDestroy = function() {
            scrollbarElement.off('scroll', checkIfShouldStick);
            windowElement.off('resize', $onResize);

            $onResize = null;

            $body.removeClass(bodyClass);

            if (placeholder) {
              placeholder.remove();
            }
          };

          /**
           * Updates on resize.
           */
          function onResize() {
            unStickElement (anchor);
            checkIfShouldStick();
          }

          /**
           * Triggered on load / digest cycle
           * return `0` if the DOM element is hidden
           */
          var onDigest = function() {
            if ($scope.disabled === true) {
              return unStickElement();
            }
            var offsetFromTop = elementsOffsetFromTop ($elem[0]);
            if (offsetFromTop === 0) {
              return offsetFromTop;
            }
            if (anchor === 'top') {
              return (originalOffset || offsetFromTop) - elementsOffsetFromTop (scrollbar) + scrollbarYPos();
            } else {
              return offsetFromTop - scrollbarHeight() + $elem[0].offsetHeight + scrollbarYPos();
            }
          };

          /**
           * Triggered on change
           */
          var onChange = function (newVal, oldVal) {

            /**
             * Indicate if the DOM element is showed, or not
             * @type {boolean}
             */
            var elemIsShowed = !!newVal;

            /**
             * Indicate if the DOM element was showed, or not
             * @type {boolean}
             */
            var elemWasHidden = !oldVal;
            var valChange = (newVal !== oldVal || typeof stickyLine === 'undefined');
            var notSticking = (!isSticking && !isBottomedOut());

            if (valChange && notSticking && newVal > 0 && elemIsShowed) {
              stickyLine = newVal - offset;
              //Update dimensions of sticky element when is showed
              if (elemIsShowed && elemWasHidden) {
                $scope.updateStickyContentUpdateDimensions($elem[0].offsetWidth, $elem[0].offsetHeight);
              }
              // IF the sticky is confined, we want to make sure the parent is relatively positioned,
              // otherwise it won't bottom out properly
              if (confine) {
                $elem.parent().css({
                  'position': 'relative'
                });
              }

              // Get Parent height, so we know when to bottom out for confined stickies
              var parent = $elem.parent()[0];

              // Offset parent height by the elements height, if we're not using a placeholder
              var parentHeight = parseInt (parent.offsetHeight) - (usePlaceholder ? 0 : $elem[0].offsetHeight);

              // and now lets ensure we adhere to the bottom margins
              // TODO: make this an attribute? Maybe like ignore-margin?
              var marginBottom = parseInt ($elem.css('margin-bottom').replace(/px;?/, '')) || 0;

              // specify the bottom out line for the sticky to unstick
              var elementsDistanceFromTop = elementsOffsetFromTop ($elem[0]);
              var parentsDistanceFromTop = elementsOffsetFromTop (parent)
              var scrollbarDistanceFromTop = elementsOffsetFromTop (scrollbar);

              var elementsDistanceFromScrollbarStart = elementsDistanceFromTop - scrollbarDistanceFromTop;
              var elementsDistanceFromBottom = parentsDistanceFromTop + parentHeight - elementsDistanceFromTop;

              stickyBottomLine = elementsDistanceFromScrollbarStart
                + elementsDistanceFromBottom
                - $elem[0].offsetHeight
                - marginBottom
                - offset
                + +scrollbarYPos();

              checkIfShouldStick();
            }
          };

          /**
           * Helper Functions
           */

          /**
           * Create a placeholder
           */
          function createPlaceholder() {
            if (usePlaceholder) {
              // Remove the previous placeholder
              if (placeholder) {
                placeholder.remove();
              }

              placeholder = angular.element('<div>');
              var elementsHeight = $elem[0].offsetHeight;
              var computedStyle = $elem[0].currentStyle || window.getComputedStyle($elem[0]);
              elementsHeight += parseInt(computedStyle.marginTop, 10);
              elementsHeight += parseInt(computedStyle.marginBottom, 10);
              elementsHeight += parseInt(computedStyle.borderTopWidth, 10);
              elementsHeight += parseInt(computedStyle.borderBottomWidth, 10);
              placeholder.css('height', $elem[0].offsetHeight + 'px');

              $elem.after(placeholder);
            }
          }


          /**
           * Are we bottomed out of the parent element?
           */
          function isBottomedOut() {
            if (confine && scrollbarYPos() > stickyBottomLine) {
              return true;
            }

            return false;
          }

          /**
           * Fetch top offset of element
           */
          function elementsOffsetFromTop(element) {
            var offset = 0;

            if (element.getBoundingClientRect) {
              offset = element.getBoundingClientRect().top;
            }

            return offset;
          }

          /**
           * Retrieves top scroll distance
           */
          function scrollbarYPos() {
            var position;

            if (typeof scrollbar.scrollTop !== 'undefined') {
              position = scrollbar.scrollTop;
            } else if (typeof scrollbar.pageYOffset !== 'undefined') {
              position = scrollbar.pageYOffset;
            } else {
              position = document.documentElement.scrollTop;
            }

            return position;
          }

          /**
           * Determine scrollbar's height
           */
          function scrollbarHeight() {
            var height;

            if (scrollbarElement[0] instanceof HTMLElement) {
              // isn't bounding client rect cleaner than insane regex mess?
              height = $window.getComputedStyle(scrollbarElement[0], null)
                  .getPropertyValue('height')
                  .replace(/px;?/, '');
            } else {
              height = $window.innerHeight;
            }

            return parseInt (height) || 0;
          }

          /**
           * Checks if the media matches
           */
          function mediaQueryMatches() {
            var mediaQuery = $attrs.mediaQuery || false;
            var matchMedia = $window.matchMedia;

            return mediaQuery && !(matchMedia ('(' + mediaQuery + ')').matches || matchMedia (mediaQuery).matches);
          }

          /**
           * Get more accurate CSS values
           */
          function getCSS($el, prop){
            var el = $el[0],
                computed = window.getComputedStyle(el),
                prevDisplay = computed.display,
                val;

            // hide the element so that we can get original css
            // values instead of computed values
            el.style.display = "none";

            // NOTE - computed style declaration object is a reference
            // to the element's CSSStyleDeclaration, so it will always
            // reflect the current style of the element
            val = computed[prop];

            // restore previous display value
            el.style.display = prevDisplay;

            return val;
          }

          // public accessors for the controller to hitch into. Helps with external API access
          $scope.getElement = function() { return $elem; };
          $scope.getScrollbar = function() { return scrollbar; };
          $scope.getInitialCSS = function() { return initialCSS; };
          $scope.getAnchor = function() { return anchor; };
          $scope.isSticking = function() { return isSticking; };
          $scope.getOriginalInitialCSS = function() { return originalInitialCSS; };
          // pass through aliases
          $scope.processUnStickElement = function(anchor) { unStickElement(anchor)};
          $scope.processCheckIfShouldStick =function() { checkIfShouldStick(); };

          /**
           * set the dimensions for the defaults of the content block occupied by the sticky element
           */
          $scope.getInitialDimensions = function() {
            return {
              zIndex: $elem.css('z-index'),
              top: $elem.css('top'),
              position: initialPosition, // revert to true initial state
              marginTop: $elem.css('margin-top'),
              marginBottom: $elem.css('margin-bottom'),
              cssLeft: getCSS($elem, 'left'),
              width: $elem[0].offsetWidth,
              height: $elem.css('height')
            };
          };

          /**
           * only change content box dimensions
           */
          $scope.updateStickyContentUpdateDimensions = function(width, height) {
            if (width && height) {
              initSticky();
              initialCSS.width = width + 'px';
              initialCSS.height = height + 'px';
            }
          };

          // ----------- configuration -----------

          $timeout(function() {
            originalInitialCSS = $scope.getInitialDimensions(); // preserve a copy
            // Init the directive
            initSticky();
          },0);
        },

        /**
         * +++++++++ public APIs+++++++++++++
         */
        controller: ['$scope', '$window', function($scope, $window) {

          /**
           * integration method allows for an outside client to reset the pinned state back to unpinned.
           * Useful for when refreshing the scrollable DIV content completely
           * if newWidth and newHeight integer values are not supplied then function will make a best guess
           */
          this.resetLayout = function(newWidth, newHeight) {

            var scrollbar = $scope.getScrollbar(),
                initialCSS = $scope.getInitialCSS(),
                anchor = $scope.getAnchor();

            function _resetScrollPosition() {

              // reset means content is scrolled to anchor position
              if (anchor === 'top') {
                // window based scroller
                if (scrollbar === $window) {
                  $window.scrollTo(0, 0);
                  // DIV based sticky scroller
                } else {
                  if (scrollbar.scrollTop > 0) {
                    scrollbar.scrollTop = 0;
                  }
                }
              }
              // todo: need bottom use case
            }

            // only if pinned, force unpinning, otherwise height is inadvertently reset to 0
            if ($scope.isSticking()) {
              $scope.processUnStickElement (anchor);
              $scope.processCheckIfShouldStick();
            }
            // remove layout-affecting attribures that were modified by this sticky
            $scope.getElement().css({ 'width': '', 'height': '', 'position': '', 'top': '', zIndex: '' });
            // model resets
            initialCSS.position = $scope.getOriginalInitialCSS().position; // revert to original state
            delete initialCSS.offsetWidth; // stickElement affected

            // use this directive element's as default, if no measurements passed in
            if (newWidth === undefined && newHeight === undefined) {
              var e_bcr = $scope.getElement()[0].getBoundingClientRect();
              newWidth = e_bcr.width;
              newHeight = e_bcr.height;
            }

            // update model with new dimensions (if supplied from client's own measurement)
            $scope.updateStickyContentUpdateDimensions(newWidth, newHeight); // update layout dimensions only

            _resetScrollPosition();
          };

          /**
           * return a reference to the scrolling element (window or DIV with overflow)
           */
          this.getScrollbar = function() {
            return $scope.getScrollbar();
          };
        }]
      };
    }]
 );