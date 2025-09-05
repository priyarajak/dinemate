import React, { useState } from "react"
import OrderRecieved from "../components/OrdersRecieved"
import loginIDs from "../data/loginIDs.json"

export default function AdminPage() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userID, setUserID] = useState("")
    const [password, setPassword] = useState("")

    const validateLogin = () => {
        const user = loginIDs.some(id => id.user === userID && id.pwd === password)
        if (user)
            setLoggedIn(true)
        else
            alert("Invalid credentials")
    }

    return <>
        { !loggedIn && (
            <div className=" position-fixed w-50 top-50 start-50 bg-light bg-opacity-50 translate-middle alert alert-success " role="alert">
                <h4 className="alert-heading">Admin Log in</h4>
                <form>
                    <div className="align-items-center ">
                        <label htmlFor="userID" className="form-label">User ID</label>
                        <input type="text" className="form-control" id="userID" onChange={(e) => setUserID(e.target.value)} />
                    </div>
                    <div className="align-items-center ">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center ">
                        <button onClick={validateLogin} type="submit" className="btn btn-primary my-4">Done</button>
                    </div>
                </form>
            </div>)}
        {  loggedIn && <OrderRecieved />} </>
}