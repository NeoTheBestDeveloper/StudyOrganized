import s from './ShownThemes.module.css';

const ShownThemes = () => {
    return (
        <div className={s.show_themes}>
            <h1 className={s.shown_themes__title}>Показывать статистику по</h1>
            <ul className={s.shown_themes__list}>
                {/* {shownThemes.map((item) => (<ThemeListItem key={item.id} id={item.id} title={item.title} />))} */}
            </ul>
            <button className={s.add_theme__button} type="button">Добавить</button>
        </div>

    );
}

export default ShownThemes;
