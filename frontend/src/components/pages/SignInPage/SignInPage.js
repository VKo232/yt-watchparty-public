import './SignInPage.scss';
import React, { useEffect, useState } from "react";
import {
    Button,
    TextField,
} from "@mui/material";
import { useHistory } from 'react-router-dom';
import * as UserAPI from 'api/user';
import * as authAPI from 'auth/auth_utils.js';

export default function SignInPage() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('');

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            setTheme(localStorage.getItem('theme'));
        }
        document.addEventListener('themeChange', () => {
            setTheme(localStorage.getItem('theme'));
        });
    }, []);

    let timeoutMsg;
    const signIn = (e) => {
        e.preventDefault();
        UserAPI.signIn(username, password, (err, res) => {
            if (err && err.message === 'Authentication failed') {
                document.getElementById('invalid-cred-warning').style.display = 'block';
                clearTimeout(timeoutMsg);
                timeoutMsg = setTimeout(() => {
                    document.getElementById('invalid-cred-warning').style.display = 'none';
                }, 4000);
            }
            if (!err) {
                if (!res.token) {
                    document.getElementById('invalid-cred-warning').style.display = 'block';
                    clearTimeout(timeoutMsg);
                    timeoutMsg = setTimeout(() => {
                        document.getElementById('invalid-cred-warning').style.display = 'none';
                    }, 4000);
                } else {
                    setUsername('');
                    setPassword('');
                    authAPI.signIn(res.username);
                    history.replace('');
                }
            }
        });
    }

    const toSignUp = () => {
        history.replace('sign-up');
    }

    return (
        <div className="sign-in-page">
            <div className={theme === 'dark' ? 'sign-in-box box-common-dark' : 'sign-in-box'}>
                <div className='header1'>
                    Sign In
                </div>
                <form id='form' onSubmit={(e)=>signIn(e)}>
                <TextField
                    className={theme === 'dark' ? 'textfield textfield-dark' : 'textfield'}
                    size='small'
                    label='Username'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                />
                <TextField
                    className={theme === 'dark' ? 'textfield textfield-dark' : 'textfield'}
                    size='small'
                    label='Password'
                    value={password}
                    type='password'
                    inputProps={{ minLength: 8 }}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />
                <div className='sign-up-message'>
                    <span>Not registered yet? </span>
                    <span className='sign-up-btn' onClick={()=>toSignUp()}>Sign up</span>
                </div>
                <div
                    id='invalid-cred-warning'
                    style={{display:'none', color:'red'}}
                >
                   Invalid username or password!
                </div>
                <Button type='submit' className='btn' variant='outlined' size='small'>sign in</Button>
                </form>
            </div>
        </div>
    )
}