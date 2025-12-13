import {useState} from 'react';
import './LoginForm.css';

export function LoginForm(){
    const[showPassword,setShowPassword]=useState(false);

    function changeShowStatus(){
        setShowPassword(!showPassword);
    }

    return(
        <>
        <div >
            <input 
            className="inputBox" 
            placeholder="Email" />
        </div>
        <div >
            <input 
            className="inputBox" 
            placeholder="Password" 
            type= {showPassword?"text":"password"} 
            />
            <button onClick={changeShowStatus}>{showPassword?"Hide":"Show"}</button>
        </div>
        <button className="button">Login</button>
        <button className="button">Sign up</button>
        </>
    );
}