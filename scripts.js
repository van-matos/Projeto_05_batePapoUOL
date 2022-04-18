let usuario, statusUsuario, nomeUsuario = {}, messageUpdates = [];

getMessages()

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

    console.log("Atualizando");
}