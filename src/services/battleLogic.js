import toCapitalCase from "./nameFormatter.js"

// Returns the order of attacks for the turn
const getTurnOrder = () => {
    const myStats = JSON.parse(localStorage.getItem('stats'))
    const rivalStats = JSON.parse(localStorage.getItem('rivalStats'))

    if(myStats.Spd > rivalStats.Spd){
        return ['yourPokemon', 'rivalPokemon']
    }
    else {
        return ['rivalPokemon', 'yourPokemon']
    }
}

//Gets the pokemon types
const getPokemonTypes = (pokeData) => {
    let types = []
    for(let i=0; i<pokeData.types.length; i++){
        types.push(pokeData.types[i].type.name)
    }
    return types
}

// Gets a random attack from the arrays passed as an argument
const getRandomAtack = (atks) => {
    return atks[Math.floor(Math.random() * atks.length)]
}

// Returns the amount of experience points earned during battle by defeating the opponent pokemon
const getEarnedExperience = (myLevel, enemyLevel, baseExp, affection = 1, luckyEgg = 1, trainerModifier = 1, shareExp = 1, pastEvoLevel = 1, boostPower = 1) => {
    const deltaExp = ( ((baseExp * enemyLevel) / 5) * (1/shareExp) * Math.pow((((2 * enemyLevel) + 10)/(myLevel + enemyLevel + 10)),2.5) + 1 ) * affection * trainerModifier * pastEvoLevel * boostPower * luckyEgg
    return deltaExp
}

// Returns the experience needed to achieve a level
const getCurrentLevelExp = (lvl) => {
    // the minimum level is 5 due to the tipping point of the formula
    return ( (1.2 * Math.pow(lvl,3)) - (15*Math.pow(lvl,2)) + (100*lvl) - 140)
}

// Returns the current level achieved by the earned experience
const getLevelFromExp = (exp) => {
    let level = 5
    while(getCurrentLevelExp(level) < exp){
        level++
    }
    return level
}

// Returns the type multiplier for the attack type and the defender type
const getTypeMultiplier = async(atkType, defenderType) => {
    const typeData = await fetch(`https://pokeapi.co/api/v2/type/${atkType}/`).then(res => res.json()).then(res => res.damage_relations)
    for(let i=0; i<typeData.double_damage_to.length; i++){
        if(typeData.double_damage_to[i].name == defenderType){
            return 2
        }
    }
    for(let i=0; i<typeData.half_damage_to.length; i++){
        if(typeData.half_damage_to[i].name == defenderType){
            return 0.5
        }
    }
    for(let i=0; i<typeData.no_damage_to.length; i++){
        if(typeData.no_damage_to[i].name == defenderType){
            return 0
        }
    }
    return 1
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

const setDamage = async(atkPokeStats, defPokeStats, atk, defPokeType, atkLevel = 50) => {
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
    return defPokeStats
}

const timer = (ms) => {
    return new Promise(res => setTimeout(res, ms));
}

const setText = async(text, readTime = 4000, pauseTime = 300) => {
    const textField = document.getElementById('battleTextBox')
    textField.innerText = text
    await timer(readTime)
    textField.innerText = ''
    await timer(pauseTime)
} 

const typeMessage = async(typeMult) => {
    if(typeMult == 0){
        await setText("It doesn't affect the pokemon...")
    }
    else if(typeMult == 2){
        await setText("It's super effective!")
    }
    else if(typeMult == 0.5){
        await setText("It's not very effective...")
    }
    else{
        await timer(4000)
    }
}

export { getCurrentLevelExp, getEarnedExperience}