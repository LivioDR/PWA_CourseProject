const moreThanOneWord = (text) => {
    let regex = /\s/
    return regex.test(text.replaceAll("-"," "))
}
const wordToCapitalCase = (text) => {
    return text[0].toUpperCase() + text.substring(1)
}
const toCapitalCase = (name) => {
    let capName = ''
    if(moreThanOneWord(name)){
        let arr = name.split("-")
        for(let i=0; i<arr.length; i++){
            arr[i] = wordToCapitalCase(arr[i])
        }
        return arr.join(" ")
    }
    else{
        return wordToCapitalCase(name)
    }
}

export default toCapitalCase