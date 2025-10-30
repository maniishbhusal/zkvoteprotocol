import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const provinceData = [
  { name: "Province 1", voters: 3456789 },
  { name: "Madhesh", voters: 4123456 },
  { name: "Bagmati", voters: 5234567 },
  { name: "Gandaki", voters: 2123456 },
  { name: "Lumbini", voters: 3789012 },
  { name: "Karnali", voters: 1234567 },
  { name: "Sudurpashchim", voters: 1890123 },
];

const voterTurnoutData = [
  { year: "2017", turnout: 71 },
  { year: "2018", turnout: 68 },
  { year: "2019", turnout: 73 },
  { year: "2020", turnout: 0 },
  { year: "2021", turnout: 0 },
  { year: "2022", turnout: 65 },
  { year: "2023", turnout: 0 },
  { year: "2024", turnout: 69 },
  { year: "2025", turnout: 78 },
];

const ageGroupData = [
  { name: "18-25", value: 23, color: "hsl(270, 91%, 65%)" },
  { name: "26-35", value: 28, color: "hsl(250, 91%, 65%)" },
  { name: "36-50", value: 31, color: "hsl(230, 91%, 65%)" },
  { name: "51+", value: 18, color: "hsl(158, 64%, 52%)" },
];

const Stats = () => {
  return (
    <section className="py-24 px-4 relative bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Nepal Voting <span className="bg-gradient-primary bg-clip-text text-transparent">Statistics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into Nepal's democratic participation
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Total Registered Voters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">21.8M</p>
              <p className="text-sm text-muted-foreground mt-2">Across 7 provinces</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Average Turnout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-accent">71%</p>
              <p className="text-sm text-muted-foreground mt-2">In recent elections</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Blockchain Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground mt-2">Tamper-proof votes</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Province Distribution */}
          <Card className="bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle>Voters by Province</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={provinceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="voters" fill="hsl(270, 91%, 65%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Age Group Distribution */}
          <Card className="bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle>Voter Age Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ageGroupData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ageGroupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Voter Turnout Trend */}
          <Card className="bg-gradient-card backdrop-blur-sm border-primary/20 lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle>Voter Turnout Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={voterTurnoutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="turnout" 
                    stroke="hsl(158, 64%, 52%)" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(158, 64%, 52%)', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;