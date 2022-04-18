let user, userName, userStatus, messageUpdates = [];

login()
getMessages()

function login(){
    user = prompt("Insira seu nome de usuário.");

    userName = {
        name: user
    };

    let nameRequest = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", userName);
    nameRequest.catch(nameFailure);

    setInterval(checkStatus, 5000);
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
    setInterval(renderMessages, 3000);
}

function renderMessages() {
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
}