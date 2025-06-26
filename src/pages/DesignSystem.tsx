
import React from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DesignFileDownload from "@/components/DesignFileDownload";
import { Palette, Type, Layers, Zap, Monitor, Code, Settings, Database } from "lucide-react";

const DesignSystem = () => {
  const { theme } = useTheme();

  const professionalColorTokens = [
    { name: "Steel Blue", class: "bg-blue-600", value: "#2563EB", description: "Primary brand color", gradient: "from-blue-600 to-blue-700" },
    { name: "Navy Dark", class: "bg-slate-800", value: "#1E293B", description: "Deep backgrounds", gradient: "from-slate-800 to-slate-900" },
    { name: "Charcoal", class: "bg-gray-700", value: "#374151", description: "Secondary elements", gradient: "from-gray-700 to-gray-800" },
    { name: "Slate Gray", class: "bg-slate-500", value: "#64748B", description: "Text and borders", gradient: "from-slate-500 to-slate-600" },
    { name: "Electric Blue", class: "bg-blue-500", value: "#3B82F6", description: "Interactive states", gradient: "from-blue-500 to-blue-600" },
    { name: "Success Green", class: "bg-green-600", value: "#059669", description: "Success states", gradient: "from-green-600 to-green-700" },
    { name: "Warning Amber", class: "bg-amber-500", value: "#F59E0B", description: "Warning states", gradient: "from-amber-500 to-amber-600" },
    { name: "Clean White", class: "bg-white", value: "#FFFFFF", description: "Clean backgrounds", gradient: "from-white to-gray-50" },
  ];

  const professionalGradientTokens = [
    { name: "Steel Authority", gradient: "bg-gradient-to-r from-blue-600 via-blue-700 to-slate-700", description: "Primary brand gradient" },
    { name: "Deep Professional", gradient: "bg-gradient-to-r from-slate-800 via-slate-700 to-blue-800", description: "Dark sophisticated look" },
    { name: "Electric Power", gradient: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700", description: "High energy interactions" },
    { name: "Corporate Steel", gradient: "bg-gradient-to-r from-gray-700 via-slate-600 to-blue-600", description: "Corporate professionalism" },
    { name: "Success Flow", gradient: "bg-gradient-to-r from-green-600 via-blue-600 to-blue-700", description: "Achievement and success" },
    { name: "Night Mode", gradient: "bg-gradient-to-r from-gray-900 via-slate-800 to-blue-900", description: "Dark mode elegance" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-20">
          <div className="section-container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <Monitor className="h-10 w-10 text-blue-500" />
                <h1 className="text-6xl font-bold text-white">
                  Professional Design System
                </h1>
                <Code className="h-10 w-10 text-slate-400" />
              </div>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                A sophisticated and professional design language built for modern applications. 
                Clean, accessible, and powerful - designed for serious business applications.
              </p>
            </div>

            <Tabs defaultValue="colors" className="mt-12">
              <TabsList className="grid w-full grid-cols-4 mb-12 bg-black/40 backdrop-blur-sm border border-blue-500/30 shadow-2xl">
                <TabsTrigger value="colors" className="flex items-center gap-2 text-slate-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                  <Palette className="h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex items-center gap-2 text-slate-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                  <Type className="h-4 w-4" />
                  Typography
                </TabsTrigger>
                <TabsTrigger value="components" className="flex items-center gap-2 text-slate-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                  <Layers className="h-4 w-4" />
                  Components
                </TabsTrigger>
                <TabsTrigger value="effects" className="flex items-center gap-2 text-slate-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
                  <Zap className="h-4 w-4" />
                  Effects
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-12">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-4xl font-bold text-white">
                      Professional Color Palette
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-300">
                      Clean, accessible colors designed for professional applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {professionalColorTokens.map((color) => (
                        <div key={color.name} className="group cursor-pointer">
                          <div className={`bg-gradient-to-br ${color.gradient} h-36 rounded-3xl shadow-2xl group-hover:scale-110 transition-all duration-500 border border-white/10 relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="mt-6 space-y-3">
                            <h3 className="font-bold text-slate-200 text-lg">{color.name}</h3>
                            <p className="text-sm text-slate-400">{color.description}</p>
                            <code className="text-xs bg-black/30 border border-blue-500/30 px-3 py-2 rounded-lg font-mono text-slate-200">{color.value}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-white">
                      Professional Gradients
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Sophisticated gradients for modern interfaces
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {professionalGradientTokens.map((gradient) => (
                        <div key={gradient.name} className="group cursor-pointer">
                          <div className={`${gradient.gradient} h-32 rounded-3xl shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500 relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="mt-4">
                            <h3 className="font-bold text-slate-200 text-lg">{gradient.name}</h3>
                            <p className="text-sm text-slate-400 mt-1">{gradient.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="typography" className="space-y-8">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-white">
                      Professional Typography
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-300">
                      Clean, readable type system for professional applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    <div className="space-y-10">
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-500/20">
                        <h1 className="text-7xl font-black text-white mb-3">
                          Professional Display
                        </h1>
                        <p className="text-slate-400 font-mono text-sm">font-size: 72px | font-weight: 900</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-500/20">
                        <h1 className="text-6xl font-bold text-white mb-3">Clean Heading</h1>
                        <p className="text-slate-400 font-mono text-sm">font-size: 60px | font-weight: 700</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-500/20">
                        <h2 className="text-5xl font-bold text-blue-300 mb-3">Modern Title</h2>
                        <p className="text-slate-400 font-mono text-sm">font-size: 48px | font-weight: 700</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-500/20">
                        <h3 className="text-4xl font-semibold text-slate-200 mb-3">Professional Subtitle</h3>
                        <p className="text-slate-400 font-mono text-sm">font-size: 36px | font-weight: 600</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-500/20">
                        <p className="text-xl text-slate-200 mb-3 leading-relaxed">
                          Professional Body Text: Perfect for content that needs to maintain excellent readability while projecting authority and trustworthiness across all devices and creating professional connections.
                        </p>
                        <p className="text-slate-400 font-mono text-sm">font-size: 20px | font-weight: 400 | line-height: 1.6</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-500/20">
                        <p className="text-lg text-slate-300 mb-3 leading-relaxed">
                          Clean Content: The perfect balance of professionalism and readability. Designed for long-form reading with careful attention to spacing, contrast, and visual hierarchy that keeps readers engaged.
                        </p>
                        <p className="text-slate-400 font-mono text-sm">font-size: 18px | font-weight: 400 | line-height: 1.5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="components" className="space-y-8">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-white">
                      Professional Components
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-300">
                      Clean, accessible interface elements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-16">
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-slate-200">Professional Buttons</h3>
                      <div className="flex flex-wrap gap-6">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
                          Primary Action
                        </Button>
                        <Button variant="outline" className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 shadow-lg hover:shadow-blue-500/30">
                          Secondary Action
                        </Button>
                        <Button className="bg-slate-600 hover:bg-slate-700 text-white shadow-2xl hover:shadow-slate-500/50 transform hover:scale-105 transition-all duration-300">
                          Neutral Action
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-white shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300">
                          Success Action
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-slate-200">Professional Cards</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="glass-card-elevated border-0 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105">
                          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
                            <CardTitle className="text-white">Premium Professional</CardTitle>
                            <CardDescription className="text-blue-100">
                              High-quality experience
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-6 bg-black/20">
                            <p className="text-slate-200">Elevated design with professional gradients and clean styling that builds trust with users.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-2 border-blue-500/30 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 bg-black/10">
                          <CardHeader>
                            <CardTitle className="text-slate-200">Clean & Modern</CardTitle>
                            <CardDescription className="text-slate-400">Professional clarity</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-gradient-to-r from-blue-500/20 to-slate-500/20 h-24 mb-4 rounded-xl"></div>
                            <p className="text-slate-200">Minimal design with crisp details that communicate professionalism.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gradient-to-br from-slate-800/30 to-blue-800/30 border-0 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105">
                          <CardHeader>
                            <CardTitle className="text-blue-200">Corporate Gradient</CardTitle>
                            <CardDescription className="text-blue-300">
                              Professional depth
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-blue-200">Sophisticated design with professional color transitions that inspire confidence.</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-slate-200">Professional Form Elements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-slate-200 font-medium">Email Address</Label>
                            <Input 
                              id="email" 
                              placeholder="Enter your email" 
                              className="border-2 border-blue-500/30 focus:border-blue-400 focus:ring-blue-400 rounded-xl bg-black/20 text-slate-200 placeholder:text-slate-400"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="password" className="text-slate-200 font-medium">Password</Label>
                            <Input 
                              id="password" 
                              type="password" 
                              placeholder="Enter password" 
                              className="border-2 border-blue-500/30 focus:border-blue-400 focus:ring-blue-400 rounded-xl bg-black/20 text-slate-200 placeholder:text-slate-400"
                            />
                          </div>
                          <div className="flex items-center space-x-4">
                            <Switch id="notifications" />
                            <Label htmlFor="notifications" className="text-slate-200">Enable notifications</Label>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <p className="text-slate-200 leading-relaxed">
                            Our form elements feature enhanced focus states, professional typography, and clear interaction patterns that create trustworthy user experiences.
                          </p>
                          <ul className="space-y-3 text-slate-200">
                            <li className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              Clear focus indicators
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                              Consistent spacing system
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              Accessible contrast ratios
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-slate-200">Professional Badges</h3>
                      <div className="flex flex-wrap gap-4">
                        <Badge className="bg-blue-600 text-white shadow-lg">Primary</Badge>
                        <Badge className="bg-slate-600 text-white shadow-lg">Professional</Badge>
                        <Badge className="bg-black text-blue-400 border border-blue-500/50 shadow-lg">Exclusive</Badge>
                        <Badge variant="outline" className="border-blue-500 text-blue-400 shadow-lg">Standard</Badge>
                        <Badge className="bg-green-600 text-white shadow-lg">Success</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="effects" className="space-y-8">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-white">
                      Professional Visual Effects
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-300">
                      Sophisticated visual treatments for professional experiences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-16">
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-slate-200">Professional Glass Morphism</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-lg border border-blue-500/30 rounded-3xl p-8 shadow-2xl">
                          <h4 className="font-bold text-slate-200 mb-3">Subtle Professional</h4>
                          <p className="text-slate-400">Light transparency with clean blur</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-xl border border-blue-500/40 rounded-3xl p-8 shadow-2xl">
                          <h4 className="font-bold text-slate-200 mb-3">Balanced Medium</h4>
                          <p className="text-slate-400">Perfect opacity for content areas</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-2xl border border-blue-500/50 rounded-3xl p-8 shadow-2xl">
                          <h4 className="font-bold text-slate-200 mb-3">Strong Presence</h4>
                          <p className="text-slate-400">High impact for important elements</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-slate-200">Professional Shadows</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                          <div className="bg-black/20 rounded-2xl p-8 shadow-sm">
                            <h4 className="font-semibold text-slate-200">Subtle Elevation</h4>
                            <p className="text-slate-400 text-sm">Perfect for card elements</p>
                          </div>
                          <div className="bg-black/20 rounded-2xl p-8 shadow-lg shadow-blue-500/20">
                            <h4 className="font-semibold text-slate-200">Professional Depth</h4>
                            <p className="text-slate-400 text-sm">For floating interface elements</p>
                          </div>
                          <div className="bg-black/20 rounded-2xl p-8 shadow-2xl shadow-blue-500/30">
                            <h4 className="font-semibold text-slate-200">Strong Impact</h4>
                            <p className="text-slate-400 text-sm">For hero sections and emphasis</p>
                          </div>
                        </div>
                        <div className="space-y-8">
                          <div className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl p-8 shadow-2xl shadow-blue-500/40">
                            <h4 className="font-semibold text-white">Professional Glow</h4>
                            <p className="text-blue-100 text-sm">Matching professional shadows</p>
                          </div>
                          <div className="bg-gradient-to-r from-slate-700 to-blue-700 rounded-2xl p-8 shadow-2xl shadow-slate-500/40">
                            <h4 className="font-semibold text-white">Corporate Depth</h4>
                            <p className="text-slate-100 text-sm">Deep professional effects</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-slate-200">Professional Interactive States</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-black/20 rounded-2xl p-6 border-2 border-blue-500/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer">
                          <Monitor className="h-8 w-8 text-blue-400 mb-3" />
                          <h4 className="font-semibold text-slate-200">Clean Hover</h4>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl p-6 text-white hover:scale-110 transition-transform duration-500 cursor-pointer">
                          <Database className="h-8 w-8 mb-3" />
                          <h4 className="font-semibold">Professional Scale</h4>
                        </div>
                        <div className="bg-black/20 rounded-2xl p-6 border border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                          <Layers className="h-8 w-8 text-slate-400 mb-3" />
                          <h4 className="font-semibold text-slate-200">Smooth Lift</h4>
                        </div>
                        <div className="bg-gradient-to-br from-slate-600 to-blue-600 rounded-2xl p-6 text-white hover:from-slate-700 hover:to-blue-700 transition-all duration-500 cursor-pointer">
                          <Settings className="h-8 w-8 mb-3" />
                          <h4 className="font-semibold">Dynamic Transform</h4>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <DesignFileDownload />
      </main>
      <Footer />
    </div>
  );
};

export default DesignSystem;
