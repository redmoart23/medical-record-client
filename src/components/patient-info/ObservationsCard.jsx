// * React imports
import PropTypes from "prop-types";

//* Style imports
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

//* Icons imports
import { Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";

//* Hooks imports
import { useHandleObservations } from "@/hooks/patient-info/useHandleObservations";

export const ObservationsCard = ({ observations, formData }) => {
  const {
    isLoading,
    observationField,
    observationsList,
    setObservationField,
    handleSaveObservation,
    handleDeleteObservation,
  } = useHandleObservations(observations, formData);

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
