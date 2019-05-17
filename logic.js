function initializeFireBase() {

  console.log("in InitializeFireBase()")

  src = "https://www.gstatic.com/firebasejs/5.9.4/firebase.js"

  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyBob8AFdGDf_bseduqdM22BMB9f3qqNrZw",
    authDomain: "traintime-899d4.firebaseapp.com",
    databaseURL: "https://traintime-899d4.firebaseio.com",
    projectId: "traintime-899d4",
    storageBucket: "traintime-899d4.appspot.com",
    messagingSenderId: "1035112069710"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainID = "amtrak"

  // // Write data to firebase database
  // database.ref('trains/' + trainID).set({

  //   username: "name",
  //   email: "email",
  //   profile_picture : "imageUrl"
  // });

  database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
 }, function (error) {
    console.log("Error: " + error.code);
 });

  // Read data from firebase database

}

function getTrainData() {
  $("#addTrainBtn").val("Button was clicked");
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  //var firstTrain = moment(, "HH:mm").subtract(10, "years").format("X");
  var firstTrain = $("#firstTrainInput").val().trim()
  var frequency = $("#frequencyInput").val().trim();
  var minutesAway = "thisIsMinutesAway"
  var nextArrival = "nextArrivalTimeString"

  console.log(trainName)
  console.log(destination)
  console.log(firstTrain)
  console.log(frequency)

  // Get current time and convert it to a moment object
  var today = new Date();
  var currentTime = today.getHours() + ":" + today.getMinutes();
  var currentMoment = moment(currentTime, 'HH:mm')

  console.log("current time:" + currentTime)

  // Convert first train arrival time to a moment object
  var firstTrainMoment = moment(firstTrain, 'HH:mm')

  // Calculate the next train arrival time based on current time
  var nextArrivalTimeCalculated = calcNextArrival(currentMoment, firstTrainMoment, frequency);
  var nextArrivalTimeString = nextArrivalTimeCalculated.format("hh:mma");
  console.log("Next arrival time is " + nextArrivalTimeString)

  nextArrival = nextArrivalTimeString
  timeDifference = moment.duration(nextArrivalTimeCalculated.diff(currentMoment))
  minutesAway = timeDifference.asMinutes()
  console.log(minutesAway)

  // Add a row to the table about train schedules
  addTrainRow(trainName, destination, firstTrain, frequency, nextArrival, minutesAway)


}

function addTrainRow(trainName, destination, firstTrain, frequency, nextArrival, minutesAway) {
  console.log("inAddTrainRow")
  var trainNameRow = "<td>" + trainName + "</td>"
  var destinationRow = "<td>" + destination + "</td>"
  var firstTrainRow = "<td>" + firstTrain + "</td>"
  var frequencyRow = "<td>" + frequency + "</td>"
  var nextArrivalRow = "<td>" + nextArrival + "</td>"
  var minutesAwayRow = "<td>" + minutesAway + "</td>"

  $("#trainTable").append("<tr>" + trainNameRow + destinationRow + frequencyRow + nextArrivalRow + minutesAwayRow + "</tr>")



}

function calcNextArrival(currentMoment, firstTrainMoment, frequency) {

  if (currentMoment >= firstTrainMoment) {

    var possibleNextArrival = firstTrainMoment

    while (possibleNextArrival < currentMoment) {

      possibleNextArrival.add(frequency, "minutes")

    }
    return possibleNextArrival
  } else {
    return firstTrainMoment
  }



}