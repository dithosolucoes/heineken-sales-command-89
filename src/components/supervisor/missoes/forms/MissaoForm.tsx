
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrioridadeType, StatusType } from "@/types/missao";
import { Calendar } from "lucide-react";
import { missaoFormSchema, MissaoFormValues } from "./MissaoFormSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

interface MissaoFormProps {
  isViewOnly?: boolean;
  initialData: {
    titulo: string;
    vendedor: string;
    prioridade: string;
    prazo: string;
    descricao: string;
    progresso?: string;
    status?: string;
  };
  onChange: {
    setTitulo: (value: string) => void;
    setVendedor: (value: string) => void;
    setPrioridade: (value: string) => void;
    setPrazo: (value: string) => void;
    setDescricao: (value: string) => void;
    setProgresso?: (value: string) => void;
    setStatus?: (value: string) => void;
  };
  isEditMode?: boolean;
}

export function MissaoForm({
  isViewOnly = false,
  initialData,
  onChange,
  isEditMode = false,
}: MissaoFormProps) {
  const form = useForm<MissaoFormValues>({
    resolver: zodResolver(missaoFormSchema),
    defaultValues: {
      titulo: initialData.titulo,
      vendedor: initialData.vendedor,
      prioridade: initialData.prioridade,
      prazo: initialData.prazo,
      descricao: initialData.descricao,
      progresso: initialData.progresso,
      status: initialData.status,
    },
  });

  // Update parent component state when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.titulo !== undefined) onChange.setTitulo(value.titulo);
      if (value.vendedor !== undefined) onChange.setVendedor(value.vendedor);
      if (value.prioridade !== undefined) onChange.setPrioridade(value.prioridade);
      if (value.prazo !== undefined) onChange.setPrazo(value.prazo);
      if (value.descricao !== undefined) onChange.setDescricao(value.descricao);
      if (value.progresso !== undefined && onChange.setProgresso) onChange.setProgresso(value.progresso);
      if (value.status !== undefined && onChange.setStatus) onChange.setStatus(value.status);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, onChange]);

  // Update form when initialData changes
  useEffect(() => {
    form.reset({
      titulo: initialData.titulo,
      vendedor: initialData.vendedor,
      prioridade: initialData.prioridade,
      prazo: initialData.prazo,
      descricao: initialData.descricao,
      progresso: initialData.progresso,
      status: initialData.status,
    });
  }, [initialData, form.reset]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-tactical-silver">Título da Missão</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-tactical-black border-heineken/30"
                  placeholder="Ex: Aumentar presença de marca no PDV #342"
                  disabled={isViewOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="vendedor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-tactical-silver">Vendedor Responsável</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isViewOnly}
              >
                <FormControl>
                  <SelectTrigger className="bg-tactical-black border-heineken/30 w-full">
                    <SelectValue placeholder="Selecione um vendedor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Carlos Silva">Carlos Silva</SelectItem>
                  <SelectItem value="Ana Duarte">Ana Duarte</SelectItem>
                  <SelectItem value="Bruno Santos">Bruno Santos</SelectItem>
                  <SelectItem value="Mariana Costa">Mariana Costa</SelectItem>
                  <SelectItem value="Pedro Lima">Pedro Lima</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="prioridade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-tactical-silver">Prioridade</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isViewOnly}
                >
                  <FormControl>
                    <SelectTrigger className="bg-tactical-black border-heineken/30 w-full">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="crítica">Crítica</SelectItem>
                    <SelectItem value="relevante">Relevante</SelectItem>
                    <SelectItem value="padrão">Padrão</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prazo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-tactical-silver flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Prazo
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    className="bg-tactical-black border-heineken/30"
                    disabled={isViewOnly}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {(isEditMode || isViewOnly) && onChange.setStatus && onChange.setProgresso && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-tactical-silver">Status</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isViewOnly}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-tactical-black border-heineken/30 w-full">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ativa">Ativa</SelectItem>
                      <SelectItem value="concluída">Concluída</SelectItem>
                      <SelectItem value="atrasada">Atrasada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="progresso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-tactical-silver">Progresso (%)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      max="100"
                      className="bg-tactical-black border-heineken/30"
                      disabled={isViewOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-tactical-silver">Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="bg-tactical-black border-heineken/30"
                  placeholder="Detalhes sobre a missão e o que deve ser feito..."
                  rows={4}
                  disabled={isViewOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
