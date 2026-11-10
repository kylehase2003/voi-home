import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ExternalLink, Menu } from 'lucide-react';
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
  const { user } = useAuth();
  const { isMobile, toggleSidebar } = useSidebar();
  const initials = (user?.email || '?').slice(0, 2).toUpperCase();

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <header className="sticky top-0 z-20 h-16 bg-[hsl(40_20%_97%)]/80 dark:bg-background/80 backdrop-blur-xl border-b border-border/60 flex items-center gap-3 px-4 lg:px-8">
        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-9 w-9 rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        ) : (
          <SidebarTrigger className="h-9 w-9 rounded-full" />
        )}

        <div className="flex-1 min-w-0">
          <p className="hidden sm:block text-[11px] uppercase tracking-[0.16em] text-muted-foreground leading-none mb-1">
            {t('dashboard.title')}
          </p>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight truncate leading-tight">
            {t(tabTitles[activeTab])}
          </h2>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 h-9 text-sm hover:border-foreground/40 transition-colors"
        >
          {t('dashboard.viewSite', { defaultValue: 'View site' })}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <LanguageSwitcher variant="ghost" />
        <div
          className="h-9 w-9 shrink-0 rounded-full bg-foreground text-background text-xs font-semibold flex items-center justify-center"
          title={user?.email || ''}
        >
          {initials}
        </div>
      </header>
      
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="mx-auto w-full max-w-[1400px]">
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
        "voi-admin min-h-screen flex w-full",
        isRTL && "flex-row-reverse"
      )}>
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <DashboardContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;