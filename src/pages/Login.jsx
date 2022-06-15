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

    const handleSubmitCreateAccount = () => {
        const userName = document.querySelector('.userNameInput').value
        const password = document.querySelector('.createPasswordInput').value
        const passwordConfirm = document.querySelector('.passwordConfirmInput').value
        const email = document.querySelector('.createEmailInput').value
        const battleTag = document.querySelector('.battleTagInput').value

        
        if(password !== passwordConfirm) {
            setMsgError('The email and password do not match !')
        } else if(userName === '' || password === '' || passwordConfirm === '' || email === '') {
            setMsgError("The fields need to be filled in")

        } else {
            
            const account = {
                userName: userName,
                password: password,
                email: email,
                battleTag: battleTag
            }
            // AccountService.createAccount(account);
            AccountServices.createAccount(account).then(data => {
                // let value = Object.values(data)
                if(data === undefined) {
                    setIsToCreateAccount(false)
                } else {
                    setMsgError("Email already used")
                }
            })
            
        }
        
    }

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
            {!isToCreateAccount ? (
                <>
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
                                            <ReactLoading type={"bars"} color={"#000000"} height={'15%'} width={'15%'} />
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
                </>
            ) : (   
                <div className='backgroundLogin'>
                    <div className='ctnCreateComponent'>
                        <h1 className='createTitle'>Create Account</h1>
                        <input className='createEmailInput' type='text' placeholder='Email' onChange={handleChangeError} onClick={handleChangeError} />
                        <input className='userNameInput' type='text' placeholder='Username' onChange={handleChangeError} onClick={handleChangeError} />
                        <input className='battleTagInput' type='text' placeholder='BattleTag' onChange={handleChangeError} onClick={handleChangeError} />
                        <input className='createPasswordInput' type='password' placeholder='Password' onChange={handleChangeError} onClick={handleChangeError} />
                        <input className='passwordConfirmInput' type='password' placeholder='Confirm Password' onChange={handleChangeError} onClick={handleChangeError} />
                        <button onClick={handleSubmitCreateAccount} className='loginBtn'>Create Account</button>
                        <span style={{ color: 'red', marginTop: '3%'}}>{msgError}</span>
                        <div className='ctnLoginToCreateAccount'>
                            <span className='textForCreateAccount'>Already a member ? <span onClick={handleToCreateAccount} className='linkToLogin'>Login</span></span>
                        </div>
                    </div>    
                </div>
                
            )}
            <Home />
        </div>
    )
}

export default Login;