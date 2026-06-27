import {useAuth} from "./hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

function App() {
    const navigate = useNavigate()
    const {isAuthenticated, error} = useAuth()
    if (isAuthenticated) {
        navigate('/dashboard')
    } else {
        navigate('/login')
    }
    return (
        <>
            {error}
        </>
    );
}

export default App;
