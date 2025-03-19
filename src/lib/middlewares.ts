import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found");
        return null;
    }
    try {
        const decodedToken = jwtDecode(token);

        const userId = (decodedToken as any).user_id;
        console.log(userId);

        return userId;
    } catch (error) {
        console.error("Error decoding token", error);
        return null;
    }
}

export default getUserIdFromToken;