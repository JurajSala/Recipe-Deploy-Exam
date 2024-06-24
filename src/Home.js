
import Recept from "./home/Recept";

const Home = ({ data }) => {
  const delkaDat=data.length;
  return (
    <>
      { delkaDat&&
        <ul className='Home'>
          {data.map((item) =>
            <li><Recept item={item} /></li>)}
        </ul>
      }
      { !delkaDat  &&
       <p>-------------------- Nalezených receptů. Bohužel!!------------------------</p>
        }
    </>
  )
}

export default Home