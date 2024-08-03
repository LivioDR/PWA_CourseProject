import { setData } from "@/database/indexeddbFunctions"
const baseUrl = "https://pokeapi.co/api/v2/type/"

const getAllPokemon = async() => {
    let allPokemon = []

    try{
        // Fetching the first page of the endpoint
        let types = await fetch(baseUrl).then(res => res.json())
    
        // Fetching the second (and last) page of the endpoint
        let secondPage = await(fetch(types.next)).then(res => res.json())
    
        // Merging the results
        types.results = [...types.results, ...secondPage.results]
    
        // Goign through the results to fetch the details for every type
        // try{
            for( let i=0; i<types.count; i++){
                const url = types.results[i]?.url
                let result = await fetch(url).then(res => res.json())

                // setting the type data in the indexedDB
                await setData(url,result,"pokemon-types","pokemon")
            }
    }
    catch(e){
        console.error(e)
    }
}
export default getAllPokemon