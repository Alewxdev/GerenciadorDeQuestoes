let questions = [];

function addQuestion() {
    const questionInput = document.getElementById('question-input');
    const optionA = document.getElementById('option-a');
    const optionB = document.getElementById('option-b');
    const optionC = document.getElementById('option-c');
    const optionD = document.getElementById('option-d');
    const correctOption = document.getElementById('correct-option').value;

    if (
        questionInput.value.trim() === '' ||
        optionA.value.trim() === '' ||
        optionB.value.trim() === '' ||
        optionC.value.trim() === '' ||
        optionD.value.trim() === ''
    ) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    questions.push({
        question: questionInput.value.trim(),
        options: {
            A: optionA.value.trim(),
            B: optionB.value.trim(),
            C: optionC.value.trim(),
            D: optionD.value.trim()
        },
        correctAnswer: correctOption
    });

    // Limpar campos
    questionInput.value = '';
    optionA.value = '';
    optionB.value = '';
    optionC.value = '';
    optionD.value = '';

    // Mostrar áreas do questionário e exportação
    if (questions.length > 0) {
        document.getElementById('quiz-area').style.display = 'block';
        document.getElementById('export-area').style.display = 'block';
    }

    renderQuiz();
    updateExportText();
}

function renderQuiz() {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <p><strong>Pergunta ${index + 1}:</strong> ${q.question}</p>
            <label><input type="radio" name="question-${index}" value="A"> A) ${q.options.A}</label><br>
            <label><input type="radio" name="question-${index}" value="B"> B) ${q.options.B}</label><br>
            <label><input type="radio" name="question-${index}" value="C"> C) ${q.options.C}</label><br>
            <label><input type="radio" name="question-${index}" value="D"> D) ${q.options.D}</label><br>
            <hr>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

function submitQuiz() {
    const correctAnswersContainer = document.getElementById('correct-answers');
    correctAnswersContainer.innerHTML = '';

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        const userAnswer = selectedOption ? selectedOption.value : 'Nenhuma resposta selecionada';
        const isCorrect = userAnswer === q.correctAnswer;

        const answerDiv = document.createElement('div');
        answerDiv.innerHTML = `
            <p><strong>Pergunta ${index + 1}:</strong> ${q.question}</p>
            <p><strong>Sua resposta:</strong> ${userAnswer}</p>
            <p><strong>Resposta correta:</strong> ${q.correctAnswer}</p>
            <p><strong>Resultado:</strong> ${isCorrect ? '✅ Correto' : '❌ Incorreto'}</p>
            <hr>
        `;
        correctAnswersContainer.appendChild(answerDiv);
    });

    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('result-area').style.display = 'block';
}

function updateExportText() {
    const exportText = document.getElementById('export-text');
    let text = '';

    questions.forEach((q) => {
        text += `${q.question}\n`;
        text += `a) ${q.options.A}${q.correctAnswer === 'A' ? ' ✅' : ''}\n`;
        text += `b) ${q.options.B}${q.correctAnswer === 'B' ? ' ✅' : ''}\n`;
        text += `c) ${q.options.C}${q.correctAnswer === 'C' ? ' ✅' : ''}\n`;
        text += `d) ${q.options.D}${q.correctAnswer === 'D' ? ' ✅' : ''}\n\n`;
    });

    exportText.value = text;
}

function copyExport() {
    const exportText = document.getElementById('export-text');
    exportText.select();
    document.execCommand('copy');
    alert('Texto copiado para a área de transferência!');
}

function importQuestions() {
    const importText = document.getElementById('import-text').value.trim();
    if (!importText) {
        alert('Por favor, cole as perguntas no formato especificado.');
        return;
    }

    const lines = importText.split('\n');
    questions = [];

    for (let i = 0; i < lines.length; i += 6) {
        const question = lines[i].trim();
        const optionA = lines[i + 1].replace('a) ', '').replace(' ✅', '').trim();
        const optionB = lines[i + 2].replace('b) ', '').replace(' ✅', '').trim();
        const optionC = lines[i + 3].replace('c) ', '').replace(' ✅', '').trim();
        const optionD = lines[i + 4].replace('d) ', '').replace(' ✅', '').trim();
        const correctAnswer = lines[i + 1].includes('✅') ? 'A' :
                             lines[i + 2].includes('✅') ? 'B' :
                             lines[i + 3].includes('✅') ? 'C' :
                             lines[i + 4].includes('✅') ? 'D' : '';

        questions.push({
            question,
            options: { A: optionA, B: optionB, C: optionC, D: optionD },
            correctAnswer
        });
    }

    renderQuiz();
    updateExportText();
    document.getElementById('quiz-area').style.display = 'block';
    document.getElementById('export-area').style.display = 'block';
    alert('Perguntas importadas com sucesso!');
}
// Mostrar o modal de ajuda
function showHelp() {
    document.getElementById('help-modal').style.display = 'flex';
}

// Esconder o modal de ajuda
function hideHelp() {
    document.getElementById('help-modal').style.display = 'none';
}

// Copiar as instruções
function copyInstructions() {
    const instructions = `
A pergunta deve estar em uma linha.

Cada opção de resposta deve estar em uma linha separada, começando com a), b), c) ou d).

A resposta correta deve ser marcada com ✅ ao lado da opção correta.

Exemplo:

Qual é o resultado de 25 ÷ 5?
a) 4
b) 5 ✅
c) 6
d) 7
    `;

    navigator.clipboard.writeText(instructions.trim())
        .then(() => alert('Instruções copiadas para a área de transferência!'))
        .catch(() => alert('Erro ao copiar as instruções.'));
}