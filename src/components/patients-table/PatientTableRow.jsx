/* eslint-disable react/prop-types */
//* React imports
import PropTypes from "prop-types";

//* Styles imports
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

//* Components imports
import { StatusBadge } from "@/components/patients-table/StatusBadge";
import PatientInfo from "@/components/patient-info/PatientInfo";

//* Hooks imports
import { useHandleTableRow } from "@/hooks/patients-table/useHandleTableRow";

export const PatientTableRow = ({ patient, index }) => {
  const {
    showModal,
    setShowModal,
    patientData,
    observations,
    handleClick,
    handleUpdatePatient,
  } = useHandleTableRow(patient);

  return (
    <>
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="w-[800px] max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-grow">
              <PatientInfo
                patients={patientData}
                onUpdate={handleUpdatePatient}
                observations={observations}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
      <TableRow className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
        <TableCell className="font-medium">
          {patient._id.slice(patient._id.length - 6, patient._id.length)}
        </TableCell>
        <TableCell>
          <span
            className="text-[#4CAF50] hover:text-[#388E3C] hover:underline cursor-pointer"
            onClick={handleClick}
          >
            {patient.name}
          </span>
        </TableCell>
        <TableCell>
          {patient.identificationType} - {patient.identification}
        </TableCell>
        <TableCell>{patient.cellPhone}</TableCell>
        <TableCell>{patient.entity}</TableCell>
        <TableCell>
          {" "}
          {observations?.observations?.length > 0
            ? observations.observations[
                observations.observations.length - 1
              ].createdAt.split("T")[0]
            : "sin consultas"}
        </TableCell>
        <TableCell>{patient.visitType}</TableCell>
        <TableCell>
          <StatusBadge status={patient.status} />
        </TableCell>
      </TableRow>
    </>
  );
};

PatientTableRow.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    identification: PropTypes.string,
    phone: PropTypes.string,
    provider: PropTypes.string,
    lastVisit: PropTypes.string,
    consultationType: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
