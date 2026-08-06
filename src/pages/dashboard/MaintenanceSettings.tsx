import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Settings } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MaintenanceSettings {
  id: string;
  is_active: boolean;
  updated_at: string;
}

const MaintenanceSettings = () => {
  const [settings, setSettings] = useState<MaintenanceSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('maintenance_settings')
        .select('*')
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching maintenance settings:', error);
      toast({
        title: t('maintenance.error'),
        description: t('maintenance.errorFetch'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (checked: boolean) => {
    if (!settings) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('maintenance_settings')
        .update({ 
          is_active: checked,
          updated_by: (await supabase.auth.getUser()).data.user?.id 
        })
        .eq('id', settings.id);

      if (error) throw error;

      setSettings({ ...settings, is_active: checked });
      toast({
        title: t('maintenance.success'),
        description: checked 
          ? t('maintenance.successActive')
          : t('maintenance.successInactive'),
      });
    } catch (error) {
      console.error('Error updating maintenance settings:', error);
      toast({
        title: t('maintenance.error'),
        description: t('maintenance.errorUpdate'),
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-serif">{t('maintenance.title')}</h1>
        </div>
        <p className="text-muted-foreground">{t('dashboard.loading')}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-serif">{t('maintenance.title')}</h1>
        </div>
        <p className="text-muted-foreground">
          {t('maintenance.subtitle')}
        </p>
      </div>

      {settings?.is_active && (
        <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-600">{t('maintenance.alertTitle')}</AlertTitle>
          <AlertDescription className="text-yellow-600">
            {t('maintenance.alertDescription')}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('maintenance.statusTitle')}</CardTitle>
          <CardDescription>
            {t('maintenance.statusDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('maintenance.label')}</p>
              <p className="text-sm text-muted-foreground">
                {settings?.is_active ? t('maintenance.active') : t('maintenance.inactive')}
              </p>
            </div>
            <Switch
              checked={settings?.is_active || false}
              onCheckedChange={handleToggle}
              disabled={isUpdating}
            />
          </div>
          
          {settings?.updated_at && (
            <p className="text-xs text-muted-foreground mt-4">
              {t('maintenance.lastUpdated')}: {new Date(settings.updated_at).toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{t('maintenance.howItWorksTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• {t('maintenance.howItWorks1')}</p>
          <p>• {t('maintenance.howItWorks2')}</p>
          <p>• {t('maintenance.howItWorks3')}</p>
          <p>• {t('maintenance.howItWorks4')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceSettings;
