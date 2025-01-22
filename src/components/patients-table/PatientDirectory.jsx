import PatientTable from "@/components/patients-table/PatientTable";
import { useEffect, useState } from "react";
import { GetPatientsUseCase } from "@/core/use-cases/get-patients.use-case";

const PatientDirectory = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchtPatients = async () => {
      const patients = await GetPatientsUseCase();
      setPatients(patients.patients);
    };

    fetchtPatients();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#0A4C7C] mb-6">
        Directorio de Pacientes
      </h1>
      <PatientTable patients={patients} />
    </div>
  );
};

export default PatientDirectory;
