import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeMessage } from '../../store/Error/Slices/ErrorSlice';

import ErrorMessage from './ErrorMessage/ErrorMessage';

import s from './ErrorMessages.module.css';

const ErrorMessages = () => {
    const dispatch = useDispatch();

    let id = -1;
    const { messages, hidden, shownCount } = useSelector(state => state.errorReducer);

    useEffect(() => {
        if (shownCount > messages.length) {
            setTimeout(() => dispatch(closeMessage()), 1000);
        }
    }, [shownCount, messages.length, dispatch]);



    return (
        !hidden && <div className={s.error_messages}>
            {messages.map((msg) => {
                id++;
                return <ErrorMessage key={id} msg={msg} />;
            })}
        </div>

    );
}

export default ErrorMessages;
