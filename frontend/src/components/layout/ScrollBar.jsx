import { useTheme } from '../../hooks/useTheme';

export const ScrollBar = () => {

    const { primaryColor } = useTheme();

    return (
        <style jsx global>{`
      ::-webkit-scrollbar {
        width: 7px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: ${primaryColor.bg}; 
        border-radius: 12px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: ${primaryColor.hover};
      }
    `}</style>
    );
};
