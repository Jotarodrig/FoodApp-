import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";

export default function Pedidos() {
  const router = useRouter();
  const { historico } = useCarrinho();

  function formatarData(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Histórico</Text>
        <View style={{ width: 32 }} />
      </View>

      {historico.length === 0 ? (
        <View style={styles.centro}>
          <Text style={styles.vazioEmoji}>📋</Text>
          <Text style={styles.vazioTitulo}>Nenhum pedido ainda</Text>
          <Text style={styles.vazioSubtitulo}>Os pedidos finalizados aparecerão aqui</Text>
        </View>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardNome}>{item.nome_cliente}</Text>
                  <Text style={styles.cardData}>{formatarData(item.created_at)}</Text>
                </View>
                <View style={styles.totalBox}>
                  <Text style={styles.totalTexto}>
                    R$ {item.total.toFixed(2).replace(".", ",")}
                  </Text>
                </View>
              </View>

              <View style={styles.divisor} />

              {item.itens.map((it, i) => (
                <View key={i} style={styles.itemRow}>
                  <Text style={styles.itemNome} numberOfLines={1}>{it.nome}</Text>
                  <Text style={styles.itemQtd}>x{it.quantidade}</Text>
                  <Text style={styles.itemPreco}>
                    R$ {(it.preco * it.quantidade).toFixed(2).replace(".", ",")}
                  </Text>
                </View>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111318" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },
  voltar: { color: "#FF6B35", fontSize: 16, fontWeight: "600" },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  vazioEmoji: { fontSize: 56, marginBottom: 16 },
  vazioTitulo: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  vazioSubtitulo: { fontSize: 14, color: "#666", textAlign: "center" },
  card: {
    backgroundColor: "#1E2028",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2A2D38",
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  cardNome: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 2 },
  cardData: { color: "#555", fontSize: 12 },
  totalBox: { backgroundColor: "#FF6B3515", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: "#FF6B3530" },
  totalTexto: { color: "#FF6B35", fontSize: 15, fontWeight: "bold" },
  divisor: { height: 1, backgroundColor: "#2A2D38", marginBottom: 12 },
  itemRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  itemNome: { flex: 1, color: "#aaa", fontSize: 13 },
  itemQtd: { color: "#666", fontSize: 13, marginHorizontal: 8 },
  itemPreco: { color: "#FF6B35", fontSize: 13, fontWeight: "600" },
});
