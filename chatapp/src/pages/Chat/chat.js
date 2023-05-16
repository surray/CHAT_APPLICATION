import React, { useEffect,useState } from 'react'
import io from 'socket.io-client';
import './chat.css'
import profile from './profile.jpg';

let socket;

const Chat = () => {
    const backEndUrl = "https://chat-application-git-main-surray.vercel.app/"
    

    
    const [user,setUser]=useState("");
    const [room, setRoom]=useState("");
    const [activeUser, setActiveUser]=useState([]);
    const [msg, setMsg]=useState([]);
    const [messages, setMessages]=useState([]);
    useEffect(() => {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const name = params.get('name');
        const room = params.get('room');
        setUser(name)
        setRoom(room)

        socket = io(backEndUrl);
        socket.emit('join',{name:name,room:room},(error)=>{
            if(error)
            {
                alert(error)
            }
            })
         return()=>{
            socket.disconnect();
            socket.off();

         }


    }, [backEndUrl,window.location.search])

    useEffect(()=>{
    socket.on('message',msg=>{
        setMessages(prevMessages =>[...prevMessages,msg])

        setTimeout(() => {

            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight - div.clientWidth;
        }, 10)
      })

      socket.on('activeUsers',users =>{
          setActiveUser(users)
      })
 



    },[])

    const sendMessage=(e)=>{
        e.preventDefault();  
    socket.emit('sendMsg',msg,() =>setMsg(""))
    setTimeout(() => {

        var div = document.getElementById("chat_body");
        div.scrollTop = div.scrollHeight;
    }, 100)
          

    }
    return (
<div className="cul col-md-6 offset-md-2">
    <div className="row chat-window " id="chat_window_1">
       

        <div className="row">
            <div className="panel panel-default">
                <div className="panel-heading top-bar">
                    <div className="col-sm-1">
                        <img className="image" src={profile} alt='why'/>
                    </div>
                    
                    <div className="col-sm-5">
                        <h1 >{room}</h1>
                    </div>
                    <div className="col-sm-6">
                        <h3>Online users</h3>
                                <p>
                                    {
                                        activeUser.map(each => (
                                        <p><span className="material-symbols-rounded">
                                        fiber_manual_record
                                        </span>{JSON.stringify(each.name)}</p>
                                        ))
                                    }
                                </p>
                            </div>
                                </div>
                <div className="panel-body msg_container_base" id="chat_body">
                    {
                        messages.map((msg,idx)=>(
                            msg.user==user?.toLowerCase()?<>
                            <div key={idx} className="row msg_container base_receive">
                                <div  className="col-xs-6 col-md-6">
                                    <div className="messages r msg_sent">
                                        <p>{msg.text}<span class="material-symbols-outlined">done_all</span></p>
                                        <time>{msg.user}</time>
                                    </div>
                                </div>
                            </div>
                            </>:<>
                            
                            <div key={idx} className="row msg_container base_sent">
                                <div  className="col-xs-6 col-md-6">
                                    <div className="messages s msg_receive">
                                        <p>{msg.text}</p>
                                        <time>{msg.user}</time>
                                    </div>
                                </div>
                             </div>    
                            
                            </>
                        ))
                    }
                </div>
        
        <div className=" panel-footer">
            <div className="input-group">
                <input id="btn-input" type="text" 
                  value={msg}
                  onKeyPress={(e)=> e.key==="Enter"? sendMessage(e):null}
                  onChange={(e)=>setMsg(e.target.value)}
                  className="form-control input-sm chat_input" placeholder="Message"/>
            </div>
        </div>
    		</div>
        </div>
    </div>
    </div> 
      
    )
}




export default Chat;




