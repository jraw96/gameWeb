// /public/app.js

// Declare the angular ap. 
var gameWeb = angular.module('gameWeb', [])

function mainController($scope, $http){ // The $scope variable is the glue between the controller and the view. 
    $scope.formData = {} // Form data will be used to take input from the user in the front end

    //When landing on the page for the first time, get all the game titles:
    $http.get('/api/titles').success(function(data){
        $scope.titles = data   // Put the titles from the 'data' obect into the scope variable. 
        console.log(data)
    }).error(function(data){
        console.log('Error: ' + data)
    })

   // Create a new title, by adding it to the scope variable. The input field is used here. 
   $scope.createTitle = function(){
       console.log("Creating a new title")
       $http.post('/api/titles', $scope.formData).success(function(data){
            $scope.titles = data 
            $scope.formData = data // Now the scope will all the previous titles, AND the new title just added. 
            $scope.formData = {} // Clear input field after a successful request
            console.log(data)
       }).error(function(data){
           console.log('Error:' + data)
       })
   }

   //Create new my five list
   console.log("Creating a new list")
   $scope.createList = function(){
       $http.post('/api/list').success(function(data){
           $scope.listTitle = data.listTitle
           $scope.listEntries = data.listEntries
           console.log("Here is data: " + data)
       }).error(function(err){
           console.log(err)
       })
   }

   $scope.deleteTitle = function(id){ // The delete button will use a checkbox to mark titles to be deleted. 
       $http.delete('/api/titles/' + id).success(function(data){
           $scope.titles = data // Update the list of game titles, with the recently deleted title no longer there. 
           console.log('data')
       }).error(function(data){
           console.log('Error:' + err)
       })
   }

}