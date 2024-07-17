import getAllPokemon from "./getAllPokemon"
import { getPokemonCry, getPokemonData } from "./getPokemonData"

const atkBaseUrl = "https://pokeapi.co/api/v2/move/"
const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/"


const getAllInfoForCache = async() => {

    const setProgress = (pct) => {
        console.log(`Download ${Math.round(pct * 100)/100}% completed`)
    }

    try{
        setProgress(0)
        await getAllPokemon()
        setProgress(10)
        for(let i=1; i<=151; i++){
            await getPokemonData(i)
            await getPokemonCry(i)
            await fetch(`${imgBaseUrl}${i}.gif`)
            await fetch(`${imgBaseUrl}back/${i}.gif`)
            setProgress(10 + ((i/151) * 40))
        }
        setProgress(50)

        for(let i=1; i<=919; i++){
            await fetch(`${atkBaseUrl}${i}/`)
            setProgress(50 + ((i/919) * 50))
        }
    }
    catch(e){
        console.error(e)
    }
}
export default getAllInfoForCache