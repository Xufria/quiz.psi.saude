// ========== VARIÁVEIS GLOBAIS ==========
let questaoAtual = 0;
let pontuacao = 0;
let respostasCorretas = [];
let estrategiasAprendidas = [];

// ========== ELEMENTOS DOM ==========
const elementos = {
    telaInicial: document.getElementById('tela-inicial'),
    telaQuestionario: document.getElementById('tela-questionario'),
    telaResultados: document.getElementById('tela-resultados'),
    textoPergunta: document.getElementById('texto-pergunta'),
    containerOpcoes: document.getElementById('container-opcoes'),
    explicacaoResposta: document.getElementById('explicacao-resposta'),
    textoExplicacao: document.getElementById('texto-explicacao'),
    referenciaTeorica: document.getElementById('referencia-teorica'),
    botaoProximo: document.getElementById('botao-proximo'),
    barraProgresso: document.getElementById('barra-progresso'),
    textoProgresso: document.getElementById('texto-progresso'),
    percentagemProgresso: document.getElementById('percentagem-progresso'),
    pontuacaoFinal: document.getElementById('pontuacao-final'),
    mensagemResultado: document.getElementById('mensagem-resultado'),
    percentagemAcertos: document.getElementById('percentagem-acertos'),
    questoesCorretas: document.getElementById('questoes-corretas'),
    estrategiasIdentificadas: document.getElementById('estrategias-identificadas'),
    listaEstrategias: document.getElementById('lista-estrategias'),
    botaoIniciar: document.getElementById('botao-iniciar'),
    botaoReiniciar: document.getElementById('botao-reiniciar'),
    botaoVoltarInicio: document.getElementById('botao-voltar-inicio'),
    botaoRealizarNovamente: document.getElementById('botao-realizar-novamente')
};

// ========== FUNÇÕES PRINCIPAIS ==========

// Inicializar o questionário
// ========== FUNÇÕES DE COMPARTILHAMENTO PARA MOBILE ==========

// Detectar se está em mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Mostrar/esconder modal de compartilhamento
function mostrarModalCompartilhamento() {
    const modal = document.getElementById('modal-compartilhamento');
    modal.classList.add('ativo');
    
    // Se estiver em mobile e tiver pontuação, criar mensagem personalizada
    const mensagem = pontuacao > 0 
        ? `Consegui ${pontuacao}/10 no Quiz de Coping no Envelhecimento! 🧠 Testa os teus conhecimentos: `
        : 'Testa os teus conhecimentos sobre coping no envelhecimento neste quiz interativo! 🧠 ';
    
    // Atualizar link com mensagem para WhatsApp
    const link = window.location.href;
    const mensagemWhatsApp = encodeURIComponent(mensagem + link);
    document.getElementById('botao-whatsapp').onclick = () => {
        window.open(`https://wa.me/?text=${mensagemWhatsApp}`, '_blank');
    };
    
    // Criar QR Code simples (versão alternativa sem biblioteca)
    atualizarQRCodeSimples(link);
}

function esconderModalCompartilhamento() {
    const modal = document.getElementById('modal-compartilhamento');
    modal.classList.remove('ativo');
}

// Copiar link para clipboard
function copiarLink() {
    const link = window.location.href;
    
    // Método moderno usando Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(() => {
            alert('✅ Link copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            copiarLinkFallback(link);
        });
    } else {
        copiarLinkFallback(link);
    }
}

// Método alternativo para copiar link
function copiarLinkFallback(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        const successful = document.execCommand('copy');
        const msg = successful ? '✅ Link copiado!' : '❌ Não foi possível copiar';
        alert(msg);
    } catch (err) {
        alert('❌ Erro ao copiar link: ' + err);
    }
    
    document.body.removeChild(textarea);
}

// Gerar QR Code simples (alternativa sem biblioteca)
function atualizarQRCodeSimples(link) {
    const qrContainer = document.getElementById('qr-code-placeholder');
    
    // Se tiver a biblioteca QRCode.js, usa-a
    if (typeof QRCode !== 'undefined') {
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: link,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        // Alternativa: mostrar link para gerar QR code online
        qrContainer.innerHTML = `
            <div style="text-align: center; padding: 10px;">
                <div style="font-size: 48px; margin-bottom: 10px;">📲</div>
                <div style="margin-bottom: 10px; color: var(--azul-profundo); font-weight: bold;">
                    ${isMobile() ? 'Toque para abrir' : 'Clique para abrir'}
                </div>
                <div style="background: var(--cinza-claro); padding: 15px; border-radius: 8px; word-break: break-all; font-size: 14px;">
                    ${link}
                </div>
                <div style="margin-top: 15px; font-size: 14px; color: var(--cinza-escuro);">
                    Partilha este link no teu telemóvel!
                </div>
            </div>
        `;
        
        // Tornar clicável em mobile
        qrContainer.style.cursor = 'pointer';
        qrContainer.onclick = () => {
            window.open(link, '_blank');
        };
    }
}

// Mostrar botão de compartilhamento se estiver em mobile
function verificarEmostrarBotaoCompartilhamento() {
    if (isMobile()) {
        const botaoCompartilhar = document.getElementById('botao-compartilhar');
        if (botaoCompartilhar) {
            botaoCompartilhar.style.display = 'inline-block';
        }
    }
}

// ========== ATUALIZAR A FUNÇÃO INICIALIZAR ==========
function inicializar() {
    // Adicionar event listeners existentes
    elementos.botaoIniciar.addEventListener('click', iniciarQuestionario);
    elementos.botaoReiniciar.addEventListener('click', reiniciarQuestionario);
    elementos.botaoVoltarInicio.addEventListener('click', voltarInicio);
    elementos.botaoRealizarNovamente.addEventListener('click', reiniciarQuestionario);
    elementos.botaoProximo.addEventListener('click', proximaQuestao);
    
    // Adicionar event listeners para compartilhamento
    const botaoCompartilharInicio = document.getElementById('botao-compartilhar');
    const botaoCompartilharResultados = document.getElementById('botao-compartilhar-resultados');
    const botaoFecharModal = document.getElementById('botao-fechar-modal');
    const botaoCopiarLink = document.getElementById('botao-copiar-link');
    
    if (botaoCompartilharInicio) {
        botaoCompartilharInicio.addEventListener('click', mostrarModalCompartilhamento);
    }
    
    if (botaoCompartilharResultados) {
        botaoCompartilharResultados.addEventListener('click', mostrarModalCompartilhamento);
    }
    
    if (botaoFecharModal) {
        botaoFecharModal.addEventListener('click', esconderModalCompartilhamento);
    }
    
    if (botaoCopiarLink) {
        botaoCopiarLink.addEventListener('click', copiarLink);
    }
    
    // Fechar modal ao clicar fora
    const modal = document.getElementById('modal-compartilhamento');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                esconderModalCompartilhamento();
            }
        });
    }
    
    // Verificar se está em mobile e mostrar botão
    verificarEmostrarBotaoCompartilhamento();
    
    // Adicionar suporte para gestos em mobile
    adicionarSuporteGestosMobile();
}

// Adicionar suporte para gestos (swipe) em mobile
function adicionarSuporteGestosMobile() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        // Swipe para a direita (voltar)
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && elementos.telaQuestionario.classList.contains('ativa')) {
                // Swipe left (próxima) só se já tiver respondido
                if (!elementos.botaoProximo.disabled) {
                    proximaQuestao();
                }
            }
        }
    }
}
function inicializar() {
    // Adicionar event listeners
    elementos.botaoIniciar.addEventListener('click', iniciarQuestionario);
    elementos.botaoReiniciar.addEventListener('click', reiniciarQuestionario);
    elementos.botaoVoltarInicio.addEventListener('click', voltarInicio);
    elementos.botaoRealizarNovamente.addEventListener('click', reiniciarQuestionario);
    elementos.botaoProximo.addEventListener('click', proximaQuestao);
}

// Iniciar o questionário
function iniciarQuestionario() {
    questaoAtual = 0;
    pontuacao = 0;
    respostasCorretas = [];
    estrategiasAprendidas = [];
    
    elementos.telaInicial.classList.remove('ativa');
    elementos.telaQuestionario.classList.add('ativa');
    elementos.telaResultados.classList.remove('ativa');
    
    carregarQuestao();
}

// Carregar a questão atual
function carregarQuestao() {
    const questao = questoes[questaoAtual];
    
    // Atualizar texto da pergunta
    elementos.textoPergunta.textContent = `${questao.id}. ${questao.pergunta}`;
    
    // Limpar opções anteriores
    elementos.containerOpcoes.innerHTML = '';
    elementos.explicacaoResposta.classList.remove('visivel');
    elementos.botaoProximo.disabled = true;
    
    // Adicionar novas opções
    questao.opcoes.forEach((opcao, index) => {
        const opcaoElement = document.createElement('div');
        opcaoElement.className = 'opcao-resposta';
        opcaoElement.innerHTML = `
            <div class="indicador-opcao">${String.fromCharCode(65 + index)}</div>
            <div class="texto-opcao">${opcao}</div>
        `;
        
        opcaoElement.addEventListener('click', () => selecionarResposta(index));
        elementos.containerOpcoes.appendChild(opcaoElement);
    });
    
    // Atualizar progresso
    atualizarProgresso();
}

// Selecionar uma resposta
function selecionarResposta(indiceSelecionado) {
    const questao = questoes[questaoAtual];
    const opcoes = document.querySelectorAll('.opcao-resposta');
    
    // Remover seleção anterior
    opcoes.forEach(opcao => {
        opcao.classList.remove('selecionada', 'correta', 'incorreta');
    });
    
    // Marcar opção selecionada
    opcoes[indiceSelecionado].classList.add('selecionada');
    
    // Verificar se está correta
    const estaCorreta = (indiceSelecionado === questao.respostaCorreta);
    
    if (estaCorreta) {
        opcoes[indiceSelecionado].classList.add('correta');
        pontuacao++;
        respostasCorretas.push(questao.id);
        if (!estrategiasAprendidas.includes(questao.estrategia)) {
            estrategiasAprendidas.push(questao.estrategia);
        }
    } else {
        opcoes[indiceSelecionado].classList.add('incorreta');
        // Mostrar a resposta correta
        opcoes[questao.respostaCorreta].classList.add('correta');
    }
    
    // Mostrar explicação
    elementos.textoExplicacao.textContent = questao.explicacao;
    elementos.referenciaTeorica.textContent = questao.referencia;
    elementos.explicacaoResposta.classList.add('visivel');
    
    // Habilitar botão próximo
    elementos.botaoProximo.disabled = false;
    
    // Rolar para a explicação
    elementos.explicacaoResposta.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Próxima questão
function proximaQuestao() {
    questaoAtual++;
    
    if (questaoAtual < questoes.length) {
        carregarQuestao();
    } else {
        mostrarResultados();
    }
}

// Atualizar barra de progresso
function atualizarProgresso() {
    const percentagem = ((questaoAtual + 1) / questoes.length) * 100;
    
    elementos.barraProgresso.style.width = `${percentagem}%`;
    elementos.textoProgresso.textContent = `Questão ${questaoAtual + 1} de ${questoes.length}`;
    elementos.percentagemProgresso.textContent = `${Math.round(percentagem)}%`;
}

// Mostrar resultados finais
function mostrarResultados() {
    elementos.telaQuestionario.classList.remove('ativa');
    elementos.telaResultados.classList.add('ativa');
    
    const percentagemAcertos = Math.round((pontuacao / questoes.length) * 100);
    
    // Atualizar estatísticas
    elementos.pontuacaoFinal.textContent = `${pontuacao}/${questoes.length}`;
    elementos.percentagemAcertos.textContent = `${percentagemAcertos}%`;
    elementos.questoesCorretas.textContent = pontuacao;
    elementos.estrategiasIdentificadas.textContent = estrategiasAprendidas.length;
    
    // Gerar mensagem baseada na pontuação
    let mensagem = '';
    if (percentagemAcertos >= 90) {
        mensagem = "Excelente! Demonstrou um conhecimento excecional sobre estratégias de coping no envelhecimento. A sua compreensão do modelo transacional de Lazarus & Folkman está muito bem consolidada.";
    } else if (percentagemAcertos >= 70) {
        mensagem = "Muito bom! Apresenta um bom domínio das estratégias de coping adaptativas no contexto do envelhecimento. Continue a aprofundar os seus conhecimentos em psicogerontologia.";
    } else if (percentagemAcertos >= 50) {
        mensagem = "Bom trabalho! Identificou corretamente várias estratégias de coping. Reveja as questões com maior dificuldade para consolidar os conceitos-chave.";
    } else {
        mensagem = "Continue a estudar! O coping no envelhecimento é um tema complexo. Reveja as explicações fornecidas e consulte as referências bibliográficas para aprofundar o seu conhecimento.";
    }
    
    elementos.mensagemResultado.textContent = mensagem;
    
    // Listar estratégias aprendidas
    elementos.listaEstrategias.innerHTML = '';
    estrategiasAprendidas.forEach(estrategia => {
        const li = document.createElement('li');
        li.className = 'item-estrategia';
        li.textContent = estrategia;
        elementos.listaEstrategias.appendChild(li);
    });
    
    // Adicionar estratégias não identificadas
    questoes.forEach(questao => {
        if (!estrategiasAprendidas.includes(questao.estrategia)) {
            const li = document.createElement('li');
            li.className = 'item-estrategia';
            li.style.opacity = '0.6';
            li.style.borderLeftColor = 'var(--cinza-medio)';
            li.innerHTML = `${questao.estrategia} <span style="color: var(--vermelho-erro); font-size: 14px;">(não identificada)</span>`;
            elementos.listaEstrategias.appendChild(li);
        }
    });
}

// Reiniciar questionário
function reiniciarQuestionario() {
    iniciarQuestionario();
}

// Voltar ao início
function voltarInicio() {
    elementos.telaInicial.classList.add('ativa');
    elementos.telaQuestionario.classList.remove('ativa');
    elementos.telaResultados.classList.remove('ativa');
}

// ========== INICIALIZAR APLICAÇÃO ==========
document.addEventListener('DOMContentLoaded', inicializar);