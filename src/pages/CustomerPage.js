import { useState } from "react";
import MenuCard from "../components/MenuCard";
import CartItems from "../components/CartItems";
import NavbarCustomer from "../components/NavbarCustomer"
import { setTableNumber } from "../features/dinemateSlice"
import { useDispatch } from "react-redux"

export default function CustomerPage() {

    const [showTableForm, setShowTableForm] = useState(true);
    const dispatch = useDispatch()


    return (
        <div>
            <NavbarCustomer />
            { showTableForm && (
                <div className=" position-fixed w-50 top-50 start-50 bg-light bg-opacity-50 translate-middle alert alert-success " role="alert">
                    <h4 className="alert-heading">Welcome!</h4>
                    <form>
                        <div className="align-items-center ">
                            <label htmlFor="tableNumber" className="form-label">Table Number</label>
                            <input type="number" className="form-control" id="tableNumber" onChange={(e) => dispatch(setTableNumber(e.target.value))} />
                        </div>
                        <div className="d-flex justify-content-center ">
                            <button onClick={() => setShowTableForm(false)} type="submit" className="btn btn-primary my-4">Done</button>
                        </div>
                    </form>
                </div>)}
            <div>
                {!showTableForm &&
                    <div className="d-flex flex-col justify-content-around ">
                        <MenuCard />
                        <CartItems /></div>}
            </div>
        </div>
    );
}