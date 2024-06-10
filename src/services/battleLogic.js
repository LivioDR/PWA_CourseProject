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

//Plays the sound effect for the used attack
const playAttackSound = (atkName) => {
    const sfxIcon = document.getElementById('sfx')
    if(sfxIcon.classList.contains('fi-ss-volume')){
        const sfx = new Audio(`/assets/audio/sfx/${atkName}.mp3`)
        sfx.play()
    }
}

const setupSfxButton = () => {
    const sfxIcon = document.getElementById('sfx')
    sfxIcon.addEventListener('click',()=>{
        if(sfxIcon.classList.contains('fi-ss-volume')){
            sfxIcon.classList.remove('fi-ss-volume')
            sfxIcon.classList.add('fi-ss-volume-mute')
        }
        else{
            sfxIcon.classList.remove('fi-ss-volume-mute')
            sfxIcon.classList.add('fi-ss-volume')
        }
    })
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
const getCurrentLevel = (lvl) => {
    // the minimum level is 5 due to the tipping point of the formula
    return ( (1.2 * Math.pow(lvl,3)) - (15*Math.pow(lvl,2)) + (100*lvl) - 140)
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

// Gets the actual Hp of the pokemon based on its level and other stats
const getHp = (pokeStats, level = 50, iv = 6, ev = 0) => {
    // Formula used from gen III onwards
    return (Math.floor(0.01 * ((2 * pokeStats.MaxHp) + iv + Math.floor(0.25 * ev))) * level) + level + 10
}

// Calculates the HP for each pokemon and sets it on the stats object in local storage
const setHpStats = () => {
    let myStats = JSON.parse(localStorage.getItem('stats'))
    let rivalStats = JSON.parse(localStorage.getItem('rivalStats'))

    myStats.MaxHp = getHp(myStats)
    myStats.Hp = myStats.MaxHp

    rivalStats.MaxHp = getHp(rivalStats)
    rivalStats.Hp = rivalStats.MaxHp

    localStorage.setItem('stats',JSON.stringify(myStats))
    localStorage.setItem('rivalStats', JSON.stringify(rivalStats))
}


// Returns true/false depending on if the attack was a critical hit or not
const isCriticalHit = (chance = 24) => {
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
    
    setHpBars()

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

const setHpBars = () => {
    const myStats = JSON.parse(localStorage.getItem('stats'))
    const rivalStats = JSON.parse(localStorage.getItem('rivalStats'))

    const myHpBar = document.getElementById('myRemainingHp')
    const rivalHpBar = document.getElementById('rivalRemainingHp')

    myHpBar.style.width = `${(myStats.Hp / myStats.MaxHp)*100}%`
    myHpBar.style.marginLeft = `${(1 - (myStats.Hp / myStats.MaxHp))*100}%`
    rivalHpBar.style.width = `${(rivalStats.Hp / rivalStats.MaxHp)*100}%`
}

const isBattleOver = async() => {
    const myStats = JSON.parse(localStorage.getItem('stats'))
    const rivalStats = JSON.parse(localStorage.getItem('rivalStats'))
    const myPokeName = toCapitalCase(localStorage.getItem('pokemon'))
    const rivalPokeName = toCapitalCase(localStorage.getItem('rivalPokemon'))
    const myImg = document.getElementById('myPokeBattleImg')
    const rivalImg = document.getElementById('rivalPokeBattleImg')
    if(myStats.Hp == 0){
        // I lose logic
        myImg.style.opacity = 0
        await setText(`${myPokeName} has fainted.`)
        playAttackSound('In-Battle Recall Switch Flee Run')
        rivalImg.style.opacity = 0
        await setText(`Enemy ${rivalPokeName} has ran away!`)
        return true
    }
    else if(rivalStats.Hp == 0){
        // I win logic
        rivalImg.style.opacity = 0
        playAttackSound('In-Battle Faint No Health')
        await setText(`Enemy ${rivalPokeName} has fainted.`)
        await setText(`${myPokeName} has won!`)
        return true
    }
    return false
}

const newBattlePrompt = () => {
    const textBox = document.getElementById('battleTextBox')
    const btn = document.createElement('button')
    btn.innerText = 'New game?'
    btn.className = 'new-game-btn'
    btn.addEventListener('click', reloadBattle)
    textBox.innerHTML = ''
    textBox.appendChild(btn)
}

const reloadBattle = () => {
    location.reload()
}

const setupBackgroundMusic = () => {
    const bgm = new Audio('/assets/audio/battleMusic.mp3')
    bgm.volume = 0.5
    bgm.play()
    
    const musicIcon = document.getElementById('music')
    musicIcon.addEventListener('click',()=>{
        if(musicIcon.classList.contains('fi-sr-music')){
            musicIcon.classList.remove('fi-sr-music')
            musicIcon.classList.add('fi-sr-music-slash')
            bgm.pause()
        }
        else{
            musicIcon.classList.remove('fi-sr-music-slash')
            musicIcon.classList.add('fi-sr-music')
            bgm.play()
        }
    })
}


const battleSequence = async() => {

    const musicIcon = document.getElementById('music')
    setupBackgroundMusic()
    setupSfxButton()

    const turns = getTurnOrder()
    setHpStats()
    setHpBars()
    
    let nextAttacker = turns[0]

    const myPokemon = toCapitalCase(localStorage.getItem('pokemon'))
    const rivalPokemon = toCapitalCase(localStorage.getItem('rivalPokemon'))

    const myData = JSON.parse(localStorage.getItem('pokemonData'))
    const rivalData = JSON.parse(localStorage.getItem('rivalPokemonData'))

    let myStats = JSON.parse(localStorage.getItem('stats'))
    let rivalStats = JSON.parse(localStorage.getItem('rivalStats'))

    const myAttacks = JSON.parse(localStorage.getItem('attacks'))
    const rivalAttacks = JSON.parse(localStorage.getItem('rivalAttacks'))

    const myImg = document.getElementById('myPokeBattleImg')
    const rivalImg = document.getElementById('rivalPokeBattleImg')

    await timer(3000)
    rivalImg.style.opacity = 1
    await setText(`A wild ${rivalPokemon} appears!`)
    playAttackSound('In-Battle Recall Switch Pokeball')
    myImg.style.opacity = 1
    await setText(`Go ${myPokemon}!`)

    let isBattleOverFlag = false

    do{
        if(nextAttacker == 'yourPokemon'){
            const attack = await getRandomAtack(myAttacks)
            playAttackSound(attack.name)
            await setText(`${myPokemon} used ${attack.name}!`)
            if(isAttackSuccessfull(attack.accuracy)){
                rivalStats = await setDamage(myStats, rivalStats, attack, getPokemonTypes(rivalData))
                localStorage.setItem('rivalStats',JSON.stringify(rivalStats))
                setHpBars()
                const typeMult = await getTypeMultiplier(attack.type, getPokemonTypes(rivalData))
                await typeMessage(typeMult)
            }
            else{
                await setText('But missed...')
            }
        }
        else{
            const attack = await getRandomAtack(rivalAttacks)
            playAttackSound(attack.name)
            await setText(`Enemy ${rivalPokemon} used ${attack.name}!`)
            if(isAttackSuccessfull(attack.accuracy)){
                myStats = await setDamage(rivalStats, myStats, attack, getPokemonTypes(myData))
                localStorage.setItem('stats',JSON.stringify(myStats))
                setHpBars()
                const typeMult = await getTypeMultiplier(attack.type, getPokemonTypes(myData))
                await typeMessage(typeMult)
            }
            else{
                await setText('But missed...')
            }
        }
        // set next attacker
        nextAttacker == turns[0] ? nextAttacker = turns[1] : nextAttacker = turns[0]
        isBattleOverFlag = await isBattleOver()
    }
    while(!isBattleOverFlag)
    if(musicIcon.classList.contains('fi-sr-music')){
        musicIcon.click()
    }
    newBattlePrompt()
}

export default battleSequence