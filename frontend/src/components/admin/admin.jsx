import { useNavigate } from "react-router-dom"

export function AdminDashboard(){
    const navigate = useNavigate()
    function handleLogOut(){
            navigate('/login')
    }
    return(
        <div>
            <div>
                <h2>Admin Dashboard</h2>
                <button onClick={handleLogOut}>LogOut</button>
            </div>
        </div>
    )
}