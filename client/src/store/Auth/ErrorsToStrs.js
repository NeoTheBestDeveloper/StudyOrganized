const validationErrorToStr = (error) => {
    if (error.type === 'value_error.email') {
        return 'Введите корректную почту.';
    } else if (error.type === 'value_error.any_str.min_length') {
        if (error.loc[1] === 'password') {
            return `Пароль должен содержать минимум ${error.ctx.limit_value} символов.`;
        } else if (error.loc[1] === 'name') {
            return `Имя должно содержать минимум ${error.ctx.limit_value} символа.`;
        } else {
            return 'Невалидные данные.';
        }
    }
}

const badRequestErrorToStr = (error) => {
    if (error === 'REGISTER_USER_ALREADY_EXISTS') {
        return 'Данный пользователь уже зарегистрированный.';
    } else if (error === 'LOGIN_BAD_CREDENTIALS') {
        return 'Неверный пароль или логин.'
    } else {
        return 'Невалидные данные.';
    }
}

export const authErrorsToStrs = ({ detail, status }) => {
    let errors = Array.isArray(detail) ? detail : [detail];

    if (status === 422) {
        return errors.map(error => validationErrorToStr(error));
    } else if (status === 400) {
        return errors.map(error => badRequestErrorToStr(error));
    } else {
        return ['Что то пошло не так.'];
    }
}
