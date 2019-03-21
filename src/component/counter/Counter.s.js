export default function Counter(props) {
    debugger
    let {
        boundIncrement,
        boundDecrement,
        boundAddIfOdd,
        boundAsyncAdd,
        value,
        id
    } = props
    return (
        <div className="counter">
            <button className="sub"
                onClick={() => boundDecrement(id,value)}
            ></button>
            <span>{value}</span>
            <button className="add"
                onClick={() => boundIncrement(id)}
            ></button>
            <button className="addIfOdd"
                onClick={() => boundAddIfOdd(id,value)}
            ></button>
            <button className="addAsync"
                onClick={() => boundAsyncAdd(id)}
            ></button>
        </div>
    )
}
