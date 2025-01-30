import { useState } from "react";
import { createObservationUseCase } from "@/core/use-cases/create-observation.use-case";
import { deleteObservationUseCase } from "@/core/use-cases/delete-observation.use-case";
import { useToast } from "@/hooks/use-toast";

export const useHandleObservations = (observations, formData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [observationField, setObservationField] = useState("");
  const [observationsList, setObservationsList] = useState(observations);

  const { toast } = useToast();

  const handleSaveObservation = async () => {
    setIsLoading(true);
    try {
      const newObservation = await createObservationUseCase(
        formData._id,
        observationField
      ); // API call

      toast({
        title: "Observación agregada ✅",
        description: "La observación se ha agregado correctamente.",
        status: "success",
      });

      setObservationsList((prev) => [
        ...prev,
        { ...newObservation.observation, notes: observationField },
      ]);

      setObservationField("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error ❌",
        description: "Ocurrió un error al agregar la observación.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
      //setIsEditing(false);
    }
  };

  const handleDeleteObservation = async (id) => {
    try {
      const response = await deleteObservationUseCase(id); // API call

      if (!response.success) {
        throw new Error("Error al eliminar la observación");
      }

      toast({
        title: "Observación eliminada 🗑️",
        description: "La observación se ha eliminado correctamente.",
        status: "success",
      });

      const deletedObservationId = response.observation._id;

      setObservationsList((prev) => {
        console.log("Previous Observations:", prev);
        return prev.filter((o) => o._id !== deletedObservationId);
      });
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Error ❌",
        description: "Ocurrió un error al eliminar la observación.",
        status: "error",
      });
    }
  };

  return {
    isLoading,
    observationField,
    observationsList,
    setObservationField,
    handleSaveObservation,
    handleDeleteObservation,
  };
};
