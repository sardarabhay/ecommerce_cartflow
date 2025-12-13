import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs'
import LoadingImage from '../assets/loading-spinner.gif' ;
import './ChatInput.css';

export function ChatInput({chatMessages,setChatMessages}){
        const [inputText,setInputText]=useState('');
        const[isLoading,setIsLoading]=useState(false);

        function saveInputText(event){
          setInputText(event.target.value);
        }

        async function sendMessage(){
          const timeStamp=dayjs().format("HH:mm");
          const text=inputText;
          setInputText('');
          const newChatMessages=[
            ...chatMessages,
            {
              message: text,
              sender:'user',
              id:crypto.randomUUID(),
              time:timeStamp
            }
          ];

          setChatMessages(newChatMessages);
          setIsLoading(true);

          let response=<img 
          className="loadingImage" 
          src={LoadingImage} 
          />;
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender:'robot',
              id:crypto.randomUUID()
            }
          ]);

          response= await Chatbot.getResponseAsync(text);
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender:'robot',
              id:crypto.randomUUID(),
              time:dayjs().format("HH:mm")
            }
          ]);
          setIsLoading(false);
         

        }

        function enterSendMessage(event){
          if(event.key=='Enter'){
            sendMessage();
          }else if(event.key=='Escape'){
            setInputText('');
          }
        }

        function clearChatMessages(){
          localStorage.removeItem('messages');
          setChatMessages([]);
        }

        return (
          <div className="chat-input-container">
            <input 
              placeholder="Send a message to Chatbot" 
              size="30" 
              onChange={saveInputText}
              value={inputText}
              onKeyDown={enterSendMessage}
              className="chat-input"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading|| !inputText} 
              className="send-button"
            >Send</button>
            <button 
              onClick={clearChatMessages}
              className="clear-button">Clear</button>
          </div>
        );
      }