
import Recept from "./home/Recept";

const Home = ({ data }) => {
  const delkaDat=data.length;
  console.log(data);
  return (
    <>
      { delkaDat&&
        <ul className='Home'>
          {data.map((item) =>
            <li key={item._id}><Recept item={item} /></li>)}
        </ul>
      }
      { !delkaDat  &&
       <h3>-------------------- Nalezených receptů. Bohužel!!------------------------</h3>
        }
    </>
  )
}

export default Home