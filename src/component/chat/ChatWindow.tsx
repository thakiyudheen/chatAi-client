
import React, { useState, useEffect, useRef, useContext } from 'react';
import { toast } from 'sonner'
import { IoIosSend } from "react-icons/io";
import DOMPurify from 'dompurify';
import { HiOutlineChatAlt } from "react-icons/hi";
import { SocketProvider, useSocket } from '../../context/socketProvider';
import convertToHTML from '../../utils/convertTohtml';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'boat';
  timestamp: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState<boolean>(false)
  const messagesEndRef: any = useRef(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const { socket } = useSocket()


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    socket?.on('response', (response) => {
      console.log('%%%%%%%%%%%%%%%%%%');
      if (response !== 'error') {
        setLoading(false)
        console.log(response);
        const boatMessage: Message = {
          id: Date.now(),
          text: response,
          sender: 'boat',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prevMessages) => [...prevMessages, boatMessage]);
      } else {
        toast.error('Network Error..!')
      }

    })

  }, [socket])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const sendMessage = async (message?: string) => {

    const messageToSend = message ? message : inputText;
    console.log(messageToSend);
    if (messageToSend?.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: messageToSend,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
      const data = {
        contents: [
          {
            role: 'user',
            parts: [{ text: messageToSend }]
          }
        ]
      };
      setLoading(true)
      socket?.emit('sendMessage', data)
    } else {
      toast.info('Please type somthing ...!')
    }
  };

  const questions = [
    { message: 'What is node js ?' },
    { message: 'What is React js ?' },
    { message: 'How to manage state ?' },
    { message: 'What is mongo indexing?' },
  ]

  return (
    <div className="flex md:flex-row flex-col justify-between font-Poppins p-8 bg-black">
      <div className=" md:w-1/4 flex-col justify-center w-full bg-gray-950 m-2 rounded-lg px-3">
        <h1 className='font-bold text-[3vh]  md:text-[5vh] md:text-center m-2  text-purple-700'><span className='text-gray-500'>Chat with</span> AI</h1>
        {questions.map((el, index) =>
          <button
            key={index}
            className={`w-full  hidden md:block text-left px-3 border rounded-lg text-gray-400 py-3 mt-2 bg-gray-900 text-sm
             ${selectedButton === index ? 'border-purple-700' : 'border-transparent'}`}
            onClick={() => { setSelectedButton(index); sendMessage(el.message) }}
          >
            {el.message}
          </button>
        )}



      </div>
      <div className="flex flex-col md:w-full w-full h-[88vh] md:h-[90vh]  bg-black  custom-scrollbar">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 items-end">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 flex flex-col items-center justify-center md:h-[60vh] h-[40vh]">
              <HiOutlineChatAlt className='text-[7vh] text-purple-400' />
              <small>Send your first message to start the conversation!</small>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end ' : 'justify-start text-start'} `}
              >
                <div
                  className={`max-w-lg px-4  ${message.sender === 'user'
                    ? 'bg-gradient-to-r py-2 from-purple-600 to-purple-700 text-white rounded-l-full rounded-tr-full'
                    : `${!loading ? 'py-3 bg-gray-800 text-gray-100  rounded-r-lg rounded-bl-lg  w-full' : 'py-3 bg-gray-800 text-gray-200 rounded-r-lg rounded-bl-lg rounded-tl-sm  w-full'}`
                    }`}
                >
                  {message.sender === 'user' ? <small>{message.text}</small> : <small className='space-y-2'
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(convertToHTML(message.text)),
                    }}
                  />}


                  <div ref={messagesEndRef} />

                </div>


              </div>
            ))

          )}
          {loading && (
            <div className="flex justify-start text-start">
              <div className="max-w-lg px-4 py-2  text-black rounded-lg w-full">
                <div className="spinner border-t-[2px] border-b-[2px] border-purple-500 rounded-full w-4 h-4 animate-spin"></div>
              </div>
            </div>
          )}

        </div>
        <div className="bg-black flex py-4 rounded-lg">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type here..."
            className="flex-1 text-white rounded-full w-3/4 border text-sm  border-purple-700 px-4 py-2 focus:outline-none   bg-gray-950"
          />
          <button
            onClick={() => sendMessage()}
            className="ml-5 bg-purple-800 w-1/4  text-white rounded-full py-2 px-1 text-lg hover:bg-purple-700 focus:outline-none border-purple-700 focus:ring-2 focus:ring-purple-500"
          >
            <small className='flex justify-center items-center'>send <IoIosSend /></small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
