import { BackButton } from "@/components/ui/back-button";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
}

export function ScreenHeader({ title, subtitle, backTo }: ScreenHeaderProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {backTo && <BackButton to={backTo} />}
        {!backTo && <div className="w-8"></div>}
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-gray-800">NutraGenie</h1>
        </div>
        <div className="w-8"></div>
      </div>
      
      {subtitle && (
        <div className="text-lg font-semibold text-purple-600 text-center mb-6">
          {subtitle}
        </div>
      )}
    </>
  );
}