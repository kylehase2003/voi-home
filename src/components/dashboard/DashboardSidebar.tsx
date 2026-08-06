import { 
  Home, 
  Building, 
  FileText, 
  LogOut, 
  MessageSquare, 
  Users, 
  Mail, 
  Settings,
  Handshake,
  Star,
  ChevronLeft,
  X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import logo from '@/assets/logo-auth-new.png';
import { DashboardTab } from '@/pages/dashboard/Dashboard';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { state, isMobile, setOpenMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const [pendingMessages, setPendingMessages] = useState(0);
  const [counts, setCounts] = useState({
    properties: 0,
    blogs: 0,
    testimonials: 0,
    partners: 0,
    team: 0,
    contactSubmissions: 0,
  });

  useEffect(() => {
    const fetchPendingMessages = async () => {
      const { count } = await supabase
        .from('contact_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new');
      setPendingMessages(count || 0);
    };
    fetchPendingMessages();
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      const tables = [
        { key: 'properties', table: 'properties' },
        { key: 'blogs', table: 'blogs' },
        { key: 'testimonials', table: 'testimonials' },
        { key: 'partners', table: 'partners' },
        { key: 'team', table: 'team_members' },
        { key: 'contactSubmissions', table: 'contact_submissions' },
      ] as const;

      const results: Record<string, number> = {};
      for (const { key, table } of tables) {
        const { count } = await supabase
          .from(table)
          .select('id', { count: 'exact', head: true });
        results[key] = count || 0;
      }
      setCounts(results as typeof counts);
    };
    fetchCounts();
  }, []);

  const mainItems = [
    { title: t('dashboard.overview'), value: 'overview' as DashboardTab, icon: Home },
    { title: t('dashboard.properties'), value: 'properties' as DashboardTab, icon: Building, count: counts.properties },
    { title: t('dashboard.blogs'), value: 'blogs' as DashboardTab, icon: FileText, count: counts.blogs },
  ];

  const contentItems = [
    { title: t('dashboard.testimonials'), value: 'testimonials' as DashboardTab, icon: Star, count: counts.testimonials },
    { title: t('dashboard.partners'), value: 'partners' as DashboardTab, icon: Handshake, count: counts.partners },
    { title: t('dashboard.team'), value: 'team' as DashboardTab, icon: Users, count: counts.team },
  ];

  const systemItems = [
    { 
      title: t('dashboard.contactMessages'), 
      value: 'contact-submissions' as DashboardTab, 
      icon: Mail,
      count: counts.contactSubmissions,
      badge: pendingMessages > 0 ? pendingMessages : undefined
    },
    { title: t('dashboard.maintenanceMode'), value: 'maintenance' as DashboardTab, icon: Settings },
  ];

  const handleItemClick = (value: DashboardTab) => {
    onTabChange(value);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  type MenuItemType = { title: string; value: DashboardTab; icon: typeof Home; badge?: number; count?: number };
  const MenuItem = ({ item }: { item: MenuItemType }) => (
    <SidebarMenuItem>
      <SidebarMenuButton 
        onClick={() => handleItemClick(item.value)}
        tooltip={isCollapsed ? item.title : undefined}
        isActive={activeTab === item.value}
        className={`
          relative transition-all duration-200
          ${activeTab === item.value 
            ? 'bg-gold/15 text-gold font-medium ltr:border-l-2 rtl:border-r-2 border-gold ltr:rounded-l-none rtl:rounded-r-none' 
            : 'hover:bg-muted/80 ltr:hover:translate-x-1 rtl:hover:-translate-x-1'
          }
        `}
      >
        <item.icon className={`h-4 w-4 ${activeTab === item.value ? 'text-gold' : ''}`} />
        {!isCollapsed && (
          <span className="flex-1">{item.title}</span>
        )}
        {!isCollapsed && item.count !== undefined && item.count > 0 && (
          <Badge variant="secondary" className="h-5 min-w-5 px-1.5 text-xs bg-primary/10 text-primary hover:bg-primary/20">
            {item.count}
          </Badge>
        )}
        {!isCollapsed && item.badge && (
          <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-xs">
            {item.badge}
          </Badge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="ltr:border-r rtl:border-l border-border/50">
      {/* Header */}
      <SidebarHeader className="border-b border-border/50">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} py-2`}>
          <Link to="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src={logo} 
              alt="MR. Property" 
              className={`transition-all duration-200 ${isCollapsed ? 'h-8 w-8 object-contain' : 'h-10 w-auto'}`} 
            />
          </Link>
          {!isCollapsed && isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setOpenMobile(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {!isCollapsed && !isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={toggleSidebar}
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">
              {t('dashboard.title')}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <MenuItem key={item.value} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Content Management */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">
              {t('dashboard.sectionContent')}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <MenuItem key={item.value} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* System */}
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold">
              {t('dashboard.sectionSystem')}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <MenuItem key={item.value} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border/50 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => signOut()} 
              tooltip={isCollapsed ? t('dashboard.logout') : undefined}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span>{t('dashboard.logout')}</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}