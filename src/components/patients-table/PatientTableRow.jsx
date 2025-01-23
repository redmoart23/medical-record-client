/* eslint-disable react/prop-types */
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/patients-table/StatusBadge";
import PropTypes from "prop-types";
import { GetPatientUseCase } from "@/core/use-cases/get-patient.use-case";
import { useState } from "react";
import PatientInfo from "@/components/patient-info/PatientInfo";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { UpdatePatientUseCase } from "@/core/use-cases/update-patient.use-case";
import { getObservationsUseCase } from "@/core/use-cases/get-observations.use-case";
import { useEffect } from "react";

import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const PatientTableRow = ({ patient, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    const fetchObservations = async () => {
      const observations = await getObservationsUseCase(patient._id);
      setObservations(observations);
    };
    fetchObservations();
  }, [patient._id]);

  const handleUpdatePatient = async (updatedPatient) => {
    const response = await UpdatePatientUseCase(
      updatedPatient._id,
      updatedPatient
    );

    if (response) {
      console.log(response);
      setPatientData(response.updatedPatient);
    }
  };

  const handleClick = async () => {
    const patientId = patient._id;
    const patientData = await GetPatientUseCase(patientId);

    if (!patientData) {
      return;
    }
    setShowModal(true);
    setPatientData(patientData.patient);
    return;
  };

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
          <a
            href="#"
            className="text-[#4CAF50] hover:text-[#388E3C] hover:underline"
            onClick={handleClick}
          >
            {patient.name}
          </a>
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
