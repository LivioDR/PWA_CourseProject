import { openDatabase, setData } from "@/database/indexeddbFunctions"
import getAllPokemon from "./getAllPokemon"

const pokemonDataBaseUrl = "https://pokeapi.co/api/v2/pokemon/"
const atkBaseUrl = "https://pokeapi.co/api/v2/move/"
const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/"


const getAllInfoForCache = async() => {

    const setProgress = (pct) => {
        console.log(`Download ${Math.round(pct * 100)/100}% completed`)
    }

    try{
        setProgress(0)
        // opening the database for the first time and setting the stores
        openDatabase("pokemon")
        // writing all the data types info on the indexedDB
        await getAllPokemon()
        setProgress(10)
        for(let i=1; i<=151; i++){
            // get pokemon data
            let url = `${pokemonDataBaseUrl}${i}/`
            const pokemonData = await fetch(url).then(res => res.json())
            await setData(url,pokemonData,"pokemon-data","pokemon")

            // update the current progress
            setProgress(10 + ((i/151) * 40))
        }
        setProgress(50)

        // set the moves in the database
        for(let i=1; i<=919; i++){
            const url = `${atkBaseUrl}${i}/`
            const move = await fetch(url).then(res => res.json())
            await setData(url, move, "pokemon-moves","pokemon")

            setProgress(50 + ((i/919) * 50))
        }
    }
    catch(e){
        console.error(e)
    }
}
export default getAllInfoForCache