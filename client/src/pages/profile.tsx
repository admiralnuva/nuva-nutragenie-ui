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
import { ProfileCard } from "@/components/ui/profile-card";
import { DietaryPreferencesCard } from "@/components/ui/dietary-preferences-card";
import { ScreenHeader } from "@/components/ui/screen-header";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Edit, 
  Apple, 
  ShoppingCart, 
  FileText,
  BookOpen,
  ChefHat,
  Activity
} from "lucide-react";



export default function ProfileScreen() {
  const [, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage<any>("nutragenie_user", null);
  const [activeSection, setActiveSection] = useState("account");
  const { toast } = useToast();

  const handleSaveProfile = (data: any) => {
    setCurrentUser({ ...currentUser, ...data });
    toast({ title: "Profile Updated", description: "Your profile information has been saved." });
  };

  const handleSaveDietary = (data: any) => {
    setCurrentUser({ ...currentUser, ...data });
    toast({ title: "Dietary Preferences Updated", description: "Your dietary preferences have been saved." });
  };

  const sections = [
    { id: "account", title: "Account", icon: User },
    { id: "dietary", title: "Dietary Needs", icon: Apple },
    { id: "health", title: "Health & Tracking", icon: Activity },
    { id: "grocery", title: "Grocery List", icon: FileText },
    { id: "orders", title: "Instacart Orders", icon: ShoppingCart },
    { id: "recipes", title: "Recipes Created", icon: BookOpen },
    { id: "cooking", title: "Cooking History", icon: ChefHat }
  ];

  const renderAccountSection = () => (
    <CardContent className="p-6 space-y-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Account Information</h3>
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
            <h4 className="font-medium text-gray-300">Your Profile</h4>
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
            <h4 className="font-medium text-gray-300">Your AI Chef</h4>
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
            <Select value={editedUser.ageGroup || ""} onValueChange={(value) => setEditedUser({...editedUser, ageGroup: value})}>
              <SelectTrigger className="[&>svg]:text-gray-600">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-24">18-24</SelectItem>
                <SelectItem value="25-30">25-30</SelectItem>
                <SelectItem value="31-40">31-40</SelectItem>
                <SelectItem value="41-50">41-50</SelectItem>
                <SelectItem value="51+">51+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Your Address</h4>
            <div className="space-y-3">
              {/* Street Address */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Street Address</Label>
                <Input
                  value={editedUser.streetAddress || ""}
                  onChange={(e) => setEditedUser({...editedUser, streetAddress: e.target.value})}
                  placeholder="123 Main Street"
                />
              </div>

              {/* City, State, Zip Row */}
              <div className="grid grid-cols-7 gap-3">
                <div className="col-span-3">
                  <Label className="text-sm font-medium">City</Label>
                  <Input
                    value={editedUser.city || ""}
                    onChange={(e) => setEditedUser({...editedUser, city: e.target.value})}
                    placeholder="San Francisco"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium">State</Label>
                  <Select value={editedUser.state || ""} onValueChange={(value) => setEditedUser({...editedUser, state: value})}>
                    <SelectTrigger className="[&>svg]:text-gray-600">
                      <SelectValue placeholder="CA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AK">AK</SelectItem>
                      <SelectItem value="AZ">AZ</SelectItem>
                      <SelectItem value="AR">AR</SelectItem>
                      <SelectItem value="CA">CA</SelectItem>
                      <SelectItem value="CO">CO</SelectItem>
                      <SelectItem value="CT">CT</SelectItem>
                      <SelectItem value="DE">DE</SelectItem>
                      <SelectItem value="FL">FL</SelectItem>
                      <SelectItem value="GA">GA</SelectItem>
                      <SelectItem value="HI">HI</SelectItem>
                      <SelectItem value="ID">ID</SelectItem>
                      <SelectItem value="IL">IL</SelectItem>
                      <SelectItem value="IN">IN</SelectItem>
                      <SelectItem value="IA">IA</SelectItem>
                      <SelectItem value="KS">KS</SelectItem>
                      <SelectItem value="KY">KY</SelectItem>
                      <SelectItem value="LA">LA</SelectItem>
                      <SelectItem value="ME">ME</SelectItem>
                      <SelectItem value="MD">MD</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MI">MI</SelectItem>
                      <SelectItem value="MN">MN</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MO">MO</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="NE">NE</SelectItem>
                      <SelectItem value="NV">NV</SelectItem>
                      <SelectItem value="NH">NH</SelectItem>
                      <SelectItem value="NJ">NJ</SelectItem>
                      <SelectItem value="NM">NM</SelectItem>
                      <SelectItem value="NY">NY</SelectItem>
                      <SelectItem value="NC">NC</SelectItem>
                      <SelectItem value="ND">ND</SelectItem>
                      <SelectItem value="OH">OH</SelectItem>
                      <SelectItem value="OK">OK</SelectItem>
                      <SelectItem value="OR">OR</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="RI">RI</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SD">SD</SelectItem>
                      <SelectItem value="TN">TN</SelectItem>
                      <SelectItem value="TX">TX</SelectItem>
                      <SelectItem value="UT">UT</SelectItem>
                      <SelectItem value="VT">VT</SelectItem>
                      <SelectItem value="VA">VA</SelectItem>
                      <SelectItem value="WA">WA</SelectItem>
                      <SelectItem value="WV">WV</SelectItem>
                      <SelectItem value="WI">WI</SelectItem>
                      <SelectItem value="WY">WY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium">Zip</Label>
                  <Input
                    value={editedUser.zipCode || ""}
                    onChange={(e) => setEditedUser({...editedUser, zipCode: e.target.value})}
                    placeholder="94102"
                    maxLength={5}
                  />
                </div>
              </div>
            </div>
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

          <Button onClick={handleSaveProfile} className="w-full h-12">
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
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <span className="text-4xl">{currentUser?.chefAvatar || "👨‍🍳"}</span>
              <div>
                <div className="font-semibold text-lg">{currentUser?.chefNickname || "Chef Antoine"}</div>
                <div className="text-sm text-gray-600">Your AI Chef</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700 block mb-1">Address</span>
                {currentUser?.streetAddress || currentUser?.city || currentUser?.state || currentUser?.zipCode ? (
                  <div className="text-gray-600">
                    <div>{currentUser?.streetAddress}</div>
                    <div>
                      {currentUser?.city && currentUser?.city}
                      {currentUser?.city && currentUser?.state && ", "}
                      {currentUser?.state && currentUser?.state}
                      {(currentUser?.city || currentUser?.state) && currentUser?.zipCode && " "}
                      {currentUser?.zipCode && currentUser?.zipCode}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-600">Not set</span>
                )}
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


    </CardContent>
  );

  const renderGroceryHistory = () => {
    // Get saved grocery lists from localStorage
    const savedLists = JSON.parse(localStorage.getItem("nutragenie_grocery_history") || "[]");
    
    // If no saved lists, show empty state
    if (savedLists.length === 0) {
      return (
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Grocery List History</h3>
          </div>
          <div className="text-center py-8">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No grocery lists saved yet</p>
            <p className="text-sm text-gray-400 mt-1">Save lists from the Grocery List screen to see them here</p>
          </div>
        </CardContent>
      );
    }

    return (
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Grocery List History</h3>
        </div>

        <div className="space-y-2">
          {savedLists.map((list: any) => (
            <div key={list.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-4">
                <span className="font-medium text-white">{list.date}</span>
                <span className="text-sm text-gray-300">{list.totalItems} items</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8"
                  onClick={() => {
                    // Create a printable version of the list
                    const printContent = `
                      <h2>${list.date} - Grocery List</h2>
                      <ul>
                        ${list.items.map((item: any) => `<li>${item.name} - ${item.quantity}</li>`).join('')}
                      </ul>
                    `;
                    const printWindow = window.open('', '_blank');
                    if (printWindow) {
                      printWindow.document.write(printContent);
                      printWindow.document.close();
                      printWindow.print();
                    }
                  }}
                >
                  Print
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 text-red-500 hover:text-red-700"
                  onClick={() => {
                    const updatedLists = savedLists.filter((l: any) => l.id !== list.id);
                    localStorage.setItem("nutragenie_grocery_history", JSON.stringify(updatedLists));
                    window.location.reload(); // Simple refresh to update UI
                  }}
                >
                  Delete
                </Button>
              </div>
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
          <h3 className="text-lg font-semibold text-white">Instacart Orders</h3>
        </div>

        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="py-3 border-b border-gray-100 last:border-b-0">
              {/* Row 1: Order # and Date */}
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-white">{order.id}</span>
                <span className="text-sm text-gray-300">{order.date}</span>
              </div>
              {/* Row 2: Items and Dollar Value */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{order.items} items</span>
                <span className="font-medium text-white">${order.total}</span>
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
          <h3 className="text-lg font-semibold text-white">Recipes Created</h3>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-4 relative">
          <div className="bg-purple-500 h-4 rounded-full" style={{ width: `${(recipes.length / 15) * 100}%` }} />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
            {recipes.length}/15 recipes
          </div>
        </div>

        {recipes.length >= 15 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-green-700 font-medium mb-2">🎉 Congratulations! You can now publish your recipe book!</p>
            <Button className="w-full">
              Print Online Recipe Book
            </Button>
          </div>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="font-medium text-white">{recipe.name}</div>
                <div className="text-sm text-gray-300">{recipe.date} • {recipe.category}</div>
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
          <h3 className="text-lg font-semibold text-white">Cooking History</h3>
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
            <Button className="w-full">
              Print Cooking Journey Book
            </Button>
          </div>
        )}

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {dishes.map((dish) => (
            <div key={dish.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-white">{dish.name}</div>
                <div className="text-sm text-gray-300">{dish.date}</div>
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

  const renderHealthSection = () => (
    <CardContent className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Health & Tracking</h3>
      </div>

      {/* Monthly & Yearly Trends - 4 subcards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Blood Pressure Trends */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Blood Pressure
          </h4>
          <div className="space-y-2">
            <div className="text-lg font-bold text-red-600">122/78</div>
            <div className="text-xs text-gray-600">Current (Today)</div>
            <div className="text-xs text-green-600">↓ 2 points this month</div>
            {/* Mini trend chart */}
            <div className="flex items-end gap-1 h-6 mt-2">
              <div className="bg-red-300 w-1 h-4"></div>
              <div className="bg-red-400 w-1 h-3"></div>
              <div className="bg-red-300 w-1 h-5"></div>
              <div className="bg-red-500 w-1 h-2"></div>
              <div className="bg-red-400 w-1 h-4"></div>
              <div className="bg-red-300 w-1 h-3"></div>
              <div className="bg-red-600 w-1 h-6"></div>
            </div>
          </div>
        </div>

        {/* Blood Sugar Trends */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Blood Sugar
          </h4>
          <div className="space-y-2">
            <div className="text-lg font-bold text-orange-600">94 mg/dL</div>
            <div className="text-xs text-gray-600">Current (Today)</div>
            <div className="text-xs text-green-600">↓ 5 mg/dL this month</div>
            {/* Mini trend chart */}
            <div className="flex items-end gap-1 h-6 mt-2">
              <div className="bg-orange-300 w-1 h-3"></div>
              <div className="bg-orange-400 w-1 h-4"></div>
              <div className="bg-orange-300 w-1 h-2"></div>
              <div className="bg-orange-500 w-1 h-5"></div>
              <div className="bg-orange-400 w-1 h-3"></div>
              <div className="bg-orange-300 w-1 h-4"></div>
              <div className="bg-orange-600 w-1 h-6"></div>
            </div>
          </div>
        </div>

        {/* Daily Goals Performance */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Daily Goals
          </h4>
          <div className="space-y-2">
            <div className="text-xs text-gray-600">Monthly Average</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>TDEE</span>
                <span className="font-semibold">89%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Protein</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Water</span>
                <span className="font-semibold">78%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Trends */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Activity
          </h4>
          <div className="space-y-2">
            <div className="text-xs text-gray-600">This Month</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Avg Steps</span>
                <span className="font-semibold">8,124</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Calories/Day</span>
                <span className="font-semibold">542</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Heart Rate</span>
                <span className="font-semibold">71 bpm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500">
        Showing data for the past 30 days
      </div>
    </CardContent>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "account": return <ProfileCard userData={currentUser} onSave={handleSaveProfile} />;
      case "dietary": return <DietaryPreferencesCard userData={currentUser} onSave={handleSaveDietary} />;
      case "health": return renderHealthSection();
      case "grocery": return renderGroceryHistory();
      case "orders": return renderOrderHistory();
      case "recipes": return renderRecipesCreated();
      case "cooking": return renderCookingHistory();
      default: return <ProfileCard userData={currentUser} onSave={handleSaveProfile} />;
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      <div className="p-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <BackButton to="/explore-recipe-options" className="text-white" />
          <div className="flex-1 text-center">
            <h1 className="text-white text-2xl font-bold">NutraGenie</h1>
            <p className="text-purple-300 text-lg font-semibold mt-1">Profile Settings</p>
          </div>
          <div className="w-8"></div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="min-h-screen">
        {/* Card 1: Navigation Buttons */}
        <div className="max-w-2xl mx-auto p-4 space-y-3">
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "outline"}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 h-12 text-sm ${
                      activeSection === section.id 
                        ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700' 
                        : 'bg-gray-700 text-gray-300 border-gray-600 hover:border-purple-400 hover:bg-purple-600/20'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Content */}
          <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700">
            {renderActiveSection()}
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}