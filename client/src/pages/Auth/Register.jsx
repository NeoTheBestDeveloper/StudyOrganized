import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { authAPI } from '../../api/Auth';

import s from './Auth.module.css';

function Register() {
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();
    const [register] = authAPI.useRegisterMutation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const { data, error } = await register({ name, email, password });
        if (data) {
            navigate('/login');
        } else if (error) {
            console.log(error);
        }
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
                    <div className={s.form_bottom}>
                        <button type='submit' className={s.form_bottom__btn}>Зарегистрироваться</button>
                        <Link to='/login' className={s.form_bottom__link}>Уже есть аккаунт? Войти</Link>
                    </div>
                </form>
            </main>
    );
}

export default Register;
