import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const LOCALE_MAP: Record<string, string> = { en: 'en-US', ar: 'ar' };
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  FileText, 
  Eye, 
  Users, 
  Handshake, 
  MessageSquare, 
  Star,
  TrendingUp,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface Stats {
  properties: number;
  blogs: number;
  publishedBlogs: number;
  testimonials: number;
  partners: number;
  teamMembers: number;
  contactSubmissions: number;
  pendingSubmissions: number;
}

interface RecentActivity {
  type: 'property' | 'blog' | 'contact';
  title: string;
  date: string;
  status?: string;
}

interface DashboardOverviewProps {
  onNavigate?: (tab: string) => void;
}

const DashboardOverview = ({ onNavigate }: DashboardOverviewProps) => {
  const { t, i18n } = useTranslation();
  const currentLocale = LOCALE_MAP[i18n.language] || 'en-US';
  const [stats, setStats] = useState<Stats>({
    properties: 0,
    blogs: 0,
    publishedBlogs: 0,
    testimonials: 0,
    partners: 0,
    teamMembers: 0,
    contactSubmissions: 0,
    pendingSubmissions: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    loadRecentActivity();
  }, []);

  const loadStats = async () => {
    try {
      const [
        propertiesRes, 
        blogsRes, 
        publishedBlogsRes,
        testimonialsRes,
        partnersRes,
        teamRes,
        contactsRes,
        pendingContactsRes
      ] = await Promise.all([
        supabase.from('properties').select('id', { count: 'exact', head: true }),
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('blogs').select('id', { count: 'exact', head: true }).eq('published', true),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('partners').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('team_members').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      ]);

      setStats({
        properties: propertiesRes.count || 0,
        blogs: blogsRes.count || 0,
        publishedBlogs: publishedBlogsRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        partners: partnersRes.count || 0,
        teamMembers: teamRes.count || 0,
        contactSubmissions: contactsRes.count || 0,
        pendingSubmissions: pendingContactsRes.count || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentActivity = async () => {
    try {
      const [recentProperties, recentBlogs, recentContacts] = await Promise.all([
        supabase.from('properties').select('title, created_at').order('created_at', { ascending: false }).limit(2),
        supabase.from('blogs').select('title, created_at, published').order('created_at', { ascending: false }).limit(2),
        supabase.from('contact_submissions').select('name, created_at, status').order('created_at', { ascending: false }).limit(2),
      ]);

      const activities: RecentActivity[] = [];
      
      recentProperties.data?.forEach(item => {
        activities.push({
          type: 'property',
          title: item.title,
          date: item.created_at,
        });
      });
      
      recentBlogs.data?.forEach(item => {
        activities.push({
          type: 'blog',
          title: item.title,
          date: item.created_at,
          status: item.published ? 'published' : 'draft',
        });
      });
      
      recentContacts.data?.forEach(item => {
        activities.push({
          type: 'contact',
          title: `${t('dashboardOverview.messageFrom', { defaultValue: 'Message from' })} ${item.name}`,
          date: item.created_at,
          status: item.status,
        });
      });

      // Sort by date and take top 5
      activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRecentActivity(activities.slice(0, 5));
    } catch (error) {
      console.error('Error loading recent activity:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return t('dashboardOverview.justNow');
    if (diffInHours < 24) return `${diffInHours}${t('dashboardOverview.hoursAgo').startsWith(' ') ? '' : ' '}${t('dashboardOverview.hoursAgo')}`;
    if (diffInHours < 48) return t('dashboardOverview.yesterday');
    return date.toLocaleDateString(currentLocale);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'property': return <Building className="h-4 w-4" />;
      case 'blog': return <FileText className="h-4 w-4" />;
      case 'contact': return <MessageSquare className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const statCards = [
    {
      title: t('dashboardOverview.totalProperties'),
      value: stats.properties,
      description: t('dashboardOverview.activeListings'),
      icon: Building,
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50 dark:bg-blue-950/30',
      navigateTo: 'properties' as const,
    },
    {
      title: t('dashboardOverview.publishedBlogs'),
      value: stats.publishedBlogs,
      description: `${stats.blogs} ${t('dashboardOverview.totalBlogs').toLowerCase()}`,
      icon: Eye,
      gradient: 'from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
      navigateTo: 'blogs' as const,
    },
    {
      title: t('dashboardOverview.testimonials') || 'Testimonials',
      value: stats.testimonials,
      description: t('dashboardOverview.activeReviews') || 'Active reviews',
      icon: Star,
      gradient: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50 dark:bg-amber-950/30',
      navigateTo: 'testimonials' as const,
    },
    {
      title: t('dashboardOverview.teamMembers') || 'Team Members',
      value: stats.teamMembers,
      description: t('dashboardOverview.activeMembers') || 'Active members',
      icon: Users,
      gradient: 'from-violet-500 to-violet-600',
      bgLight: 'bg-violet-50 dark:bg-violet-950/30',
      navigateTo: 'team' as const,
    },
    {
      title: t('dashboardOverview.partners') || 'Partners',
      value: stats.partners,
      description: t('dashboardOverview.activePartners') || 'Active partners',
      icon: Handshake,
      gradient: 'from-rose-500 to-rose-600',
      bgLight: 'bg-rose-50 dark:bg-rose-950/30',
      navigateTo: 'partners' as const,
    },
    {
      title: t('dashboardOverview.messages') || 'Messages',
      value: stats.contactSubmissions,
      description: `${stats.pendingSubmissions} ${t('dashboardOverview.pending') || 'pending'}`,
      icon: MessageSquare,
      gradient: 'from-cyan-500 to-cyan-600',
      bgLight: 'bg-cyan-50 dark:bg-cyan-950/30',
      highlight: stats.pendingSubmissions > 0,
      navigateTo: 'contact-submissions' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('dashboardOverview.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('dashboardOverview.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date().toLocaleDateString(currentLocale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <Card 
            key={index} 
            onClick={() => onNavigate?.(stat.navigateTo)}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group ${stat.highlight ? 'ring-2 ring-gold ring-offset-2' : ''}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`h-10 w-10 rounded-xl ${stat.bgLight} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 bg-gradient-to-br ${stat.gradient} bg-clip-text`} style={{ color: stat.gradient.includes('blue') ? '#3b82f6' : stat.gradient.includes('emerald') ? '#10b981' : stat.gradient.includes('amber') ? '#f59e0b' : stat.gradient.includes('violet') ? '#8b5cf6' : stat.gradient.includes('rose') ? '#f43f5e' : '#06b6d4' }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{loading ? '-' : stat.value}</span>
                {stat.highlight && (
                  <span className="text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                    {stats.pendingSubmissions} {t('dashboardOverview.statusNewLabel')}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gold" />
              {t('dashboardOverview.recentActivity') || 'Recent Activity'}
            </CardTitle>
            <CardDescription>
              {t('dashboardOverview.latestUpdates') || 'Latest updates across your platform'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                {t('dashboardOverview.noRecentActivity') || 'No recent activity'}
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{formatDate(activity.date)}</span>
                        {activity.status && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            activity.status === 'published' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                            activity.status === 'new' ? 'bg-gold/20 text-gold' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {activity.type === 'blog'
                              ? (activity.status === 'published' ? t('dashboardOverview.statusPublished') : t('dashboardOverview.statusDraft'))
                              : (activity.status === 'new' ? t('dashboardOverview.statusNewLabel') : activity.status === 'resolved' ? t('dashboardOverview.statusResolved') : activity.status)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-gold" />
              {t('dashboardOverview.quickActions') || 'Quick Actions'}
            </CardTitle>
            <CardDescription>
              {t('dashboardOverview.commonTasks') || 'Common tasks and shortcuts'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-auto py-4 px-4 justify-start gap-3 hover:bg-primary hover:text-primary-foreground transition-colors group"
                onClick={() => onNavigate?.('properties')}
              >
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900 transition-colors">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{t('dashboardOverview.addProperty') || 'Add Property'}</p>
                  <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/70">{t('dashboardOverview.createNewListing')}</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>

              <Button 
                variant="outline" 
                className="h-auto py-4 px-4 justify-start gap-3 hover:bg-primary hover:text-primary-foreground transition-colors group"
                onClick={() => onNavigate?.('blogs')}
              >
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900 transition-colors">
                  <FileText className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{t('dashboardOverview.writeBlog') || 'Write Blog'}</p>
                  <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/70">{t('dashboardOverview.createNewPost')}</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>

              <Button 
                variant="outline" 
                className="h-auto py-4 px-4 justify-start gap-3 hover:bg-primary hover:text-primary-foreground transition-colors group"
                onClick={() => onNavigate?.('contact-submissions')}
              >
                <div className="h-10 w-10 rounded-lg bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center group-hover:bg-cyan-200 dark:group-hover:bg-cyan-900 transition-colors">
                  <MessageSquare className="h-5 w-5 text-cyan-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{t('dashboardOverview.viewMessages') || 'View Messages'}</p>
                  <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/70">{stats.pendingSubmissions} {t('dashboardOverview.pending')}</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>

              <Button 
                variant="outline" 
                className="h-auto py-4 px-4 justify-start gap-3 hover:bg-primary hover:text-primary-foreground transition-colors group"
                onClick={() => onNavigate?.('team')}
              >
                <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-950 flex items-center justify-center group-hover:bg-violet-200 dark:group-hover:bg-violet-900 transition-colors">
                  <Users className="h-5 w-5 text-violet-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{t('dashboardOverview.manageTeam') || 'Manage Team'}</p>
                  <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/70">{stats.teamMembers} {t('dashboardOverview.members')}</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
