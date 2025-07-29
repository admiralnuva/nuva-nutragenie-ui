import { BackButton } from "@/components/ui/back-button";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  isDarkTheme?: boolean;
}

export function ScreenHeader({ title, subtitle, backTo, isDarkTheme = false }: ScreenHeaderProps) {
  const brandColor = isDarkTheme ? "text-white" : "text-gray-800";
  const titleColor = isDarkTheme ? "text-purple-300" : "text-purple-600";
  const backButtonColor = isDarkTheme ? "text-white" : "";

  return (
    <>
      {/* Header - Centered Branding */}
      <div className="flex items-center justify-between mb-4">
        {backTo && <BackButton to={backTo} className={backButtonColor} />}
        {!backTo && <div className="w-8"></div>}
        <div className="flex-1 text-center">
          <h1 className={`text-2xl font-bold ${brandColor}`}>NutraGenie</h1>
          {title && (
            <p className={`text-lg font-semibold ${titleColor} mt-1`}>
              {title}
            </p>
          )}
        </div>
        <div className="w-8"></div>
      </div>
      
      {subtitle && (
        <div className={`text-sm ${titleColor} text-center mb-4`}>
          {subtitle}
        </div>
      )}
    </>
  );
}