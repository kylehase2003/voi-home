import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ROUTES } from '@/constants/routes';

interface AffectedProperty {
  id: string;
  title: string;
  slug: string | null;
}

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  affectedCount: number;
  affectedProperties?: AffectedProperty[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  itemName,
  affectedCount,
  affectedProperties = [],
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{itemName}"?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3" asChild>
            <div>
              <span className="block">
                This will remove "{itemName}" from the list.
              </span>
              {affectedCount > 0 ? (
                <div className="space-y-2">
                  <span className="block text-destructive font-medium">
                    ⚠️ {affectedCount} {affectedCount === 1 ? 'property is' : 'properties are'} currently using this value and will need to be updated manually:
                  </span>
                  <ScrollArea className="h-[120px] w-full rounded-md border border-border/50 bg-muted/30 p-2">
                    <ul className="space-y-1">
                      {affectedProperties.map((property) => (
                        <li key={property.id}>
                          <Link
                            to={property.slug ? ROUTES.PROPERTY_DETAIL(property.slug) : '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm font-medium"
                            onClick={(e) => {
                              if (!property.slug) {
                                e.preventDefault();
                              }
                            }}
                          >
                            {property.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              ) : (
                <span className="block text-muted-foreground">
                  No properties are currently using this value.
                </span>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
