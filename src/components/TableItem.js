const TableItem = props => {
    const _onClick = () => {
        console.log(props.item.id);
    }
    return (
        <li onClick={_onClick}>
            ...
        </li>
    );

});