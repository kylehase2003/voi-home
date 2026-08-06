import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DashboardOverview from './DashboardOverview';
import PropertiesManagement from './PropertiesManagement';
import BlogsManagement from './BlogsManagement';
import TestimonialsManagement from './TestimonialsManagement';
import PartnersManagement from './PartnersManagement';
import TeamManagement from './TeamManagement';
import ContactSubmissions from './ContactSubmissions';
import MaintenanceSettings from './MaintenanceSettings';

export type DashboardTab = 
  | 'overview'
  | 'properties'
  | 'blogs'
  | 'testimonials'
  | 'partners'
  | 'team'
  | 'contact-submissions'
  | 'maintenance';

const tabTitles: Record<DashboardTab, string> = {
  'overview': 'dashboard.overview',
  'properties': 'dashboard.properties',
  'blogs': 'dashboard.blogs',
  'testimonials': 'dashboard.testimonials',
  'partners': 'dashboard.partners',
  'team': 'dashboard.team',
  'contact-submissions': 'dashboard.contactMessages',
  'maintenance': 'dashboard.maintenanceMode',
};

const DashboardContent = ({ activeTab, setActiveTab }: { 
  activeTab: DashboardTab; 
  setActiveTab: (tab: DashboardTab) => void;
}) => {
  const { t } = useTranslation();
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <header className="sticky top-0 z-10 h-14 lg:h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center gap-4 px-4 lg:px-6">
        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        ) : (
          <SidebarTrigger className="h-9 w-9" />
        )}
        
        <div className="flex-1">
          <h2 className="text-lg font-semibold tracking-tight">
            {t(tabTitles[activeTab])}
          </h2>
        </div>
        
        <LanguageSwitcher variant="ghost" />
      </header>
      
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DashboardTab)}>
          <TabsContent value="overview" className="mt-0">
            <DashboardOverview onNavigate={setActiveTab} />
          </TabsContent>
          <TabsContent value="properties" className="mt-0">
            <PropertiesManagement />
          </TabsContent>
          <TabsContent value="blogs" className="mt-0">
            <BlogsManagement />
          </TabsContent>
          <TabsContent value="testimonials" className="mt-0">
            <TestimonialsManagement />
          </TabsContent>
          <TabsContent value="partners" className="mt-0">
            <PartnersManagement />
          </TabsContent>
          <TabsContent value="team" className="mt-0">
            <TeamManagement />
          </TabsContent>
          <TabsContent value="contact-submissions" className="mt-0">
            <ContactSubmissions />
          </TabsContent>
          <TabsContent value="maintenance" className="mt-0">
            <MaintenanceSettings />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">{t('dashboard.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className={cn(
        "min-h-screen flex w-full bg-background",
        isRTL && "flex-row-reverse"
      )}>
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <DashboardContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;