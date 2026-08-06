import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin } from "lucide-react";
import heroImage from "@/assets/hero-villa.webp";
import SEOHead from "@/components/SEOHead";
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  display_order: number;
}
const Team = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTeamMembers();
  }, []);
  const fetchTeamMembers = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('team_members').select('*').eq('is_active', true).order('display_order', {
        ascending: true
      });
      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen">
      <SEOHead
        title="Our Team - Expert Real Estate Consultants"
        description="Meet the MR. Property team of experienced real estate consultants specializing in luxury properties across Istanbul, Bodrum, and Dubai."
        path="/team"
      />
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        
        
        {/* Team Members Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {loading ? <div className="text-center text-muted-foreground">
                {t("teamPage.loading")}
              </div> : teamMembers.length === 0 ? <div className="text-center text-muted-foreground max-w-2xl mx-auto">
                {t("teamPage.noMembers")}
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map(member => <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-square w-full overflow-hidden bg-muted">
                      {member.image_url ? <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" /> : <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-6xl font-serif text-muted-foreground">
                            {member.name.charAt(0)}
                          </span>
                        </div>}
                    </div>
                    <CardContent className="p-6">
                      <h3 className={`text-2xl mb-2 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{member.name}</h3>
                      <p className="text-gold font-medium mb-3">{member.role}</p>
                      {member.bio && <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {member.bio}
                        </p>}
                      <div className="flex gap-3 items-center flex-wrap">
                        {member.email && <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-gold transition-colors" aria-label="Email">
                            <Mail className="h-5 w-5" />
                          </a>}
                        {member.phone && <a href={`tel:${member.phone}`} className="text-muted-foreground hover:text-gold transition-colors" aria-label="Phone">
                            <Phone className="h-5 w-5" />
                          </a>}
                        {member.linkedin_url && <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                          </a>}
                      </div>
                    </CardContent>
                  </Card>)}
              </div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Team;