import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Login() {
  const [nome, setNome] = useState("");
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png" }}
            style={styles.logo}
          />
        </View>
        <Text style={styles.titulo}>FoodApp</Text>
        <Text style={styles.subtitulo}>Sabor na palma da mão</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Como podemos te chamar?</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome aqui..."
          placeholderTextColor="#444"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <View style={styles.botaoWrapper}>
          <Button
            title="Entrar no Cardápio"
            onPress={() => {
              if (nome.trim()) router.push({ pathname: "/home", params: { nome: nome.trim() } });
            }}
            disabled={!nome.trim()}
            color="#FF6B35"
          />
        </View>

        <Text style={styles.hint}>
          {nome.trim() ? `Olá, ${nome}! Bom apetite 🍽️` : "Digite seu nome para continuar"}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111318", justifyContent: "center", padding: 28 },
  header: { alignItems: "center", marginBottom: 52 },
  logoContainer: { width: 100, height: 100, backgroundColor: "#1E2028", borderRadius: 28, justifyContent: "center", alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: "#2A2D38" },
  logo: { width: 64, height: 64 },
  titulo: { fontSize: 38, fontWeight: "bold", color: "#FF6B35", marginBottom: 8 },
  subtitulo: { fontSize: 15, color: "#555" },
  form: { width: "100%" },
  label: { color: "#888", fontSize: 13, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 },
  input: { backgroundColor: "#1E2028", color: "#fff", borderRadius: 14, padding: 18, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: "#2A2D38" },
  botaoWrapper: { marginBottom: 14, borderRadius: 14, overflow: "hidden" },
  hint: { textAlign: "center", color: "#555", fontSize: 13 },
});
