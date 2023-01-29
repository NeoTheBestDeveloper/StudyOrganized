import cross_icon from './../../assets/icons/cross.svg';
import s from './CrossButton.module.css';


const CrossButton = (props) => {
    return (
        <button type="button" className={s.cross_button} {...props}>
            <img src={cross_icon} alt="Крестик" />
        </button>

    );
};

export default CrossButton;
