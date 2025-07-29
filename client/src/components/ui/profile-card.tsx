import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Edit2, Save, X } from "lucide-react";

// Import avatars
import userAvatar1 from "@/assets/avatars/user/user1.png";
import userAvatar2 from "@/assets/avatars/user/user2.png";
import userAvatar3 from "@/assets/avatars/user/user3.png";
import userAvatar4 from "@/assets/avatars/user/user4.png";

const userAvatars = {
  'user1': userAvatar1,
  'user2': userAvatar2,
  'user3': userAvatar3,
  'user4': userAvatar4
};

const avatarOptions = [
  { id: 'user1', name: 'Alex', src: userAvatar1 },
  { id: 'user2', name: 'Maya', src: userAvatar2 },
  { id: 'user3', name: 'Rocky', src: userAvatar3 },
  { id: 'user4', name: 'Sam', src: userAvatar4 }
];

const ageGroups = [
  { value: '18-25', label: '18-25' },
  { value: '26-35', label: '26-35' },
  { value: '36-45', label: '36-45' },
  { value: '46-55', label: '46-55' },
  { value: '56-65', label: '56-65' },
  { value: '65+', label: '65+' }
];

interface ProfileCardProps {
  userData: {
    nickname?: string;
    avatar?: string;
    ageGroup?: string;
    phoneNumber?: string;
  };
  onSave: (data: any) => void;
}

export function ProfileCard({ userData, onSave }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    nickname: userData?.nickname || '',
    avatar: userData?.avatar || 'user1',
    ageGroup: userData?.ageGroup || '18-25',
    phoneNumber: userData?.phoneNumber || ''
  });

  const userAvatarSrc = userData?.avatar ? userAvatars[userData.avatar as keyof typeof userAvatars] : userAvatar1;

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      nickname: userData?.nickname || '',
      avatar: userData?.avatar || 'user1',
      ageGroup: userData?.ageGroup || '18-25',
      phoneNumber: userData?.phoneNumber || ''
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your personal account details</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                <img 
                  src={isEditing ? avatarOptions.find(a => a.id === editData.avatar)?.src || userAvatarSrc : userAvatarSrc}
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center font-medium">
                {isEditing ? editData.nickname : userData?.nickname || "User"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-purple-600 hover:text-purple-700"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          // View Mode
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-gray-700">Nickname</Label>
              <p className="text-sm text-gray-600 mt-1">{userData?.nickname || 'Not set'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Age Group</Label>
              <p className="text-sm text-gray-600 mt-1">{userData?.ageGroup || 'Not set'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
              <p className="text-sm text-gray-600 mt-1">{userData?.phoneNumber || 'Not set'}</p>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Avatar</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setEditData({...editData, avatar: avatar.id})}
                    className={`relative p-2 rounded-lg border-2 transition-all ${
                      editData.avatar === avatar.id
                        ? "border-purple-500 bg-purple-50 scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img 
                        src={avatar.src} 
                        alt={avatar.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center mt-1 font-medium">{avatar.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="nickname" className="text-sm font-medium text-gray-700">Nickname</Label>
              <Input
                id="nickname"
                value={editData.nickname}
                onChange={(e) => setEditData({...editData, nickname: e.target.value})}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Age Group</Label>
              <Select value={editData.ageGroup} onValueChange={(value) => setEditData({...editData, ageGroup: value})}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
              <Input
                id="phone"
                value={editData.phoneNumber}
                onChange={(e) => setEditData({...editData, phoneNumber: e.target.value})}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}