import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";

function gerarNumeroPedido() {
  return "#" + Math.floor(10000 + Math.random() * 90000);
}

export default function Confirmacao() {
  const router = useRouter();
  const { itens, total, limparCarrinho, salvarPedido } = useCarrinho();
  const numeroPedido = gerarNumeroPedido();
  const salvou = useRef(false);

  useEffect(() => {
    if (salvou.current || itens.length === 0) return;
    salvou.current = true;
    salvarPedido();
  }, []);

  function handleVoltar() {
    limparCarrinho();
    router.push("/home");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Ícone de sucesso */}
      <View style={styles.successCircle}>
        <Text style={styles.successEmoji}>✅</Text>
      </View>

      <Text style={styles.titulo}>Pedido Confirmado!</Text>
      <Text style={styles.subtitulo}>
        Seu pedido foi recebido e já está sendo preparado com carinho. 🍳
      </Text>

      {/* Número do pedido */}
      <View style={styles.numeroPedidoBox}>
        <Text style={styles.numeroPedidoLabel}>Número do pedido</Text>
        <Text style={styles.numeroPedido}>{numeroPedido}</Text>
      </View>

      {/* Infos de entrega */}
      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>⏱️</Text>
          <Text style={styles.infoLabel}>Estimativa</Text>
          <Text style={styles.infoValor}>30–45 min</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>🛵</Text>
          <Text style={styles.infoLabel}>Entrega</Text>
          <Text style={styles.infoValor}>Grátis</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>💳</Text>
          <Text style={styles.infoLabel}>Pagamento</Text>
          <Text style={styles.infoValor}>Na entrega</Text>
        </View>
      </View>

      {/* Resumo dos itens */}
      {itens.length > 0 && (
        <View style={styles.resumoBox}>
          <Text style={styles.resumoTitulo}>Resumo do pedido</Text>

          {itens.map((item) => (
            <View key={item.id} style={styles.resumoItem}>
              <Image source={{ uri: item.imagem }} style={styles.resumoImagem} />
              <View style={styles.resumoInfo}>
                <Text style={styles.resumoNome} numberOfLines={1}>{item.nome}</Text>
                <Text style={styles.resumoQtd}>x{item.quantidade}</Text>
              </View>
              <Text style={styles.resumoPreco}>
                R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
              </Text>
            </View>
          ))}

          <View style={styles.resumoDivisor} />

          <View style={styles.resumoTotalRow}>
            <Text style={styles.resumoTotalLabel}>Total pago</Text>
            <Text style={styles.resumoTotalValor}>
              R$ {total.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.botao} onPress={handleVoltar}>
        <Text style={styles.botaoTexto}>Voltar ao Cardápio →</Text>
      </TouchableOpacity>

      <Text style={styles.rodapeTexto}>Obrigado pela preferência! 🙌</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111318" },
  content: { padding: 24, paddingTop: 60, paddingBottom: 48, alignItems: "center" },

  successCircle: { width: 90, height: 90, backgroundColor: "#1E2028", borderRadius: 45, justifyContent: "center", alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: "#2A2D38" },
  successEmoji: { fontSize: 44 },

  titulo: { fontSize: 26, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 10 },
  subtitulo: { fontSize: 14, color: "#888", textAlign: "center", lineHeight: 22, marginBottom: 24, paddingHorizontal: 8 },

  numeroPedidoBox: { backgroundColor: "#FF6B3515", borderRadius: 14, paddingVertical: 12, paddingHorizontal: 28, marginBottom: 24, borderWidth: 1, borderColor: "#FF6B3530", alignItems: "center" },
  numeroPedidoLabel: { fontSize: 11, color: "#FF6B35", fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 },
  numeroPedido: { fontSize: 24, color: "#FF6B35", fontWeight: "bold" },

  infoRow: { flexDirection: "row", gap: 10, marginBottom: 24, width: "100%" },
  infoCard: { flex: 1, backgroundColor: "#1E2028", borderRadius: 14, padding: 14, alignItems: "center", borderWidth: 1, borderColor: "#2A2D38" },
  infoEmoji: { fontSize: 22, marginBottom: 6 },
  infoLabel: { fontSize: 11, color: "#666", marginBottom: 4, fontWeight: "500" },
  infoValor: { fontSize: 13, color: "#fff", fontWeight: "bold", textAlign: "center" },

  resumoBox: { backgroundColor: "#1E2028", borderRadius: 18, padding: 16, width: "100%", marginBottom: 24, borderWidth: 1, borderColor: "#2A2D38" },
  resumoTitulo: { fontSize: 14, color: "#888", fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 14 },
  resumoItem: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  resumoImagem: { width: 40, height: 40, borderRadius: 8, backgroundColor: "#2A2D38" },
  resumoInfo: { flex: 1 },
  resumoNome: { color: "#fff", fontSize: 13, fontWeight: "600" },
  resumoQtd: { color: "#666", fontSize: 12 },
  resumoPreco: { color: "#FF6B35", fontSize: 13, fontWeight: "bold" },
  resumoDivisor: { height: 1, backgroundColor: "#2A2D38", marginVertical: 12 },
  resumoTotalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  resumoTotalLabel: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  resumoTotalValor: { color: "#FF6B35", fontSize: 18, fontWeight: "bold" },

  botao: { backgroundColor: "#FF6B35", borderRadius: 16, padding: 18, width: "100%", alignItems: "center", marginBottom: 16 },
  botaoTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  rodapeTexto: { color: "#444", fontSize: 13 },
});
