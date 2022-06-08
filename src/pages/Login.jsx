import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AccountServices from '../services/account-service';
import Home from './Home';
import './login.css';

const Login = () => {

    const history = useNavigate();

    const [msgError, setMsgError] = useState('');
    const [isToCreateAccount, setIsToCreateAccount] = useState(false)// true = page Create Account


    const handleConnect = async () => {
        const email = document.querySelector('.emailInput').value
        const password = document.querySelector('.passwordInput').value

        const account = {
            email: email,
            password: password
        }

        const connected = await AccountServices.login(account);
        console.log(connected)
        if(connected === true) {
            // userFromLogin(email)
            // loginToLogoutFromLogin(true)
            history('/');
        } else {
            // loginToLogoutFromLogin(false)
            setMsgError('🔐 Wrong email or password.');     
        }

        console.log(account)
    }

    const handleToCreateAccount = () => {
        if(isToCreateAccount) {
            setIsToCreateAccount(false)
        } else {
            setIsToCreateAccount(true)
        }
    }

    const handleChangeError = () => {
        setMsgError('')
    }

    return(
        <div>
             <div className='backgroundLogin'>
                <div className='ctnLoginComponent'>
                    <h1 className='LoginTitle'>Login</h1>
                    <input onChange={handleChangeError} onClick={handleChangeError} className='emailInput' type='text' placeholder='Email' />
                    <input onChange={handleChangeError} onClick={handleChangeError} className='passwordInput' type='password' placeholder='Password' />
                    <button onClick={handleConnect} className='loginBtn'>LOGIN</button>
                    <span style={{ color: 'red'}}>{msgError}</span>
                    <div className='ctnLoginToCreateAccount'>
                        <span className='textForCreateAccount'>Not a member ? <span onClick={handleToCreateAccount} className='linkToCreateAccount'>Create Account</span></span>
                    </div>
                </div>    
            </div>
            <Home />
        </div>
    )
}

export default Login;