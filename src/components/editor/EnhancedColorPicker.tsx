import React, { useState, useCallback } from 'react';
import { HslColorPicker, HslColor } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, RotateCcw, X } from 'lucide-react';

interface EnhancedColorPickerProps {
  currentColor?: string;
  onColorChange: (color: string) => void;
  onRemoveColor: () => void;
}

const hslToHex = (h: number, s: number, l: number): string => {
  const hslToRgb = (h: number, s: number, l: number) => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  };

  const [r, g, b] = hslToRgb(h, s / 100, l / 100);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const hexToHsl = (hex: string): HslColor => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const parseColorValue = (colorValue: string): { hsl: HslColor; opacity: number } => {
  if (!colorValue || colorValue === 'transparent') {
    return { hsl: { h: 0, s: 0, l: 0 }, opacity: 0 };
  }

  // Parse rgba(r, g, b, a) format
  const rgbaMatch = colorValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    const [, r, g, b, a] = rgbaMatch;
    const hex = `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
    return { hsl: hexToHsl(hex), opacity: a ? parseFloat(a) * 100 : 100 };
  }

  // Parse hex format
  if (colorValue.startsWith('#')) {
    return { hsl: hexToHsl(colorValue), opacity: 100 };
  }

  return { hsl: { h: 0, s: 0, l: 0 }, opacity: 100 };
};

const COLOR_PRESETS = [
  '#000000', '#374151', '#6b7280', '#9ca3af',
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'
];

export const EnhancedColorPicker: React.FC<EnhancedColorPickerProps> = ({
  currentColor = '',
  onColorChange,
  onRemoveColor
}) => {
  const { hsl: initialHsl, opacity: initialOpacity } = parseColorValue(currentColor);
  const [hslColor, setHslColor] = useState<HslColor>(initialHsl);
  const [opacity, setOpacity] = useState(initialOpacity);
  const [hexInput, setHexInput] = useState(hslToHex(initialHsl.h, initialHsl.s, initialHsl.l));
  const [recentColors, setRecentColors] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('tiptap-recent-colors') || '[]');
    } catch {
      return [];
    }
  });

  const updateColor = useCallback((newHsl: HslColor, newOpacity: number) => {
    const hex = hslToHex(newHsl.h, newHsl.s, newHsl.l);
    const rgbaColor = newOpacity < 100 
      ? `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, ${newOpacity / 100})`
      : hex;
    
    onColorChange(rgbaColor);
    
    // Update recent colors
    const updatedRecent = [rgbaColor, ...recentColors.filter(c => c !== rgbaColor)].slice(0, 8);
    setRecentColors(updatedRecent);
    localStorage.setItem('tiptap-recent-colors', JSON.stringify(updatedRecent));
  }, [onColorChange, recentColors]);

  const handleHslChange = (newHsl: HslColor) => {
    setHslColor(newHsl);
    setHexInput(hslToHex(newHsl.h, newHsl.s, newHsl.l));
    updateColor(newHsl, opacity);
  };

  const handleOpacityChange = (newOpacity: number[]) => {
    const opacityValue = newOpacity[0];
    setOpacity(opacityValue);
    updateColor(hslColor, opacityValue);
  };

  const handleHexInputChange = (hex: string) => {
    setHexInput(hex);
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      const newHsl = hexToHsl(hex);
      setHslColor(newHsl);
      updateColor(newHsl, opacity);
    }
  };

  const handlePresetClick = (preset: string) => {
    const newHsl = hexToHsl(preset);
    setHslColor(newHsl);
    setHexInput(preset);
    updateColor(newHsl, opacity);
  };

  const handleRecentColorClick = (color: string) => {
    const { hsl: newHsl, opacity: newOpacity } = parseColorValue(color);
    setHslColor(newHsl);
    setOpacity(newOpacity);
    setHexInput(hslToHex(newHsl.h, newHsl.s, newHsl.l));
    onColorChange(color);
  };

  const handleReset = () => {
    const defaultHsl = { h: 0, s: 0, l: 0 };
    setHslColor(defaultHsl);
    setOpacity(100);
    setHexInput('#000000');
    updateColor(defaultHsl, 100);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative w-8 h-8 p-0 rounded border-2"
        >
          <Palette className="w-4 h-4" />
          <div 
            className="absolute bottom-0 right-0 w-3 h-3 rounded-sm border border-border"
            style={{ 
              backgroundColor: currentColor || 'transparent',
              opacity: opacity / 100
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Color Picker</Label>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-8 w-8 p-0"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemoveColor}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Color Picker */}
          <div className="w-full">
            <HslColorPicker 
              color={hslColor} 
              onChange={handleHslChange} 
              style={{ width: '100%', height: '150px' }}
            />
          </div>

          {/* Opacity Slider */}
          <div className="space-y-2">
            <Label className="text-sm">Opacity: {Math.round(opacity)}%</Label>
            <Slider
              value={[opacity]}
              onValueChange={handleOpacityChange}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div 
              className="w-full h-6 rounded border border-border"
              style={{ 
                backgroundColor: hslToHex(hslColor.h, hslColor.s, hslColor.l),
                opacity: opacity / 100
              }}
            />
          </div>

          {/* Hex Input */}
          <div className="space-y-2">
            <Label className="text-sm">Hex Color</Label>
            <Input
              value={hexInput}
              onChange={(e) => handleHexInputChange(e.target.value)}
              placeholder="#000000"
              className="font-mono text-sm"
            />
          </div>

          {/* Color Presets */}
          <div className="space-y-2">
            <Label className="text-sm">Presets</Label>
            <div className="grid grid-cols-6 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetClick(preset)}
                  className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
          </div>

          {/* Recent Colors */}
          {recentColors.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm">Recent Colors</Label>
              <div className="grid grid-cols-8 gap-2">
                {recentColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentColorClick(color)}
                    className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};