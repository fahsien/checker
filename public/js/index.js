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

        $scope.jobs=[
            {label:'資訊科技',name:'it'},{label:'傳產製造',name:'tradition'},{label:'商業服務',name:'business'},{label:'民生服務',name:'services'},{label:'文創教育',name:'culture'},{label:'新創產業',name:'startup'}
        ]

        $scope.companies=[
            {label:'GOOGLE/谷歌',name:'google'},{label:'Asus/華碩',name:'asus'},{label:'Acer/宏碁',name:'acer'},{label:'Line',name:'line'},{label:'HTC/宏達電',name:'htc'},{label:'BCG Taiwan',name:'bcgtaiwan'},{label:'Gucci/古馳',name:'gucci'},{label:'Citibank/花旗銀行',name:'citibank'},
            {label:'HSBC/匯豐銀行',name:'hsbc'},{label:'Chanel/香奈兒',name:'chanel'},{label:'McKinsey&Company/麥肯錫',name:'mckinseycompany'},{label:'MUJI/無印良品',name:'muji'},{label:'Unilever/聯合利華',name:'unilever'},{label:'Ogilvy&Mather/奧美',name:'ogilvymather'},{label:'Gogoro',name:'gogoro'},{label:'KKBOX',name:'kkbox'},{label:'eslite/誠品',name:'eslite'}
        ]

        // checkbox limit
        $scope.checked = 0;
        $scope.limit = 5;
        $scope.checkChanged = function(item){
        if(item.winner) $scope.checked++;
        else $scope.checked--;
}

    
});