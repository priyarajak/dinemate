import menuData from "../data/menuData.json";
import { useSelector, useDispatch } from 'react-redux'
import { addItems } from '../features/dinemateSlice'

export default function MenuCard() {

    const { billNeeded } = useSelector(state => state.dinemate)
    const categoryOrder = ["Drinks", "Starters", "Main Course", "Dessert"];
    const dispatch = useDispatch();

    return (
        <div className="">
            {billNeeded ? (
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Hope You Enjoyed The Meal!</h4>
                    <p class="mb-0">Waiter Will be here in a second.</p>
                </div>) : (
                <div className="scrollable-menu">
                    {categoryOrder.map((category) => (
                        <div className="row g-4">
                            <h5>{category}</h5>
                            <ul>
                                {menuData.filter(item => item.category === category).map(item => (
                                    <li key={item.id} className="card mb-3 menu-card shadow-sm border-0 d-flex justify-content-around" style={{ maxWidth: "540px" }}>
                                        <div class="menu-item ">
                                            <div class="">
                                                <div class="d-flex justify-content-around align-items-center">
                                                    <div class="menu-item img">
                                                        <img src={item.images} class="img-fluid rounded-start " alt={item.name}></img>
                                                    </div>
                                                    <div class="menu-info">
                                                        <div class="card-body">
                                                            <h5 class="card-title fw-bold">{item.name}</h5>
                                                            <p class="prices">
                                                                <span><b>${item.price}</b></span> &nbsp;
                                                    </p>
                                                            <p class="card-text text-muted small">
                                                                {item.ingredients}
                                                            </p>
                                                        </div>

                                                    </div>
                                                    <div className="" role="group" aria-label="Basic outlined example">
                                                        <button onClick={() => dispatch(addItems(item))} type="button" className="btn btn-outline-primary">Add+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                    }
                </div>)
            }</div>
    );
}