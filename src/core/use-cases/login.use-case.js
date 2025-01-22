export const LoginUseCase = async (email, password) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/api/v1/auth`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Error en la petición");
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
