import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Heart, Printer, Clock, Users, Play } from "lucide-react";

interface RecipeDetailsModalProps {
  dish: {
    id: number;
    name: string;
    calories: number;
    cookTime: string;
    difficulty: "Easy" | "Medium" | "Hard";
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (dish: any) => void;
}

export function RecipeDetailsModal({ 
  dish, 
  isOpen, 
  onClose, 
  onSave 
}: RecipeDetailsModalProps) {
  if (!isOpen) return null;

  // Mock recipe data - in real app this would come from API
  const recipeData = {
    servings: 4,
    ingredients: [
      { name: "Pasta", amount: "400g", category: "grains" },
      { name: "Garlic", amount: "4 cloves", category: "vegetables" },
      { name: "Olive Oil", amount: "1/4 cup", category: "pantry" },
      { name: "Red Pepper Flakes", amount: "1/2 tsp", category: "spices" },
      { name: "Parsley", amount: "2 tbsp", category: "herbs" },
      { name: "Parmesan Cheese", amount: "1/2 cup", category: "dairy" }
    ],
    instructions: [
      "Bring a large pot of salted water to boil. Add pasta and cook according to package directions until al dente.",
      "While pasta cooks, heat olive oil in a large skillet over medium heat.",
      "Add sliced garlic and red pepper flakes. Cook for 1-2 minutes until garlic is fragrant but not browned.",
      "Drain pasta, reserving 1/2 cup pasta water.",
      "Add drained pasta to the skillet with garlic oil. Toss to combine.",
      "Add pasta water gradually if needed to create a light sauce that coats the pasta.",
      "Remove from heat and add chopped parsley and grated Parmesan cheese.",
      "Season with salt and pepper to taste. Serve immediately."
    ]
  };

  const handlePrint = () => {
    const printContent = `
      <h1>${dish.name}</h1>
      <p>Servings: ${recipeData.servings} | Cook Time: ${dish.cookTime} | Calories: ${dish.calories}</p>
      <h2>Ingredients:</h2>
      <ul>
        ${recipeData.ingredients.map(ing => `<li>${ing.amount} ${ing.name}</li>`).join('')}
      </ul>
      <h2>Instructions:</h2>
      <ol>
        ${recipeData.instructions.map(step => `<li>${step}</li>`).join('')}
      </ol>
    `;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>${dish.name} Recipe</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">${printContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleSave = () => {
    onSave(dish);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 truncate pr-4">{dish.name}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Recipe Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{recipeData.servings} servings</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{dish.cookTime}</span>
              </div>
              <span className="font-medium">{dish.calories} cal</span>
            </div>
          </div>

          {/* Ingredients Summary Card */}
          <Card className="mx-4 mt-4 border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-purple-600">Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recipeData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-800">{ingredient.name}</span>
                  <span className="text-sm text-gray-600 font-medium">{ingredient.amount}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Step-by-Step Instructions Card */}
          <Card className="mx-4 mt-4 mb-4 border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-purple-600">Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recipeData.instructions.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Footer with action buttons */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {/* Start Cooking Button */}
          <Button
            onClick={() => {
              window.location.href = `/voice-cooking?dish=${encodeURIComponent(dish.name)}&id=${dish.id}`;
            }}
            className="w-full py-3 mb-3 text-lg font-semibold bg-green-500 text-white hover:bg-green-600"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Cooking
          </Button>
          
          {/* Save and Print icons */}
          <div className="flex justify-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-12 w-12 p-0 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-purple-300"
            >
              <Heart size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrint}
              className="h-12 w-12 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-300"
            >
              <Printer size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}