import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-6xl font-bold bg-gradient-to-r from-gcp-blue to-gcp-red bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. Let's get you back on track.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="btn-gcp-primary inline-block"
          >
            Back to Home
          </Link>
          
          <div className="text-sm text-muted-foreground">
            <p>Lost? Try these popular pages:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link to="/community" className="text-primary hover:underline">Community</Link>
              <Link to="/team" className="text-primary hover:underline">Team</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
