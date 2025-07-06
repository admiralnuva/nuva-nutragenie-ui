import { ExtraSmallCard, SmallCard, MediumCard, LargeCard } from "@/components/ui/sized-cards";
import { BackButton } from "@/components/ui/back-button";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { User, ChefHat } from "lucide-react";

// Sample avatars for demonstration
const UserAvatar = () => (
  <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center">
    <User className="w-1/2 h-1/2 text-indigo-600" />
  </div>
);

const ChefAvatar = () => (
  <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center">
    <ChefHat className="w-1/2 h-1/2 text-orange-600" />
  </div>
);

export default function CardsScreen() {
  return (
    <div className="min-h-screen bg-warm-neutral-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <BackButton to="/" />
          <h1 className="text-xl font-bold text-gray-800">NutraGenie</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 max-w-2xl mx-auto" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Card Components</h2>
          <p className="text-gray-600">Reusable card sizes for the application</p>
        </div>

        {/* Extra Small Card */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">Extra Small Card</h3>
          <ExtraSmallCard
            title="Quick Action"
            cardName="Extra Small Card"
            description="Compact card for minimal information and quick actions"
            avatar={<UserAvatar />}
          />
        </div>

        {/* Small Card */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">Small Card</h3>
          <SmallCard
            title="Basic Information"
            cardName="Small Card"
            description="Small card with essential information and moderate content space for brief descriptions"
            avatar={<ChefAvatar />}
          />
        </div>

        {/* Medium Card */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">Medium Card</h3>
          <MediumCard
            title="Detailed Content"
            cardName="Medium Card"
            description="Medium-sized card with ample space for detailed information, descriptions, and additional content elements. Perfect for recipe cards, user profiles, or feature highlights."
            avatar={<UserAvatar />}
          />
        </div>

        {/* Large Card */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">Large Card</h3>
          <LargeCard
            title="Comprehensive Display"
            cardName="Large Card"
            description="Large card with extensive space for comprehensive content, detailed descriptions, multiple elements, and rich interactions. Ideal for complex data presentation, detailed recipes, or multi-feature displays."
            avatar={<ChefAvatar />}
          />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}