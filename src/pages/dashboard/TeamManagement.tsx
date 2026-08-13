import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, GripVertical, Search, X } from "lucide-react";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TeamMember {
  id: string;
  name: string;
  name_ar: string | null;
  role: string;
  role_ar: string | null;
  bio: string | null;
  bio_ar: string | null;
  image_url: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  display_order: number;
  is_active: boolean;
}

// Sortable Row Component
interface SortableRowProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
  t: any;
}

function SortableRow({ member, onEdit, onDelete, t }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="w-12">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing hover:bg-muted/50 rounded p-1 inline-flex"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
      </TableCell>
      <TableCell>
        {member.image_url ? (
          <img
            src={member.image_url}
            alt={member.name}
            className="w-12 h-12 object-cover rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xs">
            N/A
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{member.name}</TableCell>
      <TableCell className="text-gold">{member.role}</TableCell>
      <TableCell>{member.email || '-'}</TableCell>
      <TableCell>{member.phone || '-'}</TableCell>
      <TableCell>
        <span className={member.is_active ? 'text-green-600' : 'text-gray-500'}>
          {member.is_active ? t('teamManagement.active') : t('teamManagement.inactive')}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(member)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(member.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

const TeamManagement = () => {
  const { t } = useTranslation();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    role: "",
    role_ar: "",
    bio: "",
    bio_ar: "",
    image_url: "",
    email: "",
    phone: "",
    linkedin_url: "",
    display_order: 0,
    is_active: true,
  });

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error(t('teamManagement.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = teamMembers.findIndex((m) => m.id === active.id);
      const newIndex = teamMembers.findIndex((m) => m.id === over.id);

      const newTeamMembers = arrayMove(teamMembers, oldIndex, newIndex);
      setTeamMembers(newTeamMembers);

      // Update display_order in database
      const updates = newTeamMembers.map((member, index) => ({
        id: member.id,
        display_order: index,
      }));

      try {
        for (const update of updates) {
          await supabase
            .from('team_members')
            .update({ display_order: update.display_order })
            .eq('id', update.id);
        }
        toast.success(t('teamManagement.orderUpdated'));
      } catch (error) {
        toast.error(t('teamManagement.orderUpdateFailed'));
        fetchTeamMembers(); // Reload to restore correct order
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const memberData = {
        name: formData.name,
        name_ar: formData.name_ar || null,
        role: formData.role,
        role_ar: formData.role_ar || null,
        bio: formData.bio || null,
        bio_ar: formData.bio_ar || null,
        image_url: formData.image_url || null,
        email: formData.email || null,
        phone: formData.phone || null,
        linkedin_url: formData.linkedin_url || null,
        is_active: formData.is_active,
      };

      if (editingMember) {
        const { error } = await supabase
          .from("team_members")
          .update(memberData)
          .eq("id", editingMember.id);

        if (error) throw error;
        toast.success(t('teamManagement.updateSuccess'));
      } else {
        // Get the highest display_order and add 1
        const { data: maxOrderData } = await supabase
          .from('team_members')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1);
        
        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order : -1;
        
        const { error } = await supabase
          .from("team_members")
          .insert([{ ...memberData, display_order: maxOrder + 1 }]);

        if (error) throw error;
        toast.success(t('teamManagement.createSuccess'));
      }

      setDialogOpen(false);
      resetForm();
      fetchTeamMembers();
    } catch (error) {
      console.error("Error saving team member:", error);
      toast.error(t('teamManagement.saveFailed'));
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      name_ar: member.name_ar || "",
      role: member.role,
      role_ar: member.role_ar || "",
      bio: member.bio || "",
      bio_ar: member.bio_ar || "",
      image_url: member.image_url || "",
      email: member.email || "",
      phone: member.phone || "",
      linkedin_url: member.linkedin_url || "",
      display_order: member.display_order,
      is_active: member.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('teamManagement.deleteConfirm'))) return;

    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success(t('teamManagement.deleteSuccess'));
      fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error(t('teamManagement.deleteFailed'));
    }
  };

  const filteredTeamMembers = useMemo(() => {
    if (!searchQuery.trim()) return teamMembers;
    const q = searchQuery.toLowerCase().trim();
    return teamMembers.filter((m) =>
      (m.name || '').toLowerCase().includes(q) ||
      (m.name_ar || '').toLowerCase().includes(q) ||
      (m.role || '').toLowerCase().includes(q) ||
      (m.role_ar || '').toLowerCase().includes(q) ||
      (m.email || '').toLowerCase().includes(q) ||
      (m.phone || '').toLowerCase().includes(q) ||
      (m.bio || '').toLowerCase().includes(q) ||
      (m.bio_ar || '').toLowerCase().includes(q)
    );
  }, [teamMembers, searchQuery]);

  const resetForm = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      name_ar: "",
      role: "",
      role_ar: "",
      bio: "",
      bio_ar: "",
      image_url: "",
      email: "",
      phone: "",
      linkedin_url: "",
      display_order: 0,
      is_active: true,
    });
  };

  if (loading) return <div>{t('teamManagement.loading')}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('teamManagement.title')}</h1>
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gold/10 text-gold border border-gold/20">
            {teamMembers.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('teamManagement.searchPlaceholder', 'Search team members...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 w-full sm:w-64"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-gold hover:bg-gold/90">
              <Plus className="mr-2 h-4 w-4" />
              {t('teamManagement.addTeamMember')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? t('teamManagement.editTeamMember') : t('teamManagement.addNewTeamMember')}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>{t('teamManagement.profileImage')}</Label>
                <ImageUpload
                  currentImage={formData.image_url}
                  onUpload={(url) => setFormData({ ...formData, image_url: url })}
                  bucket="testimonial-images"
                />
              </div>

              <div>
                <Label>{t('teamManagement.name')} ({t('teamManagement.multiLanguage')}) *</Label>
                <LanguageTabs>
                  {(lang) => (
                    <Input
                      value={lang === 'ar' ? formData.name_ar : formData.name}
                      onChange={(e) => setFormData({ ...formData, [lang === 'en' ? 'name' : `name_${lang}`]: e.target.value })}
                      placeholder={`${t('teamManagement.name')} (${lang === 'ar' ? 'Arabic' : 'English'})`}
                      required={lang === 'en'}
                    />
                  )}
                </LanguageTabs>
              </div>

              <div>
                <Label>{t('teamManagement.role')} ({t('teamManagement.multiLanguage')}) *</Label>
                <LanguageTabs>
                  {(lang) => (
                    <Input
                      value={lang === 'ar' ? formData.role_ar : formData.role}
                      onChange={(e) => setFormData({ ...formData, [lang === 'en' ? 'role' : `role_${lang}`]: e.target.value })}
                      placeholder={`${t('teamManagement.role')} (${lang === 'ar' ? 'Arabic' : 'English'})`}
                      required={lang === 'en'}
                    />
                  )}
                </LanguageTabs>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">{t('teamManagement.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t('teamManagement.phone')}</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="linkedin_url">{t('teamManagement.linkedinUrl')}</Label>
                <Input
                  id="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <Label>{t('teamManagement.bio')} ({t('teamManagement.multiLanguage')})</Label>
                <LanguageTabs>
                  {(lang) => (
                    <Textarea
                      value={lang === 'ar' ? formData.bio_ar : formData.bio}
                      onChange={(e) => setFormData({ ...formData, [lang === 'en' ? 'bio' : `bio_${lang}`]: e.target.value })}
                      placeholder={`${t('teamManagement.bio')} (${lang === 'ar' ? 'Arabic' : 'English'})`}
                      rows={3}
                    />
                  )}
                </LanguageTabs>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">{t('teamManagement.active')}</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gold hover:bg-gold/90">
                  {editingMember ? t('teamManagement.update') : t('teamManagement.create')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  {t('teamManagement.cancel')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>{t('teamManagement.image')}</TableHead>
                <TableHead>{t('teamManagement.name')}</TableHead>
                <TableHead>{t('teamManagement.role')}</TableHead>
                <TableHead>{t('teamManagement.email')}</TableHead>
                <TableHead>{t('teamManagement.phone')}</TableHead>
                <TableHead>{t('teamManagement.status')}</TableHead>
                <TableHead className="text-right">{t('teamManagement.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={filteredTeamMembers.map(m => m.id)}
                strategy={verticalListSortingStrategy}
              >
                {filteredTeamMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      {searchQuery.trim()
                        ? t('teamManagement.noSearchResults')
                        : t('teamManagement.noTeamMembers')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeamMembers.map((member) => (
                    <SortableRow
                      key={member.id}
                      member={member}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      t={t}
                    />
                  ))
                )}
              </SortableContext>
            </TableBody>
          </Table>
        </div>
      </DndContext>
    </div>
  );
};

export default TeamManagement;