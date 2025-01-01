import { useState } from "react"
import Header from "./Header/Header"

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto 0 auto',
        height: '90vh',
        padding: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#FAFAFAAA',
        borderRadius: 5,
    },
    fields: {
        height: '2.5rem',
        margin: 10,
        padding: 10,
    },
    alert: {
        fontSize: 14,
        textAlign: 'center',
        padding: 10,
    },
    button: {
        width: '40%',
        margin: '10% 30% 5% 30%',
        height: '2rem',
        borderRadius: 5,
    },
    toggleText: {
        fontSize: 12,
    }

}

export const LoginPage = ({setAuth}) => {

    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confirm, setConfirm] = useState("")
    const [alert, setAlert] = useState("")

    const loginAttempt = () => {
        console.log(email, pass, confirm)
    }

    const toggleLogin = () => {
        setEmail("")
        setPass("")
        setConfirm("")
        setIsLogin(prev => !prev)
    }

    return(
        <div style={styles.container}>
            <Header/>
            <h1 style={styles.title}>{isLogin ? "Login" : "Register"}</h1>
            <div style={styles.formContainer}>
                <input style={styles.fields} name="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input style={styles.fields} name="password" placeholder="Password" type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
                {
                    !isLogin &&
                    <input style={styles.fields} name="confirmPassword" placeholder="Confirm password" type="password" value={confirm} onChange={(e)=>{setConfirm(e.target.value)}}/>
                }
                <button style={styles.button} onClick={loginAttempt}>{isLogin ? "Login" : "Sign up"}</button>
                <p style={styles.alert}>{alert}</p>
            </div>
            <p style={styles.toggleText} onClick={toggleLogin}>{isLogin ? "New to the app? Sign up" : "Already a user? Log in"}</p>
        </div>
    )
}