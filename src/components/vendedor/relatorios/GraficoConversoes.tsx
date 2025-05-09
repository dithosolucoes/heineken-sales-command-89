
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface DadoConversao {
  name: string;
  value: number;
  fill: string;
}

interface GraficoConversoesProps {
  dadosConversoes: DadoConversao[];
}

export const GraficoConversoes = ({ dadosConversoes }: GraficoConversoesProps) => {
  // Verificar se há pelo menos uma conversão para exibir o gráfico
  const temConversoes = dadosConversoes.some(item => item.value > 0);
  
  // Configuração para o gráfico
  const config = {
    confirmado: { label: "Confirmadas", color: "#22c55e" },
    pendente: { label: "Pendentes", color: "#94a3b8" },
    revertido: { label: "Revertidas", color: "#ef4444" },
  };
  
  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Visualização de Conversões</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {temConversoes ? (
          <ChartContainer config={config} className="h-full pt-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosConversoes} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="name" 
                  stroke="#fff"
                  tick={{ fill: "#fff" }}
                  axisLine={{ stroke: "#555" }}
                />
                <YAxis 
                  stroke="#fff" 
                  tick={{ fill: "#fff" }} 
                  axisLine={{ stroke: "#555" }}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "#1A1F2C", 
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff" 
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {dadosConversoes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
                <ChartLegend
                  payload={[
                    { value: "Confirmadas", color: "#22c55e" },
                    { value: "Pendentes", color: "#94a3b8" },
                    { value: "Revertidas", color: "#ef4444" }
                  ]}
                  verticalAlign="bottom"
                  layout="horizontal"
                  wrapperStyle={{ 
                    paddingTop: 20, 
                    display: "flex", 
                    justifyContent: "center" 
                  }}
                  formatter={(value) => <span style={{ color: "#fff" }}>{value}</span>}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-full flex-col">
            <div className="w-16 h-16 bg-tactical-black rounded-full flex items-center justify-center mb-4">
              <BarChart className="h-8 w-8 text-heineken" />
            </div>
            <p className="text-tactical-silver text-center">
              Nenhuma conversão encontrada no período para visualização em gráfico
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

