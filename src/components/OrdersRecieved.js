import React, { useState, useEffect } from "react";
import { Navbar, Container, Badge, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { loadOrdersFromStorage } from "../features/dinemateSlice"



export default function OrderRecieved() {

    const dispatch = useDispatch()
    const { confirmedItems } = useSelector(state => state.dinemate)
    useEffect(() => {
        dispatch(loadOrdersFromStorage());

        const syncOrders = () => dispatch(loadOrdersFromStorage());
        window.addEventListener("storage", syncOrders);
        return () => window.removeEventListener("storage", syncOrders);
    }, [dispatch]);
    console.log("ORDDE", confirmedItems)
    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    //const [confirmedItems, setConfirmedItems] = useState([])


    useEffect(() => {
        const active = confirmedItems.filter(o => !o.status.paid);
        const completed = confirmedItems.filter(o => o.status.paid);
        setActiveOrders(active);
        setCompletedOrders(completed);
    }, [confirmedItems]);

    const updateLocalStorage = (orders) => {
        localStorage.setItem("orders", JSON.stringify(orders));
        dispatch(loadOrdersFromStorage()); // refresh redux
    };


    const handleItemPrepared = (orderId, itemId) => {
        const updatedOrders = activeOrders.map(order =>
            order.id === orderId
                ? {
                    ...order,
                    items: order.items.map(item =>
                        item.id === itemId ? { ...item, prepared: !item.prepared } : item
                    )
                }
                : order
        );
        setActiveOrders(updatedOrders);
        updateLocalStorage([...updatedOrders, ...completedOrders])
    };

    const handlePickedUp = (orderId) => {
        const updatedOrders = activeOrders.map(order =>
            order.id === orderId
                ? { ...order, status: { ...order.status, pickedUp: !order.status.pickedUp } }
                : order
        );
        setActiveOrders(updatedOrders);
        updateLocalStorage([...updatedOrders, ...completedOrders]);

    };

    const handleBillPaid = (orderId) => {
        const order = activeOrders.find(o => o.id === orderId);
        if (order) {
            // ✅ create a new object, don’t mutate
            const updated = {
                ...order,
                status: { ...order.status, paid: true }
            };

            const newActive = activeOrders.filter(o => o.id !== orderId);
            const newCompleted = [...completedOrders, updated];

            setActiveOrders(newActive);
            setCompletedOrders(newCompleted);
            updateLocalStorage([...newActive, ...newCompleted]);
        }
    };


    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);

    return (
        <div>
            <Navbar style={{ backgroundColor: "#f8f9fa" }} expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand style={{ color: "#333" }}>DineMate Admin</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <div className="d-flex gap-3">
                            <span>
                                Active Orders <Badge bg="warning" text="dark">{activeOrders.length}</Badge>
                            </span>
                            <span>
                                Completed <Badge bg="success">{completedOrders.length}</Badge>
                            </span>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <h4 className="mb-3">Active Orders</h4>
                {activeOrders.length === 0 && <p className="text-muted">No active orders.</p>}
                <div className="d-flex flex-wrap gap-3">
                    {activeOrders.map(order => {
                        const allPrepared = order.items?.every(item => item.prepared);
                        return (
                            <Card
                                key={`${order.id}-${order.tableNumber}`}
                                className="shadow-sm rounded p-3"
                                style={{ flex: "1 1 300px", minWidth: "280px", border: "1px solid #ddd" }}
                            >
                                <Card.Body>
                                    <Card.Title>Table {order.tableNumber}</Card.Title>
                                    {order.billNeeded && <div className="blinking-text text-success border border-success"
                                        style={{ width: "fit-content", padding: "4px", marginBottom: "4px" }}>Bill Needed</div>}
                                    <ul className="list-unstyled mb-3">
                                        {order.items.map(item => (
                                            <li key={`${order.id}-${item.id}`} className="d-flex justify-content-between align-items-center mb-2">
                                                <span>{item.name} × {item.quantity}</span>
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Prepared"
                                                    checked={item.prepared}
                                                    onChange={() => handleItemPrepared(order.id, item.id)}
                                                />
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="d-flex gap-4 mt-2">
                                        <Form.Check
                                            type="checkbox"
                                            label="Picked Up"
                                            checked={order.status.pickedUp}
                                            onChange={() => handlePickedUp(order.id)}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            label="Bill Paid"
                                            checked={order.status.paid}
                                            disabled={!allPrepared}
                                            onChange={() => handleBillPaid(order.id)}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
                <h4 className="mt-5 mb-3">Summary</h4>
                {completedOrders.length === 0 && <p className="text-muted">No completed orders yet.</p>}
                <ul className="list-group shadow-sm rounded">
                    {completedOrders.map(order => (
                        <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>Table {order.tableNumber}</span>
                            <strong>₹{order.total}</strong>
                        </li>
                    ))}
                    {completedOrders.length > 0 && (
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <span>Total Revenue</span>
                            <strong>₹{totalRevenue}</strong>
                        </li>
                    )}
                </ul>
            </Container>
        </div>
    );
};

