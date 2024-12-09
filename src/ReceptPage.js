import { useParams, Link, useNavigate } from 'react-router-dom';
import api from "./api/recepty";

const ReceptPage = ({ recepty, setRecepty,logIn }) => {
    const { id } = useParams();
    const receptSelect = recepty.find((item) => (item.id).toString() === id);
    const navigace=useNavigate();

    const odstranitRecept = async (id) => {
        
        try {
            await api.delete(`/recepty/${id}`);
            const listItems = recepty.filter(item => (item.id).toString() !== id);
            setRecepty(listItems);
          } catch (err) {
            console.log(`Erroe:${err.message}`);
          }
        navigace("/");
       }

    return (
        <div className='ReceptPage'>
            {receptSelect &&
                <>
                    <h2>{receptSelect.name}</h2>
                    <img src={receptSelect.img} alt="picture" style={{width:"500px"}}/>
                    <hr></hr>
                    <h3>K přípravě potřebujete:</h3>
                    <dl className='Komponenty'>
                        {receptSelect.components.withUnit.map((polozka, index) => <dd key={index} >►  {polozka[1]}{` `}{polozka[0]}</dd>)}
                    </dl>
                    <hr></hr>
                    <dl className='Komponenty'>
                        {receptSelect.components.withoutUnit.map((polozka,index)=><dd key={index}>►  {polozka}</dd>)}
                    </dl>
                    <h3>Postupujte následovně:</h3>
                    <ol className='workFlow'>
                        {receptSelect.workflow.map((polozka, index) => <li key={index}><p>{polozka}</p></li>)}
                    </ol>
                    { logIn && 
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