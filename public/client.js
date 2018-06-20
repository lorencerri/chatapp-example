// Static Variables
var socket = io(); // Ignore this error
var username = false;

$(document).keyup(function (e) {
    console.log(e)
    // This will run whenever the enter button is pressed
    if ($("#message").is(":focus") && (e.keyCode == 13)) {
        
        // If the message is empty, return
        if ($("#message").val().length < 1) return;
        let val = $('#message').val();
        
        // If a username hasn't been selected yet, run the following
        if (!username) {
          username = val;
          socket.emit('setUsername', val); 
          announceJoin(val);
          return $('#message').attr("placeholder", "Message").val('');
        }
        
        // Send 'message' event to the server holding a data object
        socket.emit('message', { name: username, text: val });
        addMessage('You', val); // User side, add the message to the chat
        $("#message").val(''); // Reset the message field
      
    }
  
});

// Events
socket.on('message', function(data){
  addMessage(data.name, data.text)
})

socket.on('announceJoin', function(data) {
  announceJoin(data); 
})

// Functions

// This will run when a message is recieved
function addMessage(author, text) {
  
  // Create Row
  var row = $("<tr>");
  
  // Append Row
  row.append($(`<td><b>${author}:</b> ${text}</td>`));
  
  // Set row to table
  $("#chat tbody").append(row);
  
  // Update Scrolling
  updateScroll();
  
}

// This will announce a user is joining
function announceJoin(user) {
  
  // Create Row
  var row = $("<tr>");
  
  // Append Row
  row.append($(`<td><b>${user} </b> has joined.</td>`));
  
  // Set to chat table
  $("#chat tbody").append(row);
  
  // Update scrolling
  updateScroll();
  
}

// This will always keep the chat scrolled to the top
function updateScroll() {
  var element = document.getElementById("chatTable");
  element.scrollTop = element.scrollHeight;
}