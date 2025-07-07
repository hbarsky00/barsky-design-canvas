
import React from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const ServicesNavMenu = () => {
  return (
    <div className="flex justify-center mb-12">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-wrap justify-center gap-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-white">Product Design</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link to="/design-services/ux-ui-design" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-barsky-blue/20 to-barsky-blue/5 p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium text-barsky-dark">
                        Product Design
                      </div>
                      <p className="text-sm leading-tight text-slate-600">
                        User-centered design services that create intuitive, engaging interfaces for web and mobile applications.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <Link to="/design-services/ux-ui-design#user-research" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                    <div className="text-sm font-medium leading-none text-barsky-dark">User Research</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                      In-depth research to understand your users and their needs
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/design-services/ux-ui-design#interaction-design" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                    <div className="text-sm font-medium leading-none text-barsky-dark">Interaction Design</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                      Creating intuitive interfaces with meaningful interactions
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/design-services/ux-ui-design#prototyping" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                    <div className="text-sm font-medium leading-none text-barsky-dark">Prototyping</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                      Interactive prototypes to test and validate design concepts
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-white">Web Development</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link to="/design-services/web-development" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-500/20 to-green-500/5 p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium text-barsky-dark">
                        Web Development
                      </div>
                      <p className="text-sm leading-tight text-slate-600">
                        Modern web development using the latest technologies to create fast, responsive, and accessible websites.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <Link to="/design-services/web-development#frontend" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                    <div className="text-sm font-medium leading-none text-barsky-dark">Frontend Development</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                      React, TypeScript, and modern frameworks for interactive UIs
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/design-services/web-development#responsive" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                    <div className="text-sm font-medium leading-none text-barsky-dark">Responsive Design</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                      Websites that work beautifully on all devices and screen sizes
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/design-services/web-development#performance" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                    <div className="text-sm font-medium leading-none text-barsky-dark">Performance Optimization</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                      Fast loading times and smooth interactions for better user experience
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-white">Mobile App Design</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link to="/design-services/mobile-app-design" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500/20 to-purple-500/5 p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium text-barsky-dark">
                        Mobile App Design
                      </div>
                      <p className="text-sm leading-tight text-slate-600">
                        Creating engaging mobile experiences that users love and businesses rely on.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <Link to="/design-services/mobile-app-design#ios" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                    <div className="text-sm font-medium leading-none text-barsky-dark">iOS App Design</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                      Beautiful and intuitive designs following Apple's Human Interface Guidelines
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/design-services/mobile-app-design#android" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                    <div className="text-sm font-medium leading-none text-barsky-dark">Android App Design</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                      Material Design implementation for Android platforms
                    </p>
                  </Link>
                </li>
                <li>
                  <Link to="/design-services/mobile-app-design#cross-platform" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                    <div className="text-sm font-medium leading-none text-barsky-dark">Cross-Platform Design</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                      Consistent experiences across multiple platforms and devices
                    </p>
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default ServicesNavMenu;
