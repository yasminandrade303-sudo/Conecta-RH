function toggleMenu(){document.getElementById('links').classList.toggle('open')}
function sendForm(e){
  e.preventDefault();
  const nome=document.getElementById('nome').value;
  document.getElementById('status').textContent='Obrigado, '+nome+'! Sua mensagem foi registrada para demonstração.';
  e.target.reset();
}


// Gerador interativo de currículo do Conecta RH
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('cvForm');
  if (!form) return;

  const fields = {
    nome: 'cvNome',
    email: 'cvEmail',
    telefone: 'cvTelefone',
    cidade: 'cvCidade',
    objetivo: 'cvObjetivo',
    resumo: 'cvResumo',
    experiencia: 'cvExperiencia',
    formacao: 'cvFormacao',
    cursos: 'cvCursos',
    habilidades: 'cvHabilidades'
  };

  const previewMap = {
    nome: 'previewNome',
    objetivo: 'previewObjetivo',
    resumo: 'previewResumo',
    experiencia: 'previewExperiencia',
    formacao: 'previewFormacao',
    cursos: 'previewCursos',
    habilidades: 'previewHabilidades'
  };

  function valueOf(key) {
    return document.getElementById(fields[key]).value.trim();
  }

  function updatePreview() {
    Object.keys(previewMap).forEach(function (key) {
      const target = document.getElementById(previewMap[key]);
      target.textContent = valueOf(key) || ({
        nome: 'Seu nome completo',
        objetivo: 'Seu objetivo aparecerá aqui.',
        resumo: 'Seu resumo aparecerá aqui.',
        experiencia: 'Suas experiências aparecerão aqui.',
        formacao: 'Sua formação aparecerá aqui.',
        cursos: 'Seus cursos aparecerão aqui.',
        habilidades: 'Suas habilidades aparecerão aqui.'
      })[key];
    });

    const contact = [valueOf('email'), valueOf('telefone'), valueOf('cidade')].filter(Boolean);
    document.getElementById('previewContato').textContent = contact.join(' • ') || 'E-mail • Telefone • Cidade/Estado';

    [
      ['resumo', 'previewResumoBlock'],
      ['experiencia', 'previewExperienciaBlock'],
      ['cursos', 'previewCursosBlock'],
      ['habilidades', 'previewHabilidadesBlock']
    ].forEach(function (pair) {
      document.getElementById(pair[1]).hidden = !valueOf(pair[0]);
    });
  }

  form.addEventListener('input', updatePreview);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    updatePreview();
    document.getElementById('cvStatus').textContent = 'Currículo gerado! Confira a prévia ao lado e revise os dados antes de salvar.';
    document.getElementById('cvPreview').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('cvPrint').addEventListener('click', function () {
    updatePreview();
    window.print();
  });

  document.getElementById('cvClear').addEventListener('click', function () {
    form.reset();
    updatePreview();
    document.getElementById('cvStatus').textContent = 'Campos limpos. Você pode começar um novo currículo.';
  });

  updatePreview();
});
