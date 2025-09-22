import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "../ui/card";

const earningsData = [
  { month: "Jan", earnings: 4200, students: 45 },
  { month: "Feb", earnings: 5100, students: 52 },
  { month: "Mar", earnings: 4800, students: 48 },
  { month: "Apr", earnings: 6200, students: 67 },
  { month: "May", earnings: 7100, students: 73 },
  { month: "Jun", earnings: 8300, students: 89 },
];

const studentDistribution = [
  { name: "React Development", value: 234, color: "hsl(var(--chart-1))" },
  { name: "Data Science", value: 156, color: "hsl(var(--chart-2))" },
  { name: "UI/UX Design", value: 189, color: "hsl(var(--chart-3))" },
  { name: "Python Basics", value: 98, color: "hsl(var(--chart-4))" },
  { name: "Mobile Dev", value: 145, color: "hsl(var(--chart-5))" },
];

function ChartsSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Over Time */}
        <Card className="p-6">
          <h3 className="text-lg font-heading font-semibold mb-4">
            Earnings Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Student Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-heading font-semibold mb-4">
            Students by Course
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {studentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-4">
            {studentDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1">{item.name}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ChartsSection;
