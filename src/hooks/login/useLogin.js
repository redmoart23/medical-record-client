import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUseCase } from "@/core/use-cases/login.use-case";

export const useLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await LoginUseCase(formData.email, formData.password);

      if (!loginData.success) {
        throw new Error("Error en la petición");
      }
      localStorage.setItem("x-token", loginData.token);
      //document.cookie = `x-token=${loginData.token}; path=/`;
      navigate("/directory");
    } catch (error) {
      setLoginError(true);
      console.log(error);
    }
  };

  return { handleSubmit, formData, setFormData, loginError };
};
