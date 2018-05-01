// Initialize Firebase
var config = {
    apiKey: "AIzaSyDneqf_TqGzhSycwcL4-fEkJd7JwVjI1BQ",
    authDomain: "traintime-c53cb.firebaseapp.com",
    databaseURL: "https://traintime-c53cb.firebaseio.com",
    projectId: "traintime-c53cb",
    storageBucket: "traintime-c53cb.appspot.com",
    messagingSenderId: "414816752700"
  };
    firebase.initializeApp(config);

var database = firebase.database();
$('#addTrainBtn').on("click", function() {
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
   var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    database.ref().push(newTrain);
  
   $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  // Prevents moving to new page
  return false;
});
database.ref().on("child_added", function(childSnapshot) {
 
 var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  var currentTime = moment().format("HH:mm");
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  var timeRemainder = timeDiff % frequency;
  var minToTrain = frequency - timeRemainder;
   var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});