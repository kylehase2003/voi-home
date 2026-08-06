import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ImageUpload } from '@/components/dashboard/ImageUpload';
import { LanguageTabs } from '@/components/dashboard/LanguageTabs';
import { Pencil, Trash2, Plus, GripVertical, Search, X } from 'lucide-react';
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

interface Testimonial {
  id: string;
  name: string;
  role: string;
  role_ar?: string | null;
  role_ru?: string | null;
  image_url: string | null;
  rating: number;
  text: string;
  text_ar?: string | null;
  text_ru?: string | null;
  is_active: boolean;
  display_order: number;
}

// Sortable Row Component
interface SortableRowProps {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
  t: any;
}

function SortableRow({ testimonial, onEdit, onDelete, t }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: testimonial.id });

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
        {testimonial.image_url ? (
          <img
            src={testimonial.image_url}
            alt={testimonial.name}
            className="w-12 h-12 object-cover rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xs">
            N/A
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{testimonial.name}</TableCell>
      <TableCell>{testimonial.role}</TableCell>
      <TableCell>
        <span className="text-yellow-500">{'⭐'.repeat(testimonial.rating)}</span>
      </TableCell>
      <TableCell className="max-w-xs truncate">{testimonial.text}</TableCell>
      <TableCell>
        <span className={testimonial.is_active ? 'text-green-600' : 'text-gray-500'}>
          {testimonial.is_active ? t('testimonialsManagement.active') : t('testimonialsManagement.inactive')}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(testimonial)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(testimonial.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

const TestimonialsManagement = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    role_ar: '',
    role_ru: '',
    image_url: '',
    rating: 5,
    text: '',
    text_ar: '',
    text_ru: '',
    is_active: true,
    display_order: 0
  });

  // Drag and drop sensors
  const filteredTestimonials = useMemo(() => {
    if (!searchQuery.trim()) return testimonials;
    const q = searchQuery.toLowerCase().trim();
    return testimonials.filter((t) =>
      (t.name || '').toLowerCase().includes(q) ||
      (t.role || '').toLowerCase().includes(q) ||
      (t.role_ar || '').toLowerCase().includes(q) ||
      (t.role_ru || '').toLowerCase().includes(q) ||
      (t.text || '').toLowerCase().includes(q) ||
      (t.text_ar || '').toLowerCase().includes(q) ||
      (t.text_ru || '').toLowerCase().includes(q)
    );
  }, [testimonials, searchQuery]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error: any) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = testimonials.findIndex((t) => t.id === active.id);
      const newIndex = testimonials.findIndex((t) => t.id === over.id);

      const newTestimonials = arrayMove(testimonials, oldIndex, newIndex);
      setTestimonials(newTestimonials);

      // Update display_order in database
      const updates = newTestimonials.map((testimonial, index) => ({
        id: testimonial.id,
        display_order: index,
      }));

      try {
        for (const update of updates) {
          await supabase
            .from('testimonials')
            .update({ display_order: update.display_order })
            .eq('id', update.id);
        }
        toast.success('Testimonial order updated');
      } catch (error) {
        toast.error('Failed to update testimonial order');
        fetchTestimonials(); // Reload to restore correct order
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingTestimonial.id);

        if (error) throw error;
        toast.success('Testimonial updated successfully');
      } else {
        // Get the highest display_order and add 1
        const { data: maxOrderData } = await supabase
          .from('testimonials')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1);
        
        const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order : -1;
        
        const { error } = await supabase
          .from('testimonials')
          .insert([{ ...formData, display_order: maxOrder + 1 }]);

        if (error) throw error;
        toast.success('Testimonial created successfully');
      }

      setDialogOpen(false);
      resetForm();
      fetchTestimonials();
    } catch (error: any) {
      console.error('Error saving testimonial:', error);
      toast.error(error.message || 'Failed to save testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error: any) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      role_ar: testimonial.role_ar || '',
      role_ru: testimonial.role_ru || '',
      image_url: testimonial.image_url || '',
      rating: testimonial.rating,
      text: testimonial.text,
      text_ar: testimonial.text_ar || '',
      text_ru: testimonial.text_ru || '',
      is_active: testimonial.is_active,
      display_order: testimonial.display_order
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: '',
      role_ar: '',
      role_ru: '',
      image_url: '',
      rating: 5,
      text: '',
      text_ar: '',
      text_ru: '',
      is_active: true,
      display_order: 0
    });
  };

  if (loading) return <div>{t('testimonialsManagement.loading')}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('testimonialsManagement.title')}</h1>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {testimonials.length}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('testimonialsManagement.searchPlaceholder', 'Search testimonials...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
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
              {t('testimonialsManagement.addTestimonial')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? t('testimonialsManagement.editTestimonial') : t('testimonialsManagement.addNewTestimonial')}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>{t('testimonialsManagement.profileImage')}</Label>
                <ImageUpload
                  bucket="testimonial-images"
                  onUpload={(url) => setFormData({ ...formData, image_url: url })}
                  currentImage={formData.image_url}
                />
              </div>

              <div>
                <Label htmlFor="name">{t('testimonialsManagement.name')} *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>{t('testimonialsManagement.roleMultiLang')} *</Label>
                <LanguageTabs>
                  {(lang) => (
                    <Input
                      value={lang === 'en' ? formData.role : lang === 'ar' ? formData.role_ar : formData.role_ru}
                      onChange={(e) => setFormData({ ...formData, [lang === 'en' ? 'role' : `role_${lang}`]: e.target.value })}
                      placeholder={t(`testimonialsManagement.roleIn${lang === 'en' ? 'English' : lang === 'ar' ? 'Arabic' : 'Russian'}`)}
                      required={lang === 'en'}
                    />
                  )}
                </LanguageTabs>
              </div>

              <div>
                <Label htmlFor="rating">{t('testimonialsManagement.rating')}</Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {t(num !== 1 ? 'testimonialsManagement.stars' : 'testimonialsManagement.star')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{t('testimonialsManagement.textMultiLang')} *</Label>
                <LanguageTabs>
                  {(lang) => (
                    <Textarea
                      value={lang === 'en' ? formData.text : lang === 'ar' ? formData.text_ar : formData.text_ru}
                      onChange={(e) => setFormData({ ...formData, [lang === 'en' ? 'text' : `text_${lang}`]: e.target.value })}
                      placeholder={t(`testimonialsManagement.textIn${lang === 'en' ? 'English' : lang === 'ar' ? 'Arabic' : 'Russian'}`)}
                      rows={4}
                      required={lang === 'en'}
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
                <Label htmlFor="is_active">{t('testimonialsManagement.activeLabel')}</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gold hover:bg-gold/90">
                  {editingTestimonial ? t('testimonialsManagement.update') : t('testimonialsManagement.create')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  {t('testimonialsManagement.cancel')}
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
                <TableHead>{t('testimonialsManagement.image')}</TableHead>
                <TableHead>{t('testimonialsManagement.name')}</TableHead>
                <TableHead>{t('testimonialsManagement.role')}</TableHead>
                <TableHead>{t('testimonialsManagement.rating')}</TableHead>
                <TableHead>{t('testimonialsManagement.text')}</TableHead>
                <TableHead>{t('testimonialsManagement.status')}</TableHead>
                <TableHead className="text-right">{t('testimonialsManagement.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">{t('testimonialsManagement.loading')}</TableCell>
                </TableRow>
              ) : filteredTestimonials.length === 0 ? (
                searchQuery.trim() ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      <div className="py-8">
                        <p className="text-muted-foreground mb-2">{t('testimonialsManagement.noSearchResults', 'No testimonials match your search.')}</p>
                        <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                          {t('testimonialsManagement.clearSearch', 'Clear Search')}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">No testimonials yet.</TableCell>
                  </TableRow>
                )
              ) : (
                <SortableContext
                  items={filteredTestimonials.map(t => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {filteredTestimonials.map((testimonial) => (
                    <SortableRow
                      key={testimonial.id}
                      testimonial={testimonial}
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

export default TestimonialsManagement;
