import { jwtDecode } from "jwt-decode";

// Fonction de vérification de l'authentification
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log(token); // Vérifiez la valeur du token


    if (token) {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();

        return currentTime < expirationTime;
    }

    return false;
};

// Fonction de vérification des rôles
export const hasRequiredRole = (requiredRoles) => {
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role; // Utiliser le champ 'roles' plutôt que 'role'

        // Vérifier si l'utilisateur a au moins l'un des rôles requis
        return requiredRoles.some(role => userRole.includes(role));
    }

    return false;
};

// Fonction de protection des routes avec vérification des rôles
export const isProtectRouteWithRoles = (requiredRoles) => {

    if (isAuthenticated()) {
        if (hasRequiredRole(requiredRoles)) {
            console.log(true)
            return true;
        } else {
            console.log(false)
            return false;
        }
    } 
    console.log(false)
    return false;
};