import { useNavigate } from "react-router-dom";

export default function StartPage() {
    const navigate = useNavigate();

    const onAdminClick = () => {
        navigate("/admin-login")
    }

    const onCustomerClick = () => {
        navigate("/customer")

    }

    return (
        <div class="vh-100 d-flex justify-content-center align-items-center">
            <button onClick={onAdminClick} type="button" class="btn btn-outline-info">Admin</button>
            <button onClick={onCustomerClick} type="button" class="btn btn-outline-info">Customer</button>
        </div>
    );

}