
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
import { Palette, Type, Layers, Zap, Sparkles, Eye } from "lucide-react";

const DesignSystem = () => {
  const { theme } = useTheme();

  const modernColorTokens = [
    { name: "Midnight", class: "bg-slate-900", value: "#0F172A", description: "Deep, sophisticated dark" },
    { name: "Electric Blue", class: "bg-blue-500", value: "#3B82F6", description: "Vibrant primary accent" },
    { name: "Cyber Purple", class: "bg-purple-600", value: "#9333EA", description: "Futuristic highlight" },
    { name: "Neon Green", class: "bg-emerald-400", value: "#34D399", description: "Success and energy" },
    { name: "Sunset Orange", class: "bg-orange-500", value: "#F97316", description: "Warning and warmth" },
    { name: "Rose Gold", class: "bg-pink-400", value: "#F472B6", description: "Elegant feminine touch" },
    { name: "Platinum", class: "bg-gray-200", value: "#E5E7EB", description: "Clean neutral" },
    { name: "Pearl White", class: "bg-white", value: "#FFFFFF", description: "Pure background" },
  ];

  const gradientTokens = [
    { name: "Cosmic", gradient: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600", description: "Deep space vibes" },
    { name: "Sunset", gradient: "bg-gradient-to-r from-orange-400 via-red-500 to-pink-600", description: "Warm energy" },
    { name: "Ocean", gradient: "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400", description: "Cool depths" },
    { name: "Forest", gradient: "bg-gradient-to-r from-green-600 via-emerald-500 to-teal-400", description: "Natural growth" },
    { name: "Aurora", gradient: "bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600", description: "Northern lights" },
    { name: "Gold Rush", gradient: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500", description: "Luxury warmth" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-20">
          <div className="section-container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
                <h1 className="text-5xl font-bold">Design System 2.0</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A cutting-edge design language that combines elegance with functionality. 
                Built for the future of digital experiences.
              </p>
            </div>

            <Tabs defaultValue="colors" className="mt-12">
              <TabsList className="grid w-full grid-cols-4 mb-12 bg-white/80 backdrop-blur-sm border shadow-lg">
                <TabsTrigger value="colors" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Typography
                </TabsTrigger>
                <TabsTrigger value="components" className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Components
                </TabsTrigger>
                <TabsTrigger value="effects" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Effects
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-12">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Modern Color Palette
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Sophisticated colors designed for premium digital experiences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {modernColorTokens.map((color) => (
                        <div key={color.name} className="group cursor-pointer">
                          <div className={`${color.class} h-32 rounded-2xl shadow-lg group-hover:scale-105 transition-all duration-300 border border-white/20`}></div>
                          <div className="mt-4 space-y-2">
                            <h3 className="font-bold text-gray-900">{color.name}</h3>
                            <p className="text-sm text-gray-500">{color.description}</p>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{color.value}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Gradient Collection</CardTitle>
                    <CardDescription>
                      Premium gradients for modern interfaces
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {gradientTokens.map((gradient) => (
                        <div key={gradient.name} className="group cursor-pointer">
                          <div className={`${gradient.gradient} h-24 rounded-2xl shadow-lg group-hover:scale-105 transition-all duration-300`}></div>
                          <div className="mt-3">
                            <h3 className="font-semibold text-gray-900">{gradient.name}</h3>
                            <p className="text-sm text-gray-500">{gradient.description}</p>
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
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Typography Scale
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Harmonious type system for exceptional readability
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    <div className="space-y-8">
                      <div className="group p-6 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <h1 className="text-6xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                          Display XL
                        </h1>
                        <p className="text-gray-500 font-mono text-sm">font-size: 60px | font-weight: 900</p>
                      </div>
                      
                      <div className="group p-6 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <h1 className="text-5xl font-bold text-slate-800 mb-2">Heading 1</h1>
                        <p className="text-gray-500 font-mono text-sm">font-size: 48px | font-weight: 700</p>
                      </div>
                      
                      <div className="group p-6 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <h2 className="text-4xl font-bold text-slate-800 mb-2">Heading 2</h2>
                        <p className="text-gray-500 font-mono text-sm">font-size: 36px | font-weight: 700</p>
                      </div>
                      
                      <div className="group p-6 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <h3 className="text-3xl font-semibold text-slate-800 mb-2">Heading 3</h3>
                        <p className="text-gray-500 font-mono text-sm">font-size: 30px | font-weight: 600</p>
                      </div>
                      
                      <div className="group p-6 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <p className="text-lg text-slate-700 mb-2 leading-relaxed">
                          Body Large: Perfect for important content that needs to stand out while maintaining excellent readability across all devices.
                        </p>
                        <p className="text-gray-500 font-mono text-sm">font-size: 18px | font-weight: 400 | line-height: 1.6</p>
                      </div>
                      
                      <div className="group p-6 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                        <p className="text-base text-slate-700 mb-2 leading-relaxed">
                          Body: The foundation of our content hierarchy. Optimized for long-form reading with careful attention to spacing and contrast.
                        </p>
                        <p className="text-gray-500 font-mono text-sm">font-size: 16px | font-weight: 400 | line-height: 1.5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="components" className="space-y-8">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">Premium Components</CardTitle>
                    <CardDescription className="text-lg">
                      Beautifully crafted interface elements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    
                    <div>
                      <h3 className="text-xl font-bold mb-6 text-slate-800">Modern Buttons</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                          Primary Gradient
                        </Button>
                        <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
                          Premium Outline
                        </Button>
                        <Button className="bg-black text-white hover:bg-gray-800 shadow-lg">
                          Elegant Black
                        </Button>
                        <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg">
                          Accent Gradient
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-6 text-slate-800">Sophisticated Cards</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="glass-card-elevated border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                            <CardTitle className="text-white">Premium</CardTitle>
                            <CardDescription className="text-blue-100">
                              Enhanced experience
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-6">
                            <p className="text-gray-600">Elevated design with gradient headers and premium styling.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
                          <CardHeader>
                            <CardTitle>Clean & Modern</CardTitle>
                            <CardDescription>Minimalist approach</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-24 mb-4 rounded-lg"></div>
                            <p className="text-gray-600">Subtle elegance with refined details.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="text-purple-800">Soft Gradient</CardTitle>
                            <CardDescription className="text-purple-600">
                              Gentle background tones
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-purple-700">Warm, inviting design with subtle color transitions.</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-6 text-slate-800">Premium Form Elements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                            <Input 
                              id="email" 
                              placeholder="Enter your email" 
                              className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                            <Input 
                              id="password" 
                              type="password" 
                              placeholder="Enter password" 
                              className="border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                            />
                          </div>
                          <div className="flex items-center space-x-3">
                            <Switch id="notifications" />
                            <Label htmlFor="notifications" className="text-slate-700">Enable notifications</Label>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-gray-600 leading-relaxed">
                            Our form elements feature enhanced focus states, refined typography, and sophisticated interaction patterns.
                          </p>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              Enhanced focus indicators
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Consistent spacing system
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Accessible color contrasts
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-6 text-slate-800">Designer Badges</h3>
                      <div className="flex flex-wrap gap-3">
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Premium</Badge>
                        <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">Featured</Badge>
                        <Badge className="bg-black text-white">Exclusive</Badge>
                        <Badge variant="outline" className="border-purple-500 text-purple-600">Limited</Badge>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">New</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="effects" className="space-y-8">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Visual Effects
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Advanced visual treatments for premium experiences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    
                    <div>
                      <h3 className="text-xl font-bold mb-6 text-slate-800">Glass Morphism</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-xl">
                          <h4 className="font-bold text-slate-800 mb-2">Subtle Glass</h4>
                          <p className="text-slate-600">Light transparency with soft backdrop blur</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-xl">
                          <h4 className="font-bold text-slate-800 mb-2">Medium Glass</h4>
                          <p className="text-slate-600">Balanced opacity for readable content</p>
                        </div>
                        <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-2xl p-6 shadow-xl">
                          <h4 className="font-bold text-slate-800 mb-2">Heavy Glass</h4>
                          <p className="text-slate-600">Strong effect for focal elements</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-6 text-slate-800">Premium Shadows</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h4 className="font-semibold">Subtle Shadow</h4>
                            <p className="text-gray-600 text-sm">Perfect for cards and containers</p>
                          </div>
                          <div className="bg-white rounded-lg p-6 shadow-lg">
                            <h4 className="font-semibold">Elevated Shadow</h4>
                            <p className="text-gray-600 text-sm">For floating elements and modals</p>
                          </div>
                          <div className="bg-white rounded-lg p-6 shadow-2xl">
                            <h4 className="font-semibold">Dramatic Shadow</h4>
                            <p className="text-gray-600 text-sm">For hero sections and emphasis</p>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 shadow-lg shadow-purple-500/25">
                            <h4 className="font-semibold text-white">Colored Shadow</h4>
                            <p className="text-purple-100 text-sm">Matching gradient shadows</p>
                          </div>
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-6 shadow-lg shadow-blue-500/25">
                            <h4 className="font-semibold text-white">Ocean Shadow</h4>
                            <p className="text-blue-100 text-sm">Cool toned depth effects</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-6 text-slate-800">Interactive States</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                          <Eye className="h-6 w-6 text-purple-500 mb-2" />
                          <h4 className="font-semibold">Hover Effect</h4>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4 text-white hover:scale-105 transition-transform duration-300 cursor-pointer">
                          <Zap className="h-6 w-6 mb-2" />
                          <h4 className="font-semibold">Scale Transform</h4>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                          <Layers className="h-6 w-6 text-blue-500 mb-2" />
                          <h4 className="font-semibold">Lift Effect</h4>
                        </div>
                        <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg p-4 text-white hover:from-pink-500 hover:to-purple-600 transition-all duration-300 cursor-pointer">
                          <Sparkles className="h-6 w-6 mb-2" />
                          <h4 className="font-semibold">Color Shift</h4>
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
