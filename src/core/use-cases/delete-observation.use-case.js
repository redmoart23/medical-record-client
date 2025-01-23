export const deleteObservationUseCase = async (observationId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/v1/observations/${observationId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("x-token"),
        },
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Error al eliminar la observación");
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
