import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

import { register } from '../../store/Auth/ActionCreators';
import { showMessages } from '../../store/Error/ErrorSlice';

import s from './Auth.module.css';

function Register() {
    const dispatch = useDispatch();
    const { isAuth, isRegistered } = useSelector(state => state.authReducer);
    const { isLoading, errors } = useSelector(state => state.userReducer);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }

        if (errors.length) {
            dispatch(showMessages(errors));
        }

        if (!isLoading && isRegistered) {
            navigate('/login');
        }

    }, [isRegistered, errors]);

    const submit = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
    }


    return (
        <main className={s.register}>
            <form className={s.register_form} onSubmit={submit}>
                <input value={name} placeholder='Имя' id="Name" type="username" className={s.form_input}
                    onChange={e => setName(e.target.value)} required autoFocus />
                <input value={email} placeholder='Почта' id="Email" className={s.form_input}
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
