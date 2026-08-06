/**
 * Centralized route constants for type-safe navigation
 */

export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: (slug: string) => `/property/${slug}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOGS: '/blogs',
  BLOG_DETAIL: (slug: string) => `/blog/${slug}`,
  BUYER_GUIDE: '/buyer-guide',
  TEAM: '/team',
  PARTNERS: '/partners',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',
  AUTH: '/auth',
  DASHBOARD: {
    ROOT: '/dashboard',
    PROPERTIES: '/dashboard/properties',
    BLOGS: '/dashboard/blogs',
    TESTIMONIALS: '/dashboard/testimonials',
    PARTNERS: '/dashboard/partners',
    TEAM: '/dashboard/team',
    CONTACT_SUBMISSIONS: '/dashboard/contact-submissions',
    MAINTENANCE: '/dashboard/maintenance',
  },
} as const;

/**
 * Helper function to build property detail URL
 * @param slug - The property slug
 * @returns The complete property detail URL
 */
export const getPropertyUrl = (slug: string): string => {
  return ROUTES.PROPERTY_DETAIL(slug);
};

/**
 * Helper function to build blog detail URL
 * @param slug - The blog slug
 * @returns The complete blog detail URL
 */
export const getBlogUrl = (slug: string): string => {
  return ROUTES.BLOG_DETAIL(slug);
};
