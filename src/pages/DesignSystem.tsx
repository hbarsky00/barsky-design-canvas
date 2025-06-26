
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
import { Palette, Type, Layers, Zap, Sparkles, Eye, Heart, Flame } from "lucide-react";

const DesignSystem = () => {
  const { theme } = useTheme();

  const sexyColorTokens = [
    { name: "Passion Red", class: "bg-red-500", value: "#EF4444", description: "Fiery and bold accent", gradient: "from-red-500 to-pink-600" },
    { name: "Deep Purple", class: "bg-purple-700", value: "#7C3AED", description: "Mysterious elegance", gradient: "from-purple-700 to-indigo-600" },
    { name: "Electric Pink", class: "bg-pink-500", value: "#EC4899", description: "Vibrant feminine energy", gradient: "from-pink-500 to-rose-500" },
    { name: "Sunset Orange", class: "bg-orange-500", value: "#F97316", description: "Warm seductive glow", gradient: "from-orange-500 to-red-500" },
    { name: "Midnight Black", class: "bg-gray-900", value: "#111827", description: "Sophisticated darkness", gradient: "from-gray-900 to-black" },
    { name: "Royal Purple", class: "bg-violet-600", value: "#8B5CF6", description: "Luxurious depth", gradient: "from-violet-600 to-purple-700" },
    { name: "Rose Gold", class: "bg-pink-400", value: "#F472B6", description: "Elegant metallic shine", gradient: "from-pink-400 to-orange-300" },
    { name: "Neon Cyan", class: "bg-cyan-400", value: "#22D3EE", description: "Electric contrast", gradient: "from-cyan-400 to-blue-500" },
  ];

  const sexyGradientTokens = [
    { name: "Passionate Fire", gradient: "bg-gradient-to-r from-red-500 via-pink-500 to-purple-600", description: "Intense romantic energy" },
    { name: "Midnight Desire", gradient: "bg-gradient-to-r from-purple-900 via-violet-600 to-pink-500", description: "Dark seductive allure" },
    { name: "Sunset Kiss", gradient: "bg-gradient-to-r from-orange-400 via-pink-500 to-red-600", description: "Warm intimate glow" },
    { name: "Royal Velvet", gradient: "bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700", description: "Luxurious sophistication" },
    { name: "Electric Love", gradient: "bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400", description: "Vibrant attraction" },
    { name: "Mystic Night", gradient: "bg-gradient-to-r from-gray-900 via-purple-800 to-violet-900", description: "Enigmatic beauty" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-20">
          <div className="section-container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <Heart className="h-10 w-10 text-pink-500 animate-pulse" />
                <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-violet-700 bg-clip-text text-transparent">
                  Sexy Design System
                </h1>
                <Flame className="h-10 w-10 text-red-500 animate-bounce" />
              </div>
              <p className="text-xl text-pink-200 max-w-4xl mx-auto leading-relaxed">
                A seductive and sophisticated design language that combines passion with elegance. 
                Built for creating irresistible digital experiences that captivate and enchant.
              </p>
            </div>

            <Tabs defaultValue="colors" className="mt-12">
              <TabsList className="grid w-full grid-cols-4 mb-12 bg-black/40 backdrop-blur-sm border border-pink-500/30 shadow-2xl">
                <TabsTrigger value="colors" className="flex items-center gap-2 text-pink-200 data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300">
                  <Palette className="h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex items-center gap-2 text-pink-200 data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300">
                  <Type className="h-4 w-4" />
                  Typography
                </TabsTrigger>
                <TabsTrigger value="components" className="flex items-center gap-2 text-pink-200 data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300">
                  <Layers className="h-4 w-4" />
                  Components
                </TabsTrigger>
                <TabsTrigger value="effects" className="flex items-center gap-2 text-pink-200 data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300">
                  <Zap className="h-4 w-4" />
                  Effects
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-12">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-violet-700 bg-clip-text text-transparent">
                      Seductive Color Palette
                    </CardTitle>
                    <CardDescription className="text-lg text-pink-200">
                      Passionate colors designed for irresistible digital experiences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {sexyColorTokens.map((color) => (
                        <div key={color.name} className="group cursor-pointer">
                          <div className={`bg-gradient-to-br ${color.gradient} h-36 rounded-3xl shadow-2xl group-hover:scale-110 transition-all duration-500 border border-white/10 relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="mt-6 space-y-3">
                            <h3 className="font-bold text-pink-200 text-lg">{color.name}</h3>
                            <p className="text-sm text-pink-300/80">{color.description}</p>
                            <code className="text-xs bg-black/30 border border-pink-500/30 px-3 py-2 rounded-lg font-mono text-pink-200">{color.value}</code>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                      Passionate Gradients
                    </CardTitle>
                    <CardDescription className="text-pink-200">
                      Seductive gradients for captivating interfaces
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sexyGradientTokens.map((gradient) => (
                        <div key={gradient.name} className="group cursor-pointer">
                          <div className={`${gradient.gradient} h-32 rounded-3xl shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500 relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="mt-4">
                            <h3 className="font-bold text-pink-200 text-lg">{gradient.name}</h3>
                            <p className="text-sm text-pink-300/80 mt-1">{gradient.description}</p>
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
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-violet-700 bg-clip-text text-transparent">
                      Seductive Typography
                    </CardTitle>
                    <CardDescription className="text-lg text-pink-200">
                      Elegant type system for captivating readability
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    <div className="space-y-10">
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 transition-all duration-500 border border-pink-500/20">
                        <h1 className="text-7xl font-black bg-gradient-to-r from-pink-500 via-purple-600 to-violet-700 bg-clip-text text-transparent mb-3">
                          Seductive Display
                        </h1>
                        <p className="text-pink-300 font-mono text-sm">font-size: 72px | font-weight: 900</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 transition-all duration-500 border border-pink-500/20">
                        <h1 className="text-6xl font-bold text-pink-200 mb-3">Passionate Heading</h1>
                        <p className="text-pink-300 font-mono text-sm">font-size: 60px | font-weight: 700</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 transition-all duration-500 border border-pink-500/20">
                        <h2 className="text-5xl font-bold text-pink-200 mb-3">Alluring Title</h2>
                        <p className="text-pink-300 font-mono text-sm">font-size: 48px | font-weight: 700</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 transition-all duration-500 border border-pink-500/20">
                        <h3 className="text-4xl font-semibold text-pink-200 mb-3">Enchanting Subtitle</h3>
                        <p className="text-pink-300 font-mono text-sm">font-size: 36px | font-weight: 600</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 transition-all duration-500 border border-pink-500/20">
                        <p className="text-xl text-pink-200 mb-3 leading-relaxed">
                          Captivating Body Text: Perfect for content that needs to seduce readers while maintaining excellent readability across all devices and creating an intimate connection.
                        </p>
                        <p className="text-pink-300 font-mono text-sm">font-size: 20px | font-weight: 400 | line-height: 1.6</p>
                      </div>
                      
                      <div className="group p-8 rounded-2xl hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 transition-all duration-500 border border-pink-500/20">
                        <p className="text-lg text-pink-200 mb-3 leading-relaxed">
                          Elegant Content: The perfect balance of sophistication and allure. Designed for long-form reading with careful attention to spacing, contrast, and visual rhythm that keeps readers enchanted.
                        </p>
                        <p className="text-pink-300 font-mono text-sm">font-size: 18px | font-weight: 400 | line-height: 1.5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="components" className="space-y-8">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                      Seductive Components
                    </CardTitle>
                    <CardDescription className="text-lg text-pink-200">
                      Irresistibly crafted interface elements
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-16">
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-pink-200">Passionate Buttons</h3>
                      <div className="flex flex-wrap gap-6">
                        <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all duration-300">
                          Passionate Primary
                        </Button>
                        <Button variant="outline" className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 shadow-lg hover:shadow-pink-500/30">
                          Seductive Outline
                        </Button>
                        <Button className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                          Royal Elegance
                        </Button>
                        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300">
                          Sunset Kiss
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-pink-200">Enchanting Cards</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="glass-card-elevated border-0 shadow-2xl hover:shadow-pink-500/30 transition-all duration-500 transform hover:scale-105">
                          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-2xl">
                            <CardTitle className="text-white">Passionate Premium</CardTitle>
                            <CardDescription className="text-pink-100">
                              Irresistible experience
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-6 bg-black/20">
                            <p className="text-pink-200">Elevated design with seductive gradients and passionate styling that captivates users.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-2 border-pink-500/30 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform hover:scale-105 bg-black/10">
                          <CardHeader>
                            <CardTitle className="text-pink-200">Elegant & Sexy</CardTitle>
                            <CardDescription className="text-pink-300">Sophisticated allure</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 h-24 mb-4 rounded-xl"></div>
                            <p className="text-pink-200">Subtle elegance with refined details that whisper sophistication.</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-0 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-105">
                          <CardHeader>
                            <CardTitle className="text-purple-200">Mystic Gradient</CardTitle>
                            <CardDescription className="text-purple-300">
                              Mysterious depths
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-purple-200">Dark, inviting design with enchanting color transitions that mesmerize.</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-pink-200">Seductive Form Elements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-pink-200 font-medium">Email Address</Label>
                            <Input 
                              id="email" 
                              placeholder="Enter your email" 
                              className="border-2 border-pink-500/30 focus:border-pink-400 focus:ring-pink-400 rounded-xl bg-black/20 text-pink-200 placeholder:text-pink-400/50"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="password" className="text-pink-200 font-medium">Password</Label>
                            <Input 
                              id="password" 
                              type="password" 
                              placeholder="Enter password" 
                              className="border-2 border-pink-500/30 focus:border-pink-400 focus:ring-pink-400 rounded-xl bg-black/20 text-pink-200 placeholder:text-pink-400/50"
                            />
                          </div>
                          <div className="flex items-center space-x-4">
                            <Switch id="notifications" />
                            <Label htmlFor="notifications" className="text-pink-200">Enable passionate notifications</Label>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <p className="text-pink-200 leading-relaxed">
                            Our form elements feature enhanced focus states, seductive typography, and passionate interaction patterns that create intimate user experiences.
                          </p>
                          <ul className="space-y-3 text-pink-200">
                            <li className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                              Enhanced passionate focus indicators
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                              Consistent seductive spacing system
                            </li>
                            <li className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              Accessible passionate contrasts
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-pink-200">Seductive Badges</h3>
                      <div className="flex flex-wrap gap-4">
                        <Badge className="bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg">Passionate</Badge>
                        <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg">Royal</Badge>
                        <Badge className="bg-black text-pink-400 border border-pink-500/50 shadow-lg">Exclusive</Badge>
                        <Badge variant="outline" className="border-pink-500 text-pink-400 shadow-lg">Limited Edition</Badge>
                        <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg">Hot</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="effects" className="space-y-8">
                <Card className="glass-card-elevated border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-red-500 bg-clip-text text-transparent">
                      Seductive Visual Effects
                    </CardTitle>
                    <CardDescription className="text-lg text-pink-200">
                      Advanced visual treatments for passionate experiences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-16">
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-pink-200">Passionate Glass Morphism</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-lg border border-pink-500/30 rounded-3xl p-8 shadow-2xl">
                          <h4 className="font-bold text-pink-200 mb-3">Subtle Seduction</h4>
                          <p className="text-pink-300">Light transparency with soft passionate blur</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-xl border border-pink-500/40 rounded-3xl p-8 shadow-2xl">
                          <h4 className="font-bold text-pink-200 mb-3">Passionate Medium</h4>
                          <p className="text-pink-300">Balanced opacity for intimate content</p>
                        </div>
                        <div className="bg-white/30 backdrop-blur-2xl border border-pink-500/50 rounded-3xl p-8 shadow-2xl">
                          <h4 className="font-bold text-pink-200 mb-3">Intense Allure</h4>
                          <p className="text-pink-300">Strong effect for captivating elements</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-pink-200">Seductive Shadows</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                          <div className="bg-black/20 rounded-2xl p-8 shadow-sm">
                            <h4 className="font-semibold text-pink-200">Gentle Whisper</h4>
                            <p className="text-pink-300 text-sm">Perfect for subtle romantic elements</p>
                          </div>
                          <div className="bg-black/20 rounded-2xl p-8 shadow-lg shadow-pink-500/20">
                            <h4 className="font-semibold text-pink-200">Passionate Elevation</h4>
                            <p className="text-pink-300 text-sm">For floating seductive elements</p>
                          </div>
                          <div className="bg-black/20 rounded-2xl p-8 shadow-2xl shadow-pink-500/30">
                            <h4 className="font-semibold text-pink-200">Dramatic Allure</h4>
                            <p className="text-pink-300 text-sm">For hero sections and emphasis</p>
                          </div>
                        </div>
                        <div className="space-y-8">
                          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 shadow-2xl shadow-pink-500/40">
                            <h4 className="font-semibold text-white">Passionate Glow</h4>
                            <p className="text-pink-100 text-sm">Matching seductive shadows</p>
                          </div>
                          <div className="bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl p-8 shadow-2xl shadow-purple-500/40">
                            <h4 className="font-semibold text-white">Royal Mystery</h4>
                            <p className="text-purple-100 text-sm">Deep enchanting depth effects</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-pink-200">Passionate Interactive States</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-black/20 rounded-2xl p-6 border-2 border-pink-500/30 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 cursor-pointer">
                          <Eye className="h-8 w-8 text-pink-400 mb-3" />
                          <h4 className="font-semibold text-pink-200">Seductive Hover</h4>
                        </div>
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 text-white hover:scale-110 transition-transform duration-500 cursor-pointer">
                          <Heart className="h-8 w-8 mb-3" />
                          <h4 className="font-semibold">Passionate Scale</h4>
                        </div>
                        <div className="bg-black/20 rounded-2xl p-6 border border-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                          <Layers className="h-8 w-8 text-purple-400 mb-3" />
                          <h4 className="font-semibold text-pink-200">Alluring Lift</h4>
                        </div>
                        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white hover:from-red-600 hover:to-pink-700 transition-all duration-500 cursor-pointer">
                          <Flame className="h-8 w-8 mb-3" />
                          <h4 className="font-semibold">Fiery Transform</h4>
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
