
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
    { name: "Electric Blue", class: "bg-blue-500", value: "#3B82F6", description: "Primary interactive color", gradient: "from-blue-500 to-blue-600" },
    { name: "Navy Dark", class: "bg-slate-800", value: "#1E293B", description: "Deep backgrounds", gradient: "from-slate-800 to-slate-900" },
    { name: "Charcoal", class: "bg-gray-700", value: "#374151", description: "Secondary elements", gradient: "from-gray-700 to-gray-800" },
    { name: "Steel Blue", class: "bg-blue-600", value: "#2563EB", description: "Primary brand color", gradient: "from-blue-600 to-blue-700" },
    { name: "Success Green", class: "bg-green-500", value: "#10B981", description: "Success states", gradient: "from-green-500 to-green-600" },
    { name: "Warning Orange", class: "bg-orange-500", value: "#F97316", description: "Warning states", gradient: "from-orange-500 to-orange-600" },
    { name: "Pure White", class: "bg-white", value: "#FFFFFF", description: "Text and highlights", gradient: "from-white to-gray-50" },
    { name: "Light Gray", class: "bg-gray-300", value: "#D1D5DB", description: "Muted text", gradient: "from-gray-300 to-gray-400" },
  ];

  const professionalGradientTokens = [
    { name: "Professional Authority", gradient: "bg-gradient-to-r from-blue-600 via-blue-500 to-slate-600", description: "Primary brand gradient with authority" },
    { name: "Deep Corporate", gradient: "bg-gradient-to-r from-slate-800 via-slate-700 to-blue-700", description: "Dark sophisticated corporate look" },
    { name: "Electric Power", gradient: "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600", description: "High energy interactive states" },
    { name: "Steel Professional", gradient: "bg-gradient-to-r from-gray-700 via-slate-600 to-blue-500", description: "Corporate professionalism" },
    { name: "Success Flow", gradient: "bg-gradient-to-r from-green-500 via-blue-500 to-blue-600", description: "Achievement and success states" },
    { name: "Executive Night", gradient: "bg-gradient-to-r from-gray-900 via-slate-800 to-blue-800", description: "Executive dark mode elegance" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-20">
          <div className="section-container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <Monitor className="h-10 w-10 text-blue-400" />
                <h1 className="text-6xl font-bold text-white">
                  Professional Design System
                </h1>
                <Code className="h-10 w-10 text-gray-300" />
              </div>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                A sophisticated and accessible design language built for professional applications. 
                Clean, readable, and powerful - designed for serious business with optimal accessibility.
              </p>
            </div>

            <Tabs defaultValue="colors" className="mt-12">
              <TabsList className="grid w-full grid-cols-4 mb-12 bg-black/40 backdrop-blur-sm border border-blue-400/30 shadow-2xl">
                <TabsTrigger value="colors" className="flex items-center gap-2 text-gray-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-200">
                  <Palette className="h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex items-center gap-2 text-gray-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-200">
                  <Type className="h-4 w-4" />
                  Typography
                </TabsTrigger>
                <TabsTrigger value="components" className="flex items-center gap-2 text-gray-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-200">
                  <Layers className="h-4 w-4" />
                  Components
                </TabsTrigger>
                <TabsTrigger value="effects" className="flex items-center gap-2 text-gray-200 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-200">
                  <Zap className="h-4 w-4" />
                  Effects
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-12">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-4xl font-bold text-white">
                      Accessible Professional Palette
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-200">
                      High contrast colors designed for accessibility and professional appeal
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
                            <h3 className="font-bold text-white text-lg">{color.name}</h3>
                            <p className="text-sm text-gray-300">{color.description}</p>
                            <code className="text-xs bg-black/30 border border-blue-400/30 px-3 py-2 rounded-lg font-mono text-white">{color.value}</code>
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
                    <CardDescription className="text-gray-200">
                      Sophisticated gradients for modern professional interfaces
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
                            <h3 className="font-bold text-white text-lg">{gradient.name}</h3>
                            <p className="text-sm text-gray-300 mt-1">{gradient.description}</p>
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
                      Accessible Typography
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-200">
                      High contrast, readable type system optimized for accessibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    <div className="space-y-10">
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-400/20">
                        <h1 className="text-7xl font-black text-white mb-3">
                          Professional Display
                        </h1>
                        <p className="text-gray-300 font-mono text-sm">font-size: 72px | font-weight: 900 | color: white</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-400/20">
                        <h1 className="text-6xl font-bold text-white mb-3">Clean Heading</h1>
                        <p className="text-gray-300 font-mono text-sm">font-size: 60px | font-weight: 700 | color: white</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-400/20">
                        <h2 className="text-5xl font-bold text-blue-200 mb-3">Modern Title</h2>
                        <p className="text-gray-300 font-mono text-sm">font-size: 48px | font-weight: 700 | color: blue-200</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-400/20">
                        <h3 className="text-4xl font-semibold text-white mb-3">Professional Subtitle</h3>
                        <p className="text-gray-300 font-mono text-sm">font-size: 36px | font-weight: 600 | color: white</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-400/20">
                        <p className="text-xl text-white mb-3 leading-relaxed">
                          Professional Body Text: Perfect for content that needs to maintain excellent readability while projecting authority and trustworthiness across all devices. High contrast ensures accessibility compliance.
                        </p>
                        <p className="text-gray-300 font-mono text-sm">font-size: 20px | font-weight: 400 | line-height: 1.6 | color: white</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-slate-500/10 transition-all duration-500 border border-blue-400/20">
                        <p className="text-lg text-gray-200 mb-3 leading-relaxed">
                          Accessible Content: Optimized contrast ratios ensure readability for users with visual impairments. This text maintains professional appearance while meeting WCAG AA standards for accessibility.
                        </p>
                        <p className="text-gray-300 font-mono text-sm">font-size: 18px | font-weight: 400 | line-height: 1.5 | color: gray-200</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="components" className="space-y-8">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold text-white">
                      Accessible Professional Components
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-200">
                      High contrast interface elements with optimal accessibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-16">
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-white">Professional Buttons</h3>
                      <div className="flex flex-wrap gap-6">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-2xl hover:shadow-blue-400/50 transform hover:scale-105 transition-all duration-300">
                          Primary Action
                        </Button>
                        <Button variant="outline" className="border-2 border-blue-400 text-blue-200 hover:bg-blue-500/20 hover:text-blue-100 shadow-lg hover:shadow-blue-400/30">
                          Secondary Action
                        </Button>
                        <Button className="bg-slate-600 hover:bg-slate-500 text-white shadow-2xl hover:shadow-slate-400/50 transform hover:scale-105 transition-all duration-300">
                          Neutral Action
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-500 text-white shadow-2xl hover:shadow-green-400/50 transform hover:scale-105 transition-all duration-300">
                          Success Action
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-white">Professional Cards</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="glass-card-elevated border-0 shadow-2xl hover:shadow-blue-400/30 transition-all duration-500 transform hover:scale-105">
                          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-2xl">
                            <CardTitle className="text-white">Premium Professional</CardTitle>
                            <CardDescription className="text-blue-100">
                              High-quality accessible experience
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-6 bg-black/20">
                            <p className="text-white">Elevated design with professional gradients and high contrast styling for optimal accessibility.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-2 border-blue-400/30 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-400/20 transition-all duration-500 transform hover:scale-105 bg-black/10">
                          <CardHeader>
                            <CardTitle className="text-white">Clean & Accessible</CardTitle>
                            <CardDescription className="text-gray-300">Professional clarity</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-gradient-to-r from-blue-500/20 to-slate-500/20 h-24 mb-4 rounded-xl"></div>
                            <p className="text-white">Minimal design with high contrast details that ensure readability for all users.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gradient-to-br from-slate-800/30 to-blue-700/30 border-0 shadow-2xl hover:shadow-blue-400/30 transition-all duration-500 transform hover:scale-105">
                          <CardHeader>
                            <CardTitle className="text-blue-100">Executive Gradient</CardTitle>
                            <CardDescription className="text-blue-200">
                              Professional depth with accessibility
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-blue-100">Sophisticated design with professional color transitions that maintain high contrast ratios.</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-white">Accessible Form Elements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                            <Input 
                              id="email" 
                              placeholder="Enter your email" 
                              className="border-2 border-blue-400/30 focus:border-blue-300 focus:ring-blue-300 rounded-xl bg-black/20 text-white placeholder:text-gray-300"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="password" className="text-white font-medium">Password</Label>
                            <Input 
                              id="password" 
                              type="password" 
                              placeholder="Enter password" 
                              className="border-2 border-blue-400/30 focus:border-blue-300 focus:ring-blue-300 rounded-xl bg-black/20 text-white placeholder:text-gray-300"
                            />
                          </div>
                          <div className="flex items-center space-x-4">
                            <Switch id="notifications" />
                            <Label htmlFor="notifications" className="text-white">Enable notifications</Label>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <p className="text-white leading-relaxed">
                            Our form elements feature enhanced focus states, high contrast typography, and clear interaction patterns that create accessible and trustworthy user experiences.
                          </p>
                          <ul className="space-y-3 text-white">
                            <li className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                              High contrast focus indicators
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                              Consistent accessible spacing
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                              WCAG AA compliant contrast ratios
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-white">Professional Badges</h3>
                      <div className="flex flex-wrap gap-4">
                        <Badge className="bg-blue-600 text-white shadow-lg">Primary</Badge>
                        <Badge className="bg-slate-600 text-white shadow-lg">Professional</Badge>
                        <Badge className="bg-black text-blue-200 border border-blue-400/50 shadow-lg">Exclusive</Badge>
                        <Badge variant="outline" className="border-blue-400 text-blue-200 shadow-lg">Standard</Badge>
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
                    <CardDescription className="text-lg text-gray-200">
                      Sophisticated visual treatments that maintain accessibility standards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-16">
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-white">Professional Glass Morphism</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-lg border border-blue-400/30 rounded-3xl p-8 shadow-2xl">
                          <h4 className="font-bold text-white mb-3">Subtle Professional</h4>
                          <p className="text-gray-300">Light transparency with clean blur</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-xl border border-blue-400/40 rounded-3xl p-8 shadow-2xl">
                          <h4 className="font-bold text-white mb-3">Balanced Medium</h4>
                          <p className="text-gray-300">Perfect opacity for content areas</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-2xl border border-blue-400/50 rounded-3xl p-8 shadow-2xl">
                          <h4 className="font-bold text-white mb-3">Strong Presence</h4>
                          <p className="text-gray-300">High impact for important elements</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-white">Professional Shadows</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                          <div className="bg-black/20 rounded-2xl p-8 shadow-sm">
                            <h4 className="font-semibold text-white">Subtle Elevation</h4>
                            <p className="text-gray-300 text-sm">Perfect for card elements</p>
                          </div>
                          <div className="bg-black/20 rounded-2xl p-8 shadow-lg shadow-blue-400/20">
                            <h4 className="font-semibold text-white">Professional Depth</h4>
                            <p className="text-gray-300 text-sm">For floating interface elements</p>
                          </div>
                          <div className="bg-black/20 rounded-2xl p-8 shadow-2xl shadow-blue-400/30">
                            <h4 className="font-semibold text-white">Strong Impact</h4>
                            <p className="text-gray-300 text-sm">For hero sections and emphasis</p>
                          </div>
                        </div>
                        <div className="space-y-8">
                          <div className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl p-8 shadow-2xl shadow-blue-400/40">
                            <h4 className="font-semibold text-white">Professional Glow</h4>
                            <p className="text-blue-100 text-sm">Matching professional shadows</p>
                          </div>
                          <div className="bg-gradient-to-r from-slate-700 to-blue-600 rounded-2xl p-8 shadow-2xl shadow-slate-400/40">
                            <h4 className="font-semibold text-white">Executive Depth</h4>
                            <p className="text-slate-100 text-sm">Deep professional effects</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-white">Professional Interactive States</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-black/20 rounded-2xl p-6 border-2 border-blue-400/30 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300 cursor-pointer">
                          <Monitor className="h-8 w-8 text-blue-300 mb-3" />
                          <h4 className="font-semibold text-white">Accessible Hover</h4>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl p-6 text-white hover:scale-110 transition-transform duration-500 cursor-pointer">
                          <Database className="h-8 w-8 mb-3" />
                          <h4 className="font-semibold">Professional Scale</h4>
                        </div>
                        <div className="bg-black/20 rounded-2xl p-6 border border-blue-400/30 hover:shadow-2xl hover:shadow-blue-400/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                          <Layers className="h-8 w-8 text-gray-300 mb-3" />
                          <h4 className="font-semibold text-white">Smooth Lift</h4>
                        </div>
                        <div className="bg-gradient-to-br from-slate-600 to-blue-600 rounded-2xl p-6 text-white hover:from-slate-500 hover:to-blue-500 transition-all duration-500 cursor-pointer">
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
