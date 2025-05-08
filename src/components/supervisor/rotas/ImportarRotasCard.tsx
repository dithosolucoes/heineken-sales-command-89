
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { ImportarPlanilhaModal } from "@/components/supervisor/ImportarPlanilhaModal";

export const ImportarRotasCard = () => {
  const [importarModalOpen, setImportarModalOpen] = useState(false);

  return (
    <>
      <Card className="bg-tactical-darkgray/80 border-heineken/30 w-full md:w-1/3">
        <CardHeader>
          <CardTitle className="text-lg">Importar Rotas</CardTitle>
          <CardDescription>Importe planilhas com rotas por vendedor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-heineken/30 rounded-lg p-6 text-center">
            <Upload className="h-10 w-10 text-heineken-neon mx-auto mb-3" />
            <p className="text-sm text-tactical-silver mb-2">Arraste um arquivo ou clique para selecionar</p>
            <p className="text-xs text-tactical-silver">Formatos suportados: .xls, .xlsx, .csv</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-heineken hover:bg-heineken/80"
            onClick={() => setImportarModalOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" /> Importar Planilha
          </Button>
        </CardFooter>
      </Card>

      <ImportarPlanilhaModal 
        isOpen={importarModalOpen} 
        onClose={() => setImportarModalOpen(false)} 
      />
    </>
  );
};
