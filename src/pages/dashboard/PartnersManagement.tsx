import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ImageUpload } from '@/components/dashboard/ImageUpload';
import { Pencil, Trash2, Plus, GripVertical, ExternalLink, Search, X } from 'lucide-react';
import { toast } from 'sonner';
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

interface Partner {
  id: string;
  name: string;
  name_ar: string | null;
  name_ru: string | null;
  subtitle: string | null;
  subtitle_ar: string | null;
  subtitle_ru: string | null;
  description: string;
  description_ar: string | null;
  description_ru: string | null;
  logo_url: string | null;
  website_url: string | null;
  is_active: boolean;
  display_order: number;
}

// Sortable Row Component
interface SortableRowProps {
  partner: Partner;
  onEdit: (partner: Partner) => void;
  onDelete: (id: string) => void;
  t: any;
}

function SortableRow({ partner, onEdit, onDelete, t }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: partner.id });

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
        {partner.logo_url ? (
          <img
            src={partner.logo_url}
            alt={partner.name}
            className="w-16 h-12 object-contain bg-muted rounded"
          />
        ) : (
          <div className="w-16 h-12 bg-muted rounded flex items-center justify-center text-xs">
            No logo
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{partner.name}</TableCell>
      <TableCell>{partner.subtitle || '-'}</TableCell>
      <TableCell className="max-w-xs truncate">{partner.description}</TableCell>
      <TableCell>
        {partner.website_url ? (
          <a
            href={partner.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline inline-flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="text-xs">Visit</span>
          </a>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>
        <span className={partner.is_active ? 'text-green-600' : 'text-gray-500'}>
          {partner.is_active ? t('partnersManagement.active') : t('partnersManagement.inactive')}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(partner)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(partner.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

const PartnersManagement = () => {
  const { t } = useTranslation();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    description: '',
    logo_url: '',
    website_url: '',
    is_active: true,
    display_order: 0
  });

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredPartners = useMemo(() => {
    if (!searchQuery.trim()) return partners;
    const q = searchQuery.toLowerCase().trim();
    return partners.filter((p) =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.name_ar || '').toLowerCase().includes(q) ||
      (p.name_ru || '').toLowerCase().includes(q) ||
      (p.subtitle || '').toLowerCase().includes(q) ||
      (p.subtitle_ar || '').toLowerCase().includes(q) ||
      (p.subtitle_ru || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.description_ar || '').toLowerCase().includes(q) ||
      (p.description_ru || '').toLowerCase().includes(q) ||
      (p.website_url || '').toLowerCase().includes(q)
    );
  }, [partners, searchQuery]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPartners(data || []);
    } catch (error: any) {
      console.error('Error fetching partners:', error);
      toast.error('Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = partners.findIndex((p) => p.id === active.id);
      const newIndex = partners.findIndex((p) => p.id === over.id);

      const newPartners = arrayMove(partners, oldIndex, newIndex);
      setPartners(newPartners);

      // Update display_order in database
      const updates = newPartners.map((partner, index) => ({
        id: partner.id,
        display_order: index,
      }));

      try {
        for (const update of updates) {
          await supabase
            .from('partners')
            .update({ display_order: update.display_order })
            .eq('id', update.id);
        }
        toast.success('Partner order updated');
      } catch (error) {
        toast.error('Failed to update partner order');
        fetchPartners(); // Reload to restore correct order
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPartner) {
        const { error } = await supabase
          .from('partners')
          .update(formData)
          .eq('id', editingPartner.id);

        if (error) throw error;
        toast.success('Partner updated successfully');
      } else {
        // Get the highest display_order and add 1
        const { data: maxOrderData } = await supabase
          .from('partners')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1);
        
        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order : -1;
        
        const { error } = await supabase
          .from('partners')
          .insert([{ ...formData, display_order: maxOrder + 1 }]);

        if (error) throw error;
        toast.success('Partner created successfully');
      }

      setDialogOpen(false);
      resetForm();
      fetchPartners();
    } catch (error: any) {
      console.error('Error saving partner:', error);
      toast.error(error.message || 'Failed to save partner');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Partner deleted successfully');
      fetchPartners();
    } catch (error: any) {
      console.error('Error deleting partner:', error);
      toast.error('Failed to delete partner');
    }
  };

  const openEditDialog = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      subtitle: partner.subtitle || '',
      description: partner.description,
      logo_url: partner.logo_url || '',
      website_url: partner.website_url || '',
      is_active: partner.is_active,
      display_order: partner.display_order
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPartner(null);
    setFormData({
      name: '',
      subtitle: '',
      description: '',
      logo_url: '',
      website_url: '',
      is_active: true,
      display_order: 0
    });
  };

  if (loading) return <div>{t('partnersManagement.loading')}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('partnersManagement.title')}</h1>
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gold/10 text-gold border border-gold/20">
            {partners.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('partnersManagement.searchPlaceholder', 'Search partners...')}
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
              {t('partnersManagement.addPartner')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPartner ? t('partnersManagement.editPartner') : t('partnersManagement.addNewPartner')}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>{t('partnersManagement.partnerLogo')}</Label>
                <ImageUpload
                  bucket="partner-logos"
                  onUpload={(url) => setFormData({ ...formData, logo_url: url })}
                  currentImage={formData.logo_url}
                />
              </div>

              <div>
                <Label htmlFor="name">{t('partnersManagement.name')} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="subtitle">{t('partnersManagement.subtitle')}</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">{t('partnersManagement.description')} *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="website_url">{t('partnersManagement.websiteUrl')}</Label>
                <Input
                  id="website_url"
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">{t('partnersManagement.activeLabel')}</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gold hover:bg-gold/90">
                  {editingPartner ? t('partnersManagement.update') : t('partnersManagement.create')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  {t('partnersManagement.cancel')}
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
                <TableHead>{t('partnersManagement.logo')}</TableHead>
                <TableHead>{t('partnersManagement.name')}</TableHead>
                <TableHead>{t('partnersManagement.subtitle')}</TableHead>
                <TableHead>{t('partnersManagement.description')}</TableHead>
                <TableHead>{t('partnersManagement.website')}</TableHead>
                <TableHead>{t('partnersManagement.status')}</TableHead>
                <TableHead className="text-right">{t('partnersManagement.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    {searchQuery.trim() ? (
                      <div className="py-8">
                        <p className="text-muted-foreground mb-2">{t('partnersManagement.noSearchResults', 'No partners match your search.')}</p>
                        <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                          {t('partnersManagement.clearSearch', 'Clear Search')}
                        </Button>
                      </div>
                    ) : (
                      <div className="py-8 text-muted-foreground">{t('partnersManagement.noPartners', 'No partners yet.')}</div>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                <SortableContext
                  items={filteredPartners.map(p => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {filteredPartners.map((partner) => (
                    <SortableRow
                      key={partner.id}
                      partner={partner}
                      onEdit={openEditDialog}
                      onDelete={handleDelete}
                      t={t}
                    />
                  ))}
                </SortableContext>
              )}
            </TableBody>
          </Table>
        </div>
      </DndContext>
    </div>
  );
};

export default PartnersManagement;
