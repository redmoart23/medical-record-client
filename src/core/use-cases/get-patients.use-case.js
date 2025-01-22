export const GetPatientsUseCase = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/v1/patients`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("x-token"),
        },
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los pacientes");
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
