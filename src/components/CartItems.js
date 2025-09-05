import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItems, removeItems, confirmOrder, setBillNeeded } from '../features/dinemateSlice'

export default function CartItems() {

    const { cartItems, confirmedCart, billNeeded } = useSelector(state => state.dinemate)
    const dispatch = useDispatch()

    const subTotal = confirmedCart ? confirmedCart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0
    const grandTotal = 1.1 * subTotal


    return (
        <>
            {billNeeded && <div>
                <h1>Thankyou for Dining with us !!</h1>
                <ul className="list-unstyled">
                    {confirmedCart && confirmedCart.map(item => (
                        <li key={item.id} className="mb-3 border-bottom pb-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{item.name} :</h5>
                                    <div className="d-flex align-items-center gap-2">
                                        <span>{item.quantity}</span>
                                    </div>
                                </div>
                                <span className="fw-bold">${item.price * item.quantity}</span>
                            </div>
                        </li>
                    ))}
                </ul></div>}
            {!billNeeded && <div>
                <h1>Everything Looks so Yummy</h1>
                <div className="scrollable-menu" style={{ maxHeight: "700px" }}>
                    <ul className="list-unstyled">
                        {confirmedCart && confirmedCart.map(item => (
                            <li key={item.id} className="mb-3 border-bottom pb-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{item.name} :</h5>
                                        <div className="d-flex align-items-center gap-2">
                                            <span>{item.quantity}</span>
                                        </div>
                                    </div>
                                    <span className="fw-bold">${item.price * item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="block-quote" style={{ textAlign: "center", color: "rgb(206 6 69 / 50%)" }}> Wow Good Choices!! Add More !!</p>
                    <hr></hr>
                    <ul className="list-unstyled">
                        {cartItems && cartItems.map(item => (
                            <li key={item.id} className="mb-3 border-bottom pb-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{item.name} :</h5>
                                        <div className="d-flex align-items-center gap-2">
                                            <button onClick={() => dispatch(addItems(item))} type="button" className="btn btn-outline-primary">+</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => dispatch(removeItems(item))} type="button" className="btn btn-outline-primary">-</button>
                                        </div>
                                    </div>
                                    <span className="fw-bold">${item.price * item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-3">
                    <button onClick={() => dispatch(confirmOrder())}
                        type="button" class={cartItems.length !== 0 ? "btn btn-primary" : "btn btn-secondary"}
                        disabled={cartItems.length === 0 && billNeeded} >Add These</button>
                    <div className="d-flex justify-content-between">
                        <h5>Taxes :</h5><span>{0.1 * subTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold">
                        <h4>Grand Total :</h4><span>{grandTotal}</span>
                    </div>
                    <div class="d-grid gap-2">
                        <button onClick={() => dispatch(setBillNeeded())} class="btn btn-primary" disabled={billNeeded} type="button">Bill Please</button>
                    </div>
                </div>
            </div>}
        </>
    )
}