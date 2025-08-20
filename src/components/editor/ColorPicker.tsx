import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Palette, Type, Highlighter } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  type?: 'text' | 'highlight';
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  type = 'text',
  className = ''
}) => {
  const [hexColor, setHexColor] = useState(color || '#000000');
  const [opacity, setOpacity] = useState(100);

  const handleColorChange = (newColor: string) => {
    setHexColor(newColor);
    const rgba = hexToRgba(newColor, opacity / 100);
    onChange(rgba);
  };

  const handleOpacityChange = (newOpacity: number[]) => {
    const opacityValue = newOpacity[0];
    setOpacity(opacityValue);
    const rgba = hexToRgba(hexColor, opacityValue / 100);
    onChange(rgba);
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000'
  ];

  const Icon = type === 'highlight' ? Highlighter : Type;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`w-8 h-8 p-0 border border-border ${className}`}
        >
          <Icon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Color Picker</Label>
            <HexColorPicker 
              color={hexColor} 
              onChange={handleColorChange}
              style={{ width: '100%', height: '150px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Opacity</Label>
            <Slider
              value={[opacity]}
              onValueChange={handleOpacityChange}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground text-center">
              {opacity}%
            </div>
          </div>

          <div className="space-y-2">
            <Label>Hex Color</Label>
            <Input
              value={hexColor}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="#000000"
            />
          </div>

          <div className="space-y-2">
            <Label>Preset Colors</Label>
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="w-8 h-8 rounded border border-border"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => handleColorChange(presetColor)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange('inherit')}
            >
              Reset
            </Button>
            <div 
              className="w-8 h-8 rounded border border-border"
              style={{ backgroundColor: hexToRgba(hexColor, opacity / 100) }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};