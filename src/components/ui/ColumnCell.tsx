import { Badge } from '@/components/ui/badge';

type ColumnCellProps = {
  badgeColor?: string;
  badgeClassName?: string;
  children: React.ReactNode;
};

export default function ColumnCell({
  badgeColor,
  badgeClassName,
  children,
}: ColumnCellProps) {
  return (
    <Badge
      className={
        badgeColor || badgeClassName
          ? `bg-${badgeColor}-500 hover:bg-${badgeColor}-400 ${badgeClassName}`
          : ``
      }
    >
      <div className="flex items-center gap-2">{children}</div>
    </Badge>
  );
}
