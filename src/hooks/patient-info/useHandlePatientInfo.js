import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useHandlePatientInfo = (patients, onUpdate, observations) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...patients });
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [observationsList, setObservationsList] = useState({ ...observations });

  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    try {
      onUpdate(formData);

      toast({
        title: "Paciente actualizado ✅",
        description:
          "La información del paciente se ha actualizado correctamente.",
        status: "success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error ❌",
        description:
          "Ocurrió un error al actualizar la información del paciente.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    formData,
    isLoading,
    observationsList,
    handleChange,
    handleSave,
    handleEdit,
    handleCancel,
  };
};
