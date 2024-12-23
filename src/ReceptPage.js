import { useParams, Link, useNavigate } from 'react-router-dom';
import {deleteRecipe} from "./api/recipes_db"

const ReceptPage = ({ recepty, setRecepty, logIn }) => {
    const { id } = useParams();
    const receptSelect = recepty.find((item) => (item._id) === id);
    const navigace = useNavigate();

    const odstranitRecept = async (id) => {

        try {
            await deleteRecipe(id);
            const listItems = recepty.filter(item => (item._id).toString() !== id);
            setRecepty(listItems);
        } catch (err) {
            console.log(`Erroe:${err.message}`);
        }
        navigace("/");
    }

    const marked = function (e) {
        const element =e.target.parentElement.querySelector("p");
        if (e.target.checked) {
            element.style.textDecoration = "line-through";
            element.style.textDecorationColor = "blue";
            element.style.textDecorationThickness ="3px";
        } else {
            e.target.parentElement.querySelector("p").style.textDecoration = "none";
        }
    }

    return (
        <div className='ReceptPage'>
            {receptSelect &&
                <>
                    <h2>{receptSelect.name}</h2>
                    { receptSelect.img && <img src={receptSelect.img} alt="foto-recept" style={{ width: "500px" }} />}
                    <hr></hr>
                    <h3>K přípravě potřebujete:</h3>
                    <dl className='Komponenty'>
                        {receptSelect.components.withUnit.map((polozka, index) => <dd key={index}>  {polozka[0]} ► {` `}{polozka[1]}</dd>)}
                    </dl>
                    <hr></hr>
                    <dl className='Komponenty'>
                        {receptSelect.components.withoutUnit.map((polozka, index) => <dd key={index}>►  {polozka}</dd>)}
                    </dl>
                    <h3>Postupujte následovně:</h3>
                    <ol className='workFlow'>
                        {receptSelect.workFlow.map((polozka, index) => <li key={index}>
                            <p>
                                {polozka}
                            </p>
                            <input type='checkbox' onClick={(e) => marked(e)} id={index}/>
                            <hr></hr>
                        </li>)}
                    </ol>
                    {logIn &&
                        <div className='inline'>
                            <button className="button" onClick={() => odstranitRecept(id)}>Odstranit recept</button>
                            <button className="button" onClick={() => navigace(`/EditRecept/${id}`)}>Upravit recept</button>
                        </div>
                    }
                </>
            }
            {!receptSelect && <>
                <h2>Recept nenalezen!!</h2>
                <p>To je sklamání.</p>
                <p>
                    <Link to="/">Zpět na domovskou stránku.</Link>
                </p>
            </>}
        </div>
    )
}

export default ReceptPage