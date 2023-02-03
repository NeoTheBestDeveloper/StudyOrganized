const validationErrorToStr = (error) => {
    if (error.type === 'value_error.any_str.min_length') {
        return `Минимальная длина заголовка равна ${error.ctx.limit_value}.`;
    }
}


export const settingsErrorsToStrs = ({ detail, status }) => {
    let errors = Array.isArray(detail) ? detail : [detail];
    if (status === 422) {
        return errors.map(error => validationErrorToStr(error));
    } else {
        return ['Что то пошло не так.'];
    }
}
