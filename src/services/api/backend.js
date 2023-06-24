import api from './api';

const getTipoDocs = () => {
    return api.get('/api/tip-tipo-docs').then(res => res.data);
}

const getProcesos = () => {
    return api.get('/api/pro-procesos').then(res => res.data);
}

const getDocumentos = (data) => {
    const search = data?.search ? data.search : '';
    const tipoDoc = data?.tipoDoc ? data.tipoDoc : '';
    const proceso = data?.proceso ? data.proceso : '';
    let query = search ? `&search=${search}`: '';
    query += tipoDoc ? `&tip_tipo_docs=${tipoDoc}`: '';
    query += proceso ? `&pro_procesos=${proceso}`: '';
    return api.get('/api/doc-documentos?' + query).then(res => res.data);
}

const getDocumento = (id) => {
    return api.get(`/api/doc-documentos/${id}`).then(res => res.data);
}

const postDocumento = (data) => {
    return api.post('/api/doc-documentos', data).then(res => res.data);
}

const updateDocumento = (data, id) => {
    return api.put(`/api/doc-documentos/${id}`, data).then(res => res.data);
}

const deleteDocumento = (id) => {    
    return api.delete(`/api/doc-documentos/${id}`).then(res => res.data);
}
  
export { getTipoDocs, getProcesos, getDocumentos, getDocumento, postDocumento, updateDocumento, deleteDocumento };