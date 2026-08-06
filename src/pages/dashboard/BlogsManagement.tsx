import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, GripVertical, Search, X } from 'lucide-react';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/dashboard/ImageUpload';
import { LanguageTabs } from '@/components/dashboard/LanguageTabs';
import RichTextEditor from '@/components/dashboard/RichTextEditor';

interface Blog {
  id: string;
  title: string;
  title_ar?: string;
  title_ru?: string;
  slug: string;
  excerpt: string;
  excerpt_ar?: string;
  excerpt_ru?: string;
  featured_image: string | null;
  category: string | null;
  published: boolean;
  created_at: string;
  display_order: number;
}

// Sortable Row Component for drag and drop
interface SortableRowProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  t: any;
}

function SortableRow({ blog, onEdit, onDelete, t }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: blog.id });

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
        {blog.featured_image ? (
          <img
            src={blog.featured_image}
            alt={blog.title}
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-xs">
            No image
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{blog.title}</TableCell>
      <TableCell>{blog.category || '-'}</TableCell>
      <TableCell>
        <span className={blog.published ? 'text-green-600' : 'text-gray-500'}>
          {blog.published ? t('blogsManagement.published') : t('blogsManagement.draft')}
        </span>
      </TableCell>
      <TableCell>{new Date(blog.created_at).toLocaleDateString()}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(blog)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(blog.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

const BlogsManagement = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deleteBlogDialogOpen, setDeleteBlogDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    title_ar: '',
    title_ru: '',
    slug: '',
    excerpt: '',
    excerpt_ar: '',
    excerpt_ru: '',
    content: '',
    content_ar: '',
    content_ru: '',
    category: '',
    featured_image: '',
    published: false,
    tags: '',
    tags_ar: '',
    tags_ru: '',
    region: '' as '' | 'turkey' | 'dubai' | 'both',
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const q = searchQuery.toLowerCase().trim();
    return blogs.filter((b) =>
      (b.title || '').toLowerCase().includes(q) ||
      (b.title_ar || '').toLowerCase().includes(q) ||
      (b.title_ru || '').toLowerCase().includes(q) ||
      (b.slug || '').toLowerCase().includes(q) ||
      (b.category || '').toLowerCase().includes(q) ||
      (b.excerpt || '').toLowerCase().includes(q) ||
      (b.excerpt_ar || '').toLowerCase().includes(q) ||
      (b.excerpt_ru || '').toLowerCase().includes(q)
    );
  }, [blogs, searchQuery]);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast.error('Failed to load blogs');
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blogs.findIndex((b) => b.id === active.id);
      const newIndex = blogs.findIndex((b) => b.id === over.id);

      const newBlogs = arrayMove(blogs, oldIndex, newIndex);
      setBlogs(newBlogs);

      // Update display_order in database
      const updates = newBlogs.map((blog, index) => ({
        id: blog.id,
        display_order: index,
      }));

      try {
        for (const update of updates) {
          await supabase
            .from('blogs')
            .update({ display_order: update.display_order })
            .eq('id', update.id);
        }
        toast.success('Blog order updated');
      } catch (error) {
        toast.error('Failed to update blog order');
        loadBlogs(); // Reload to restore correct order
      }
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blogData = {
      title: formData.title,
      title_ar: formData.title_ar,
      title_ru: formData.title_ru,
      slug: formData.slug || generateSlug(formData.title),
      excerpt: formData.excerpt,
      excerpt_ar: formData.excerpt_ar,
      excerpt_ru: formData.excerpt_ru,
      content: formData.content,
      content_ar: formData.content_ar,
      content_ru: formData.content_ru,
      category: formData.category,
      featured_image: formData.featured_image,
      published: formData.published,
      published_at: formData.published ? new Date().toISOString() : null,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      tags_ar: formData.tags_ar ? formData.tags_ar.split(',').map(t => t.trim()).filter(Boolean) : [],
      tags_ru: formData.tags_ru ? formData.tags_ru.split(',').map(t => t.trim()).filter(Boolean) : [],
      region: formData.region,
    };

    if (editingBlog) {
      const { error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', editingBlog.id);

      if (error) {
        toast.error('Failed to update blog');
      } else {
        toast.success('Blog updated successfully');
        setDialogOpen(false);
        loadBlogs();
        resetForm();
      }
    } else {
      // Get the highest display_order and add 1
      const { data: maxOrderData } = await supabase
        .from('blogs')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1);
      
      const maxOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order : -1;
      
      const { error } = await supabase
        .from('blogs')
        .insert([{ ...blogData, display_order: maxOrder + 1 }]);

      if (error) {
        toast.error('Failed to create blog');
      } else {
        toast.success('Blog created successfully');
        setDialogOpen(false);
        loadBlogs();
        resetForm();
      }
    }
  };

  const handleEdit = async (blog: Blog) => {
    setEditingBlog(blog);
    
    // Fetch full blog data including content
    const { data: fullBlog } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', blog.id)
      .single();
    
    if (fullBlog) {
      setFormData({
        title: fullBlog.title,
        title_ar: fullBlog.title_ar || '',
        title_ru: fullBlog.title_ru || '',
        slug: fullBlog.slug,
        excerpt: fullBlog.excerpt || '',
        excerpt_ar: fullBlog.excerpt_ar || '',
        excerpt_ru: fullBlog.excerpt_ru || '',
        content: fullBlog.content || '',
        content_ar: fullBlog.content_ar || '',
        content_ru: fullBlog.content_ru || '',
        category: fullBlog.category || '',
        featured_image: fullBlog.featured_image || '',
        published: fullBlog.published,
        tags: Array.isArray(fullBlog.tags) ? fullBlog.tags.join(', ') : '',
        tags_ar: Array.isArray(fullBlog.tags_ar) ? fullBlog.tags_ar.join(', ') : '',
        tags_ru: Array.isArray(fullBlog.tags_ru) ? fullBlog.tags_ru.join(', ') : '',
        region: (fullBlog as any).region || '',
      });
    }
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBlogToDelete(id);
    setDeleteBlogDialogOpen(true);
  };

  const confirmDeleteBlog = async () => {
    if (!blogToDelete) return;

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', blogToDelete);

    if (error) {
      toast.error('Failed to delete blog');
    } else {
      toast.success('Blog deleted successfully');
      loadBlogs();
    }
    setDeleteBlogDialogOpen(false);
    setBlogToDelete(null);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_ar: '',
      title_ru: '',
      slug: '',
      excerpt: '',
      excerpt_ar: '',
      excerpt_ru: '',
      content: '',
      content_ar: '',
      content_ru: '',
      category: '',
      featured_image: '',
      published: false,
      tags: '',
      tags_ar: '',
      tags_ru: '',
      region: '',
    });
    setEditingBlog(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t('blogsManagement.title')}</h1>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {blogs.length}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('blogsManagement.searchPlaceholder', 'Search blogs...')}
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
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              {t('blogsManagement.addBlog')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBlog ? t('blogsManagement.editBlog') : t('blogsManagement.addNewBlog')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Region Selection at the top - Tab style toggle buttons */}
              <div className="space-y-2">
                <Label>{t('blogsManagement.showInRegion')}</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const hasTurkey = formData.region === 'turkey' || formData.region === 'both';
                      const hasDubai = formData.region === 'dubai' || formData.region === 'both';
                      if (hasTurkey) {
                        // Uncheck Turkey
                        setFormData({ ...formData, region: hasDubai ? 'dubai' : '' });
                      } else {
                        // Check Turkey
                        setFormData({ ...formData, region: hasDubai ? 'both' : 'turkey' });
                      }
                    }}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                      formData.region === 'turkey' || formData.region === 'both'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-input hover:bg-accent'
                    }`}
                  >
                    Türkiye ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const hasTurkey = formData.region === 'turkey' || formData.region === 'both';
                      const hasDubai = formData.region === 'dubai' || formData.region === 'both';
                      if (hasDubai) {
                        // Uncheck Dubai
                        setFormData({ ...formData, region: hasTurkey ? 'turkey' : '' });
                      } else {
                        // Check Dubai
                        setFormData({ ...formData, region: hasTurkey ? 'both' : 'dubai' });
                      }
                    }}
                    className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                      formData.region === 'dubai' || formData.region === 'both'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-input hover:bg-accent'
                    }`}
                  >
                    Dubai ✓
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formData.region === '' 
                    ? t('blogsManagement.regionNoneHint', 'No region selected - will only appear in "View All"')
                    : ''}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image">{t('blogsManagement.featuredImage')}</Label>
                <ImageUpload
                  bucket="blog-images"
                  onUpload={(url) => setFormData({ ...formData, featured_image: url })}
                  currentImage={formData.featured_image}
                />
              </div>

              <LanguageTabs>
                {(language) => (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${language}`}>{t('blogsManagement.titleLabel')}</Label>
                      <Input
                        id={`title-${language}`}
                        value={
                          language === 'en' ? formData.title :
                          language === 'ar' ? formData.title_ar :
                          formData.title_ru
                        }
                        onChange={(e) => {
                          const title = e.target.value;
                          if (language === 'en') {
                            setFormData({ 
                              ...formData, 
                              title,
                              slug: generateSlug(title)
                            });
                          } else if (language === 'ar') {
                            setFormData({ ...formData, title_ar: title });
                          } else {
                            setFormData({ ...formData, title_ru: title });
                          }
                        }}
                        required={language === 'en'}
                      />
                    </div>

                    {language === 'en' && (
                      <div className="space-y-2">
                        <Label htmlFor="slug">{t('blogsManagement.slug')}</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          required
                        />
                      </div>
                    )}

                    {language === 'en' && (
                      <div className="space-y-2">
                        <Label htmlFor="category">{t('blogsManagement.categoryLabel')}</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('blogsManagement.selectCategory')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market-insights">Market Insights</SelectItem>
                            <SelectItem value="buying-guide">Buying Guide</SelectItem>
                            <SelectItem value="investment">Investment</SelectItem>
                            <SelectItem value="news">News</SelectItem>
                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor={`excerpt-${language}`}>{t('blogsManagement.excerpt')}</Label>
                      <Textarea
                        id={`excerpt-${language}`}
                        value={
                          language === 'en' ? formData.excerpt :
                          language === 'ar' ? formData.excerpt_ar :
                          formData.excerpt_ru
                        }
                        onChange={(e) => {
                          const excerpt = e.target.value;
                          if (language === 'en') {
                            setFormData({ ...formData, excerpt });
                          } else if (language === 'ar') {
                            setFormData({ ...formData, excerpt_ar: excerpt });
                          } else {
                            setFormData({ ...formData, excerpt_ru: excerpt });
                          }
                        }}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`content-${language}`}>{t('blogsManagement.content')}</Label>
                      <RichTextEditor
                        content={
                          language === 'en' ? formData.content :
                          language === 'ar' ? formData.content_ar :
                          formData.content_ru
                        }
                        onChange={(content) => {
                          if (language === 'en') {
                            setFormData({ ...formData, content });
                          } else if (language === 'ar') {
                            setFormData({ ...formData, content_ar: content });
                          } else {
                            setFormData({ ...formData, content_ru: content });
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`tags-${language}`}>{t('blogsManagement.tags')}</Label>
                      <Input
                        id={`tags-${language}`}
                        placeholder={t('blogsManagement.tagsPlaceholder')}
                        value={
                          language === 'en' ? formData.tags :
                          language === 'ar' ? formData.tags_ar :
                          formData.tags_ru
                        }
                        onChange={(e) => {
                          const tags = e.target.value;
                          if (language === 'en') {
                            setFormData({ ...formData, tags });
                          } else if (language === 'ar') {
                            setFormData({ ...formData, tags_ar: tags });
                          } else {
                            setFormData({ ...formData, tags_ru: tags });
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </LanguageTabs>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">{t('blogsManagement.publishBlog')}</Label>
              </div>
              <Button type="submit" className="w-full">
                {editingBlog ? t('blogsManagement.update') : t('blogsManagement.create')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <div className="border rounded-lg">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>{t('blogsManagement.image')}</TableHead>
                <TableHead>{t('blogsManagement.tableTitle')}</TableHead>
                <TableHead>{t('blogsManagement.category')}</TableHead>
                <TableHead>{t('blogsManagement.status')}</TableHead>
                <TableHead>{t('blogsManagement.created')}</TableHead>
                <TableHead className="text-right">{t('blogsManagement.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">{t('blogsManagement.loading')}</TableCell>
                </TableRow>
              ) : filteredBlogs.length === 0 ? (
                searchQuery.trim() ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      <div className="py-8">
                        <p className="text-muted-foreground mb-2">{t('blogsManagement.noSearchResults', 'No blogs match your search.')}</p>
                        <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                          {t('blogsManagement.clearSearch', 'Clear Search')}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">{t('blogsManagement.noBlogs')}</TableCell>
                  </TableRow>
                )
              ) : (
                <SortableContext
                  items={filteredBlogs.map(b => b.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {filteredBlogs.map((blog) => (
                    <SortableRow
                      key={blog.id}
                      blog={blog}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      t={t}
                    />
                  ))}
                </SortableContext>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {/* Blog Delete Confirmation Dialog */}
      <AlertDialog open={deleteBlogDialogOpen} onOpenChange={setDeleteBlogDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setBlogToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteBlog} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogsManagement;
