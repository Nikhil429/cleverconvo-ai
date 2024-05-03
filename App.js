import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/ui.jpg';
import gptImgLogo from './assets/chatgptLogo.svg';
import {useRef,useEffect,useState} from 'react';
import {sendMsgToOpenAI} from './openai';

function App() {
  const msgEnd = useRef(null);
  const [input, setInput]= useState('');
  const[messages, setMessages] = useState([
    {
    text: "Hi I am CleverConvo, a state-of-the-art language model developed by OpenAI. Im designed to understand and generate human-like text based on the input I receive. You can ask me questions, have conversations, seak information, or even request assistance with various tasks. just let me know how i can help you.",
    isBot: true,
    }
]);

useEffect(()=> { 
  msgEnd.current.scrollIntoView({behaviour:'smooth'});
},[messages]);

const handleSend = async() => {
  const text = input;
  setInput('');
  await setMessages([
    ...messages,
    {text, isBot: false}
  ]);
  const res = await sendMsgToOpenAI(text);
  await setMessages([
    ...messages,
    {text, isBot: false},
    {text: res, isBot: true}
]);
}

  

  const handleEnter = async (e)=> {
    if(e.key ==='Enter') await handleSend();
  }
  const handleQuery = async (e)=>{
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false}
    ]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
    {text, isBot: false},
    {text: res, isBot: true}
]);

  }
  
  
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="logo" className="logo"/><span className="brand">CleverConvo</span></div>
          <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="New Chat" className="addBtn"/>New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt="query" />What is Programming ?</button>
            <button className="query" OnClick={handleQuery} value={"How to use an API ?"}><img src={msgIcon} alt="query" />How to use an API ?</button>
          </div>

        </div>
        <div className="lowerSide">
          <div className="listItems" ><img src={home} alt="Home" className="listitemsImg" />Home</div>
          <div className="listItems" ><img src={saved} alt="Saved" className="listitemsImg" />Chat History</div>
          <div className="listItems" ><img src={rocket} alt="Upgrade" className="listitemsImg" />Upgrade to Pro</div>
        </div>
        

      </div>
      <div className="main">
        <div className="chats">
    
          {messages.map((message, i) =>
            <div key={i} className={message.isBot?"chat bot":"chat"}>
            <img className ='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{ message.text}</p>
          </div>
          )}
          <div ref={msgEnd}/>
          </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder='Type your message here...' value={input} onKeyDown ={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send"/></button>
          </div>
          <p>CleverConvo may produce inaccurate information about people, places, or facts. CleverConvo Febraury 9 Version. </p>
        </div>
      </div>
      
    </div>
  );
}

export default App;
