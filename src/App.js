import React, { useState, useEffect} from 'react';
import PokeList from './pokeList';
import axios from 'axios';
import Pagination from './pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl])

  function goNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

 if (loading) return "Loading..."


  return (
    <>
     <PokeList pokemon={pokemon} />
   <Pagination
   goNextPage={nextPageUrl ?
    goNextPage : null}
   goPrevPage={prevPageUrl ? goPrevPage : null} />
    </>
  
  );
}

export default App;
