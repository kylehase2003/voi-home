import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import logoLight from '@/assets/logo-horizontal.png';
import logoDark from '@/assets/logo-auth-new.png';
import heroImage from '@/assets/photos/about-facade.webp';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import SEOHead from '@/components/SEOHead';

// Team sign-in: a photo panel on the left (desktop) and a quiet form on the
// right. While maintenance mode is on, this is the only way into the site.
const Auth = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const serif = isRTL ? 'font-arabic' : 'font-serif';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const authSchema = z.object({
    email: z.string().trim().email({ message: t('auth.invalidEmail') }).max(255),
    password: z.string().min(6, { message: t('auth.passwordTooShort') }).max(100),
  });

  // Load remembered email on mount
  useEffect(() => {
    try {
      const remembered = localStorage.getItem('rememberMe');
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (remembered === 'true' && rememberedEmail) {
        setEmail(rememberedEmail);
        setRememberMe(true);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validation = authSchema.parse({ email, password });
      const { error } = await signIn(validation.email, validation.password);
      if (error) {
        toast.error(error.message.includes('Invalid login credentials') ? t('auth.invalidCredentials') : error.message);
      } else {
        try {
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('rememberedEmail', validation.email);
          } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('rememberedEmail');
          }
        } catch {
          /* storage unavailable */
        }
        toast.success(t('auth.loginSuccess'));
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error instanceof z.ZodError ? error.errors[0].message : t('auth.error'));
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    'h-12 w-full rounded-xl border border-border bg-white/70 ps-11 pe-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-burgundy/60 focus:bg-white focus:ring-4 focus:ring-burgundy/10';

  return (
    <div className={`min-h-[100svh] grid lg:grid-cols-[1.05fr_1fr] bg-background ${isRTL ? 'font-arabic' : ''}`}>
      <SEOHead title="Team sign in | Voi Home" description="Sign in to the Voi Home team area." path="/auth" noindex />

      {/* Photo panel */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-black p-12 text-[#E6E2DA]">
        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-evergreen/50 via-transparent to-transparent" aria-hidden="true" />
        <Link to="/" className="relative z-10 w-fit">
          <img src={logoLight} alt="Voi Home" className="h-10 w-auto" />
        </Link>
        <div className="relative z-10 max-w-md">
          <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[2px] text-[#E6E2DA]/70">
            <span className="h-px w-8 bg-[#E6E2DA]/50" />
            {t('auth.panelEyebrow')}
          </div>
          <p className={`text-[40px] leading-[1.08] tracking-[-1.2px] ${serif}`}>{t('auth.panelTitle')}</p>
        </div>
      </aside>

      {/* Form */}
      <main className="relative flex flex-col px-6 py-6 md:px-12">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t('auth.backToSite')}
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[400px]">
            <img src={logoDark} alt="Voi Home" className="mb-10 h-14 w-auto lg:hidden" />
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
              <Lock className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h1 className={`mb-2 text-[34px] leading-[1.1] tracking-[-1px] text-foreground ${serif}`}>{t('auth.title')}</h1>
            <p className="mb-9 text-[15px] leading-[1.6] text-muted-foreground">{t('auth.description')}</p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                    placeholder="name@voi-home.com"
                    className={fieldClass}
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    maxLength={100}
                    className={`${fieldClass} pe-12`}
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                    className="absolute end-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label htmlFor="remember" className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-foreground">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="data-[state=checked]:border-burgundy data-[state=checked]:bg-burgundy"
                />
                {t('auth.rememberMe')}
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-burgundy text-[15px] font-medium text-white transition-colors hover:bg-burgundy/90 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('auth.signingIn')}
                  </>
                ) : (
                  <>
                    {t('auth.signIn')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-sm text-muted-foreground">
              {t('auth.help')}{' '}
              <a href="mailto:info@voi-home.com" className="font-medium text-foreground underline-offset-4 hover:underline">
                info@voi-home.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
