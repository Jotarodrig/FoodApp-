import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";
import { getEmojiFallback, getImagemPrato, pratos } from "./home";

export default function Detalhes() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { adicionarItem } = useCarrinho();

  const prato = pratos.find((p) => p.id === id);

  if (!prato) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Prato não encontrado.</Text>
      </View>
    );
  }

  function handleAdicionarCarrinho() {
    adicionarItem({ id: prato!.id, nome: prato!.nome, preco: prato!.precoNum, imagem: String(id) });
    router.push("/carrinho");
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      {/* Imagem hero */}
      <View style={styles.imagemContainer}>
        {getImagemPrato(prato.id)
          ? <Image source={getImagemPrato(prato.id)!} style={styles.imagem} />
          : <Text style={styles.imagemEmoji}>{getEmojiFallback(prato.id)}</Text>
        }
      </View>

      <View style={styles.conteudo}>
        {/* Tags de info */}
        <View style={styles.tagsRow}>
          <View style={styles.categoriaTag}>
            <Text style={styles.categoriaTexto}>{prato.categoria}</Text>
          </View>
          <View style={styles.infoChip}>
            <Text style={styles.infoChipTexto}>⭐ {prato.avaliacao}</Text>
          </View>
          <View style={styles.infoChip}>
            <Text style={styles.infoChipTexto}>⏱️ {prato.tempo}</Text>
          </View>
        </View>

        <Text style={styles.nome}>{prato.nome}</Text>
        <Text style={styles.preco}>{prato.preco}</Text>
        
        <View style={styles.divisor} />

        <Text style={styles.descricaoLabel}>Sobre o prato</Text>
        <Text style={styles.descricao}>{prato.descricao}</Text>

        <TouchableOpacity style={styles.botao} onPress={handleAdicionarCarrinho}>
          <Text style={styles.botaoTexto}>🛒  Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111318" },
  voltarBtn: { padding: 20, marginTop: 40 },
  voltarTexto: { color: "#FF6B35", fontSize: 16, fontWeight: "600" },
  imagemContainer: {
    marginHorizontal: 20,
    height: 220,
    backgroundColor: "#1E2028",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2D38",
  },
  imagem: { width: 180, height: 180, resizeMode: "contain" },
  imagemEmoji: { fontSize: 120 },
  conteudo: { padding: 24 },
  tagsRow: { flexDirection: "row", gap: 8, marginBottom: 16, flexWrap: "wrap" },
  categoriaTag: { backgroundColor: "#FF6B3525", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  categoriaTexto: { fontSize: 12, color: "#FF6B35", fontWeight: "700", textTransform: "uppercase" },
  infoChip: { backgroundColor: "#1E2028", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: "#2A2D38" },
  infoChipTexto: { fontSize: 12, color: "#aaa", fontWeight: "600" },
  nome: { fontSize: 26, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  preco: { fontSize: 24, color: "#FF6B35", fontWeight: "bold", marginBottom: 20 },
  divisor: { height: 1, backgroundColor: "#2A2D38", marginBottom: 20 },
  descricaoLabel: { fontSize: 13, color: "#666", fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 },
  descricao: { fontSize: 15, color: "#999", lineHeight: 24, marginBottom: 36 },
  botao: { backgroundColor: "#FF6B35", borderRadius: 16, padding: 18, alignItems: "center" },
  botaoTexto: { color: "#fff", fontSize: 17, fontWeight: "bold" },
});
