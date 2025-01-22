import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";

export const ObservationsCard = ({ observations }) => {
  return (
    <div className="flex flex-col gap-4 pt-4 border-t">
      {observations.map((observation, index) => (
        <div key={index} className="flex justify-between items-center w-full">
          <div>
            <h3 className="text-[#0A3875] font-medium">
              Dr. {observation.doctorName}
            </h3>
            <p className="text-gray-600">{observation.doctorTitle}</p>
            <p className="text-gray-600 mt-2">{observation.notes}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-red-500">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      ))}
    </div>
  );
};

ObservationsCard.propTypes = {
  observations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
    })
  ).isRequired,
};
