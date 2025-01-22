export const createObservationUseCase = async (patientId, notes) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/v1/observations/${patientId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("x-token"),
        },
        method: "POST",
        body: JSON.stringify({notes}),
      }
    );
    if (!response.ok) {
      throw new Error("Error al crear la observación");
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
