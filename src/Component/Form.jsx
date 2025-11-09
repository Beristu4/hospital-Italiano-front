import { useState } from "react";
import './form.Module.css';

const Form = () => {


    const handleChange = (event) =>{
        const { name, value } = event.target;
        console.log(name, value);
        setFormData({ ...formData, [name]: value });
    };

    const sendForm = async (event) =>{
        event.preventDefault();
        try{
            const response = await fetch('https://bullionless-solange-tinglingly.ngrok-free.dev/createUser', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
                body: JSON.stringify(formData),
            });

            if(response.ok){
                alert('Formulario enviado con exito');
            }else{
                alert('Error al enviar el formulario');
            }
        }catch(error){
            console.error("Error enviando formulario:", error);
            alert("Error al conectar con el servidor.");
        }
    }

    const [formData, setFormData] = useState({
        //informacion personal
        name: '',
        lastName: '',
        dni: '',
        age: '',
        healthInsurance: '',
        telephone: '',
        //motivo
        motive: '',
        //informe medico
        medicalHistory: '',
        bloodAnalysis: false,
        recenteStudies: false,
        medication:'',
        //informe deportivo
        sport:'',
        club:'',
        position:'',
        suplementation:false,
        trainingSchedule:'',
        breackfast:'',
        breackfastSnack:'',
        lunch:'',
        lunchSnack:'',
        mid:'',
        midSnack:'',
        dinner:'',
        water:'',
        allergies:'',
    });

    // Detecta si todos los campos están completos
    // useEffect(() => {
    //     const allFilled = Object.values(formData).every(value => value.trim() !== "");
    //     console.log(allFilled);
    //     setIsValid(allFilled);
    // }, [formData]);
    return(
        <div className="container">
            <div className="title-form">
                <form>
                    <div className="personal-information">
                        <h2>Informacion Personal</h2>
                        <div className="grid-1">
                            <label className="form-name" htmlFor="Nombre">Nombre:</label>
                            <input 
                            type="text" 
                            placeholder="Agustin"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            />
                            <label className="form-lastName" htmlFor="Apellido">Apellido:</label>
                            <input 
                            type="text" 
                            placeholder="Benito"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            />
                            <label className="form-dni" htmlFor="dni">Dni:</label>
                            <input 
                            type="text" 
                            placeholder="41882909"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="grid-2">
                            <label className="form-age" htmlFor="age">Edad:</label>
                            <input 
                            type="text" 
                            placeholder="28"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            />
                            <label className="form-healthInsurance" htmlFor="healthInsurance">Obra Social:</label>
                            <input 
                            type="text" 
                            placeholder="Pami"
                            name="healthInsurance"
                            value={formData.healthInsurance}
                            onChange={handleChange}
                            required
                            />
                            <label className="form-telephone" htmlFor="telephone">Telefono:</label>
                            <input 
                            type="text" 
                            placeholder="261378899"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="motive">
                        <h2 className="form-motive">Motivo</h2>
                            <textarea 
                            type="area" 
                            placeholder="Me duele la espalda"
                            name="motive"
                            value={formData.motive}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="medical-history">
                        <div className="title-med">
                            <h2>Historial Medico</h2>
                        </div>
                        <div className="container-med">
                            <label className="form-medicalHistory" htmlFor="medicalHistory">Antecedentes Patologicos</label>
                            <textarea 
                            type="text" 
                            placeholder="Diabetes, hipotiroidismo,etc"
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleChange}
                            required
                            />
                            <div className="blood-analisis">
                                <div>
                                    <label className="form-bloodAnalysis" htmlFor="bloodAnalysis">Analisis de Sangre</label>
                                </div>
                                <div>
                                    <label>
                                    <input
                                    type="radio"
                                    name="bloodAnalysis"
                                    value="true"
                                    checked={formData.bloodAnalysis === true}
                                    onChange={() => setFormData({ ...formData, bloodAnalysis: true })}
                                    />
                                    <span>Si</span>
                                    </label>

                                    <label>
                                    <input
                                    type="radio"
                                        name="bloodAnalysis"
                                        value="false"
                                        checked={formData.bloodAnalysis === false}
                                    onChange={() => setFormData({ ...formData, bloodAnalysis: false })}
                                    />
                                    <span>No</span>
                                    </label>
                                </div>
                            </div>
                            <div className="recent-studies">
                                <div>
                                    <label className="form-recenteStudies" htmlFor="recenteStudies">Estudios Recientes</label>
                                </div>
                                <div>
                                    <label>
                                    <input
                                    type="radio"
                                    name="recenteStudies"
                                    value="true"
                                    checked={formData.recenteStudies === true}
                                    onChange={() => setFormData({ ...formData, recenteStudies: true })}
                                    />
                                    <span>Si</span>
                                    </label>

                                    <label>
                                    <input
                                        type="radio"
                                        name="recenteStudies"
                                        value="false"
                                        checked={formData.recenteStudies === false}
                                        onChange={() => setFormData({ ...formData, recenteStudies: false })}
                                    />
                                    <span>No</span>
                                    </label>
                                </div>
                            </div>      
                            <label className="form-medication" htmlFor="medication">Medicacion</label>
                            <textarea 
                            type="text" 
                            placeholder="Medicacion"
                            name="medication"
                            value={formData.medication}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="sport">
                        <h2>Informe Deportivo:</h2>
                        <label className="form-sport" htmlFor="sport">Deporte:</label>
                        <input 
                        type="text"
                        placeholder="Futbol"
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-club" htmlFor="club">Club:</label>
                        <input 
                        type="text"
                        placeholder="Godoy Cruz"
                        name="club"
                        value={formData.club}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-position" htmlFor="position">Posición:</label>
                        <input 
                        type="text"
                        placeholder="Delantero"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        />
                        <div className="suplementation">
                            <div>
                                <label className="form-suplementation" htmlFor="suplementation">Suplementacion</label>
                            </div>
                            <div>
                                <label>
                                <input
                                type="radio"
                                name="suplementation"
                                value="true"
                                checked={formData.suplementation === true}
                                onChange={() => setFormData({ ...formData, suplementation: true })}
                                />
                                <span>Si</span>
                                </label>

                                <label>
                                <input
                                    type="radio"
                                    name="suplementation"
                                    value="false"
                                    checked={formData.suplementation === false}
                                    onChange={() => setFormData({ ...formData, suplementation: false })}
                                />
                                <span>No</span>
                                </label>
                            </div>
                        </div>
                        <div className="calendario">
                            <h2>Calendario de entrenamiento:</h2>
                            <textarea 
                            type="text" 
                            placeholder="Colocar dias y horarios de entrenamiento, espcificando si entrena un solo turno o doble turno
                            Ejemplo: 
                            Lunes: 14:30 a 16:30


                            Martes: 14:30 a 16:30 etc
                            "
                            name="trainingSchedule"
                            value={formData.trainingSchedule}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
                    <div className="registro-alimentario">
                        <h2>Registro de Comidas:</h2>
                        <label className="form-breackfast" htmlFor="breackfast">Desayuno</label>
                        <textarea 
                        type="text" 
                        placeholder="Ejemplo de desayuno , espcificar cantidades"
                        name="breackfast"
                        value={formData.breackfast}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-breackfastSnack" htmlFor="breackfastSnack">Colacion despues del Desayuno</label>
                        <textarea 
                        type="text" 
                        placeholder="Ejemplo de colcacion del desayuno , espcificar cantidades"
                        name="breackfastSnack"
                        value={formData.breackfastSnack}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-lunch" htmlFor="lunch">Almuerzo</label>
                        <textarea 
                        type="text" 
                        placeholder="Ejemplo de almuerzo , espcificar cantidades"
                        name="lunch"
                        value={formData.lunch}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-lunchSnack" htmlFor="lunchSnack">Colacion despues del Almuerzo</label>
                        <textarea 
                        type="text" 
                        placeholder="Ejemplo de almuerzo , espcificar cantidades"
                        name="lunchSnack"
                        value={formData.lunchSnack}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-mid" htmlFor="mid">Media tarde</label>
                        <textarea 
                        type="text" 
                        placeholder="Ejemplo de Media Tarde , espcificar cantidades"
                        name="mid"
                        value={formData.mid}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-midSnack" htmlFor="midSnack">Colacion despues de la Media Tarde</label>
                        <textarea 
                        type="text" 
                        placeholder="Ejemplo de colacion despues de la Media Tarde , espcificar cantidades"
                        name="midSnack"
                        value={formData.midSnack}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-dinner" htmlFor="dinner">Cena</label>
                        <textarea 
                        type="text" 
                        placeholder="Ejemplo de Cena , espcificar cantidades"
                        name="dinner"
                        value={formData.dinner}
                        onChange={handleChange}
                        required
                        />
                        <label className="form-water" htmlFor="water">Agua</label>
                        <input 
                        type="text" 
                        placeholder="Ejemplo: 6 vasos , 3 litros, etc"
                        name="water"
                        value={formData.water}
                        onChange={handleChange}
                        required
                        />
                          <label className="form-allergies" htmlFor="allergies">Alergias</label>
                        <input 
                        type="text" 
                        placeholder="Ejemplo: lacteos, gluten, alimentos que generan inflamacion/diarrea ,etc"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    {/* <TrainingSchedule setFormData={setFormData}/> */}

                </form>
                <div className="button-send">
                    <button type="submit" onClick={sendForm}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Form;