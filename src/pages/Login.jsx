import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AccountServices from '../services/account-service';
import Home from './Home';
import './login.css';
import ReactLoading from 'react-loading';

const Login = ({ getEmailFromLogin, getProfilFromLogin }) => {

    const history = useNavigate();

    const [msgError, setMsgError] = useState('');
    const [isToCreateAccount, setIsToCreateAccount] = useState(false); // true = page Create Account
    const [isLoading, setIsLoading] = useState(false); // true === loading


    const handleConnect = async () => {
        const email = document.querySelector('.emailInput').value
        const password = document.querySelector('.passwordInput').value

        const account = {
            email: email,
            password: password
        }

        const connected = await AccountServices.login(account).then(
            setIsLoading(true)
        )
        console.log(connected[0])

        if(connected[0] === "true") {
            // userFromLogin(email)
            // loginToLogoutFromLogin(true)
            getProfilFromLogin(connected)
            getEmailFromLogin(email.split("@")[0])
            history('/');
            setIsLoading(false)
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
        setIsLoading(false)
    }

    return(
        <div>
             <div className='backgroundLogin'>
                <div className='ctnLoginComponent'>
                    <h1 className='LoginTitle'>Login</h1>
                    <input onChange={handleChangeError} onClick={handleChangeError} className='emailInput' type='text' placeholder='Email' />
                    <input onChange={handleChangeError} onClick={handleChangeError} className='passwordInput' type='password' placeholder='Password' />
                    <button onClick={handleConnect} className='loginBtn'>LOGIN</button>
                    {msgError.length === 0 ? (
                        <>
                            {isLoading ? (
                                <>
                                    <ReactLoading type={"bars"} color={"#000000"} height={'20%'} width={'20%'} />
                                </>
                            ) : (
                                <>
            
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <span style={{ color: 'red'}}>{msgError}</span>
                        </>
                    )} 
                    
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