import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Eye, Send, Reply, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  reply: string | null;
  replied_at: string | null;
  created_at: string;
}

const ContactSubmissions = () => {
  const { t } = useTranslation();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'single' | 'bulk'; id?: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredSubmissions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return submissions;
    return submissions.filter((s) =>
      [s.name, s.email, s.phone, s.message]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q))
    );
  }, [submissions, searchQuery]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: t('contactSubmissions.updateError'),
        description: t('contactSubmissions.deleteError'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const query = supabase.from('contact_submissions').delete();
      const { error } =
        deleteTarget.type === 'single' && deleteTarget.id
          ? await query.eq('id', deleteTarget.id)
          : await query.in('id', selectedIds);

      if (error) throw error;

      toast({
        title: t('maintenance.success'),
        description: t('contactSubmissions.deleteSuccess'),
      });
      if (deleteTarget.type === 'bulk') setSelectedIds([]);
      fetchSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: t('maintenance.error'),
        description: t('contactSubmissions.deleteError'),
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const ids = filteredSubmissions.map((s) => s.id);
    if (ids.every((id) => selectedIds.includes(id)) && ids.length > 0) {
      setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: t('maintenance.success'),
        description: t('contactSubmissions.updateSuccess'),
      });
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: t('maintenance.error'),
        description: t('contactSubmissions.updateError'),
        variant: "destructive",
      });
    }
  };

  const handleReply = async () => {
    if (!selectedSubmission || !replyText.trim()) return;
    setIsSendingReply(true);
    try {
      const subject = `Re: Your message to Mr Property`;
      const bodyLines = [
        replyText.trim(),
        '',
        '---',
        `On ${new Date(selectedSubmission.created_at).toLocaleString()}, ${selectedSubmission.name} wrote:`,
        selectedSubmission.message,
      ];
      const mailto = `mailto:${encodeURIComponent(selectedSubmission.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
      window.location.href = mailto;

      // Save reply locally so it shows as replied in the dashboard
      const { error } = await supabase
        .from('contact_submissions')
        .update({
          reply: replyText.trim(),
          replied_at: new Date().toISOString(),
          status: 'resolved',
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      toast({
        title: t('maintenance.success'),
        description: t('contactSubmissions.replySuccess'),
      });
      setReplyText('');
      setSelectedSubmission(null);
      fetchSubmissions();
    } catch (error) {
      console.error('Error saving reply:', error);
      toast({
        title: t('maintenance.error'),
        description: t('contactSubmissions.replyError'),
        variant: "destructive",
      });
    } finally {
      setIsSendingReply(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
      new: "bg-blue-500",
      in_progress: "bg-yellow-500",
      resolved: "bg-green-500",
    };

    const statusLabels: { [key: string]: string } = {
      new: t('contactSubmissions.statusNew'),
      in_progress: t('contactSubmissions.statusInProgress'),
      resolved: t('contactSubmissions.statusResolved'),
    };

    return (
      <Badge className={`${statusColors[status] || 'bg-gray-500'} text-white`}>
        {statusLabels[status] || status.toUpperCase()}
      </Badge>
    );
  };

  if (isLoading) {
    return <div className="p-8">{t('contactSubmissions.loading')}</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-serif">{t('contactSubmissions.title')}</h1>
            <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {submissions.length}
            </span>
          </div>
          <p className="text-muted-foreground">{t('contactSubmissions.subtitle')}</p>
        </div>
        {selectedIds.length > 0 && (
          <Button variant="destructive" onClick={() => setDeleteTarget({ type: 'bulk' })}>
            <Trash2 className="h-4 w-4 mr-2" />
            {t('contactSubmissions.deleteSelected', { defaultValue: 'Delete Selected' })} ({selectedIds.length})
          </Button>
        )}
      </div>

      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('contactSubmissions.searchPlaceholder')}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label={t('contactSubmissions.clearSearch')}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={filteredSubmissions.length > 0 && filteredSubmissions.every((s) => selectedIds.includes(s.id))}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>{t('contactSubmissions.name')}</TableHead>
              <TableHead>{t('contactSubmissions.email')}</TableHead>
              <TableHead>{t('contactSubmissions.phone')}</TableHead>
              <TableHead>{t('contactSubmissions.status')}</TableHead>
              <TableHead>{t('contactSubmissions.date')}</TableHead>
              <TableHead className="text-right">{t('contactSubmissions.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {searchQuery ? t('contactSubmissions.noSearchResults') : t('contactSubmissions.noSubmissions')}
                </TableCell>
              </TableRow>
            ) : (
              filteredSubmissions.map((submission) => (
                <TableRow key={submission.id} data-state={selectedIds.includes(submission.id) ? 'selected' : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(submission.id)}
                      onCheckedChange={() => toggleSelect(submission.id)}
                      aria-label={`Select ${submission.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.phone || '-'}</TableCell>
                  <TableCell>
                    <Select
                      value={submission.status}
                      onValueChange={(value) => handleStatusChange(submission.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">{t('contactSubmissions.statusNew')}</SelectItem>
                        <SelectItem value="in_progress">{t('contactSubmissions.statusInProgress')}</SelectItem>
                        <SelectItem value="resolved">{t('contactSubmissions.statusResolved')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(submission.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTarget({ type: 'single', id: submission.id })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </div>

      <Dialog
        open={!!selectedSubmission}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedSubmission(null);
            setReplyText('');
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('contactSubmissions.submissionDetails')}</DialogTitle>
            <DialogDescription>
              {t('contactSubmissions.submittedOn')} {selectedSubmission && new Date(selectedSubmission.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold">{t('contactSubmissions.name')}</label>
                <p className="text-muted-foreground">{selectedSubmission.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold">{t('contactSubmissions.email')}</label>
                <p className="text-muted-foreground">{selectedSubmission.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold">{t('contactSubmissions.phone')}</label>
                <p className="text-muted-foreground">{selectedSubmission.phone || t('contactSubmissions.notProvided')}</p>
              </div>
              <div>
                <label className="text-sm font-semibold">{t('contactSubmissions.message')}</label>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
              <div>
                <label className="text-sm font-semibold">{t('contactSubmissions.status')}</label>
                <div className="mt-2">{getStatusBadge(selectedSubmission.status)}</div>
              </div>
              {selectedSubmission.reply ? (
                <div className="rounded-lg bg-primary/5 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Reply className="h-4 w-4" />
                    {t('contactSubmissions.reply')}
                  </div>
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedSubmission.reply}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('contactSubmissions.repliedOn')} {new Date(selectedSubmission.replied_at!).toLocaleString()}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-semibold">{t('contactSubmissions.reply')}</label>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={t('contactSubmissions.replyPlaceholder')}
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleReply}
                      disabled={!replyText.trim() || isSendingReply}
                      className="gap-2"
                    >
                      {isSendingReply ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          {t('contactSubmissions.sendingReply')}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t('contactSubmissions.sendReply')}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && !isDeleting && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Trash2 className="h-4 w-4" />
              </span>
              {t('contactSubmissions.confirmDeleteTitle', { defaultValue: 'Delete submission?' })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.type === 'bulk'
                ? t('contactSubmissions.confirmDeleteBulk', { defaultValue: `This will permanently delete ${selectedIds.length} selected submissions. This action cannot be undone.`, count: selectedIds.length })
                : t('contactSubmissions.confirmDelete', { defaultValue: 'This will permanently delete this submission. This action cannot be undone.' })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {t('common.cancel', { defaultValue: 'Cancel' })}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); confirmDelete(); }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting
                ? t('common.deleting', { defaultValue: 'Deleting...' })
                : t('common.delete', { defaultValue: 'Delete' })}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContactSubmissions;
