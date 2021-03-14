"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/streaminghub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on("ReceiveMessage", function (user, message) {
    if (user == null) user = "anonymous";
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var name = user.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var li = document.createElement("li");
    li.textContent = msg + " - " + name;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    var li = document.createElement("li");
    li.textContent = "Connetado!";
    document.getElementById("messagesList").appendChild(li);
}).catch(function (err) {
    return console.error(err.toString());
});

document.querySelector("#btnSend").addEventListener('click', function () {
    const message = document.querySelector('#tMessage').value;
    connection.invoke("SendMessage", message);
    document.querySelector('#tMessage').value = "";
}, false)
