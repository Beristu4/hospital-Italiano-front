
import { useState } from 'react'
import './CardResult.Module.css'

const CardResult = ({ result ,onRefresh}) => {

    const [selectedCard, setSelectedCard] = useState(null);
    const [openModalDelete, setopenModalDelete] = useState(false);
    let idTodeleted = 0;
    const handleGeneratePdf = async (id) => {
        if (!id) {
        alert("Debe seleccionar un historial válido");
        return;
        }
        // Llamada al backend que genera el PDF
        const response = await fetch(`https://localhost:7137/pdf/${id}`, {
            method: "GET",
            headers: {
            "Accept": "application/pdf"
            }
        });

        if (!response.ok) {
            throw new Error(`Error al generar PDF (${response.status})`);
        }

        // Convertimos la respuesta en blob (archivo)
        const blob = await response.blob();

        // Creamos una URL temporal del blob
        const url = window.URL.createObjectURL(blob);

        // Abrimos el PDF en una nueva pestaña (opcional)
        window.open(url);
    }
    
    const handleDelete = async (id) => {
          const response = await fetch(`https://localhost:7137/delete/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`No se pudo eliminar el registro`);
        }else{
            await onRefresh();
            alert("Registro Eliminado Exitosamente")
        }
    }

    function handleView(mh, item){
        setSelectedCard({...mh, ...item, historyId:mh.id});
    }

    function openModalDeleted(id){
        setopenModalDelete(true);
        idTodeleted = id;
    }

    function closeModalDeleted(){
         setopenModalDelete(false);
    }

    const closeModal = () => {
        setSelectedCard(null);
    };

    if(result?.message === "Debe ingresar un DNI para buscar."){
        return(
            <div className='sin-info'>
                <p>No se encontraron resultados</p>
            </div>
        )
    }
    return(
       <div className="container-card">
        <h2>Resultados de la búsqueda:</h2>
            <div className="header-card">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Obra Social</th>
                            <th>Motivo</th>
                            <th>Fecha</th>
                            <th>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                       {result.map((item, index) => (
                        item.medicalHistories.map((mh, i) => (
                            <tr key={`${index}-${i}`}>
                                <td>{item.name}</td>
                                <td>{item.lastName}</td>
                                <td>{item.dni}</td>
                                <td>{item.healthInsurance}</td>
                                <td>{mh.motive}</td>
                                <td>{new Date(mh.createDate).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleView(mh, item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004d74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>
                                    </button>
                                        <button onClick={() => handleGeneratePdf(mh.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004d74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg></button>
                                        <button onClick={() => openModalDeleted(mh.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004d74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>
                                </td>
                            </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
            {openModalDelete &&
                <div className="modal-deleted-container">
                    <div className="modal-content-deleted">
                    <h4>Esta seguro que desea eliminar el registro?,  no podra volver hacia atras...</h4>
                    <div className="modal-buttons-deleted">
                        <button className='' onClick={() => handleDelete(idTodeleted)}>Si</button>
                        <button onClick={() => closeModalDeleted()}>No</button>
                    </div>
                    </div>
                </div>
            }
            {/* Modal para ver el detalle */}
            {selectedCard && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Detalle del paciente:</h3>
                            <p><strong>Fecha:</strong> {new Date(selectedCard.createDate).toLocaleDateString()}</p>
                            <div>
                                <button onClick={() => handleGeneratePdf(selectedCard.historyId)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg></button>
                                <button onClick={closeModal}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
                            </div>
                        </div>
                        <div className="modal-content-display">
                            <div className='modal-personal'>
                                <h4>Registro Personal</h4>
                                <p><strong>Nombre:</strong> {selectedCard.name} {selectedCard.lastName}</p>
                                <p><strong>Edad:</strong> {selectedCard.age}</p>
                                <p><strong>DNI:</strong> {selectedCard.dni}</p>
                                <p><strong>Telefono:</strong> {selectedCard.telephone}</p>
                                <p><strong>Obra Social:</strong> {selectedCard.healthInsurance}</p>
                                <p>
                                <strong>Motivo:</strong>{" "}
                                {selectedCard.motive.length > 20
                                    ? selectedCard.motive.slice(0, 20) + "..."
                                    : selectedCard.motive}
                                </p>
                                
                            </div>
                            <div className='modal-medical'>
                                <h4>Registro Médico</h4>
                                <p className="truncate"><strong>Historial Medico:</strong> {selectedCard.medicalHistory}</p>
                                <p><strong>Analisis de Sangre:</strong> {selectedCard.bloodAnalysis ? "Si": "No"}</p>
                                <p><strong>Estudios Recientes:</strong> {selectedCard.recentStudies ? "Si": "No"}</p>
                                <p><strong>Medicacion:</strong> {selectedCard.medication}</p>
                            </div>
                             <div className='modal-sport'>
                                <h4>Registro Deportivo</h4>
                                <p className="truncate"><strong>Deporte:</strong> {selectedCard.sport}</p>
                                <p><strong>Club:</strong> {selectedCard.club}</p>
                                <p><strong>Posicion:</strong> {selectedCard.position }</p>
                                <p><strong>Suplementacion:</strong> {selectedCard.suplementation ? "Si": "No"}</p>
                            </div>
                                <div className='modal-training'>
                                <h4>Calendario de Entrenamiento</h4>
                                <p>{selectedCard.trainingSchedule}</p>
                            </div>
                                {/* <div className='modal-alimentario'>
                                <h4>Informe Deportivo</h4>
                                <p className="truncate"><strong>Deporte:</strong> {selectedCard.sport}</p>
                                <p><strong>Club:</strong> {selectedCard.club}</p>
                                <p><strong>Posicion:</strong> {selectedCard.position }</p>
                                <p><strong>Suplementacion:</strong> {selectedCard.suplementation ? "Si": "No"}</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
       </div>
    )
}

export default CardResult;