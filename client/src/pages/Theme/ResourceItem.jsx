import s from './resource_item.module.css'

function ResourceItem(props) {
    return (
        <li className={s.reource_item}>
            <div className={s.resource_item__title}>
                {props.title}
            </div>
        </li>
    )
}

export default ResourceItem;
