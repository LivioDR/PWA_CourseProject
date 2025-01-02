const isEmailValid = (email) => {
    if(email.length == 0){
        return false
    }
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    return regex.test(email)
}

const validateForm = (email, pass, confirmPass) => {
    if(email.length === 0){
        return {
            message: "Email can't be empty",
            result: false,
        }
    }
    if(!isEmailValid(email)){
        return {
            message: "Email format not valid",
            result: false,
        }
    }

    if(pass.length === 0){
        return {
            message: "Password can't be empty",
            result: false,
        }
    }

    if(pass !== confirmPass){
        return {
            message: "Passwords don't match",
            result: false,
        }
    }
    if(pass.length < 8){
        return{
            message: "Password is too short",
            result: false,
        }
    }

    return {
        message: "",
        result: true,
    }

}

export { validateForm }