/**
 * Gráfico de Visualizações
 *
 * Gráfico de linha mostrando views ao longo do tempo
 *
 * @fileoverview Views chart component
 * @author Rainer Teixeira
 */

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { Tabs, TabsList, TabsTrigger } from '@rainersoft/ui';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Eye } from 'lucide-react';
import { useState } from 'react';

interface ViewsData {
  date: string;
  views: number;
  uniqueViews?: number;
}

interface ViewsChartProps {
  data: ViewsData[];
  isLoading?: boolean;
}

export function ViewsChart({ data, isLoading }: ViewsChartProps) {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  // Filtrar dados por período
  const filteredData = data.slice(
    -(period === '7d' ? 7 : period === '30d' ? 30 : 90)
  );

  if (isLoading) {
    return (
      <Card className="border-2">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse mt-2" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Visualizações
            </CardTitle>
            <CardDescription>
              Acompanhe as visualizações dos seus posts
            </CardDescription>
          </div>

          <Tabs
            value={period}
            onValueChange={v => setPeriod(v as '7d' | '30d' | '90d')}
          >
            <TabsList>
              <TabsTrigger value="7d">7 dias</TabsTrigger>
              <TabsTrigger value="30d">30 dias</TabsTrigger>
              <TabsTrigger value="90d">90 dias</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="views"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Visualizações"
              dot={{ fill: 'hsl(var(--primary))' }}
            />
            {filteredData[0]?.uniqueViews !== undefined && (
              <Line
                type="monotone"
                dataKey="uniqueViews"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                name="Visitantes Únicos"
                dot={{ fill: 'hsl(var(--secondary))' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
