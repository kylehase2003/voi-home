import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  ArrowUpRight,
  Building,
  Clock,
  FileText,
  Handshake,
  MessageSquare,
  Plus,
  Star,
  Users,
} from 'lucide-react';
import type { DashboardTab } from './Dashboard';

const LOCALE_MAP: Record<string, string> = { en: 'en-US', ar: 'ar', ru: 'ru-RU' };

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
  onNavigate?: (tab: DashboardTab) => void;
}

const EMPTY_STATS: Stats = {
  properties: 0,
  blogs: 0,
  publishedBlogs: 0,
  testimonials: 0,
  partners: 0,
  teamMembers: 0,
  contactSubmissions: 0,
  pendingSubmissions: 0,
};

const DashboardOverview = ({ onNavigate }: DashboardOverviewProps) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const currentLocale = LOCALE_MAP[i18n.language] || 'en-US';
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    loadRecentActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    try {
      const head = { count: 'exact' as const, head: true };
      const [p, b, pb, te, pa, tm, c, pc] = await Promise.all([
        supabase.from('properties').select('id', head),
        supabase.from('blogs').select('id', head),
        supabase.from('blogs').select('id', head).eq('published', true),
        supabase.from('testimonials').select('id', head).eq('is_active', true),
        supabase.from('partners').select('id', head).eq('is_active', true),
        supabase.from('team_members').select('id', head).eq('is_active', true),
        supabase.from('contact_submissions').select('id', head),
        supabase.from('contact_submissions').select('id', head).eq('status', 'new'),
      ]);
      setStats({
        properties: p.count || 0,
        blogs: b.count || 0,
        publishedBlogs: pb.count || 0,
        testimonials: te.count || 0,
        partners: pa.count || 0,
        teamMembers: tm.count || 0,
        contactSubmissions: c.count || 0,
        pendingSubmissions: pc.count || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentActivity = async () => {
    try {
      const [props, blogs, contacts] = await Promise.all([
        supabase.from('properties').select('title, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('blogs').select('title, created_at, published').order('created_at', { ascending: false }).limit(3),
        supabase.from('contact_submissions').select('name, created_at, status').order('created_at', { ascending: false }).limit(3),
      ]);

      const activities: RecentActivity[] = [];
      props.data?.forEach((item) => activities.push({ type: 'property', title: item.title, date: item.created_at }));
      blogs.data?.forEach((item) =>
        activities.push({ type: 'blog', title: item.title, date: item.created_at, status: item.published ? 'published' : 'draft' })
      );
      contacts.data?.forEach((item) =>
        activities.push({
          type: 'contact',
          title: `${t('dashboardOverview.messageFrom', { defaultValue: 'Message from' })} ${item.name}`,
          date: item.created_at,
          status: item.status,
        })
      );
      activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRecentActivity(activities.slice(0, 6));
    } catch (error) {
      console.error('Error loading recent activity:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const diffInHours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return t('dashboardOverview.justNow');
    if (diffInHours < 24) return `${diffInHours} ${t('dashboardOverview.hoursAgo').trim()}`;
    if (diffInHours < 48) return t('dashboardOverview.yesterday');
    return date.toLocaleDateString(currentLocale, { day: 'numeric', month: 'short' });
  };

  const activityIcon = { property: Building, blog: FileText, contact: MessageSquare };
  const activityTab: Record<RecentActivity['type'], DashboardTab> = {
    property: 'properties',
    blog: 'blogs',
    contact: 'contact-submissions',
  };

  const statusLabel = (a: RecentActivity) => {
    if (!a.status) return null;
    if (a.type === 'blog') return a.status === 'published' ? t('dashboardOverview.statusPublished') : t('dashboardOverview.statusDraft');
    if (a.status === 'new') return t('dashboardOverview.statusNewLabel');
    if (a.status === 'resolved') return t('dashboardOverview.statusResolved');
    return a.status;
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? t('dashboardOverview.goodMorning', { defaultValue: 'Good morning' })
      : hour < 18
        ? t('dashboardOverview.goodAfternoon', { defaultValue: 'Good afternoon' })
        : t('dashboardOverview.goodEvening', { defaultValue: 'Good evening' });
  const firstName = (user?.email || '').split('@')[0].split(/[._-]/)[0];
  const displayName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : '';

  const kpis = [
    { label: t('dashboardOverview.totalProperties'), value: stats.properties, sub: t('dashboardOverview.activeListings'), icon: Building, tab: 'properties' as DashboardTab },
    { label: t('dashboardOverview.publishedBlogs'), value: stats.publishedBlogs, sub: `${stats.blogs} ${t('dashboardOverview.totalBlogs').toLowerCase()}`, icon: FileText, tab: 'blogs' as DashboardTab },
    { label: t('dashboardOverview.messages', { defaultValue: 'Messages' }), value: stats.contactSubmissions, sub: `${stats.pendingSubmissions} ${t('dashboardOverview.pending', { defaultValue: 'pending' })}`, icon: MessageSquare, tab: 'contact-submissions' as DashboardTab, alert: stats.pendingSubmissions > 0 },
    { label: t('dashboardOverview.testimonials', { defaultValue: 'Testimonials' }), value: stats.testimonials, sub: t('dashboardOverview.activeReviews', { defaultValue: 'Active reviews' }), icon: Star, tab: 'testimonials' as DashboardTab },
    { label: t('dashboardOverview.partners', { defaultValue: 'Partners' }), value: stats.partners, sub: t('dashboardOverview.activePartners', { defaultValue: 'Active partners' }), icon: Handshake, tab: 'partners' as DashboardTab },
    { label: t('dashboardOverview.teamMembers', { defaultValue: 'Team' }), value: stats.teamMembers, sub: t('dashboardOverview.activeMembers', { defaultValue: 'Active members' }), icon: Users, tab: 'team' as DashboardTab },
  ];

  const actions = [
    { label: t('dashboardOverview.addProperty', { defaultValue: 'Add property' }), icon: Building, tab: 'properties' as DashboardTab },
    { label: t('dashboardOverview.writeBlog', { defaultValue: 'Write blog' }), icon: FileText, tab: 'blogs' as DashboardTab },
    { label: t('dashboardOverview.viewMessages', { defaultValue: 'View messages' }), icon: MessageSquare, tab: 'contact-submissions' as DashboardTab },
    { label: t('dashboardOverview.manageTeam', { defaultValue: 'Manage team' }), icon: Users, tab: 'team' as DashboardTab },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-[#141311] text-[#F3EEE6] px-6 py-7 sm:px-8 sm:py-9">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/[0.04]" />
        <div className="absolute -bottom-32 right-32 h-72 w-72 rounded-full bg-white/[0.03]" />
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-3">
              {new Date().toLocaleDateString(currentLocale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {greeting}{displayName ? `, ${displayName}` : ''}.
            </h1>
            <p className="text-sm text-white/60 mt-2 max-w-md">
              {stats.pendingSubmissions > 0
                ? t('dashboardOverview.pendingNotice', {
                    count: stats.pendingSubmissions,
                    defaultValue: `You have ${stats.pendingSubmissions} new message(s) waiting for a reply.`,
                  })
                : t('dashboardOverview.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {actions.slice(0, 2).map((a) => (
              <button
                key={a.label}
                onClick={() => onNavigate?.(a.tab)}
                className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2.5 text-sm font-medium hover:bg-white/85 transition-colors"
              >
                <Plus className="h-4 w-4" />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* KPI tiles */}
      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {kpis.map((k) => (
          <button
            key={k.label}
            onClick={() => onNavigate?.(k.tab)}
            className="group text-start rounded-2xl border border-border/70 bg-card p-4 sm:p-5 hover:border-foreground/30 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center">
                <k.icon className="h-4 w-4" />
              </span>
              {k.alert ? (
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 ring-4 ring-red-500/15" />
              ) : (
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity rtl:-scale-x-100" />
              )}
            </div>
            <div className="text-3xl font-semibold tracking-tight tabular-nums">{loading ? '–' : k.value}</div>
            <div className="text-sm font-medium mt-1 truncate">{k.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5 truncate">{k.sub}</div>
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Activity */}
        <div className="lg:col-span-3 rounded-2xl border border-border/70 bg-card">
          <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3">
            <div>
              <h2 className="text-base font-semibold">{t('dashboardOverview.recentActivity', { defaultValue: 'Recent activity' })}</h2>
              <p className="text-xs text-muted-foreground">{t('dashboardOverview.latestUpdates', { defaultValue: 'Latest updates across your platform' })}</p>
            </div>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">
              {t('dashboardOverview.noRecentActivity', { defaultValue: 'No recent activity' })}
            </p>
          ) : (
            <ul className="divide-y divide-border/60 pb-2">
              {recentActivity.map((a, i) => {
                const Icon = activityIcon[a.type];
                const label = statusLabel(a);
                return (
                  <li key={i}>
                    <button
                      onClick={() => onNavigate?.(activityTab[a.type])}
                      className="w-full flex items-center gap-3 px-5 sm:px-6 py-3 text-start hover:bg-muted/50 transition-colors"
                    >
                      <span className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium truncate">{a.title}</span>
                        <span className="block text-xs text-muted-foreground">{formatDate(a.date)}</span>
                      </span>
                      {label && (
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                            a.status === 'published' || a.status === 'resolved'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                              : a.status === 'new'
                                ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'
                                : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {label}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Quick actions */}
        <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
          <h2 className="text-base font-semibold">{t('dashboardOverview.quickActions', { defaultValue: 'Quick actions' })}</h2>
          <p className="text-xs text-muted-foreground mb-4">{t('dashboardOverview.commonTasks', { defaultValue: 'Common tasks and shortcuts' })}</p>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={() => onNavigate?.(a.tab)}
                className="group flex flex-col items-start gap-6 rounded-xl bg-muted/60 hover:bg-foreground hover:text-background p-4 text-start transition-colors"
              >
                <a.icon className="h-5 w-5" />
                <span className="text-sm font-medium leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3 hover:border-foreground/30 transition-colors">
              {t('dashboard.viewSite', { defaultValue: 'View site' })}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </a>
            <a href="/links" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3 hover:border-foreground/30 transition-colors">
              {t('dashboard.linksPage', { defaultValue: 'Links page' })}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardOverview;
