//* Styles imports
import { Button } from "@/components/ui/button";

//* Icons imports
import { LogOutIcon } from "lucide-react";

//* Components imports
import PatientTable from "@/components/patients-table/PatientTable";

//* Hooks imports
import { useFetchPatients } from "@/hooks/patients-table/useFetchPatients";

const PatientDirectory = () => {
  const { patients, logout, doctorName } = useFetchPatients();

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
