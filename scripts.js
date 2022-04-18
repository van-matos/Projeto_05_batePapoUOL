let user, userName = {}, userStatus, messageUpdates = [], messagePackage = {};

login()
setInterval(getMessages, 3000)
getMessages()

function login(){
    user = prompt("Insira seu nome de usuário.");

    userName = {
        name: user
    };

    let nameRequest = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userName);
    nameRequest.then(nameSuccess);
    nameRequest.catch(nameFailure);

    setInterval(checkStatus, 5000);
}

function nameSuccess(success){
    let statusCode = success.status;
    console.log(statusCode);
    console.log("Nome recebido com sucesso!");
    console.log(userName)
}

function nameFailure(error){
    login()
}

function checkStatus(){
    userStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userName);
    userStatus.catch(userOffline);
}

function userOffline(error){
    login()
}

function getMessages()   {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(loadMessages);
}

function loadMessages(messages)   {
    messageUpdates = messages.data;
    const messageList = document.querySelector(".message_list");
    messageList.innerHTML = "";
  
    for (let i = 0; i < messageUpdates.length; i++) {
      if(messageUpdates[i].type === "status"){
          messageList.innerHTML += `<li class="status">(${messageUpdates[i].time}) ${messageUpdates[i].from} ${messageUpdates[i].text}</li>`;
      }
      else if(messageUpdates[i].type === "message"){
        messageList.innerHTML += `<li class="message">(${messageUpdates[i].time}) ${messageUpdates[i].from} para ${messageUpdates[i].to}: ${messageUpdates[i].text}</li>`;
      }
      else if(messageUpdates[i].type === "private"){
        messageList.innerHTML += `<li class="private">(${messageUpdates[i].time}) ${messageUpdates[i].from} ${messageUpdates[i].text}</li>`;
      }
    }
    const lastMessage = messageList.lastElementChild;
    lastMessage.scrollIntoView()
    console.log("Atualizado")
}

function sendMessage(){
    let messageText = document.querySelector("textarea").value;
    console.log(messageText);
    messagePackage = {
        from: user,
        to: "Todos",
        text: messageText,
        type: "message"
    };
    let sentMessage = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", messagePackage);
    sentMessage.then(messageSuccess);
    sentMessage.catch(messageFailure);
    document.querySelector("textarea").value = "";
}

function messageSuccess(){
    console.log("did this work?");
    console.log(messagePackage);
    getMessages()
}

function messageFailure(){
    window.location.reload()
}