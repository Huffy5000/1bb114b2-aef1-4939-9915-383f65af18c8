const chatbotOpenButton = document.getElementById("chatbot-closed-wrapper");
const chatbotOpenWindow = document.getElementById("chatbot-open-wrapper");
const chatbotCloseButton = document.querySelector('.chatbot-close-button');
const chatbotMessageForm = document.querySelector('.chatbot-message-form');
const messageInput = document.querySelector('.chatbot-message-input');
const chatbotBody = document.querySelector('.chatbot-body');
const chatbotStatus = document.querySelector('.chatbot-status')


function toggle_chatbot_visibility(){
    // Toggle visibility of chatbot window and chatbot button
    chatbotOpenButton.classList.toggle('hidden');
    chatbotOpenWindow.classList.toggle('hidden');

    
}

function create_message_element(query,from){
    // Create message HTML element to append to chatbot body
    const messageElement = document.createElement('div');
    const classArray = ['message']

    from === 'user' ? classArray.push('user'):classArray.push('bot');
    classArray.forEach((element)=>messageElement.classList.add(element));

    messageElement.innerHTML = `
                    <p>${query}</p>
                `
    return messageElement;
}

function extract_message(){
    // Extract message from html input 
    query = messageInput.value;
    messageInput.value = "";
    return String(query);
}

function send_error_message(message='Sorry, the service is currently down.'){
    var messageElement = create_message_element(message,'bot')
    messageElement.classList.add('error')
    chatbotBody.appendChild(messageElement)
}

function set_chatbot_offline(){
    // Disable input, change chatbot status to offline, error message
    send_error_message()
    messageInput.disabled = true
    chatbotStatus.innerHTML = "Offline"
}


chatbotOpenButton.addEventListener('click',toggle_chatbot_visibility);
chatbotCloseButton.addEventListener('click',toggle_chatbot_visibility);

chatbotMessageForm.addEventListener('submit',()=>{

    const query = extract_message();
    var messageElement = create_message_element(query,'user');
    chatbotBody.appendChild(messageElement);

    // Get data from api
    const formData = new FormData;
    formData.append('message',query);

    fetch('http://127.0.0.1:8000/chatbot/message/',{
        method:"POST",
        body:formData,
        
    })
    .then(response=>response.json())
    .then(json=>{
        return_message = json['response']
        return_message = return_message.replace('/n','')
        var messageElement = create_message_element(return_message,'bot')
        chatbotBody.appendChild(messageElement)
    })
    .catch(error=>{
        // Handle "Failed to fetch" error
        console.log(error)
        set_chatbot_offline()
    });


})
