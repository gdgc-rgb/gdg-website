import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import MorphingNavbar from "./animations/MorphingNavbar";
import AnimatedNavLink from "./animations/AnimatedNavLink";
import ElasticMobileNav from "./animations/ElasticMobileNav";
import ScrollProgressIndicator from "./animations/ScrollProgressIndicator";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "GDGC Community", path: "/community" },
    { name: "Core Team", path: "/team" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator
        position="top"
        height={3}
        color="hsl(var(--primary))"
        showPercentage={false}
      />

      <MorphingNavbar
        morphOnScroll={false}
        className="h-24"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-3">
          <div className="flex justify-between items-center h-16 rounded-full bg-white/95 backdrop-blur border border-border/60 shadow-lg px-4 sm:px-6">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/gdg_mlrit_logo.png" 
                alt="GDG MLRIT" 
                className="h-10 sm:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <AnimatedNavLink
                  key={item.path}
                  href={item.path}
                  isActive={isActive(item.path)}
                  className={
                    isActive(item.path)
                      ? "text-foreground bg-muted/60 rounded-full px-3 py-1"
                      : "text-muted-foreground hover:text-foreground rounded-full px-3 py-1"
                  }
                  underlineColor="hsl(var(--primary))"
                >
                  {item.name}
                </AnimatedNavLink>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <ElasticMobileNav
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {navItems.map((item) => (
                  <AnimatedNavLink
                    key={item.path}
                    href={item.path}
                    isActive={isActive(item.path)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left ${
                      isActive(item.path)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    underlineColor="hsl(var(--primary))"
                  >
                    {item.name}
                  </AnimatedNavLink>
                ))}
              </ElasticMobileNav>
            </div>
          </div>
        </div>
      </MorphingNavbar>
    </>
  );
};

export default Navbar;
