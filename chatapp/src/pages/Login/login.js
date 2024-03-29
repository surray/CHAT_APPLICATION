import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './login.css'

const Login = ()=> {
    const [user,setUser]=useState("");
    const [room, setRoom]=useState("");
    return(

        <div className="col-md-6 offset-md-2 bg">
        <div className="row">
            <div className="span12">
                <form className="form-horizontal"  autoComplete='off'>
                    
                        <div id="legend">
                            <legend >Login to enter the room</legend>
                        </div>
                        <div className="control-group">
                            <div className="controls">
                                
                                <input 
                                onChange ={(e)=>setUser(e.target.value)}
                                type="text"  placeholder="UserName" className="input-xlarge" />
                            </div>
                        </div>
                        <div className="control-group">
                            <div className="controls">
                                <input 
                                onChange ={(e)=>setRoom(e.target.value)}
                                type="text"placeholder="RoomName" className="input-xlarge" />
                            </div>
                        </div>
                        <div className="controls">
                                <Link onClick={(e)=>(!user || !room) ? e.preventDefault():null} 
                                to={`/chat?name=${user}&room=${room}`}>
                                <button type='submit' className="btn btn-success">Login</button>
                                </Link>
                            </div>
                            
                        
                    
                </form>
            </div>
        </div>
    </div>

       
    ) 
}

export default Login;