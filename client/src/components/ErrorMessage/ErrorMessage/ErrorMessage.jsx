import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { incrementShownMessages } from '../../../store/Error/Slices/ErrorSlice';

import s from './ErrorMessage.module.css';

const ErrorMessage = ({ msg }) => {
    const dispatch = useDispatch();
    const [shown, setShown] = useState(true);

    const hideMessage = () => {
        if (shown) {
            dispatch(incrementShownMessages());
            setShown(false);
        }
    }

    setTimeout(hideMessage, 4000);

    return (
        <div className={`${s.error_message} ${shown ? s.show : s.hide}`}
            onClick={hideMessage}>
            {msg}
        </div>
    );
}

export default ErrorMessage;
