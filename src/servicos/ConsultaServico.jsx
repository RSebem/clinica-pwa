export const getConsultasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/consulta`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const getConsultaPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/consulta/${codigo}`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const deleteConsultaPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/consulta/${codigo}`, {
        method: "DELETE", headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const salvarConsultaAPI = async (objeto, metodo) => {
    const url = metodo === 'PUT'
        ? `${process.env.REACT_APP_ENDERECO_API}/consulta/${objeto.codigo}`
        : `${process.env.REACT_APP_ENDERECO_API}/consulta`;
    const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
};