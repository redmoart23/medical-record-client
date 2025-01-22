export const UpdatePatientUseCase = async (patientId, updatedData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/v1/patients/${patientId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("x-token"),
        },
        method: "PUT",
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar la información del paciente");
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
