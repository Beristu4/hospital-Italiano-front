import { useState, useEffect } from "react";
import './TraininSchedule.Module.css';

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const TrainingSchedule = ({ setFormData }) => {
  const [selectedDays, setSelectedDays] = useState({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      trainingSchedule: selectedDays,
    }));
  }, [selectedDays]);

  const toggleDay = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: prev[day]
        ? undefined
        : { start: "", end: "" },
    }));
  };

  const updateTime = (day, field, value) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  return (
    <div>
      <div className="title">
        <h2>Horario de Entrenamiento:</h2>
      </div>

      <div className="container-schedule">
        {days.map((day) => {
          const isActive = !!selectedDays[day];
          return (
            <div key={day} className="day-row">
              <label className="day-label">
                <input
                  type="checkbox"
                  onChange={() => toggleDay(day)}
                  checked={isActive}
                />
                <span>{day}</span>
              </label>

              <div className="time-inputs">
                <label>Inicio:</label>
                <input
                  type="time"
                  value={selectedDays[day]?.start || ""}
                  onChange={(e) => updateTime(day, "start", e.target.value)}
                  disabled={!isActive}
                />
                <label>Fin:</label>
                <input
                  type="time"
                  value={selectedDays[day]?.end || ""}
                  onChange={(e) => updateTime(day, "end", e.target.value)}
                  disabled={!isActive}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingSchedule;
