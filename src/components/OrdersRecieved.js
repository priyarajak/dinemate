import React, { useState, useEffect } from "react";
import { Navbar, Container, Badge, Card, Form } from "react-bootstrap";
import { useSelector } from 'react-redux'

// const confirmedItems = [
//     {
//         id: 1,
//         tableNumber: 1,
//         items: [
//             { id: 101, name: "Paneer Tikka", price: 250, quantity: 2, prepared: false },
//             { id: 102, name: "Butter Naan", price: 50, quantity: 4, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 700,
//         billNeeded: true
//     },
//     {
//         id: 2,
//         tableNumber: 2,
//         items: [
//             { id: 201, name: "Veg Biryani", price: 300, quantity: 1, prepared: false },
//             { id: 202, name: "Gulab Jamun", price: 80, quantity: 2, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 460,
//         billNeeded: false
//     },
//     {
//         id: 3,
//         tableNumber: 3,
//         items: [
//             { id: 301, name: "Masala Dosa", price: 180, quantity: 2, prepared: false },
//             { id: 302, name: "Filter Coffee", price: 60, quantity: 2, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 480,
//         billNeeded: true
//     },
//     {
//         id: 4,
//         tableNumber: 4,
//         items: [
//             { id: 401, name: "Paneer Butter Masala", price: 300, quantity: 1, prepared: false },
//             { id: 402, name: "Roti", price: 20, quantity: 4, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 380,
//         billNeeded: true
//     },
//     {
//         id: 5,
//         tableNumber: 5,
//         items: [
//             { id: 501, name: "Chicken Biryani", price: 350, quantity: 2, prepared: false },
//             { id: 502, name: "Salad", price: 50, quantity: 2, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 800,
//         billNeeded: false
//     },
//     {
//         id: 6,
//         tableNumber: 6,
//         items: [
//             { id: 601, name: "Veg Fried Rice", price: 200, quantity: 3, prepared: false },
//             { id: 602, name: "Manchurian", price: 150, quantity: 2, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 900,
//         billNeeded: false
//     },
//     {
//         id: 7,
//         tableNumber: 7,
//         items: [
//             { id: 701, name: "Daal Tadka", price: 180, quantity: 1, prepared: false },
//             { id: 702, name: "Jeera Rice", price: 120, quantity: 2, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 420,
//         billNeeded: false
//     },
//     {
//         id: 8,
//         tableNumber: 8,
//         items: [
//             { id: 801, name: "Veg Pizza", price: 400, quantity: 1, prepared: false },
//             { id: 802, name: "Garlic Bread", price: 120, quantity: 2, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 640,
//         billNeeded: false
//     },
//     {
//         id: 9,
//         tableNumber: 9,
//         items: [
//             { id: 901, name: "Pasta Alfredo", price: 350, quantity: 2, prepared: false },
//             { id: 902, name: "Coke", price: 50, quantity: 3, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 850,
//         billNeeded: false
//     },
//     {
//         id: 10,
//         tableNumber: 10,
//         items: [
//             { id: 1001, name: "Samosa", price: 30, quantity: 6, prepared: false },
//             { id: 1002, name: "Chai", price: 20, quantity: 4, prepared: false }
//         ],
//         status: { pickedUp: false, paid: false },
//         total: 260,
//         billNeeded: false
//     }
// ];


export default function OrderRecieved() {
    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const { confirmedItems } = useSelector(state => state.dinemate)

    useEffect(() => {
        const active = confirmedItems.filter(o => !o.status.paid);
        const completed = confirmedItems.filter(o => o.status.paid);
        setActiveOrders(active);
        setCompletedOrders(completed);
    }, []);

    const handleItemPrepared = (orderId, itemId) => {
        setActiveOrders(prev =>
            prev.map(order =>
                order.id === orderId
                    ? {
                        ...order,
                        items: order.items.map(item =>
                            item.id === itemId ? { ...item, prepared: !item.prepared } : item
                        )
                    }
                    : order
            )
        );
    };

    const handlePickedUp = (orderId) => {
        setActiveOrders(prev =>
            prev.map(order =>
                order.id === orderId
                    ? { ...order, status: { ...order.status, pickedUp: !order.status.pickedUp } }
                    : order
            )
        );
    };

    const handleBillPaid = (orderId) => {
        setActiveOrders(prev => {
            const order = prev.find(o => o.id === orderId);
            if (order) {
                const updated = { ...order, status: { ...order.status, paid: true } };
                setCompletedOrders(comp => [...comp, updated]);
            }
            return prev.filter(o => o.id !== orderId);
        });
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
                        const allPrepared = order.items.every(item => item.prepared);
                        return (
                            <Card
                                key={order.id}
                                className="shadow-sm rounded p-3"
                                style={{ flex: "1 1 300px", minWidth: "280px", border: "1px solid #ddd" }}
                            >
                                <Card.Body>
                                    <Card.Title>Table {order.tableNumber}</Card.Title>
                                    {order.billNeeded && <div className="blinking-text text-success border border-success"
                                        style={{ width: "fit-content", padding: "4px", marginBottom: "4px" }}>Bill Needed</div>}
                                    <ul className="list-unstyled mb-3">
                                        {order.items.map(item => (
                                            <li key={item.id} className="d-flex justify-content-between align-items-center mb-2">
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

