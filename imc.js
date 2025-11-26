document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('imc-form');
    const alturaInput = document.getElementById('altura');
    const pesoInput = document.getElementById('peso');
    const resultadoContainer = document.getElementById('resultado-container');
    const valorImcSpan = document.getElementById('valor-imc');
    const classificacaoImcSpan = document.getElementById('classificacao-imc');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const altura = parseFloat(alturaInput.value.replace(',', '.'));
        const peso = parseFloat(pesoInput.value.replace(',', '.'));

        if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
            mostrarResultado('ERRO', 'Por favor, insira valores válidos e positivos.', 'erro');
            return;
        }

        const imc = calcularIMC(peso, altura);
        const { classificacao, classeCor } = obterClassificacao(imc);
        mostrarResultado(imc.toFixed(2), classificacao, classeCor);
    });

    function calcularIMC(peso, altura) {
        return peso / (altura * altura);
    }

    function obterClassificacao(imc) {
        if (imc < 18.5) {
            return { classificacao: 'Abaixo do peso', classeCor: 'abaixo-peso' };
        } else if (imc < 24.9) {
            return { classificacao: 'Peso normal', classeCor: 'normal' };
        } else if (imc < 29.9) {
            return { classificacao: 'Sobrepeso', classeCor: 'sobrepeso' };
        } else if (imc < 34.9) {
            return { classificacao: 'Obesidade Grau 1', classeCor: 'obesidade-1' };
        } else if (imc < 39.9) {
            return { classificacao: 'Obesidade Grau 2', classeCor: 'obesidade-2' };
        } else {
            return { classificacao: 'Obesidade Grau 3 (Mórbida)', classeCor: 'obesidade-3' };
        }
    }

    function mostrarResultado(valor, classificacao, classeCor) {
        valorImcSpan.textContent = valor;
        classificacaoImcSpan.textContent = classificacao;

        resultadoContainer.classList.remove('abaixo-peso', 'normal', 'sobrepeso', 'obesidade-1', 'obesidade-2', 'obesidade-3', 'erro');
        resultadoContainer.classList.add(classeCor);
        resultadoContainer.classList.remove('hidden');
    }
});