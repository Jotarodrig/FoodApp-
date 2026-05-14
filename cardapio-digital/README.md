# 🍕 FoodApp — Cardápio Digital

Aplicativo móvel de cardápio digital desenvolvido em React Native com Expo, permitindo que usuários visualizem pratos, adicionem ao carrinho e finalizem pedidos de forma simples e intuitiva.

---

## 👥 Integrantes do Grupo

| Aluno | Componente Desenvolvido |
|---|---|
| **Leonardo** | Tela de Login (`index.tsx`) — TextInput, Button, Image, validação de entrada e navegação inicial |
| **Ramons** | Tela Principal / Cardápio (`home.tsx`) — FlatList, filtros por categoria, cards de pratos com Flexbox |
| **Emanuel** | Tela de Detalhes (`detalhes.tsx`) e Tela de Carrinho (`carrinho.tsx`) — navegação entre telas, controle de quantidade |
| **João Pedro** | Tela de Confirmação (`confirmacao.tsx`) — resumo do pedido, geração de número, integração com contexto global |
| **José** | Tela de Histórico (`pedidos.tsx`) e Contexto Global (`CarrinhoContext.tsx`) — gerenciamento de estado com Context API |

---

## 📱 Telas do Aplicativo

### 1. Tela de Login
- Entrada do nome do usuário
- Validação: botão só ativa quando o nome é preenchido
- Componentes: `TextInput`, `Button`, `Image`, `KeyboardAvoidingView`

### 2. Tela Principal (Cardápio)
- Listagem de todos os pratos disponíveis
- Filtros por categoria (Pizza, Burguer, Massa, Grelhados, Salada, Bebida, Sobremesa)
- Botão de adicionar ao carrinho em cada item
- Acesso ao carrinho e ao histórico de pedidos
- Componentes: `FlatList`, `ScrollView`, `Image`, `TouchableOpacity`

### 3. Tela de Detalhes
- Exibe imagem, descrição, avaliação e tempo estimado do prato
- Botão para adicionar diretamente ao carrinho
- Componentes: `ScrollView`, `Image`, `TouchableOpacity`

### 4. Tela de Carrinho
- Lista os itens adicionados com controle de quantidade (+/−)
- Exibe subtotal, taxa de entrega (grátis) e total
- Botão para finalizar pedido
- Componentes: `FlatList`, `Image`, `TouchableOpacity`

### 5. Tela de Confirmação
- Exibe número do pedido gerado
- Mostra estimativa de entrega, forma de pagamento e resumo dos itens
- Salva o pedido no histórico local
- Componentes: `ScrollView`, `Image`, `View`

### 6. Tela de Histórico
- Lista todos os pedidos realizados na sessão
- Exibe nome do cliente, data/hora, itens e valor total
- Componentes: `FlatList`, `TouchableOpacity`

---

## 🛠️ Requisitos do React Native Utilizados

| Componente | Onde é usado |
|---|---|
| `View` | Todas as telas — estrutura de layout |
| `Text` | Todas as telas — títulos, descrições, preços |
| `TextInput` | Tela de Login — entrada do nome |
| `Button` | Tela de Login — botão "Entrar no Cardápio" |
| `FlatList` | Home, Carrinho, Histórico — listas roláveis |
| `Image` | Login, Home, Detalhes, Carrinho, Confirmação |
| **Flexbox** | Todos os layouts com `StyleSheet` e `flex` |
| **Navegação** | Expo Router com 6 telas distintas |

---

## 🚀 Como Instalar e Rodar

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

```bash
npm install -g expo-cli
```

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/cardapio-digital.git

# 2. Entre na pasta do projeto
cd cardapio-digital

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npx expo start
```

### Visualizar o app

- **No celular:** Instale o app [Expo Go](https://expo.dev/client) e escaneie o QR Code
- **No navegador:** Pressione `W` no terminal para abrir no Expo Web
- **No emulador Android:** Pressione `A` no terminal
- **No simulador iOS:** Pressione `I` no terminal (apenas macOS)

---

## 📂 Estrutura do Projeto

```
cardapio-digital/
├── app/
│   ├── _layout.tsx          # Layout raiz (provider do contexto)
│   ├── index.tsx            # Tela de Login
│   ├── home.tsx             # Tela Principal / Cardápio
│   ├── detalhes.tsx         # Tela de Detalhes do Prato
│   ├── carrinho.tsx         # Tela do Carrinho
│   ├── confirmacao.tsx      # Tela de Confirmação do Pedido
│   └── pedidos.tsx          # Tela de Histórico de Pedidos
├── components/
│   └── CardPrato.tsx        # Componente reutilizável de card
├── context/
│   └── CarrinhoContext.tsx  # Gerenciamento de estado global
├── assets/
│   └── images/              # Imagens e ícones do app
└── README.md
```

---

## 🖼️ Prints das Telas

| Login | Cardápio | Detalhes |
|---|---|---|
| Tela inicial com entrada de nome | Lista de pratos com filtros | Informações detalhadas do prato |

| Carrinho | Confirmação | Histórico |
|---|---|---|
| Itens com controle de quantidade | Resumo e número do pedido | Pedidos realizados na sessão |

---

## 🎨 Tecnologias Utilizadas

- **React Native** — Framework principal
- **Expo** — Plataforma de desenvolvimento
- **Expo Router** — Navegação entre telas
- **TypeScript** — Tipagem estática
- **Context API** — Gerenciamento de estado global

---

## 👨‍🏫 Informações Acadêmicas

- **Disciplina:** Desenvolvimento para Dispositivos Móveis / Programação Mobile Coding
- **Período:** 3º Período
- **Professor:** Igor Revoredo
- **Avaliação:** AV2 — Trabalho Final
