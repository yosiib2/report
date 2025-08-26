// src/components/SettingsPanel.tsx
import React, { useState, useEffect } from "react";
import { Settings, Moon, Sun, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import useLocalStorageState from "use-local-storage-state";
import { Slider } from "@/components/ui/slider"; // Radix Slider

interface SettingsPanelProps {
  changePassword: (oldPassword: string, newPassword: string) => void;
  isChanging: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ changePassword, isChanging }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [darkMode, setDarkMode] = useLocalStorageState("darkMode", { defaultValue: false });
  const [brightness, setBrightness] = useLocalStorageState("brightness", { defaultValue: 100 });

  useEffect(() => {
    // Apply dark mode and brightness on mount
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.filter = `brightness(${brightness}%)`;
  }, [darkMode, brightness]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleBrightnessChange = (values: number[]) => {
    const value = values[0]; // Slider provides array, pick first element
    setBrightness(value);
    document.documentElement.style.filter = `brightness(${value}%)`;
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast({ title: "Missing Fields", description: "Enter both passwords", variant: "destructive" });
      return;
    }
    changePassword(oldPassword, newPassword);
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="relative">
      {/* Settings Icon */}
      <Button
        variant="outline"
        className="p-2 rounded-full fixed top-4 right-4 z-50"
        onClick={() => setOpen(!open)}
      >
        <Settings className="h-6 w-6" />
      </Button>

      {/* Settings Panel */}
      {open && (
        <div className="fixed top-16 right-4 w-72 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 z-50 space-y-4">
          
          {/* Night Mode Toggle */}
          <div className="flex items-center justify-between">
            <span>Night Mode</span>
            <Button size="sm" variant="outline" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-gray-800 dark:text-white" />}
            </Button>
          </div>

          {/* Brightness Slider */}
          <div>
            <label className="text-sm">Brightness: {brightness}%</label>
            <Slider
              min={50}
              max={150}
              value={[brightness]} // Must be array
              onValueChange={handleBrightnessChange} // Receives array
            />
          </div>

          {/* Change Password */}
          <form onSubmit={handleChangePassword} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Change Password</span>
            </div>
            <Input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="px-2 py-1 text-sm"
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-2 py-1 text-sm"
            />
            <Button type="submit" className="w-full" disabled={isChanging}>
              {isChanging ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
