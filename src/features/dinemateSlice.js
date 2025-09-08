import { createSlice } from "@reduxjs/toolkit";


const dinemateSlice = createSlice({
    name: 'dinemate',
    initialState: {
        tableNumber: 0,
        cartItems: [],
        confirmedCart: [],
        confirmedItems: [],
        //billNeeded: false,
        orderConfirmed: false
    },
    reducers: {
        addItems(state, action) {
            state.orderConfirmed = false
            const existing = state.cartItems.find(item => item.id === action.payload.id)
            if (existing) {
                existing.quantity += 1;
            }
            else {
                state.cartItems.push({ ...action.payload, quantity: 1 })
            }
        },
        removeItems(state, action) {
            const item = state.cartItems.find(item => item.id === action.payload.id)
            if (item.quantity > 1) {
                item.quantity -= 1;
            }
            else {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
            }
        },
        confirmOrder(state, action) {
            if (state.cartItems.length === 0) return;

            const total = state.cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            const ongoingOrder = state.confirmedItems.find(
                order => order.tableNumber === state.tableNumber && !order.status.paid
            );

            let orderToSave;

            // In confirmOrder
            if (ongoingOrder) {
                ongoingOrder.items.push(
                    ...state.cartItems.map(item => ({ ...item, price: item.price * item.quantity }))
                );
                ongoingOrder.total += total;
                orderToSave = ongoingOrder;
            } else {
                const newOrder = {
                    id: Date.now(),
                    tableNumber: state.tableNumber,
                    items: state.cartItems.map(item => ({ ...item, price: item.price * item.quantity })),
                    status: { prepared: false, pickedUp: false, paid: false },
                    total,
                    billNeeded: false
                };
                state.confirmedItems.push(newOrder);
                orderToSave = newOrder;
            }
            console.log("SLICE:", [...state.confirmedItems])

            state.cartItems = [];
            localStorage.setItem("orders", JSON.stringify(state.confirmedItems));

            console.log("Saved Orders:", JSON.parse(localStorage.getItem("orders")));
        }
        ,
        setTableNumber(state, action) {
            state.tableNumber = action.payload
        },
        setBillNeeded(state, action) {
            const tableNumber = action.payload;

            state.confirmedItems = state.confirmedItems.map(order =>
                order.tableNumber === tableNumber
                    ? { ...order, billNeeded: true }
                    : order
            );

            localStorage.setItem("orders", JSON.stringify(state.confirmedItems));

            console.log("BILL NEEDED FUNCTION", state.confirmedItems)
        },

        loadOrdersFromStorage(state) {
            const stored = JSON.parse(localStorage.getItem("orders")) || [];
            state.confirmedItems = stored
        }


    }
})

export const { addItems, removeItems, confirmOrder, setTableNumber, setBillNeeded, loadOrdersFromStorage } = dinemateSlice.actions;
export default dinemateSlice.reducer;