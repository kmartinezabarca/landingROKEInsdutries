import { Toaster as SileoToaster } from 'sileo';

export const Toaster = () => {
  return (
    <SileoToaster
      position="top-right"
      options={{
        fill: "#FFFFFF",
        roundness: 16,
        styles: {
          title: "text-gray-900! font-semibold text-sm",
          description: "text-gray-600! text-xs",
          badge: "bg-gray-100!",
          button: "bg-gray-100! hover:bg-gray-200! text-gray-900! text-xs font-medium",
        },
      }}
    />
  );
};
