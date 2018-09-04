
// Allows for access firebase database
var config = {
    apiKey: "AIzaSyAS25ARcoW0v--WGXBYSsGoCgUsSZhyFXU",
    authDomain: "train-8d044.firebaseapp.com",
    databaseURL: "https://train-8d044.firebaseio.com",
    projectId: "train-8d044",
    storageBucket: "",
    messagingSenderId: "740258507342"
};
firebase.initializeApp(config);
var database = firebase.database();
// Takes the values and moves into the database as well as to the page also pulls data from the database to the page
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var trainObj = {
        trainName,
        destination,
        firstTrain,
        frequency
    }
    console.log(trainObj);
    database.ref().push(trainObj);
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});
database.ref().on("child_added", function (snapshot) {
console.log(snapshot.val());
    var tName = snapshot.val().trainName;
    var tDestination = snapshot.val().destination;
    var tFirstTrain = snapshot.val().firstTrain;
    var tFrequency = snapshot.val().frequency;
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tArrival; 
    var tMinutes;

    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes")
    } else {
        var differenceTimes = moment().diff(trainTime, "minutes");
        var tReminder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tReminder;
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }

    // For the database as well as the inputted data
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
        tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});
