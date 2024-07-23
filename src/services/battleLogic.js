import { getCollectionForUserId, updateCollectionForUserId } from "@/database/firebaseFunctions"

// Returns the order of attacks for the turn
const getTurnOrder = (myStats, rivalStats) => {
    
    if(myStats.Spd > rivalStats.Spd){
        return ['yourPokemon', 'rivalPokemon']
    }
    else {
        return ['rivalPokemon', 'yourPokemon']
    }
}

// Gets a random attack from the arrays passed as an argument
const getRandomAtack = (atks) => {
    return atks[Math.floor(Math.random() * atks.length)]
}

// Returns the amount of experience points earned during battle by defeating the opponent pokemon
const getEarnedExperience = (myLevel, enemyLevel, baseExp, affection = 1, luckyEgg = 1, trainerModifier = 1, shareExp = 1, pastEvoLevel = 1, boostPower = 1) => {
    const deltaExp = ( ((baseExp * enemyLevel) / 5) * (1/shareExp) * Math.pow((((2 * enemyLevel) + 10)/(myLevel + enemyLevel + 10)),2.5) + 1 ) * affection * trainerModifier * pastEvoLevel * boostPower * luckyEgg
    return Math.round(deltaExp)
}

// Returns the experience needed to achieve a level
const getCurrentLevelExp = (lvl) => {
    // the minimum level is 5 due to the tipping point of the formula
    return Math.round( (1.2 * Math.pow(lvl,3)) - (15*Math.pow(lvl,2)) + (100*lvl) - 140)
}

// Returns the current level achieved by the earned experience
const getLevelFromExp = (exp) => {
    let level = 5
    while(getCurrentLevelExp(level) <= exp){
        level++
    }
    return level-1
}

// Returns the type multiplier for the attack type and the defender type
const getTypeMultiplier = async(atkType, defenderType) => {
    let multiplier = 1
    try{
        const typeData = await fetch(`https://pokeapi.co/api/v2/type/${atkType}/`).then(res => res.json()).then(res => res.damage_relations)
        for(let j=0; j<defenderType.length; j++){
            for(let i=0; i<typeData.double_damage_to.length; i++){
                if(typeData.double_damage_to[i].name == defenderType[j]){
                    multiplier *= 2
                }
            }
            for(let i=0; i<typeData.half_damage_to.length; i++){
                if(typeData.half_damage_to[i].name == defenderType[j]){
                    multiplier *= 0.5
                }
            }
            for(let i=0; i<typeData.no_damage_to.length; i++){
                if(typeData.no_damage_to[i].name == defenderType[j]){
                    multiplier *= 0
                }
            }
        }
    }
    catch(e){
        console.error(e)
    }
    return multiplier
}

// Returns true/false depending on if the attack was a critical hit or not
const isCriticalHit = (chance = 24) => { // the chance by default of landing a critical hit in the latests installments is 1/24
    const roll = Math.floor(Math.random() * chance) + 1
    if(roll == 1){
        return true
    }
    else{
        return false
    } 
}

// Get a random multiplier for the attack damage
const getRandomDamageMultiplier = () => {
    return (Math.random() * 0.15) + 0.85 // 85% to 100%
}

// Checks if the attack hits or misses
const isAttackSuccessfull = (acc) => {
    if(acc == 100){
        return true
    }
    const roll = Math.floor(Math.random() * 100) + 1
    if(roll <= acc){
        return true
    }
    else {
        return false
    }
}

const setDamage = async(atkPokeStats, defPokeStats, atk, defPokeType, atkLevel, setDefData) => {
    const crit = isCriticalHit() ? 1.5 : 1
    const typeMult = await getTypeMultiplier(atk.type, defPokeType)
    const rand = getRandomDamageMultiplier()

    let atkStat
    let defStat

    const damageType = atk.damage
    if(damageType == 'physical'){
        atkStat = atkPokeStats.Atk
        defStat = defPokeStats.Def
    }
    else{
        atkStat = atkPokeStats.SpA
        defStat = defPokeStats.SDf
    }

    const damage = Math.round((((((2*atkLevel/5)+2)* atk.power * (atkStat/defStat))/50)+2) * crit * typeMult * rand)
    
    if(damage > defPokeStats.Hp){
        defPokeStats.Hp = 0
    }
    else{
        defPokeStats.Hp -= damage
    }
    setDefData(prev => {
        const newData = {
            ...prev,
            baseStats: {
                ...prev.baseStats,
                Hp: defPokeStats.Hp
            }
        }
        return newData
    })
    return defPokeStats
}

const timer = (ms) => {
    return new Promise(res => setTimeout(res, ms));
}

const setTextWithDelay = async(text, setText, readTime = 4000, pauseTime = 300) => {
    setText(text)
    await timer(readTime)
    setText('')
    await timer(pauseTime)
} 

const typeMessage = async(typeMult, setText) => {
    if(typeMult == 0){
        await setTextWithDelay("It doesn't affect the pokemon...", setText)
    }
    else if(typeMult == 2){
        await setTextWithDelay("It's super effective!", setText)
    }
    else if(typeMult == 0.5){
        await setTextWithDelay("It's not very effective...", setText)
    }
    else{
        await timer(4000)
    }
}

const startBattle = async(pokemonData, myAttacks, setPokemonData, rivalPokemonData, setRivalPokemonData, setText, setIsBattleOver) => {
    // get the rival moves on a variable for easier management. Already have mines received as an argument
    const rivalAttacks = rivalPokemonData.moves
    
    // get the names on variables for easier management
    const myPokemon = pokemonData.name.toUpperCase()
    const rivalPokemon = rivalPokemonData.name.toUpperCase()
    
    // get the order of attacks for this turn
    const turns = getTurnOrder(pokemonData.baseStats, rivalPokemonData.baseStats)
    let nextAttacker = turns[0]
    
    await setTextWithDelay(`A level ${rivalPokemonData.level} wild ${rivalPokemon} appears!`, setText)
    await setTextWithDelay(`Go ${myPokemon}!`, setText)
    
    let isBattleOverFlag = false
    
    do{
        // get the stats on variables for easier management
        let myStats = pokemonData.baseStats
        let rivalStats = rivalPokemonData.baseStats

        // check the turns and start the sequence
        if(nextAttacker == 'yourPokemon'){
            // select a random attack to use
            const attack = await getRandomAtack(myAttacks)
            await setTextWithDelay(`${myPokemon} used ${attack.name}!`, setText)
            // checks accuracy
            if(isAttackSuccessfull(attack.accuracy)){
                // calculates damage of the attack and updates the state
                const rivalStatsAfterAttack = await setDamage(myStats, rivalStats, attack, rivalPokemonData.types, pokemonData.level, setRivalPokemonData)
                
                // displays the attack damage message
                const typeMult = await getTypeMultiplier(attack.type, rivalPokemonData.types)
                await typeMessage(typeMult, setText)

                // checks if the battle is over
                if(rivalStatsAfterAttack.Hp == 0){
                    isBattleOverFlag = true
                    await addExpAndCalculateLevelForPokemon(pokemonData.id, rivalPokemonData.baseExp)
                    await addPokemonToCollectionIfNotCaught(rivalPokemonData)
                    battleOverSequence(myPokemon, rivalPokemon, true, pokemonData.level, rivalPokemonData.level, rivalPokemonData.baseExp, setText, setIsBattleOver)
                }
            }
            else{
                await setTextWithDelay('But missed...', setText)
            }
        }
        // if the rival attacks:
        else{
            // select a random attack
            const attack = await getRandomAtack(rivalAttacks)
            await setTextWithDelay(`Enemy ${rivalPokemon} used ${attack.name}!`, setText)

            // checks accuracy
            if(isAttackSuccessfull(attack.accuracy)){
                // calculates the damage and updates the state
                const myStatsAfterAttack = await setDamage(rivalStats, myStats, attack, pokemonData.types, rivalPokemonData.level, setPokemonData)
    
                // displays the attack damage message
                const typeMult = await getTypeMultiplier(attack.type, pokemonData.types)
                await typeMessage(typeMult, setText)
            
                // checks if the battle is over
                if(myStatsAfterAttack.Hp == 0){
                    isBattleOverFlag = true
                    battleOverSequence(myPokemon, rivalPokemon, false, pokemonData.level, rivalPokemonData.level, pokemonData.baseExp, setText, setIsBattleOver)
                }
            }
            else{
                await setTextWithDelay('But missed...', setText)
            }
        }

        // set the next attacker
        nextAttacker == turns[0] ? nextAttacker = turns[1] : nextAttacker = turns[0]
    }
    while(!isBattleOverFlag)
}

const addExpAndCalculateLevelForPokemon = async(idOfMyPokemon, earnedExp) => {
    let uid
    if(typeof window != "undefined"){
        uid = localStorage.getItem("uid")
    }
    let pokemonDataForUpdate = await getCollectionForUserId(uid)
    for(let i=0; i<pokemonDataForUpdate.length; i++){
        if(pokemonDataForUpdate[i].id == idOfMyPokemon){
            pokemonDataForUpdate[i].level = getLevelFromExp(pokemonDataForUpdate[i].exp + earnedExp)
            pokemonDataForUpdate[i].exp += earnedExp
        }
    }
    updateCollectionForUserId(uid, pokemonDataForUpdate)
}

const addPokemonToCollectionIfNotCaught = async(rivalData) => {
    let uid
    if(typeof window != "undefined"){
        uid = localStorage.getItem("uid")
    }
    let myCurrentPokemonCollection = await getCollectionForUserId(uid)
    const id = rivalData.id
    for(let i=0; i<myCurrentPokemonCollection.length; i++){
        if(myCurrentPokemonCollection[i].id == id){
            return
        }
    }
    const rivalDataForFirebase = {
        id: rivalData.id,
        name: rivalData.name,
        level: rivalData.level,
        exp: getCurrentLevelExp(rivalData.level),
        image: rivalData.front_image,
    }
    myCurrentPokemonCollection.push(rivalDataForFirebase)

    updateCollectionForUserId(uid, myCurrentPokemonCollection)
}


const battleOverSequence = async(myPokeName, rivalPokeName, didPlayerWin, myLevel, rivalLevel, baseExp, setText, setIsBattleOver) => {
    if(didPlayerWin){
        await setTextWithDelay(`Enemy ${rivalPokeName} has fainted.`, setText)
        await setTextWithDelay(`${myPokeName} has won!`, setText)
        const exp = getEarnedExperience(myLevel, rivalLevel, baseExp)
        await setTextWithDelay(`${myPokeName} has earned ${exp} experience points.`, setText)
        // DATABASE UPDATE LOGIC HERE
    }
    else{
        await setTextWithDelay(`${myPokeName} has fainted.`, setText)
        await setTextWithDelay(`Enemy ${rivalPokeName} has ran away!`, setText)
    }
    setIsBattleOver(true)
}

export { getCurrentLevelExp, getLevelFromExp, getEarnedExperience, startBattle}