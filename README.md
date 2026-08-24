# Educador Financeiro

Projeto desenvolvido como parte do desafio proposto no bootcamp da DIO, inspirado no PlanejAI. Confira o [repositório de referência no GitHub](https://github.com/digitalinnovationone/planejai).

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Lucide React
- React Loading Skeleton
- Google Gemini API
- ESLint e Prettier

## Como instalar

### Pré-requisitos

- Node.js 20 ou superior
- npm
- Uma chave de API do Google Gemini

### Instalação

1. Clone o repositório e entre na pasta do projeto:

```bash
git clone <url-do-repositorio>
cd educador-financeiro-dio
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua-chave-da-api
```

4. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O endereço local será exibido no terminal, normalmente `http://localhost:5173`.

## Scripts

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Executa o typecheck e gera o build de produção
npm run lint         # Analisa o código com ESLint
npm run lint:fix     # Corrige problemas automaticamente
npm run format       # Formata os arquivos com Prettier
npm run format:check # Verifica a formatação
npm run preview      # Serve o build de produção localmente
```

## Funcionalidades

### Simulação financeira

- Cadastro de renda, custos fixos, dívidas e objetivo financeiro.
- Cálculo da economia mensal necessária.
- Geração de insights financeiros personalizados com a API do Google Gemini.
- Persistência das simulações no `localStorage`.
- Tema claro e escuro.

### Desafio 1: Página de Histórico de Simulações

- Exibição de um resumo para cada simulação salva.
- Layout responsivo seguindo o protótipo.
- Exclusão de simulações do histórico.
- Navegação para a página de resultados pelo botão **Ver detalhes**.
- Exibição dos insights já gerados na página de resultados.

### Desafio 2: Conversando com o Educador Financeiro

- Campo de texto dentro do componente `AIInsightCard`.
- Envio de perguntas sobre a simulação realizada.
- Respostas claras da IA apresentadas na interface.
- Rolagem automática quando uma nova resposta é recebida.
- Feedback visual durante o carregamento e em caso de erro.
- Quantidade ilimitada de perguntas por simulação.
- Exibição de todo o histórico de perguntas e respostas.
- Persistência das conversas no `localStorage` para consulta posterior.

## Estrutura principal

```text
src/
├── components/  # Componentes de interface e funcionalidades
├── context/     # Contextos globais, como tema
├── data/        # Tipos e dados das simulações
├── hooks/       # Hooks de armazenamento e integração com IA
├── pages/       # Páginas da aplicação
├── services/    # Comunicação com serviços externos
└── utils/       # Funções utilitárias e cálculos
```
