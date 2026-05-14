import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";

// ─────────────────────────────────────────────────────────────────────────────
// IMAGENS DOS PRATOS
// Coloque seus arquivos em: assets/images/pratos/
// Exemplos de nomes esperados: pizza-margherita.jpg, x-burguer.jpg, etc.
// Se a imagem local não existir, o app usa automaticamente a URL de fallback.
// ─────────────────────────────────────────────────────────────────────────────
const imagensLocais: Record<string, ImageSourcePropType> = {
  // Descomente e ajuste os nomes dos arquivos conforme suas imagens:
  // "1": require("../assets/images/pratos/pizza-margherita.jpg"),
  // "2": require("../assets/images/pratos/x-burguer.jpg"),
  // "3": require("../assets/images/pratos/macarrao-bolonhesa.jpg"),
  // "4": require("../assets/images/pratos/frango-grelhado.jpg"),
  // "5": require("../assets/images/pratos/coca-cola.jpg"),
  // "6": require("../assets/images/pratos/sorvete-chocolate.jpg"),
  // "7": require("../assets/images/pratos/pizza-pepperoni.jpg"),
  // "8": require("../assets/images/pratos/suco-laranja.jpg"),
  // "9": require("../assets/images/pratos/salada-caesar.jpg"),
  // "10": require("../assets/images/pratos/costela-bbq.jpg"),
  // "11": require("../assets/images/pratos/brownie-sorvete.jpg"),
  // "12": require("../assets/images/pratos/wrap-frango.jpg"),
};

// Fallback: URLs usadas quando a imagem local não está configurada
// Usando Twemoji (open source) — emoji exato para cada prato
const imagensFallback: Record<string, string> = {
  "1":  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f355.png", // 🍕 Pizza Margherita
  "2":  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f354.png", // 🍔 X-Burguer
  "3":  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f35d.png", // 🍝 Macarrão Bolonhesa
  "4":  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f357.png", // 🍗 Frango Grelhado
  "6":  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f368.png", // 🍨 Sorvete Chocolate
  "7":  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f355.png", // 🍕 Pizza Pepperoni
  "8":  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f9c3.png", // 🧃 Suco de Laranja
  "9":  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f957.png", // 🥗 Salada Caesar
  "12": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f32f.png", // 🌯 Wrap de Frango
};

// Para esses itens usamos emoji nativo (texto) — mais confiável que URL
const emojisFallback: Record<string, string> = {
  "5":  "🥤", // Coca-Cola
  "10": "🥩", // Costela BBQ
  "11": "🍫", // Brownie com Sorvete
};

/** Retorna a fonte da imagem: local (require) se disponível, senão URL remota */
export function getImagemPrato(id: string): ImageSourcePropType | null {
  if (imagensLocais[id]) return imagensLocais[id];
  if (imagensFallback[id]) return { uri: imagensFallback[id] };
  return null; // usa emoji nativo (ver getEmojiFallback)
}

/** Retorna emoji de texto para itens sem imagem URL confiável */
export function getEmojiFallback(id: string): string | null {
  return emojisFallback[id] ?? null;
}

export const pratos = [
  { id: "1", nome: "Pizza Margherita", preco: "R$ 39,90", precoNum: 39.9, categoria: "Pizza", descricao: "Clássica pizza italiana com molho de tomate fresco, mussarela de búfala e manjericão. Massa fina e crocante assada em forno a lenha.", tempo: "25 min", avaliacao: 4.8 },
  { id: "2", nome: "X-Burguer Especial", preco: "R$ 24,90", precoNum: 24.9, categoria: "Burguer", descricao: "Hambúrguer artesanal 180g, queijo cheddar, alface, tomate, cebola caramelizada e molho especial da casa. Acompanha fritas.", tempo: "20 min", avaliacao: 4.6 },
  { id: "3", nome: "Macarrão Bolonhesa", preco: "R$ 29,90", precoNum: 29.9, categoria: "Massa", descricao: "Espaguete al dente ao molho bolonhesa com carne moída temperada, tomate pelado e ervas finas. Finalizado com parmesão ralado.", tempo: "30 min", avaliacao: 4.7 },
  { id: "4", nome: "Frango Grelhado", preco: "R$ 27,90", precoNum: 27.9, categoria: "Grelhados", descricao: "Filé de frango grelhado temperado com ervas, acompanhado de arroz, salada e legumes refogados. Leve e saboroso.", tempo: "25 min", avaliacao: 4.5 },
  { id: "5", nome: "Coca-Cola 350ml", preco: "R$ 7,90", precoNum: 7.9, categoria: "Bebida", descricao: "Coca-Cola gelada 350ml. Perfeita para acompanhar qualquer prato.", tempo: "—", avaliacao: 4.9 },
  { id: "6", nome: "Sorvete de Chocolate", preco: "R$ 14,90", precoNum: 14.9, categoria: "Sobremesa", descricao: "Duas bolas de sorvete de chocolate belga com calda quente e granulado. Servido em taça.", tempo: "5 min", avaliacao: 4.9 },
  { id: "7", nome: "Pizza Pepperoni", preco: "R$ 44,90", precoNum: 44.9, categoria: "Pizza", descricao: "Pizza generosa coberta com rodelas de pepperoni, mussarela derretida e molho de tomate temperado.", tempo: "28 min", avaliacao: 4.7 },
  { id: "8", nome: "Suco de Laranja", preco: "R$ 9,90", precoNum: 9.9, categoria: "Bebida", descricao: "Suco natural de laranja espremido na hora. 400ml gelado.", tempo: "5 min", avaliacao: 4.8 },
  { id: "9", nome: "Salada Caesar", preco: "R$ 22,90", precoNum: 22.9, categoria: "Salada", descricao: "Alface americana, croutons crocantes, parmesão e molho caesar cremoso. Leve e refrescante.", tempo: "10 min", avaliacao: 4.4 },
  { id: "10", nome: "Costela BBQ", preco: "R$ 54,90", precoNum: 54.9, categoria: "Grelhados", descricao: "Costela bovina defumada lentamente com molho barbecue artesanal. Acompanha farofa e mandioca frita.", tempo: "40 min", avaliacao: 4.9 },
  { id: "11", nome: "Brownie com Sorvete", preco: "R$ 18,90", precoNum: 18.9, categoria: "Sobremesa", descricao: "Brownie quente de chocolate meio amargo servido com uma bola de sorvete de baunilha e calda.", tempo: "8 min", avaliacao: 4.8 },
  { id: "12", nome: "Wrap de Frango", preco: "R$ 21,90", precoNum: 21.9, categoria: "Salada", descricao: "Tortilla recheada com frango grelhado, alface, tomate, queijo e molho de iogurte. Saudável e saboroso.", tempo: "15 min", avaliacao: 4.3 },
];

const categorias = ["Todos", "Pizza", "Burguer", "Massa", "Grelhados", "Salada", "Bebida", "Sobremesa"];

const categoryEmojis: Record<string, string> = {
  Todos: "🍽️", Pizza: "🍕", Burguer: "🍔", Massa: "🍝",
  Grelhados: "🥩", Salada: "🥗", Bebida: "🥤", Sobremesa: "🍨",
};

export default function Home() {
  const router = useRouter();
  const { nome } = useLocalSearchParams<{ nome: string }>();
  const { itens, adicionarItem, setNomeCliente } = useCarrinho();
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  useEffect(() => {
    if (nome) setNomeCliente(nome);
  }, [nome]);

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);

  const pratosFiltrados =
    categoriaAtiva === "Todos"
      ? pratos
      : pratos.filter((p) => p.categoria === categoriaAtiva);

  const primeiroNome = nome ? nome.split(" ")[0] : "visitante";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Botão voltar ao login */}
          <TouchableOpacity style={styles.voltarBtn} onPress={() => router.replace("/")}>
            <Text style={styles.voltarTexto}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Bem-vindo, {primeiroNome}! 👋</Text>
            <Text style={styles.titulo}>O que vai ser hoje?</Text>
          </View>
        </View>

        <View style={styles.headerBotoes}>
          <TouchableOpacity
            style={styles.historicoBtn}
            onPress={() => router.push("/pedidos")}
          >
            <Text style={styles.historicoBtnTexto}>📋</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.carrinhoBtn}
            onPress={() => router.push("/carrinho")}
          >
            <Text style={styles.carrinhoEmoji}>🛒</Text>
            {totalItens > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>{totalItens > 99 ? "99+" : totalItens}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtros compactos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtroScroll}
        contentContainerStyle={styles.filtroContainer}
      >
        {categorias.map((cat) => {
          const ativo = categoriaAtiva === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, ativo && styles.chipAtivo]}
              onPress={() => setCategoriaAtiva(cat)}
              activeOpacity={0.7}
            >
              <Text style={styles.chipEmoji}>{categoryEmojis[cat]}</Text>
              <Text style={[styles.chipTexto, ativo && styles.chipTextoAtivo]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Lista de pratos */}
      <FlatList
        data={pratosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: "/detalhes", params: { id: item.id } })}
            activeOpacity={0.85}
          >
            <View style={styles.imagemContainer}>
              {getImagemPrato(item.id)
                ? <Image source={getImagemPrato(item.id)!} style={styles.imagem} />
                : <Text style={styles.imagemEmoji}>{getEmojiFallback(item.id)}</Text>
              }
            </View>

            <View style={styles.info}>
              <View style={styles.topRow}>
                <View style={styles.categoriaTag}>
                  <Text style={styles.categoriaTexto}>{item.categoria}</Text>
                </View>
                <View style={styles.avaliacaoRow}>
                  <Text style={styles.estrela}>⭐</Text>
                  <Text style={styles.avaliacaoTexto}>{item.avaliacao}</Text>
                </View>
              </View>
              <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
              <View style={styles.bottomRow}>
                <Text style={styles.preco}>{item.preco}</Text>
                <View style={styles.tempoRow}>
                  <Text style={styles.relogio}>⏱️</Text>
                  <Text style={styles.tempo}>{item.tempo}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => adicionarItem({ id: item.id, nome: item.nome, preco: item.precoNum, imagem: imagensFallback[item.id] })}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.addBtnTexto}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>🍽️</Text>
            <Text style={styles.vazioTexto}>Nenhum prato nessa categoria</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111318" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },

  voltarBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#1E2028",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2D38",
  },
  voltarTexto: { color: "#FF6B35", fontSize: 18, fontWeight: "bold" },

  greeting: { fontSize: 12, color: "#888", marginBottom: 1, fontWeight: "500" },
  titulo: { fontSize: 18, fontWeight: "bold", color: "#fff" },

  headerBotoes: { flexDirection: "row", alignItems: "center", gap: 8 },
  historicoBtn: {
    width: 42,
    height: 42,
    backgroundColor: "#1E2028",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2D38",
  },
  historicoBtnTexto: { fontSize: 20 },
  carrinhoBtn: {
    width: 42,
    height: 42,
    backgroundColor: "#1E2028",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#2A2D38",
  },
  carrinhoEmoji: { fontSize: 20 },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF4757",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: "#111318",
  },
  badgeTexto: { color: "#fff", fontSize: 10, fontWeight: "bold" },

  // Filtros compactos — mesma altura dos chips da imagem 2
  filtroScroll: { marginBottom: 10 },
  filtroContainer: { paddingHorizontal: 16, gap: 6, flexDirection: "row", alignItems: "center" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#1E2028",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#2A2D38",
  },
  chipAtivo: { backgroundColor: "#FF6B35", borderColor: "#FF6B35" },
  chipEmoji: { fontSize: 12 },
  chipTexto: { fontSize: 12, color: "#888", fontWeight: "600" },
  chipTextoAtivo: { color: "#fff" },

  // Cards
  card: {
    backgroundColor: "#1E2028",
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2D38",
    padding: 10,
    gap: 10,
  },
  imagemContainer: { width: 80, height: 80, backgroundColor: "#2A2D38", borderRadius: 12, justifyContent: "center", alignItems: "center", flexShrink: 0 },
  imagem: { width: 64, height: 64 },
  imagemEmoji: { fontSize: 48 },
  info: { flex: 1, gap: 5 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  categoriaTag: { backgroundColor: "#FF6B3520", borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2 },
  categoriaTexto: { fontSize: 10, color: "#FF6B35", fontWeight: "700" },
  avaliacaoRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  estrela: { fontSize: 10 },
  avaliacaoTexto: { fontSize: 11, color: "#FFD700", fontWeight: "600" },
  nome: { fontSize: 14, fontWeight: "bold", color: "#fff", lineHeight: 19 },
  bottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  preco: { fontSize: 15, color: "#FF6B35", fontWeight: "bold" },
  tempoRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  relogio: { fontSize: 10 },
  tempo: { fontSize: 11, color: "#666", fontWeight: "500" },

  addBtn: { width: 34, height: 34, backgroundColor: "#FF6B35", borderRadius: 9, justifyContent: "center", alignItems: "center", flexShrink: 0 },
  addBtnTexto: { color: "#fff", fontSize: 20, fontWeight: "bold", lineHeight: 24 },

  vazio: { flex: 1, alignItems: "center", paddingTop: 60 },
  vazioEmoji: { fontSize: 48, marginBottom: 12 },
  vazioTexto: { color: "#555", fontSize: 16 },
});
