import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom'

import { login } from '../../store/Auth/ActionCreators';
import { showMessages } from '../../store/Error/ErrorSlice';

import s from './Auth.module.css';

function Login() {
    const dispatch = useDispatch();

    const { isAuth, errors } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (errors.length !== 0) {
            dispatch(showMessages(errors));
        }
    }, [errors]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
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
