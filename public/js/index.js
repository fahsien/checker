angular.module('index', [])
    .controller('indexController', function($scope, $http) {
        $scope.result=function(){
            $http({   
                method: 'GET',   
                url: 'voteResult'  
            }).success(function(data) {
                   
                $scope.votes=data.votes;
                
                 
            }).error(function(data) {   
                
            }); 
        }  
        $scope.companies=[
            {label:'GOOGLE/谷歌',name:'google'},{label:'Asus/華碩',name:'asus'},{label:'Acer/宏碁',name:'acer'},{label:'Line',name:'line'},{label:'HTC/宏達電',name:'htc'},{label:'BCG Taiwan',name:'bcgtaiwan'},{label:'Gucci/古馳',name:'gucci'},{label:'Citibank/花旗銀行',name:'citibank'},
            {label:'HSBC/匯豐銀行',name:'hsbc'},{label:'Chanel/香奈兒',name:'chanel'},{label:'McKinsey&Company/麥肯錫',name:'mckinseycompany'},{label:'MUJI/無印良品',name:'muji'},{label:'Unilever/聯合利華',name:'unilever'},{label:'Ogilvy&Mather/奧美',name:'ogilvymather'},{label:'Gogoro',name:'gogoro'},{label:'KKBOX',name:'kkbox'},{label:'eslite/誠品',name:'eslite'}
        ]
});