# LingoPulse — MVP pedagógico 0.2.5

Protótipo web modular em HTML, CSS e JavaScript puro. O projeto agora inclui servidor local em Node.js e configuração para publicar os arquivos estáticos na Vercel.

## Executar localmente com Node.js

Requer Node.js 20 ou superior. Não é necessário instalar dependências:

```bash
npm start
```

Abra `http://127.0.0.1:3000/` no navegador. Para desenvolvimento, `npm run dev` inicia o mesmo servidor. O servidor fica restrito a `127.0.0.1` por padrão.

No Windows, `run-lingopulse.bat` usa Node.js quando disponível e mantém o servidor Python como alternativa.

## Publicar na Vercel

O `vercel.json` seleciona a opção sem framework, executa `npm run build` e publica a pasta `dist`. Não é necessário configurar variáveis de ambiente.

### Via GitHub

1. Na Vercel, crie um projeto e importe `KenedyDesenvolvedor/lingopulse-mvp`.
2. Use a raiz do repositório como diretório do projeto; as configurações de build e saída já estão no `vercel.json`.
3. Clique em **Deploy**. Depois, novos commits na branch conectada geram novas publicações.

### Via CLI

Instale o CLI oficial da Vercel e autentique sua conta:

```bash
npm install --global vercel
vercel login
```

Depois, no diretório do projeto:

```bash
npm run deploy:preview
npm run deploy:production
```

O primeiro comando publica uma prévia; o segundo publica em produção. A configuração segue o [guia oficial de builds estáticos da Vercel](https://vercel.com/docs/builds) e o [formato oficial de `vercel.json`](https://vercel.com/docs/project-configuration/vercel-json).

## Testes automatizados

```bash
npm test
```

Os testes cobrem validação de resposta, conteúdo dos cinco idiomas, etapas pedagógicas, avanço automático da prática, seletores da interface, energia, persistência e revisão espaçada.

## Fluxo e recursos

- Fluxo por expressão: aprender → praticar com ajuda → WordPuzzle → revisar erros → avançar.
- Tela de ensino com expressão, tradução, divisão por palavras/partes, dicas e contexto de uso.
- Pronúncia opcional via Web Speech API (`speechSynthesis`) com fallback textual acessível.
- Prática guiada com alternativas e dicas, sem consumir energia.
- Após acertar a prática, o WordPuzzle abre automaticamente após 2,5 segundos; o botão permite avançar imediatamente.
- WordPuzzle com dez desafios para inglês, espanhol, francês, japonês e russo.
- Tema visual completo muda automaticamente com o idioma: Londres em azul-marinho e cruzes britânicas; Madri em terracota, sol e azulejos; Paris em tricolor e tons de avenida; Tóquio em papel, sol vermelho e ondas; Moscou em azul-gelo, neve e tricolor.
- Seleção por toque/clique e arrastar e soltar; as peças escolhidas podem ser removidas.
- Feedback explicativo após respostas incorretas e revisão da resposta após cada puzzle.
- XP e LingoCoins na primeira conclusão de cada expressão; energia só é consumida por tentativas erradas no puzzle.
- Revisão espaçada: erros recebem prazo de revisão (1 minuto na primeira ocorrência, 10 minutos após repetição); ao revisar, o próximo intervalo aumenta.
- Progresso, idioma, energia, lições concluídas, erros e histórico de revisão salvos localmente.
- Interface responsiva, foco visível, regiões `aria-live`, botões de teclado e suporte a `prefers-reduced-motion`.

## Limitações conhecidas

- O salvamento local fica no navegador/dispositivo e não sincroniza entre aparelhos.
- A recarga de energia e o agendamento de revisão usam o relógio do dispositivo; sem backend, podem ser manipulados.
- O conteúdo didático usa explicações simples e dicionário de apoio por palavra; ainda precisa de revisão linguística profissional, especialmente para as partículas e a naturalidade do japonês.
- A voz depende das vozes instaladas no navegador/sistema e pode não existir em todos os dispositivos.
- A revisão espaçada é local e baseada em intervalos simples, não em um algoritmo adaptativo avançado.
- A interação principal é por toque/clique; arrastar e soltar depende do suporte do navegador.
- Não há contas, sincronização em nuvem, reconhecimento de pronúncia, anúncios ou compras reais.
