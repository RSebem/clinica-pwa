export const getPacientesAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/paciente`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const getPacientePorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/paciente/${codigo}`, {
        method: "GET", headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const deletePacientePorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/paciente/${codigo}`, {
        method: "DELETE", headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const salvarPacienteAPI = async (objeto, metodo) => {
    const url = metodo === 'PUT'
        ? `${process.env.REACT_APP_ENDERECO_API}/paciente/${objeto.codigo}`
        : `${process.env.REACT_APP_ENDERECO_API}/paciente`;
    const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    });
    return await response.json();
};