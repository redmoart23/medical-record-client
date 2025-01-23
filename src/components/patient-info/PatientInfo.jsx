import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ObservationsCard } from "@/components/patient-info/ObservationsCard";

const PatientInfo = ({ patients, onUpdate, observations }) => {
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
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-[#0A3875]">
          Información Paciente
        </CardTitle>
        {isEditing && (
          <div className="flex items-center gap-2">
            <Button
              className="w-[80px] bg-[#4CAF50] hover:bg-[#45a049] text-white"
              onClick={handleSave}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </Button>
            <Button
              className="w-[80px] bg-red-600 hover:bg-red-700 text-white"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        )}
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500"
            onClick={handleEdit}
          >
            <Pencil className="h-4 w-4 text-green-600" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h2 className="text-[#0A3875] font-medium mb-1">Paciente</h2>
          {isEditing ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          ) : (
            <p className="text-gray-700">{patients.name}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-[#0A3875] font-medium mb-1">
              Fecha de nacimiento
            </h2>
            {isEditing ? (
              <input
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="text-gray-700">
                {patients.birthDate.split("T")[0]}
              </p>
            )}
          </div>
          <div>
            <h2 className="text-[#0A3875] font-medium mb-1">Edad</h2>
            {isEditing ? (
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="text-gray-700">{patients.age}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-[#0A3875] font-medium mb-1">
              Tipo de Indentificación
            </h2>
            {isEditing ? (
              <input
                name="identificationType"
                value={formData.identificationType}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="text-gray-700">
                {patients.identificationType === "CC"
                  ? "Cedula de Ciudadania"
                  : "Tarjeta de Identidad"}
              </p>
            )}
          </div>
          <div>
            <h2 className="text-[#0A3875] font-medium mb-1">
              N° de Identificación
            </h2>
            {isEditing ? (
              <input
                name="identification"
                value={formData.identification}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="text-gray-700">{patients.identification}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-[#0A3875] font-medium mb-1 flex items-center gap-2">
              Celular
            </h2>
            {isEditing ? (
              <input
                name="cellPhone"
                value={formData.cellPhone}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="text-gray-700">{patients.cellPhone}</p>
            )}
          </div>
          <div>
            <h2 className="text-[#0A3875] font-medium mb-1">Teléfono</h2>
            {isEditing ? (
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="text-gray-700">{patients.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-[#0A3875] font-medium mb-1">Dirección</h2>
            {isEditing ? (
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="text-gray-700">{patients.address}</p>
            )}
          </div>
          <div>
            <h2 className="text-[#0A3875] font-medium mb-1">Ocupación</h2>
            {isEditing ? (
              <input
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            ) : (
              <p className="text-gray-700">{patients.occupation}</p>
            )}
          </div>
        </div>
        <ObservationsCard
          observations={observationsList.observations}
          formData={formData}
        />
      </CardContent>
      <Toaster />
    </Card>
  );
};

PatientInfo.propTypes = {
  onUpdate: PropTypes.func,

  observations: PropTypes.shape({
    notes: PropTypes.string,
  }),

  patients: PropTypes.shape({
    name: PropTypes.string,
    birthDate: PropTypes.string,
    age: PropTypes.number,
    identificationType: PropTypes.string,
    identification: PropTypes.string,
    cellPhone: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    occupation: PropTypes.string,
  }),
};

export default PatientInfo;
