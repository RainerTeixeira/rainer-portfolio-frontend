import React, { ReactElement } from "react";

// Constantes reutilizáveis
const ICON_SIZE = 60;
const CARD_PADDING = "p-6";
const CARD_MARGIN = "m-2"; // Ajuste para margem menor
const CARD_MAX_WIDTH = "max-w-[200px]"; // Reduzindo ainda mais a largura do card
const CARD_MIN_HEIGHT = "min-h-[300px]";
const CARD_TEXT_COLOR = "text-black text-opacity-80"; // Cor mais suave
const HEADING_FONT_SIZE = "text-sm"; // Menor tamanho de fonte
const HEADING_MARGIN_TOP = "mt-3"; // Espaçamento maior acima do título
const HEADING_TEXT_COLOR = "text-black text-opacity-90"; // Cor do título
const HEADING_ICON_COLOR = "text-indigo-600"; // Cor do ícone
const ICON_MARGIN_BOTTOM = "mb-2"; // Ajuste para a margem do ícone

interface Props {
  title: string;
  // Defina o tipo de "icon" como React.ComponentType<IconProps> para garantir que o ícone tenha a propriedade 'size'
  icon: React.ComponentType<{ size: number }>;
  description: string;
}

const TechnologyCard: React.FC<Props> = ({ title, icon: Icon, description }) => {
  return (
    <div
      className={`bg-white ${CARD_PADDING} rounded-lg ${CARD_MARGIN} ${CARD_MAX_WIDTH} w-full shadow-md hover:shadow-lg hover:border-2 hover:border-indigo-300 transform transition-all duration-500 ease-in-out hover:scale-105 ${CARD_MIN_HEIGHT}`}
    >
      <div className="flex justify-center items-center flex-col">
        <span className={`flex justify-center items-center ${ICON_MARGIN_BOTTOM} ${HEADING_ICON_COLOR}`}>
          <Icon size={ICON_SIZE} />
        </span>
        <h1 className={`${HEADING_MARGIN_TOP} ${HEADING_FONT_SIZE} font-semibold text-center ${HEADING_TEXT_COLOR}`}>
          {title}
        </h1>
        <p className={`mt-3 text-sm text-justify ${CARD_TEXT_COLOR}`}>{description}</p>
      </div>
    </div>
  );
};

export default TechnologyCard;
