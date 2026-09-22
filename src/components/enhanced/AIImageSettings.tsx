import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Settings, Cpu, Zap, Monitor } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface AIImageSettingsProps {
  onSettingsChange?: (settings: AIImageSettings) => void;
}

export interface AIImageSettings {
  enabled: boolean;
  quality: 'low' | 'medium' | 'high';
  autoEnhance: boolean;
  showIndicators: boolean;
  device: 'auto' | 'cpu' | 'webgpu';
}

const defaultSettings: AIImageSettings = {
  enabled: true,
  quality: 'medium',
  autoEnhance: true,
  showIndicators: true,
  device: 'auto'
};

export const AIImageSettings: React.FC<AIImageSettingsProps> = ({
  onSettingsChange
}) => {
  const [settings, setSettings] = useLocalStorage<AIImageSettings>('ai-image-settings', defaultSettings);
  const [isExpanded, setIsExpanded] = useState(false);

  const updateSetting = <K extends keyof AIImageSettings>(
    key: K,
    value: AIImageSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    onSettingsChange?.(defaultSettings);
  };

  const getQualityDescription = (quality: string) => {
    switch (quality) {
      case 'low': return 'Fast processing, basic enhancement';
      case 'medium': return 'Balanced quality and speed';
      case 'high': return 'Best quality, slower processing';
      default: return '';
    }
  };

  const getDeviceDescription = (device: string) => {
    switch (device) {
      case 'auto': return 'Automatically choose best available';
      case 'cpu': return 'Use CPU for processing';
      case 'webgpu': return 'Use GPU acceleration (if available)';
      default: return '';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">AI Image Enhancement</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          Automatically enhance image quality using AI
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="ai-enabled" className="text-base font-medium">
              Enable AI Enhancement
            </Label>
            <p className="text-sm text-muted-foreground">
              Automatically improve image clarity and quality
            </p>
          </div>
          <Switch
            id="ai-enabled"
            checked={settings.enabled}
            onCheckedChange={(checked) => updateSetting('enabled', checked)}
          />
        </div>

        {/* Advanced Settings */}
        {isExpanded && settings.enabled && (
          <div className="space-y-4 pt-2 border-t border-border">
            {/* Quality Setting */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Enhancement Quality</Label>
              <Select
                value={settings.quality}
                onValueChange={(value: 'low' | 'medium' | 'high') => updateSetting('quality', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Fast</div>
                        <div className="text-xs text-muted-foreground">Basic enhancement</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      <div>
                        <div className="font-medium">Balanced</div>
                        <div className="text-xs text-muted-foreground">Good quality & speed</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <div>
                        <div className="font-medium">High Quality</div>
                        <div className="text-xs text-muted-foreground">Best enhancement</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {getQualityDescription(settings.quality)}
              </p>
            </div>

            {/* Device Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Processing Device</Label>
              <Select
                value={settings.device}
                onValueChange={(value: 'auto' | 'cpu' | 'webgpu') => updateSetting('device', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="cpu">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      CPU Processing
                    </div>
                  </SelectItem>
                  <SelectItem value="webgpu">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      GPU Acceleration
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {getDeviceDescription(settings.device)}
              </p>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-enhance" className="text-sm">
                  Auto-enhance new images
                </Label>
                <Switch
                  id="auto-enhance"
                  checked={settings.autoEnhance}
                  onCheckedChange={(checked) => updateSetting('autoEnhance', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-indicators" className="text-sm">
                  Show enhancement indicators
                </Label>
                <Switch
                  id="show-indicators"
                  checked={settings.showIndicators}
                  onCheckedChange={(checked) => updateSetting('showIndicators', checked)}
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 pt-2">
              <Badge variant={settings.enabled ? "default" : "secondary"} className="text-xs">
                {settings.enabled ? "Active" : "Disabled"}
              </Badge>
              {settings.enabled && (
                <Badge variant="outline" className="text-xs">
                  {settings.quality} quality
                </Badge>
              )}
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetSettings}
              className="w-full text-xs"
            >
              Reset to Defaults
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};