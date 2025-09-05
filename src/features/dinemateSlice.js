import { createSlice } from "@reduxjs/toolkit";


const dinemateSlice = createSlice({
    name: 'dinemate',
    initialState: {
        tableNumber: 0,
        cartItems: [],
        confirmedCart: [],
        confirmedItems: [],
        billNeeded: false,
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

            const newOrder = {
                id: Date.now(),
                tableNumber: state.tableNumber,
                items: [...state.cartItems],
                status: {
                    prepared: false,
                    pickedUp: false,
                    paid: false
                },
                total
            };
            console.log(newOrder)
            state.confirmedItems.push(newOrder);
            state.confirmedCart.push(...state.cartItems)
            state.cartItems = [];
            state.orderConfirmed = true;
        },
        setTableNumber(state, action) {
            state.tableNumber = action.payload
        },
        setBillNeeded(state, action) {
            state.billNeeded = true
            state.cartItems = []
        }

    }
})

export const { addItems, removeItems, confirmOrder, setTableNumber, setBillNeeded } = dinemateSlice.actions;
export default dinemateSlice.reducer;