
const BezUnit = ({ bezUnit, setBezUnit }) => {
 
    const ulozZmenu = (e) => {
        const poleNove = bezUnit.map((item) => (bezUnit.indexOf(item) === parseInt(e.target.id) ) ? e.target.value : item);
        setBezUnit(poleNove);
    }
    const odebratBoolean = () => {
        const polePlne = bezUnit.filter(item => item !== "");
        const countFullRow=polePlne.length;
        if (countFullRow < bezUnit.length) {
            if((bezUnit.length-countFullRow)>1){
            setBezUnit([...polePlne,""]); }
            return true
        }
        else {
            return false
        }
        
    }

    const pridatRow = () => {
        setBezUnit([...bezUnit,""]);
    }

    const odebratRow = () => {
        setBezUnit(bezUnit.filter(item => item !== ""));
    }

    return (
        <dl className='Komponenty'>
            {bezUnit.map((element, index) =>
                <dd key={index}>
                    <input
                        id={bezUnit.indexOf(element)}
                        type="text"
                        value={element}
                        onChange={ulozZmenu}
                    />
                </dd>)}
            {odebratBoolean() && <button name="minus" onClick={odebratRow}> -</button>}
            {!odebratBoolean() && <button name="plus" onClick={pridatRow}>+</button>}
        </dl>
    )
}

export default BezUnit