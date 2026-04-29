export const getDentistasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/dentista`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const getDentistaPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/dentista/${codigo}`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const deleteDentistaPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/dentista/${codigo}`, {
        method: "DELETE", headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const salvarDentistaAPI = async (objeto, metodo) => {
    const url = metodo === 'PUT'
        ? `${process.env.REACT_APP_ENDERECO_API}/dentista/${objeto.codigo}`
        : `${process.env.REACT_APP_ENDERECO_API}/dentista`;
    const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
};