import { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom'

import { loginAPI } from '../../api/api';
import AuthContext from '../../context/AuthContext';

import s from './auth.module.css';

function Login() {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const [wrongInput, setWrongInput] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(isAuth);

    const submit = async (e) => {
        e.preventDefault();
        await loginAPI(email, password)
            .then((res) => {
                setRedirect(true);
                setIsAuth(true);
            })
            .catch(e => { setWrongInput(true) });
    }

    if (redirect) {
        return <Navigate to='/' />
    }

    return (
        isAuth
            ? <Navigate to='/' />
            : <main className={s.login}>
                <form className={s.login_form} onSubmit={submit}>
                    <input value={email} placeholder='Почта' id="Email" type="email" className={s.form_input} onChange={e => setEmail(e.target.value)} />
                    <input value={password} placeholder='Пароль' id="Password" type="password" className={s.form_input} onChange={e => setPassword(e.target.value)} />
                    {wrongInput && <div className={s.error}>Неверный пароль или почта.</div>}
                    <div className={s.form_bottom}>
                        <button type='submit' className={s.auth_btn}>Войти</button>
                        <Link to='/register' className={s.form_bottom__link}>Нет аккаунта? Зарегестрироваться</Link>
                    </div>
                </form>
            </main>
    );
}

export default Login;
