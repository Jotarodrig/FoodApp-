import { createContext, ReactNode, useContext, useState } from "react";

type Item = {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
};

export type Pedido = {
  id: string;
  nome_cliente: string;
  itens: Omit<Item, "imagem">[];
  total: number;
  created_at: string;
};

type CarrinhoContextType = {
  itens: Item[];
  adicionarItem: (item: Omit<Item, "quantidade">) => void;
  removerItem: (id: string) => void;
  limparCarrinho: () => void;
  total: number;
  nomeCliente: string;
  setNomeCliente: (nome: string) => void;
  historico: Pedido[];
  salvarPedido: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType>(
  {} as CarrinhoContextType,
);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<Item[]>([]);
  const [nomeCliente, setNomeCliente] = useState("");
  const [historico, setHistorico] = useState<Pedido[]>([]);

  function adicionarItem(item: Omit<Item, "quantidade">) {
    setItens((prev) => {
      const existe = prev.find((i) => i.id === item.id);
      if (existe) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        );
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  }

  function removerItem(id: string) {
    setItens((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i))
        .filter((i) => i.quantidade > 0),
    );
  }

  function salvarPedido() {
    if (itens.length === 0) return;
    const novoPedido: Pedido = {
      id: Math.random().toString(36).slice(2),
      nome_cliente: nomeCliente || "Visitante",
      itens: itens.map(({ id, nome, preco, quantidade }) => ({ id, nome, preco, quantidade })),
      total,
      created_at: new Date().toISOString(),
    };
    setHistorico((prev) => [novoPedido, ...prev]);
  }

  function limparCarrinho() {
    setItens([]);
  }

  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionarItem, removerItem, limparCarrinho, total, nomeCliente, setNomeCliente, historico, salvarPedido }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
