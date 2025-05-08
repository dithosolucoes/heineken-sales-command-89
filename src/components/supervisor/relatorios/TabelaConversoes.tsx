
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { ConversaoItem } from "./ConversaoItem";

interface Conversao {
  id: string;
  clienteId: string;
  clienteNome: string;
  data: string;
  acao: string;
  vendedor: string;
  origem: "manual" | "planilha";
}

interface TabelaConversoesProps {
  conversoesExibidas: Conversao[];
  totalConversoesOriginais: number;
  paginaAtual: number;
  setPaginaAtual: (pagina: number) => void;
  totalPaginas: number;
  limparFiltros: () => void;
}

export const TabelaConversoes = ({
  conversoesExibidas,
  totalConversoesOriginais,
  paginaAtual,
  setPaginaAtual,
  totalPaginas,
  limparFiltros
}: TabelaConversoesProps) => {
  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Tabela de Conversões</CardTitle>
            <CardDescription>
              Total de registros: {conversoesExibidas.length} de {totalConversoesOriginais}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-heineken/20 overflow-hidden">
          <Table>
            <TableHeader className="bg-tactical-black">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Origem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversoesExibidas.map(conversao => (
                <ConversaoItem key={conversao.id} conversao={conversao} />
              ))}
              
              {conversoesExibidas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Filter className="h-10 w-10 text-tactical-silver/50 mx-auto mb-2" />
                    <p className="text-tactical-silver">Nenhum registro encontrado com os filtros atuais.</p>
                    <Button 
                      variant="link" 
                      className="text-heineken mt-2"
                      onClick={limparFiltros}
                    >
                      Limpar filtros
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {conversoesExibidas.length > 0 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
                  }}
                  className={paginaAtual === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPaginas) }).map((_, i) => {
                // Cálculo para mostrar as páginas ao redor da página atual
                let pageNum = i + 1;
                if (paginaAtual > 3 && totalPaginas > 5) {
                  pageNum = paginaAtual - 2 + i;
                  if (pageNum > totalPaginas) pageNum = totalPaginas - (4 - i);
                  if (pageNum < 1) pageNum = i + 1;
                }
                
                return (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setPaginaAtual(pageNum);
                      }}
                      isActive={pageNum === paginaAtual}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
                  }}
                  className={paginaAtual >= totalPaginas ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
};
