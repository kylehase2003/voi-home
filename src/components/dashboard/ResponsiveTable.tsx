import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface ResponsiveTableProps {
  headers: string[];
  children: ReactNode;
  mobileCards?: ReactNode;
}

export function ResponsiveTable({ headers, children, mobileCards }: ResponsiveTableProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {children}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {mobileCards || (
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">No mobile view available</p>
          </Card>
        )}
      </div>
    </>
  );
}

interface MobileCardProps {
  children: ReactNode;
  className?: string;
}

export function MobileCard({ children, className = '' }: MobileCardProps) {
  return (
    <Card className={`p-4 space-y-3 ${className}`}>
      {children}
    </Card>
  );
}

interface MobileCardRowProps {
  label: string;
  value: ReactNode;
}

export function MobileCardRow({ label, value }: MobileCardRowProps) {
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-sm font-medium text-muted-foreground min-w-[100px]">{label}:</span>
      <div className="text-sm text-right flex-1">{value}</div>
    </div>
  );
}