
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
}

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-tactical-silver">
          {title}
        </CardTitle>
        <div className="text-heineken-neon w-5 h-5">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-heineken-neon">{value}</div>
        {trend && (
          <p className={`text-xs ${trend.positive ? 'text-heineken-neon' : 'text-[#ea384c]'} flex items-center mt-1`}>
            {trend.positive ? '↑' : '↓'} {trend.value}% {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
