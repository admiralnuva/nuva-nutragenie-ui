import { useState } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { 
  User, 
  Edit, 
  Apple, 
  ShoppingCart, 
  FileText,
  BookOpen,
  ChefHat
} from "lucide-react";



export default function ProfileScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [activeSection, setActiveSection] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser || {});

  const handleSaveProfile = () => {
    setCurrentUser(editedUser);
    setIsEditing(false);
  };

  const sections = [
    { id: "account", title: "Account", icon: User },
    { id: "dietary", title: "Dietary Needs", icon: Apple },
    { id: "grocery", title: "Grocery List", icon: FileText },
    { id: "orders", title: "Instacart Orders", icon: ShoppingCart },
    { id: "recipes", title: "Recipes Created", icon: BookOpen },
    { id: "cooking", title: "Cooking History", icon: ChefHat }
  ];

  const renderAccountSection = () => (
    <CardContent className="p-6 space-y-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Account Information</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="w-4 h-4" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {isEditing ? (
        <>
          {/* User Avatar and Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Your Profile</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Avatar</Label>
                <div className="flex gap-2 flex-wrap">
                  {["😀", "👩", "👨", "🧑", "👩‍🦱", "👨‍🦱", "🧔", "👩‍🦳"].map((emoji) => (
                    <Button
                      key={emoji}
                      variant={editedUser.avatar === emoji ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditedUser({...editedUser, avatar: emoji})}
                      className="text-lg"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Nickname</Label>
                <Input
                  value={editedUser.nickname || ""}
                  onChange={(e) => setEditedUser({...editedUser, nickname: e.target.value})}
                  placeholder="Enter your nickname"
                />
              </div>
            </div>
          </div>

          {/* Chef Avatar and Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Your AI Chef</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Chef Avatar</Label>
                <div className="flex gap-2 flex-wrap">
                  {["👨‍🍳", "👩‍🍳", "🧑‍🍳", "👨‍🍳", "👩‍🍳"].map((emoji, index) => (
                    <Button
                      key={emoji + index}
                      variant={editedUser.chefAvatar === emoji ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditedUser({...editedUser, chefAvatar: emoji})}
                      className="text-lg"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Chef Nickname</Label>
                <Input
                  value={editedUser.chefNickname || "Chef Antoine"}
                  onChange={(e) => setEditedUser({...editedUser, chefNickname: e.target.value})}
                  placeholder="Enter chef nickname"
                />
              </div>
            </div>
          </div>

          {/* Age Group */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Age Group</Label>
            <div className="grid grid-cols-3 gap-2">
              {["18-24", "25-30", "31-40", "41-50", "51+"].map((age) => (
                <Button
                  key={age}
                  variant={editedUser.ageGroup === age ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEditedUser({...editedUser, ageGroup: age})}
                >
                  {age}
                </Button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Address</Label>
            <Input
              value={editedUser.address || ""}
              onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
              placeholder="Enter your address"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Phone Number</Label>
            <Input
              value={editedUser.phoneNumber || ""}
              onChange={(e) => setEditedUser({...editedUser, phoneNumber: e.target.value})}
              placeholder="(555) 123-4567"
            />
            {editedUser.phoneNumber !== currentUser?.phoneNumber && (
              <p className="text-sm text-amber-600">⚠️ Phone number changes require verification</p>
            )}
          </div>

          <Button onClick={handleSaveProfile} className="w-full h-12 bg-green-600 hover:bg-green-700">
            Save Changes
          </Button>
        </>
      ) : (
        <>
          {/* Display Mode */}
          <div className="space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-4xl">{currentUser?.avatar || "😀"}</span>
              <div>
                <div className="font-semibold text-lg">{currentUser?.nickname || "User"}</div>
                <div className="text-sm text-gray-600">{currentUser?.ageGroup || "Not set"}</div>
              </div>
            </div>

            {/* Chef Info */}
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <span className="text-4xl">{currentUser?.chefAvatar || "👨‍🍳"}</span>
              <div>
                <div className="font-semibold text-lg">{currentUser?.chefNickname || "Chef Antoine"}</div>
                <div className="text-sm text-gray-600">Your AI Chef</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Address</span>
                <span className="text-gray-600">{currentUser?.address || "Not set"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Phone</span>
                <span className="text-gray-600">{currentUser?.phoneNumber || "Not set"}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </CardContent>
  );

  const renderDietarySection = () => (
    <CardContent className="p-6 space-y-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Dietary Preferences</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setLocation("/dietary")}
        >
          <Edit className="w-4 h-4" />
          Edit
        </Button>
      </div>

      {/* Clean Summary Rows */}
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <span className="font-medium text-gray-700">Dietary Restrictions</span>
          <span className="text-gray-600">{(currentUser?.dietaryRestrictions || ["Vegetarian"]).join(", ")}</span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <span className="font-medium text-gray-700">Health Conditions</span>
          <span className="text-gray-600">{(currentUser?.healthConditions || ["None"]).join(", ")}</span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <span className="font-medium text-gray-700">Fitness Goals</span>
          <span className="text-gray-600">{(currentUser?.fitnessGoals || ["Wellness"]).join(", ")}</span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <span className="font-medium text-gray-700">Food Dislikes</span>
          <span className="text-gray-600">{(currentUser?.dislikes || ["None"]).join(", ")}</span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <span className="font-medium text-gray-700">Allergies</span>
          <span className="text-gray-600">{(currentUser?.allergies || ["None"]).join(", ")}</span>
        </div>
      </div>

      {/* Edit Link */}
      <div className="pt-4">
        <Button 
          onClick={() => setLocation("/dietary")} 
          variant="outline" 
          className="w-full"
        >
          View & Edit Full Dietary Preferences
        </Button>
      </div>
    </CardContent>
  );

  const renderGroceryHistory = () => {
    const groceryLists = [
      { id: 1, date: "Jan 4, 2025", items: 12 },
      { id: 2, date: "Jan 3, 2025", items: 8 },
      { id: 3, date: "Jan 2, 2025", items: 15 },
      { id: 4, date: "Jan 1, 2025", items: 6 },
      { id: 5, date: "Dec 30, 2024", items: 11 },
      { id: 6, date: "Dec 28, 2024", items: 9 },
      { id: 7, date: "Dec 26, 2024", items: 14 },
      { id: 8, date: "Dec 24, 2024", items: 7 },
      { id: 9, date: "Dec 22, 2024", items: 13 },
      { id: 10, date: "Dec 20, 2024", items: 10 }
    ];

    return (
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Grocery List History</h3>
        </div>

        <div className="space-y-2">
          {groceryLists.map((list) => (
            <div key={list.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-800">{list.date}</span>
                <span className="text-sm text-gray-600">{list.items} items</span>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                Print
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    );
  };

  const renderOrderHistory = () => {
    const orders = [
      { id: "ORD-12345", date: "Jan 4, 2025", items: 12, total: 67.89 },
      { id: "ORD-12344", date: "Jan 2, 2025", items: 8, total: 45.23 },
      { id: "ORD-12343", date: "Dec 30, 2024", items: 15, total: 89.12 },
      { id: "ORD-12342", date: "Dec 28, 2024", items: 6, total: 34.56 },
      { id: "ORD-12341", date: "Dec 26, 2024", items: 11, total: 72.34 },
      { id: "ORD-12340", date: "Dec 24, 2024", items: 9, total: 53.78 },
      { id: "ORD-12339", date: "Dec 22, 2024", items: 14, total: 81.45 },
      { id: "ORD-12338", date: "Dec 20, 2024", items: 7, total: 41.23 }
    ];

    return (
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Instacart Orders</h3>
        </div>

        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="py-3 border-b border-gray-100 last:border-b-0">
              {/* Row 1: Order # and Date */}
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-800">{order.id}</span>
                <span className="text-sm text-gray-600">{order.date}</span>
              </div>
              {/* Row 2: Items and Dollar Value */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{order.items} items</span>
                <span className="font-medium text-gray-800">${order.total}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    );
  };



  const renderRecipesCreated = () => {
    const recipes = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Recipe ${i + 1}`,
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      category: ['Soup', 'Salad', 'Main Course', 'Dessert'][Math.floor(Math.random() * 4)]
    }));

    return (
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Recipes Created</h3>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-4 relative">
          <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(recipes.length / 15) * 100}%` }} />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
            {recipes.length}/15 recipes
          </div>
        </div>

        {recipes.length >= 15 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-medium mb-2">🎉 Congratulations! You can now publish your recipe book!</p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Print Online Recipe Book
            </Button>
          </div>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="font-medium text-gray-800">{recipe.name}</div>
                <div className="text-sm text-gray-600">{recipe.date} • {recipe.category}</div>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                View Recipe
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    );
  };

  const renderCookingHistory = () => {
    const dishes = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Dish ${i + 1}`,
      date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      notes: `Cooking notes for dish ${i + 1} - timing and techniques used.`
    }));

    return (
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Cooking History</h3>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-4 relative">
          <div className="bg-orange-500 h-4 rounded-full" style={{ width: `${(dishes.length / 15) * 100}%` }} />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
            {dishes.length}/15 dishes
          </div>
        </div>

        {dishes.length >= 15 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-700 font-medium mb-2">🍳 Amazing! You can now publish your cooking journey book!</p>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Print Cooking Journey Book
            </Button>
          </div>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {dishes.map((dish) => (
            <div key={dish.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-gray-800">{dish.name}</div>
                <div className="text-sm text-gray-600">{dish.date}</div>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    );
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "account": return renderAccountSection();
      case "dietary": return renderDietarySection();
      case "grocery": return renderGroceryHistory();
      case "orders": return renderOrderHistory();
      case "recipes": return renderRecipesCreated();
      case "cooking": return renderCookingHistory();
      default: return renderAccountSection();
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-bold mb-4">Please Sign In</h2>
            <Button onClick={() => setLocation("/signup")} className="w-full">
              Go to Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <BackButton to="/home" />
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          </div>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Card 1: Navigation Buttons */}
      <div className="max-w-md mx-auto p-4 space-y-3">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  onClick={() => setActiveSection(section.id)}
                  className="flex items-center gap-2 h-12 text-sm"
                >
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Content */}
        <Card>
          {renderActiveSection()}
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}