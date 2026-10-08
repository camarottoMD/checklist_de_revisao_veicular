# Checklist de Revisão Veicular

Protótipo front-end em Next.js de um sistema de checklist diário para uma frota de 10 veículos. O motorista faz a revisão antes de sair e o gestor acompanha o resultado em um painel.

Apenas front-end: os dados são mockados, sem API e sem banco.

## Como rodar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Telas

| Rota | Tela | O que faz |
|---|---|---|
| `/` | Garagem | Contadores de Aptos, Inaptos e Pendentes, busca por placa ou modelo em tempo real e um card por veículo com o botão "Iniciar Checklist". |
| `/checklist/[id]` | Formulário de Checklist | 12 itens em 3 seções (Documentação, Segurança, Operacional), observações e foto do hodômetro. Ao finalizar, salva o resultado e vai para o painel. |
| `/relatorios` | Painel do Gestor de Frota | KPIs, histórico de revisões do dia, gráfico dos itens que mais reprovam e botão "Exportar PDF". |

O Header tem a navegação entre as telas e o botão de Dark Mode.

## Regras de negócio

- **Status automático:** no checklist todos os itens começam marcados (OK). Desmarcar qualquer item muda o status do veículo para **Inapto**; com todos marcados o status é **Apto**.
- **Um checklist por veículo por dia:** refazer o checklist de um veículo substitui a revisão anterior dele no histórico.
- **Indicadores calculados:** contadores, KPIs e gráfico são derivados dos arrays de veículos e revisões, nada é fixo no código.
- **Gráfico:** o percentual de cada item é a participação dele no total de reprovações do dia.

## Persistência

O estado da frota fica em um Context (`context/FrotaContext.tsx`) e é gravado no `localStorage`, então o resultado de um checklist aparece nas outras telas e sobrevive a recarregar a página.

Para voltar aos dados originais do mock, apague a chave `frota-checklist-v1` do `localStorage` do navegador.

## Estrutura

```
app/
  layout.tsx                 Header e provider da frota
  page.tsx                   Tela 1 - Garagem
  checklist/[id]/page.tsx    Tela 2 - Formulário de Checklist
  relatorios/page.tsx        Tela 3 - Painel do Gestor
components/
  Header.tsx                 Barra superior
  NavLinks.tsx               Links de navegação com destaque da tela atual
  BotaoTema.tsx              Botão de Dark Mode
  CardVeiculo.tsx            Card de veículo da garagem
  CardContador.tsx           Card de número (contadores e KPIs)
  SeloStatus.tsx             Selo verde, vermelho ou amarelo
  FormularioChecklist.tsx    Formulário da Tela 2
  ItemChecklist.tsx          Linha de item com checkbox
  GraficoReprovacoes.tsx     Gráfico de barras feito com divs
context/
  FrotaContext.tsx           Estado global e persistência
data/
  mockVeiculos.js            Veículos e revisões mockados
  itensChecklist.ts          Seções e itens do checklist
types/
  index.ts                   Tipos compartilhados
```

## Tecnologias

Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 4. Nenhuma biblioteca de gráfico ou de estado.
