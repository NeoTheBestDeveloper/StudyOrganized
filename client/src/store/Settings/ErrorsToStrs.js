export const settingsErrorsToStrs = ({ detail, status }) => {
    let errors = Array.isArray(detail) ? detail : [detail];
    return ['Что-то пошло не так.']
}
