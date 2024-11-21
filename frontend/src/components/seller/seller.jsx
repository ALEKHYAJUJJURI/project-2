import { useNavigate } from "react-router-dom";


export function SellerDashboard(){
    const navigate = useNavigate()
    const handleLogout = () => {
        
        navigate('/login');
      };
    return(
        <div>
           <div className="d-flex justify-content-between">
           <h4>Seller Dashboard</h4>
           <button onClick={handleLogout}>LogOut</button>
           </div>
        </div>
    )
}