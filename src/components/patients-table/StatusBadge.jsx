import { Badge } from "@/components/ui/badge";
import PropTypes from "prop-types";

export const StatusBadge = ({ status }) => {
  const styles = {
    Estable: "bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9]",
    Moderado: "bg-[#FFF3E0] text-[#EF6C00] hover:bg-[#FFF3E0]",
    Crítico: "bg-[#FFEBEE] text-[#C62828] hover:bg-[#FFEBEE]",
  };

  return <Badge className={`${styles[status]} font-medium`}>{status}</Badge>;
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
