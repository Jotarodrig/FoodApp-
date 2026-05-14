import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";

export default function Carrinho() {
  const router = useRouter();
  const { itens, adicionarItem, removerItem, total } = useCarrinho();
  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Carrinho</Text>
        {totalItens > 0 && (
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeTexto}>{totalItens} {totalItens === 1 ? "item" : "itens"}</Text>
          </View>
        )}
      </View>

      {itens.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioEmoji}>🛒</Text>
          <Text style={styles.vazioTitulo}>Carrinho vazio</Text>
          <Text style={styles.vazioSubtitulo}>Adicione itens do cardápio para começar</Text>
          <TouchableOpacity style={styles.vazioBtn} onPress={() => router.push("/home")}>
            <Text style={styles.vazioBtnTexto}>Ver cardápio →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={itens}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.imagemContainer}>
                  <Image source={{ uri: item.imagem }} style={styles.imagem} />
                </View>

                <View style={styles.info}>
                  <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
                  <Text style={styles.precoUni}>
                    R$ {item.preco.toFixed(2).replace(".", ",")} cada
                  </Text>
                  <Text style={styles.precoTotal}>
                    R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
                  </Text>
                </View>

                <View style={styles.controles}>
                  <TouchableOpacity style={styles.btn} onPress={() => removerItem(item.id)}>
                    <Text style={styles.btnTexto}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantidade}>{item.quantidade}</Text>
                  <TouchableOpacity
                    style={[styles.btn, styles.btnAdd]}
                    onPress={() => adicionarItem({ id: item.id, nome: item.nome, preco: item.preco, imagem: item.imagem })}
                  >
                    <Text style={[styles.btnTexto, { color: "#fff" }]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.rodape}>
            {/* Resumo */}
            <View style={styles.resumoBox}>
              <View style={styles.resumoLinha}>
                <Text style={styles.resumoLabel}>Subtotal</Text>
                <Text style={styles.resumoValor}>R$ {total.toFixed(2).replace(".", ",")}</Text>
              </View>
              <View style={styles.resumoLinha}>
                <Text style={styles.resumoLabel}>Taxa de entrega</Text>
                <Text style={styles.resumoGratis}>Grátis</Text>
              </View>
              <View style={[styles.resumoLinha, styles.resumoTotalLinha]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValor}>R$ {total.toFixed(2).replace(".", ",")}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => router.push("/confirmacao")}
            >
              <Text style={styles.botaoTexto}>Finalizar Pedido →</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111318" },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 20, paddingTop: 56, paddingBottom: 20 },
  voltar: { color: "#FF6B35", fontSize: 16, fontWeight: "600" },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#fff", flex: 1 },
  headerBadge: { backgroundColor: "#FF6B3525", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  headerBadgeTexto: { color: "#FF6B35", fontSize: 12, fontWeight: "700" },

  vazio: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  vazioEmoji: { fontSize: 64, marginBottom: 16 },
  vazioTitulo: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  vazioSubtitulo: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 28 },
  vazioBtn: { backgroundColor: "#FF6B35", borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14 },
  vazioBtnTexto: { color: "#fff", fontSize: 15, fontWeight: "bold" },

  card: { backgroundColor: "#1E2028", borderRadius: 18, marginBottom: 12, padding: 12, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "#2A2D38" },
  imagemContainer: { width: 72, height: 72, backgroundColor: "#2A2D38", borderRadius: 12, justifyContent: "center", alignItems: "center", flexShrink: 0 },
  imagem: { width: 56, height: 56 },
  info: { flex: 1 },
  nome: { color: "#fff", fontSize: 14, fontWeight: "bold", marginBottom: 3, lineHeight: 19 },
  precoUni: { color: "#555", fontSize: 12, marginBottom: 2 },
  precoTotal: { color: "#FF6B35", fontSize: 15, fontWeight: "bold" },
  controles: { flexDirection: "column", alignItems: "center", gap: 6 },
  btn: { backgroundColor: "#2A2D38", borderRadius: 8, width: 30, height: 30, justifyContent: "center", alignItems: "center" },
  btnAdd: { backgroundColor: "#FF6B35" },
  btnTexto: { color: "#FF6B35", fontSize: 18, fontWeight: "bold" },
  quantidade: { color: "#fff", fontSize: 15, fontWeight: "bold", minWidth: 20, textAlign: "center" },

  rodape: { borderTopWidth: 1, borderTopColor: "#2A2D38", padding: 20, paddingBottom: 36 },
  resumoBox: { backgroundColor: "#1E2028", borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#2A2D38" },
  resumoLinha: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  resumoLabel: { color: "#888", fontSize: 14 },
  resumoValor: { color: "#fff", fontSize: 14, fontWeight: "600" },
  resumoGratis: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
  resumoTotalLinha: { borderTopWidth: 1, borderTopColor: "#2A2D38", paddingTop: 10, marginBottom: 0 },
  totalLabel: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  totalValor: { color: "#FF6B35", fontSize: 20, fontWeight: "bold" },

  botao: { backgroundColor: "#FF6B35", borderRadius: 16, padding: 18, alignItems: "center" },
  botaoTexto: { color: "#fff", fontSize: 17, fontWeight: "bold" },
});
