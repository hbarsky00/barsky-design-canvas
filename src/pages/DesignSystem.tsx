
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

const DesignSystem = () => {
  const { theme } = useTheme();

  const colorTokens = [
    { name: "Blue", class: "bg-barsky-blue", value: "#5D5DFF" },
    { name: "Blue Dark", class: "bg-barsky-blue-dark", value: "#4B4ACF" },
    { name: "Dark", class: "bg-barsky-dark", value: "#333644" },
    { name: "Text", class: "bg-barsky-text", value: "#4F5D75" },
    { name: "Text Light", class: "bg-barsky-text-light", value: "#8A94A7" },
    { name: "Background Light", class: "bg-barsky-bg-light", value: "#F6F6F8" },
    { name: "Background White", class: "bg-barsky-bg-white", value: "#FFFFFF" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <section className="bg-barsky-bg-light py-20 dark:bg-gray-900">
          <div className="section-container">
            <h1 className="section-title">Design System</h1>
            <p className="text-barsky-text mb-12 max-w-2xl dark:text-gray-300">
              A comprehensive guide to the visual language and components used throughout
              the portfolio. This system ensures consistency and helps maintain design
              integrity across all projects.
            </p>

            <Tabs defaultValue="colors" className="mt-12">
              <TabsList className="mb-8">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Color Palette</CardTitle>
                    <CardDescription>
                      The primary color system used across the portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {colorTokens.map((color) => (
                        <div key={color.name} className="flex flex-col space-y-2">
                          <div
                            className={`${color.class} h-24 rounded-md shadow-md`}
                          ></div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{color.name}</span>
                            <span className="text-sm text-barsky-text-light">
                              {color.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Semantic Colors</CardTitle>
                    <CardDescription>
                      Colors representing different states and meanings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col space-y-2">
                        <div className="bg-primary h-16 rounded-md"></div>
                        <span className="font-medium">Primary</span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="bg-secondary h-16 rounded-md"></div>
                        <span className="font-medium">Secondary</span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="bg-destructive h-16 rounded-md"></div>
                        <span className="font-medium">Destructive</span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="bg-muted h-16 rounded-md"></div>
                        <span className="font-medium">Muted</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="typography" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Typography</CardTitle>
                    <CardDescription>
                      Typography scale and styles used in the design system
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div>
                      <h1 className="text-5xl font-bold mb-2">Heading 1</h1>
                      <p className="text-barsky-text-light">
                        Font: Inter, 48px, Weight: 700
                      </p>
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold mb-2">Heading 2</h2>
                      <p className="text-barsky-text-light">
                        Font: Inter, 36px, Weight: 700
                      </p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">Heading 3</h3>
                      <p className="text-barsky-text-light">
                        Font: Inter, 30px, Weight: 700
                      </p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">Heading 4</h4>
                      <p className="text-barsky-text-light">
                        Font: Inter, 24px, Weight: 700
                      </p>
                    </div>
                    <div>
                      <h5 className="text-xl font-bold mb-2">Heading 5</h5>
                      <p className="text-barsky-text-light">
                        Font: Inter, 20px, Weight: 700
                      </p>
                    </div>
                    <div>
                      <p className="text-lg mb-2">
                        Body Large: This is a sample of larger body text used for
                        important paragraphs.
                      </p>
                      <p className="text-barsky-text-light">
                        Font: Inter, 18px, Weight: 400
                      </p>
                    </div>
                    <div>
                      <p className="text-base mb-2">
                        Body: This is the standard body text used throughout the
                        portfolio for general content and descriptions.
                      </p>
                      <p className="text-barsky-text-light">
                        Font: Inter, 16px, Weight: 400
                      </p>
                    </div>
                    <div>
                      <p className="text-sm mb-2">
                        Small: Used for captions, footnotes, and secondary
                        information.
                      </p>
                      <p className="text-barsky-text-light">
                        Font: Inter, 14px, Weight: 400
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="components" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>UI Components</CardTitle>
                    <CardDescription>
                      Common UI components used throughout the portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Cards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <Card>
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>Card description</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Card content goes here.</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Feature Card</CardTitle>
                          <CardDescription>With an image</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-200 h-32 mb-3 rounded"></div>
                          <p>Card with image placeholder</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="bg-barsky-blue text-white rounded-t-lg">
                          <CardTitle>Highlighted Card</CardTitle>
                          <CardDescription className="text-white/80">
                            With colored header
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Card with colored header</p>
                        </CardContent>
                      </Card>
                    </div>

                    <h3 className="text-lg font-medium mb-4">Form Elements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="Enter your password" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="notifications" />
                          <Label htmlFor="notifications">Enable notifications</Label>
                        </div>
                      </div>
                      <div>
                        <p className="mb-4">Form inputs follow a consistent style with clear focus states and error handling.</p>
                        <ul className="list-disc list-inside space-y-2 text-barsky-text dark:text-gray-300">
                          <li>Labels are positioned above inputs</li>
                          <li>Validation states are clearly visible</li>
                          <li>Interactive elements have hover and focus states</li>
                          <li>Form groups maintain consistent spacing</li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mb-4">Badges</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>

                    <h3 className="text-lg font-medium mb-4">Separators</h3>
                    <div className="space-y-8">
                      <div>
                        <p className="mb-2">Horizontal Separator</p>
                        <Separator className="my-4" />
                      </div>
                      <div className="flex h-12">
                        <div className="flex-1">Left</div>
                        <Separator orientation="vertical" />
                        <div className="flex-1 pl-4">Right</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="buttons" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>
                      Button styles and variations used in the interface
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Primary Buttons</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button>Default</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
                      <div className="flex flex-wrap items-center gap-4">
                        <Button size="lg">Large</Button>
                        <Button>Default</Button>
                        <Button size="sm">Small</Button>
                        <Button size="icon">
                          <span className="text-lg">+</span>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Custom Buttons</h3>
                      <div className="flex flex-wrap gap-4">
                        <a href="#" className="btn-primary">
                          Primary
                        </a>
                        <a href="#" className="btn-outline">
                          Outline
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Button States</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Button>Default</Button>
                        <Button disabled>Disabled</Button>
                        <Button variant="outline">Hover me</Button>
                        <Button variant="secondary">Focus me</Button>
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
