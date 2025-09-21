const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <img 
              src="/gdg_mlrit_logo.png" 
              alt="GDG MLRIT" 
              className="h-12 w-auto"
            />
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© 2025 Google Developer Group on Campus. All rights reserved.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Google Cloud, Google Cloud Platform, and the Google Cloud logo are trademarks of Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;