import { jwtDecode } from "jwt-decode";

const NOMEAPP = 'clinicapwa';

export const getToken = () => {
    const local = localStorage.getItem(NOMEAPP + '/autenticacao');
    const autenticacao = local ? JSON.parse(local) : null;
    if (!autenticacao || autenticacao.auth === false) return null;
    let decoded = jwtDecode(autenticacao.token);
    if (decoded.exp <= Math.floor(new Date() / 1000)) {
        logout();
        throw 'Token expirado';
    }
    return autenticacao.token;
};

export const getUsuario = () => {
    const local = localStorage.getItem(NOMEAPP + '/autenticacao');
    const autenticacao = local ? JSON.parse(local) : null;
    if (!autenticacao || autenticacao.auth === false) return null;
    let decoded = jwtDecode(autenticacao.token);
    if (decoded.exp <= Math.floor(new Date() / 1000)) {
        logout();
        throw 'Token expirado';
    }
    return decoded.usuario;
};

export const gravaAutenticacao = (json) => {
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify(json));
};

export const logout = () => {
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify({
        auth: false, token: ''
    }));
};