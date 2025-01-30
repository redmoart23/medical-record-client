import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { GetPatientsUseCase } from "@/core/use-cases/get-patients.use-case";

export const useFetchPatients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const doctorName = jwtDecode(localStorage.getItem("x-token")).name;
  useEffect(() => {
    const fetchtPatients = async () => {
      const patients = await GetPatientsUseCase();
      setPatients(patients.patients);
    };

    fetchtPatients();
  }, []);

  const logout = () => {
    console.log("logout clicked");
    localStorage.clear();
    navigate("/");
  };

  return { patients, logout, doctorName };
};
