# LingoPulse — MVP pedagógico 0.2.4

Protótipo web modular em HTML, CSS e JavaScript puro, sem dependências de runtime. Interface responsiva para celular e desktop.

## Executar

O projeto usa módulos JavaScript. Não abra `index.html` diretamente: navegadores bloqueiam os imports de módulos em `file://`.

No Windows, dê dois cliques em `run-lingopulse.bat`. É necessário ter Python 3 instalado. O navegador abrirá automaticamente; deixe a janela do servidor aberta enquanto joga e pressione Ctrl+C nela para encerrar.

Em qualquer sistema com Python 3, você também pode iniciar o servidor manualmente:

```bash
python3 serve.py
```

Também é possível publicar a pasta em qualquer hospedagem estática HTTPS.

## Testes automatizados

Requer Node.js 20 ou superior:

```bash
npm test
```

Os testes cobrem validação de resposta, conteúdo dos cinco idiomas, etapas pedagógicas, avanço automático da prática, seletores da interface, energia, persistência e revisão espaçada.

## O que está implementado

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

## Testes

Requer Node.js 20 ou superior. Execute `npm test`. A suíte cobre regras do puzzle, conteúdo e idiomas, presença/ordem das etapas da interface, consistência dos seletores, energia, persistência, agendamento e histórico de revisão.

## Limitações conhecidas

- O salvamento local fica no navegador/dispositivo e não sincroniza entre aparelhos.
- A recarga de energia e o agendamento de revisão usam o relógio do dispositivo; sem backend, podem ser manipulados.
- O conteúdo didático usa explicações simples e dicionário de apoio por palavra; ainda precisa de revisão linguística profissional, especialmente para as partículas e a naturalidade do japonês.
- A voz depende das vozes instaladas no navegador/sistema e pode não existir em todos os dispositivos.
- A revisão espaçada é local e baseada em intervalos simples, não em um algoritmo adaptativo avançado.
- A interação principal é por toque/clique; arrastar e soltar depende do suporte do navegador.
- Não há contas, sincronização em nuvem, reconhecimento de pronúncia, anúncios ou compras reais.



## Estrutura

```text
index.html
css/styles.css
js/app.js
js/game-logic.js
js/phrases.js
js/speech.js
tests/game-logic.test.js
package.json
```
