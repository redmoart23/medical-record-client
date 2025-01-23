import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { Textarea } from "@/components/ui/textarea";
import { createObservationUseCase } from "@/core/use-cases/create-observation.use-case";
import { deleteObservationUseCase } from "@/core/use-cases/delete-observation.use-case";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
export const ObservationsCard = ({ observations, formData }) => {
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

  return (
    <div>
      <div>
        <h2 className="text-[#0A3875] font-medium mb-2">Agregar Observación</h2>
        <Textarea
          placeholder="Observación"
          className="min-h-[120px] resize-none mb-4"
          value={observationField}
          onChange={(e) => setObservationField(e.target.value)}
        />
      </div>

      <Button
        className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
        onClick={handleSaveObservation}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Guardando...
          </>
        ) : (
          "Agregar Observación"
        )}
      </Button>

      <div className="flex flex-col gap-4 pt-4 border-t">
        {observationsList.map((observation, index) => (
          <div key={index} className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-[#0A3875] font-medium">
                Dr. {observation.doctorName}
              </h3>
              <p className="text-gray-600">{observation.doctorTitle}</p>
              <p className="text-gray-600 mt-2">{observation.notes}</p>
            </div>
            <Button
              onClick={() => handleDeleteObservation(observation._id)}
              variant="ghost"
              size="icon"
              className="text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

ObservationsCard.propTypes = {
  formData: PropTypes.shape({
    _id: PropTypes.string,
  }),
  observations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      notes: PropTypes.string,
    })
  ),
};
