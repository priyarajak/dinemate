import React, { useState } from "react"
import OrderRecieved from "../components/OrdersRecieved"

export default function AdminPage() {
    const [loggedIn, setloggedIn] = useState()
    return <> <div>
        <div class="row g-3 align-items-center">
            <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">Password</label>
            </div>
            <div class="col-auto">
                <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline"></input>
            </div>
            <div class="col-auto">
                <span id="passwordHelpInline" class="form-text">
                    Must be 8-20 characters long.
                </span>
            </div>
        </div>
    </div>
        <OrderRecieved /> </>
}