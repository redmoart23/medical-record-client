import PatientTable from "@/components/patients-table/PatientTable";
import { useEffect, useState } from "react";
import { GetPatientsUseCase } from "@/core/use-cases/get-patients.use-case";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PatientDirectory = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const doctorName = jwtDecode(localStorage.getItem("x-token")).name;
  useEffect(() => {
    const fetchtPatients = async () => {
      const patients = await GetPatientsUseCase();
      setPatients(patients.patients);
    };

    fetchtPatients();
  }, []);

  const logout = () => {
    console.log("logout clicked");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#0A4C7C]">
          Directorio de Pacientes
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-[#0A4C7C] font-semibold">Dr. {doctorName}</span>
          <Button
            onClick={logout}
            variant="outline"
            className="hover:bg-slate-300"
          >
            <LogOutIcon /> Salir 
          </Button>
        </div>
      </div>
      <PatientTable patients={patients} />
    </div>
  );
};

export default PatientDirectory;
