import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { registerAPI } from '../../api/api';
import AuthContext from '../../context/AuthContext';

import s from './auth.module.css';

function Register() {
    const { isAuth } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);
    const [wrongValue, setWrongValue] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        await registerAPI(name, email, password)
            .then(res => setRedirect(true))
            .catch(e => setWrongValue(true));
    }


    if (redirect) {
        return <Navigate to='/login' />;
    }

    return (
        isAuth
            ? <Navigate to='/' />
            : <main className={s.register}>
                <form className={s.register_form} onSubmit={submit}>
                    <input value={name} placeholder='Имя' id="Name" type="username" className={s.form_input}
                        onChange={e => setName(e.target.value)} required autoFocus />
                    <input value={email} placeholder='Почта' id="Email" type="email" className={s.form_input}
                        onChange={e => setEmail(e.target.value)} required />
                    <input value={password} placeholder='Пароль' id="Password" type="password" className={s.form_input}
                        onChange={e => setPassword(e.target.value)} required />
                    {wrongValue && <div className={s.error}>Пользователь с таким email уже существует.</div>}
                    <div className={s.form_bottom}>
                        <button type='submit' className={s.form_bottom__btn}>Зарегестрироваться</button>
                        <Link to='/login' className={s.form_bottom__link}>Уже есть аккаунт? Войти</Link>
                    </div>
                </form>
            </main>
    );
}

export default Register;
