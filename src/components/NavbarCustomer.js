import { useSelector, useDispatch } from 'react-redux'

export default function NavbarCustomer() {

    const { tableNumber } = useSelector(state => state.dinemate)

    return (
        <nav class="d-flex justify-content-around bg-body-tertiary">

            <div class="p-2 fs-1 font-monospace">Tapasya</div>
            <div className="p-2 font-arial"> Table Number: {tableNumber}</div>
        </nav>
    );

}