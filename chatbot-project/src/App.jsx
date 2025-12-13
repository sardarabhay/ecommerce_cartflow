import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css'
// import dayjs from 'dayjs';
import { Chatbot } from 'supersimpledev';
  
function App(){
        const [chatMessages,setChatMessages]=useState(
          JSON.parse(localStorage.getItem('messages')) 
          || [
        /*{
          message:'hello chatbot',
          sender:'user',
          id:'id1',
          time:"9.30"
        },{
          message:'Hello! How can I help you?',
          sender:'robot',
          id:'id2',
          time:"9.30"
        },{
          message:'can you get me todays date?',
          sender:'user',
          id:'id3',
          time:"9.30"
        },{
          message:'Today is December 9',
          sender:'robot',
          id:'id4',
          time:"9.30"
        }*/]);
        // const [chatMessages,setChatMessages]=array;
        // const chatMessages=array[0];
        // const setChatMessages=array[1];
        useEffect(()=>{
          Chatbot.addResponses(
            {
              "Hi":"Hello",
              "Have sex with me":"Okay sweetheart"
            }
          )

        },[]);

        useEffect(()=>{
          localStorage.setItem('messages',JSON.stringify(chatMessages));

        },[chatMessages]);

        return (
          <div className="app-container">
            {chatMessages.length===0 ?(
              <p className="title">Welcome to chatbot project! Send a message using the textbox below</p>
            ):""}
            <ChatMessages
              chatMessages={chatMessages} 
            /> 
            <ChatInput 
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App
