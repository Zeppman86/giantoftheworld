import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { BUILDINGS } from '../data';

interface HeightChartProps {
  currentYear: number;
}

const CHART_SCALE = [
  { pos: 0, year: -8000 },
  { pos: 15, year: -3200 },
  { pos: 25, year: -2560 },
  { pos: 45, year: 1311 },  
  { pos: 60, year: 1889 },  
  { pos: 75, year: 1970 },  
  { pos: 90, year: 2026 },
  { pos: 100, year: 2035 }
];

const yearToPos = (year: number) => {
  for (let i = 0; i < CHART_SCALE.length - 1; i++) {
    const start = CHART_SCALE[i];
    const end = CHART_SCALE[i + 1];
    if (year >= start.year && year <= end.year) {
      const range = end.year - start.year;
      const progress = (year - start.year) / range;
      return start.pos + progress * (end.pos - start.pos);
    }
  }
  return year > 2035 ? 100 : 0;
};

export const HeightChart: React.FC<HeightChartProps> = ({ currentYear }) => {
  const sortedBuildings = [...BUILDINGS].sort((a, b) => a.yearBuilt - b.yearBuilt);
  const records: any[] = [];
  let currentMaxHeight = 0;

  sortedBuildings.forEach(b => {
    if (b.height > currentMaxHeight) {
      records.push(b);
      currentMaxHeight = b.height;
    }
  });
  
  const chartData = records.map(b => ({
    year: b.yearBuilt,
    height: b.height,
    name: b.name,
    pos: yearToPos(b.yearBuilt)
  }));

  const steppedData: any[] = [];
  chartData.forEach((d, i) => {
    steppedData.push(d);
    if (chartData[i + 1]) {
      steppedData.push({
        year: chartData[i + 1].year - 1,
        pos: yearToPos(chartData[i + 1].year - 1),
        height: d.height,
        name: d.name
      });
    } else {
      steppedData.push({
        year: 2035,
        pos: 100,
        height: d.height,
        name: d.name
      });
    }
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
            {data.year < 0 ? `${Math.abs(data.year)} до н.э.` : `${data.year} г.`}
          </p>
          <p className="text-sm font-serif font-bold text-white mb-1">{data.name}</p>
          <p className="text-xl font-black text-amber-500">{data.height} м</p>
        </div>
      );
    }
    return null;
  };

  const currentPos = yearToPos(currentYear);

  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={50}>
      <AreaChart
        data={steppedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
        <XAxis 
          dataKey="pos" 
          type="number"
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={{ stroke: '#334155' }}
          tickFormatter={(pos) => {
            if (pos === 0) return '8000 BC';
            if (pos === 25) return '2500 BC';
            if (pos === 45) return '1300';
            if (pos === 90) return '2026';
            if (pos === 100) return '2035';
            return '';
          }}
          ticks={[0, 15, 25, 45, 60, 75, 90, 100]}
        />
        <YAxis 
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={{ stroke: '#334155' }}
          unit="м"
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="height" 
          stroke="#f59e0b" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorHeight)" 
          animationDuration={800}
        />
        <ReferenceLine 
          x={currentPos} 
          stroke="#f59e0b" 
          strokeWidth={2}
          strokeDasharray="3 3" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
