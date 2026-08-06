import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface MaintenanceCheckProps {
  children: React.ReactNode;
}

const MaintenanceCheck = ({ children }: MaintenanceCheckProps) => {
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();

  // Protected paths that should always be accessible
  const protectedPaths = ['/auth', '/dashboard', '/coming-soon'];
  const isProtectedPath = protectedPaths.some(path => 
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    checkMaintenanceStatus();
    checkAdminStatus();
    
    // Polling fallback instead of realtime subscription to avoid WebSocket errors
    // This is more reliable across different network conditions
    const interval = setInterval(checkMaintenanceStatus, 30000); // Check every 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const checkMaintenanceStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('maintenance_settings')
        .select('is_active')
        .single();

      if (error) throw error;
      setIsMaintenanceActive(data?.is_active || false);
    } catch (error) {
      console.error('Error checking maintenance status:', error);
      setIsMaintenanceActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAdminStatus = async () => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t("common.loading", "Loading...")}</p>
      </div>
    );
  }

  // Allow access if:
  // 1. Maintenance mode is not active
  // 2. User is on a protected path (auth/dashboard)
  // 3. User is an admin
  if (!isMaintenanceActive || isProtectedPath || isAdmin) {
    return <>{children}</>;
  }

  // Redirect to coming soon page
  return <Navigate to="/coming-soon" replace />;
};

export default MaintenanceCheck;
