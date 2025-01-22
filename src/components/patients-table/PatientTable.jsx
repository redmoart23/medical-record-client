import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PropTypes from "prop-types";
import { PatientTableRow } from "@/components/patients-table/PatientTableRow";

const PatientTable = ({ patients }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#0A4C7C] hover:bg-[#0A4C7C]">
            <TableHead className="text-white font-medium">ID</TableHead>
            <TableHead className="text-white font-medium">Paciente</TableHead>
            <TableHead className="text-white font-medium">
              Identificación
            </TableHead>
            <TableHead className="text-white font-medium">Celular</TableHead>
            <TableHead className="text-white font-medium">Entidad</TableHead>
            <TableHead className="text-white font-medium">
              Ultima Atención
            </TableHead>
            <TableHead className="text-white font-medium">
              Tipo de Atención
            </TableHead>
            <TableHead className="text-white font-medium">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient, index) => (
            <PatientTableRow key={patient.id} patient={patient} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

PatientTable.propTypes = {
  patients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      identification: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      entity: PropTypes.string.isRequired,
      lastAttention: PropTypes.string.isRequired,
      attentionType: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default PatientTable;
