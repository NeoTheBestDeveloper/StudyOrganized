import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom'
import { authAPI } from '../../api/Auth';
import authSlice from '../../store/Auth/AuthSlice';


import s from './Auth.module.css';

function Login() {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const [login] = authAPI.useLoginMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const { data, error } = await login({ email, password });
        if (data) {
            dispatch(authSlice.actions.authSuccess());
        } else {
            console.log(error);
        }
    }


    return (
        isAuth
            ? <Navigate to='/' />
            : <main className={s.login}>
                <form className={s.login_form} onSubmit={submit}>
                    <input value={email} placeholder='Почта' id="Email" type="email"
                        className={s.form_input} onChange={e => setEmail(e.target.value)} autoFocus required />
                    <input value={password} placeholder='Пароль' id="Password" type="password"
                        className={s.form_input} onChange={e => setPassword(e.target.value)} required />
                    <div className={s.form_bottom}>
                        <button type='submit' className={s.auth_btn}>Войти</button>
                        <Link to='/register' className={s.form_bottom__link}>Нет аккаунта? Зарегистрироваться</Link>
                    </div>
                </form>
            </main>
    );
}

export default Login;
