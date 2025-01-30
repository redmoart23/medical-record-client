import { useState, useEffect } from "react";

import { GetPatientUseCase } from "@/core/use-cases/get-patient.use-case";
import { UpdatePatientUseCase } from "@/core/use-cases/update-patient.use-case";
import { getObservationsUseCase } from "@/core/use-cases/get-observations.use-case";

export const useHandleTableRow = (patient) => {
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
  };

  return {
    showModal,
    setShowModal,
    patientData,
    setPatientData,
    observations,
    handleClick,
    handleUpdatePatient,
  };
};
