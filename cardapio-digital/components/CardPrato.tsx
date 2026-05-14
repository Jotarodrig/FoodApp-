import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  id: string;
  nome: string;
  preco: string;
  categoria: string;
  imagem: string;
  onPress: () => void;
};

export default function CardPrato({
  nome,
  preco,
  categoria,
  imagem,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.categoria}>{categoria}</Text>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.preco}>{preco}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#2C2C2E",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  imagem: { width: 100, height: 100 },
  info: { flex: 1, padding: 12, justifyContent: "center" },
  categoria: {
    fontSize: 12,
    color: "#FF6B35",
    fontWeight: "600",
    marginBottom: 4,
  },
  nome: { fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 6 },
  preco: { fontSize: 16, color: "#FFD700", fontWeight: "bold" },
});
