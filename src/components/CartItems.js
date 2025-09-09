import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import { addItems, removeItems, confirmOrder, setBillNeeded, loadOrdersFromStorage } from '../features/dinemateSlice'

export default function CartItems() {

    const { cartItems, confirmedItems, tableNumber } = useSelector(state => state.dinemate)
    //const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(() => {
        const syncOrders = () => dispatch(loadOrdersFromStorage());
        window.addEventListener("storage", syncOrders);
        return () => window.removeEventListener("storage", syncOrders);
    }, [dispatch]);


    const order = confirmedItems.find(
        o => o.tableNumber === tableNumber && !o.status.paid
    );

    const billStatus = order?.billNeeded || false;
    let billedItems = []
    if (billStatus) {
        billedItems = order.items?.reduce((res, item) => {
            const exists = res.find(i => i.name === item.name)
            if (!exists) {
                res.push({ ...item, price: item.price * item.quantity })
            }
            else {
                exists.quantity += item.quantity;
                exists.price += item.price * item.quantity
            }
            return res
        }, [])
    }



    const subTotal = order && order.items ? order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0
    const grandTotal = parseFloat((1.1 * subTotal).toFixed(2));
    console.log(order?.items)

    return (
        <>
            {billStatus && <div>
                <h1 className="fs-4 fs-md-3 text-center">Thankyou for Dining with us !!</h1>
                <ul className="list-unstyled">
                    {billedItems && billedItems.map(item => (
                        <li key={item.id} className="mb-3 border-bottom pb-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{item.name} :</h5>
                                    <div className="d-flex align-items-center gap-2">
                                        <span>{item.quantity}</span>
                                    </div>
                                </div>
                                <span className="fw-bold">${item.price}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="d-flex justify-content-between">
                    <h5>Taxes :</h5><span>{0.1 * subTotal}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                    <h4 className="fs-4 fs-md-3 text-center">Grand Total :</h4><span>{grandTotal}</span>
                </div>
            </div>}
            {!billStatus && <div>
                <h1 className="fs-4 fs-md-3 text-center">Everything Looks so Yummy</h1>
                <div className="scrollable-menu p-2" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                    <ul className="list-unstyled">
                        {order && order.items && order.items.map(item => (
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
                                            <button onClick={() => dispatch(addItems(item))} type="button" className="btn btn-outline-primary btn-sm px-3">+</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => dispatch(removeItems(item))} type="button" className="btn btn-outline-primary btn-sm px-3">-</button>
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
                        type="button" className={cartItems.length !== 0 ? "btn btn-primary" : "btn btn-secondary"}
                        disabled={cartItems.length === 0 && confirmedItems.billNeeded} >Add These</button>
                    <div className="d-flex justify-content-between">
                        <h5>Taxes :</h5><span>{0.1 * subTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold">
                        <h4 className="fs-4 fs-md-3 text-center">Grand Total :</h4><span>{grandTotal}</span>
                    </div>
                    <div className="d-grid gap-2">
                        <button onClick={() => dispatch(setBillNeeded(tableNumber))} className="btn btn-primary" disabled={billStatus} type="button">Bill Please</button>
                    </div>
                </div>
            </div>}
        </>
    )
}