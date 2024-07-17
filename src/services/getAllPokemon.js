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
                let result = await fetch(types.results[i]?.url).then(res => res.json())
                allPokemon.push(...result.pokemon.map(poke => poke.pokemon.name))
            }
        // }
        // catch(e){
        //     console.error(e)
        // }
        // Getting all unique results
        allPokemon = [...new Set(allPokemon)]
        // Then sorting them in ascending order before returning it
        allPokemon.sort()
    }
    catch(e){
        console.error(e)
    }
    return allPokemon
}
export default getAllPokemon