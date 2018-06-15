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



    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
        tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});
