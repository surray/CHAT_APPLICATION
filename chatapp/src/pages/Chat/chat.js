import React, { useEffect,useState } from 'react'
import io from 'socket.io-client';
import './chat.css'

let socket;

const Chat = () => {
    const backEndUrl = "https://chattingapp2022.herokuapp.com/"
    

    
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


    }, [])

    useEffect(()=>{
    socket.on('message',msg=>{
        setMessages(prevMessages =>[...prevMessages,msg])

        setTimeout(() => {

            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight - div.clientWidth;
        }, 100)
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
        div.scrollTop = div.scrollHeight - div.clientWidth;
    }, 100)
          

    }
    return (
    <div className="container mt-4">
    <div className="row chat-window " id="chat_window_1">
        <div className="col-xs-4 col-md-4">

            <p>Active Users</p>
        	<ul>
                {
                    activeUser.map(each => (
                    <li>{JSON.stringify(each.name)}</li>
                    ))
                }
            </ul>
        </div>

        <div className="col-xs-8 col-md-8">
            <div className="panel panel-default">
                <div className="panel-heading top-bar">
                    <div className="col-md-12 col-xs-8">
                        <h3 className="panel-title"><span className="glyphicon glyphicon-comment"></span>{room}</h3>
                    </div>
                </div>
                <div className="panel-body msg_container_base" id="chat_body">
                    {
                        messages.map((msg,idx)=>(
                            msg.user==user?.toLowerCase()?<>
                            <div key={idx} className="row msg_container base_receive">
                                <div  className="col-xs-10 col-md-10">
                                    <div className="messages msg_receive">
                                        <p>{msg.text}</p>
                                        <time>{msg.user}</time>
                                    </div>
                                </div>
                            </div>
                            </>:<>
                            
                            <div key={idx} className="row msg_container base_sent">
                                <div  className="col-xs-10 col-md-10">
                                    <div className="messages msg_sent">
                                        <p>{msg.text}</p>
                                        <time>{msg.user}</time>
                                    </div>
                                </div>
                             </div>    
                            
                            </>
                        ))
                    }
                </div>
        </div>
        <div className="panel-footer">
            <div className="input-group">
                <input id="btn-input" type="text" 
                  value={msg}
                  onKeyPress={(e)=> e.key==="Enter"? sendMessage(e) : null}
                  onChange={(e)=>setMsg(e.target.value)}
                  className="form-control input-sm chat_input" placeholder="Write your message here..."/>
            </div>
        </div>
    		</div>
        </div>
    </div>
      
    )
}




export default Chat;




