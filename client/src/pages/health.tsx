
// @ts-nocheck
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  Heart, 
  Scale, 
  Activity, 
  Droplets, 
  Moon, 
  Zap,
  Target,
  Calendar,
  Plus,
  BarChart3
} from "lucide-react";

const getTodayDate = () => new Date().toISOString().split('T')[0];

export default function HealthAnalyticsScreen() {
  const [, setLocation] = useLocation();
  const [currentUser] = useLocalStorage("nutragenie_user", null);
  const { toast } = useToast();
  
  // Health metrics form state
  const [healthForm, setHealthForm] = useState({
    weight: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    bloodSugar: '',
    energyLevel: 5,
    sleepHours: '',
    waterIntake: '',
    exerciseMinutes: '',
    stressLevel: 5,
    notes: ''
  });

  // Nutrition entry form state
  const [nutritionForm, setNutritionForm] = useState({
    mealType: 'breakfast',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    sugar: '',
    sodium: '',
    customNotes: ''
  });

  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  // Fetch today's nutrition entries
  const { data: nutritionEntries } = useQuery({
    queryKey: ['/api/nutrition-entries', currentUser?.id, selectedDate],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/nutrition-entries?userId=${currentUser?.id}&date=${selectedDate}`);
      return response.json();
    },
    enabled: !!currentUser?.id
  });

  // Fetch health metrics for the last 7 days
  const { data: healthMetrics } = useQuery({
    queryKey: ['/api/health-metrics', currentUser?.id],
    queryFn: async () => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 7);
      
      const response = await apiRequest("GET", 
        `/api/health-metrics?userId=${currentUser?.id}&start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}`
      );
      return response.json();
    },
    enabled: !!currentUser?.id
  });

  // Fetch nutrition goals
  const { data: nutritionGoals } = useQuery({
    queryKey: ['/api/nutrition-goals', currentUser?.id],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/nutrition-goals?userId=${currentUser?.id}`);
      return response.json();
    },
    enabled: !!currentUser?.id
  });

  // Add health metric mutation
  const addHealthMetricMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/health-metrics", {
        ...data,
        userId: currentUser?.id,
        date: selectedDate
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Health data saved!", description: "Your health metrics have been recorded." });
      queryClient.invalidateQueries({ queryKey: ['/api/health-metrics'] });
      setHealthForm({
        weight: '',
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        bloodSugar: '',
        energyLevel: 5,
        sleepHours: '',
        waterIntake: '',
        exerciseMinutes: '',
        stressLevel: 5,
        notes: ''
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Add nutrition entry mutation
  const addNutritionMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/nutrition-entries", {
        ...data,
        userId: currentUser?.id,
        date: selectedDate
      });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Nutrition logged!", description: "Your meal has been recorded." });
      queryClient.invalidateQueries({ queryKey: ['/api/nutrition-entries'] });
      setNutritionForm({
        mealType: 'breakfast',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        fiber: '',
        sugar: '',
        sodium: '',
        customNotes: ''
      });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });

  // Calculate daily nutrition totals
  const dailyTotals = nutritionEntries?.reduce((totals: any, entry: any) => ({
    calories: totals.calories + entry.calories,
    protein: totals.protein + entry.protein,
    carbs: totals.carbs + entry.carbs,
    fat: totals.fat + entry.fat,
    fiber: totals.fiber + entry.fiber,
    sugar: totals.sugar + entry.sugar,
    sodium: totals.sodium + entry.sodium
  }), {
    calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0
  }) || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 };

  // Get latest health metrics
  const latestMetrics = healthMetrics?.[0];

  const handleHealthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredData = Object.fromEntries(
      Object.entries(healthForm).filter(([_, value]) => value !== '' && value !== null)
    );
    addHealthMetricMutation.mutate(filteredData);
  };

  const handleNutritionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...nutritionForm,
      calories: parseInt(nutritionForm.calories) || 0,
      protein: parseInt(nutritionForm.protein) || 0,
      carbs: parseInt(nutritionForm.carbs) || 0,
      fat: parseInt(nutritionForm.fat) || 0,
      fiber: parseInt(nutritionForm.fiber) || 0,
      sugar: parseInt(nutritionForm.sugar) || 0,
      sodium: parseInt(nutritionForm.sodium) || 0
    };
    addNutritionMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-warm-neutral-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/profile")}
            className="rounded-full hover:bg-warm-neutral-200"
          >
            <ArrowLeft className="h-6 w-6 text-warm-neutral-700" />
          </Button>
          <h1 className="text-xl font-bold text-warm-neutral-800">Health Analytics</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full opacity-0"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>

        {/* Date Selector */}
        <Card className="mb-3">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <Label htmlFor="date">Tracking Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Scale className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-warm-neutral-600">Weight</p>
                  <p className="text-xl font-bold">{latestMetrics?.weight || '--'} lbs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm text-warm-neutral-600">Blood Pressure</p>
                  <p className="text-xl font-bold">
                    {latestMetrics?.bloodPressureSystolic && latestMetrics?.bloodPressureDiastolic 
                      ? `${latestMetrics.bloodPressureSystolic}/${latestMetrics.bloodPressureDiastolic}`
                      : '--/--'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-warm-neutral-600">Energy Level</p>
                  <p className="text-xl font-bold">{latestMetrics?.energyLevel || '--'}/10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-indigo-600" />
                <div>
                  <p className="text-sm text-warm-neutral-600">Daily Calories</p>
                  <p className="text-xl font-bold">{dailyTotals.calories}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="nutrition" className="space-y-3">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nutrition">Nutrition Tracking</TabsTrigger>
            <TabsTrigger value="health">Health Metrics</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Nutrition Tracking Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            {/* Daily Progress */}
            {nutritionGoals && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Daily Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Calories</span>
                        <span className="text-sm">{dailyTotals.calories}/{nutritionGoals.dailyCalories}</span>
                      </div>
                      <Progress value={(dailyTotals.calories / nutritionGoals.dailyCalories) * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Protein</span>
                        <span className="text-sm">{dailyTotals.protein}g/{nutritionGoals.dailyProtein}g</span>
                      </div>
                      <Progress value={(dailyTotals.protein / nutritionGoals.dailyProtein) * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Carbs</span>
                        <span className="text-sm">{dailyTotals.carbs}g/{nutritionGoals.dailyCarbs}g</span>
                      </div>
                      <Progress value={(dailyTotals.carbs / nutritionGoals.dailyCarbs) * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Fat</span>
                        <span className="text-sm">{dailyTotals.fat}g/{nutritionGoals.dailyFat}g</span>
                      </div>
                      <Progress value={(dailyTotals.fat / nutritionGoals.dailyFat) * 100} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add Nutrition Entry */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Log Meal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNutritionSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mealType">Meal Type</Label>
                      <select
                        id="mealType"
                        value={nutritionForm.mealType}
                        onChange={(e) => setNutritionForm({...nutritionForm, mealType: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-warm-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        type="number"
                        id="calories"
                        value={nutritionForm.calories}
                        onChange={(e) => setNutritionForm({...nutritionForm, calories: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input
                        type="number"
                        id="protein"
                        value={nutritionForm.protein}
                        onChange={(e) => setNutritionForm({...nutritionForm, protein: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="carbs">Carbs (g)</Label>
                      <Input
                        type="number"
                        id="carbs"
                        value={nutritionForm.carbs}
                        onChange={(e) => setNutritionForm({...nutritionForm, carbs: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fat">Fat (g)</Label>
                      <Input
                        type="number"
                        id="fat"
                        value={nutritionForm.fat}
                        onChange={(e) => setNutritionForm({...nutritionForm, fat: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="fiber">Fiber (g)</Label>
                      <Input
                        type="number"
                        id="fiber"
                        value={nutritionForm.fiber}
                        onChange={(e) => setNutritionForm({...nutritionForm, fiber: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sugar">Sugar (g)</Label>
                      <Input
                        type="number"
                        id="sugar"
                        value={nutritionForm.sugar}
                        onChange={(e) => setNutritionForm({...nutritionForm, sugar: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sodium">Sodium (mg)</Label>
                      <Input
                        type="number"
                        id="sodium"
                        value={nutritionForm.sodium}
                        onChange={(e) => setNutritionForm({...nutritionForm, sodium: e.target.value})}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customNotes">Notes</Label>
                    <Textarea
                      id="customNotes"
                      value={nutritionForm.customNotes}
                      onChange={(e) => setNutritionForm({...nutritionForm, customNotes: e.target.value})}
                      placeholder="Optional notes about this meal..."
                      className="h-20"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={addNutritionMutation.isPending}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    {addNutritionMutation.isPending ? "Logging..." : "Log Meal"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Today's Meals */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Meals</CardTitle>
              </CardHeader>
              <CardContent>
                {nutritionEntries?.length > 0 ? (
                  <div className="space-y-3">
                    {nutritionEntries.map((entry: any) => (
                      <div key={entry.id} className="flex justify-between items-center p-3 bg-warm-neutral-100 rounded-lg">
                        <div>
                          <Badge variant="outline" className="mb-1">{entry.mealType}</Badge>
                          <p className="font-medium">{entry.calories} calories</p>
                          <p className="text-sm text-warm-neutral-600">
                            {entry.protein}g protein • {entry.carbs}g carbs • {entry.fat}g fat
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-warm-neutral-600 py-8">No meals logged for today</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Metrics Tab */}
          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Log Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleHealthSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight">Weight (lbs)</Label>
                      <Input
                        type="number"
                        id="weight"
                        value={healthForm.weight}
                        onChange={(e) => setHealthForm({...healthForm, weight: e.target.value})}
                        placeholder="Enter weight"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                      <Input
                        type="number"
                        id="bloodSugar"
                        value={healthForm.bloodSugar}
                        onChange={(e) => setHealthForm({...healthForm, bloodSugar: e.target.value})}
                        placeholder="Enter blood sugar"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="systolic">Blood Pressure (Systolic)</Label>
                      <Input
                        type="number"
                        id="systolic"
                        value={healthForm.bloodPressureSystolic}
                        onChange={(e) => setHealthForm({...healthForm, bloodPressureSystolic: e.target.value})}
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <Label htmlFor="diastolic">Blood Pressure (Diastolic)</Label>
                      <Input
                        type="number"
                        id="diastolic"
                        value={healthForm.bloodPressureDiastolic}
                        onChange={(e) => setHealthForm({...healthForm, bloodPressureDiastolic: e.target.value})}
                        placeholder="80"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sleepHours">Sleep Hours</Label>
                      <Input
                        type="number"
                        step="0.5"
                        id="sleepHours"
                        value={healthForm.sleepHours}
                        onChange={(e) => setHealthForm({...healthForm, sleepHours: e.target.value})}
                        placeholder="8"
                      />
                    </div>
                    <div>
                      <Label htmlFor="exerciseMinutes">Exercise (minutes)</Label>
                      <Input
                        type="number"
                        id="exerciseMinutes"
                        value={healthForm.exerciseMinutes}
                        onChange={(e) => setHealthForm({...healthForm, exerciseMinutes: e.target.value})}
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="waterIntake">Water Intake (ml)</Label>
                    <Input
                      type="number"
                      id="waterIntake"
                      value={healthForm.waterIntake}
                      onChange={(e) => setHealthForm({...healthForm, waterIntake: e.target.value})}
                      placeholder="2000"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="energyLevel">Energy Level (1-10)</Label>
                      <Input
                        type="range"
                        min="1"
                        max="10"
                        id="energyLevel"
                        value={healthForm.energyLevel}
                        onChange={(e) => setHealthForm({...healthForm, energyLevel: parseInt(e.target.value)})}
                        className="mt-2"
                      />
                      <div className="text-center mt-1">
                        <span className="text-lg font-bold">{healthForm.energyLevel}/10</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="stressLevel">Stress Level (1-10)</Label>
                      <Input
                        type="range"
                        min="1"
                        max="10"
                        id="stressLevel"
                        value={healthForm.stressLevel}
                        onChange={(e) => setHealthForm({...healthForm, stressLevel: parseInt(e.target.value)})}
                        className="mt-2"
                      />
                      <div className="text-center mt-1">
                        <span className="text-lg font-bold">{healthForm.stressLevel}/10</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={healthForm.notes}
                      onChange={(e) => setHealthForm({...healthForm, notes: e.target.value})}
                      placeholder="How are you feeling today?"
                      className="h-20"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={addHealthMetricMutation.isPending}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    {addHealthMetricMutation.isPending ? "Saving..." : "Save Health Data"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Health Trends (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {healthMetrics?.length > 0 ? (
                  <div className="space-y-4">
                    {healthMetrics.map((metric: any) => (
                      <div key={metric.id} className="p-4 bg-warm-neutral-100 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{new Date(metric.date).toLocaleDateString()}</span>
                          <div className="flex gap-2">
                            {metric.weight && <Badge variant="outline">Weight: {metric.weight} lbs</Badge>}
                            {metric.energyLevel && <Badge variant="outline">Energy: {metric.energyLevel}/10</Badge>}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-warm-neutral-600">
                          {metric.bloodPressureSystolic && (
                            <span>BP: {metric.bloodPressureSystolic}/{metric.bloodPressureDiastolic}</span>
                          )}
                          {metric.sleepHours && <span>Sleep: {metric.sleepHours}h</span>}
                          {metric.exerciseMinutes && <span>Exercise: {metric.exerciseMinutes}min</span>}
                          {metric.waterIntake && <span>Water: {metric.waterIntake}ml</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-warm-neutral-600 py-8">No health data recorded yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}