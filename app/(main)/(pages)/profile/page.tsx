'use client';

import { useUser } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Bell, 
  Palette,
  Camera,
  Save,
  Loader2,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    meetingReminders: true,
    weeklyDigest: false,
    soundEnabled: true,
    darkMode: false,
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        // Apply dark mode based on saved preference
        if (parsed.darkMode) {
          setTheme('dark');
        } else {
          setTheme('light');
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    } else {
      // Set initial theme based on system preference or default to dark
      setPreferences(prev => ({
        ...prev,
        darkMode: theme === 'dark'
      }));
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Update user profile logic here
      await user?.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      
      // Save preferences to localStorage
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.primaryEmailAddress?.emailAddress || '',
    });
    setIsEditing(false);
  };

  if (!isLoaded || !mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getInitials = () => {
    const first = user?.firstName?.[0] || '';
    const last = user?.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6 relative">
          {/* Edit Button - Top Right on Mobile */}
          {!isEditing && (
            <Button 
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 sm:hidden"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}

          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative group">
                <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-background shadow-lg">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
                  <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {user?.fullName || 'User'}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
                
                {/* Badges - Side by side on mobile, wrapped on larger screens */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full justify-center">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="whitespace-nowrap">Joined {formatDate(user?.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full justify-center">
                    <Shield className="h-3.5 w-3.5" />
                    <span className="whitespace-nowrap">Verified Account</span>
                  </div>
                </div>
              </div>

              {/* Edit Button - Desktop Only */}
              {!isEditing && (
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="hidden sm:flex"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-muted' : ''}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handleSave} 
                      disabled={isSaving}
                      className="flex-1 sm:flex-none"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={handleCancel} 
                      variant="outline"
                      disabled={isSaving}
                      className="flex-1 sm:flex-none"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
                <CardDescription>Your activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-primary mb-1">42</div>
                    <div className="text-xs text-muted-foreground">Total Meetings</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-primary mb-1">128</div>
                    <div className="text-xs text-muted-foreground">Notes Created</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-primary mb-1">15h</div>
                    <div className="text-xs text-muted-foreground">Time Saved</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold text-primary mb-1">8</div>
                    <div className="text-xs text-muted-foreground">Collaborators</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your meetings
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, emailNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="meeting-reminders" className="text-base">
                      Meeting Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified before meetings start
                    </p>
                  </div>
                  <Switch
                    id="meeting-reminders"
                    checked={preferences.meetingReminders}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, meetingReminders: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-digest" className="text-base">
                      Weekly Digest
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of your activity
                    </p>
                  </div>
                  <Switch
                    id="weekly-digest"
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, weeklyDigest: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize how NeuroNote looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-base">
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Use dark theme throughout the app
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => {
                      setPreferences({ ...preferences, darkMode: checked });
                      setTheme(checked ? 'dark' : 'light');
                    }}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound-enabled" className="text-base">
                      Sound Effects
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for notifications and actions
                    </p>
                  </div>
                  <Switch
                    id="sound-enabled"
                    checked={preferences.soundEnabled}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, soundEnabled: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">Manage your logged-in devices</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}