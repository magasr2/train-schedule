// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDn1HdQLF72Y3d_Iv3xVgkRxKPVz1liAws",
    authDomain: "nd-project-f1a83.firebaseapp.com",
    databaseURL: "https://nd-project-f1a83.firebaseio.com",
    projectId: "nd-project-f1a83",
    storageBucket: "nd-project-f1a83.appspot.com",
    messagingSenderId: "217733847555"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var tName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var arrivalTime = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var frequent = $("#cost").val().trim();

  var newTrainArrival = {
    name: tName,
    destination: destination,
    start: arrivalTime,
    frequent: cost
  };

  database.ref().push(newTrainArrival);

  console.log(newTrainArrival.name);
  console.log(newTrainArrival.destination);
  console.log(newTrainArrival.start);
  console.log(newTrainArrival.frequent);



$("#train-name-input").val("");
$("#destination-input").val("");
$("#start-input").val("");
$("#cost").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().tName;
  var destination = childSnapshot.val().destination;
  var arrivalTime = childSnapshot.val().start;
  var frequent = childSnapshot.val().frequent;

  console.log(trainName);
  console.log(destination);
  console.log(arrivalTime);
  console.log(frequent);

  var empArrivalTime = moment.unix(arrivalTime).format('LTS');

  var empTime = moment().diff(moment.unix(arrivalTime, "X"), "months");
  console.log(empTime);

  // Calculate the total billed rate
  var empBilled = empTime * frequent;
  console.log(empBilled);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  empArrivalTime + "</td><td>" + frequent + "</td><td>" + empBilled + "</td></tr>");
});