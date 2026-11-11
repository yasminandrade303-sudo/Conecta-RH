// Conecta RH - interações do site
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const links = document.getElementById("links");

  menuButton.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  links.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    links.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));

  // Filtro dos exemplos de cargos
  const jobSearch = document.getElementById("jobSearch");
  const jobCards = [...document.querySelectorAll(".job-card")];
  const jobEmpty = document.getElementById("jobEmpty");
  jobSearch.addEventListener("input", () => {
    const term = jobSearch.value.toLocaleLowerCase("pt-BR").trim();
    let visible = 0;
    jobCards.forEach(card => {
      const matches = card.dataset.search.includes(term) || card.textContent.toLocaleLowerCase("pt-BR").includes(term);
      card.hidden = !matches;
      if (matches) visible++;
    });
    jobEmpty.hidden = visible !== 0;
  });

  // Gerador e prévia do currículo
  const form = document.getElementById("cvForm");
  const fields = {
    nome: "cvNome", email: "cvEmail", telefone: "cvTelefone", cidade: "cvCidade",
    objetivo: "cvObjetivo", resumo: "cvResumo", experiencia: "cvExperiencia",
    formacao: "cvFormacao", cursos: "cvCursos", habilidades: "cvHabilidades"
  };
  const previewMap = {
    nome: "previewNome", objetivo: "previewObjetivo", resumo: "previewResumo",
    experiencia: "previewExperiencia", formacao: "previewFormacao",
    cursos: "previewCursos", habilidades: "previewHabilidades"
  };
  const defaults = {
    nome: "Seu nome completo", objetivo: "Seu objetivo aparecerá aqui.",
    resumo: "Seu resumo aparecerá aqui.", experiencia: "Suas experiências aparecerão aqui.",
    formacao: "Sua formação aparecerá aqui.", cursos: "Seus cursos aparecerão aqui.",
    habilidades: "Suas habilidades aparecerão aqui."
  };
  const value = key => document.getElementById(fields[key]).value.trim();

  function updatePreview() {
    Object.entries(previewMap).forEach(([key, id]) => {
      document.getElementById(id).textContent = value(key) || defaults[key];
    });
    const contact = [value("email"), value("telefone"), value("cidade")].filter(Boolean);
    document.getElementById("previewContato").textContent =
      contact.join(" • ") || "E-mail • Telefone • Cidade/Estado";
    [["resumo","previewResumoBlock"],["experiencia","previewExperienciaBlock"],
     ["cursos","previewCursosBlock"],["habilidades","previewHabilidadesBlock"]]
      .forEach(([key,id]) => document.getElementById(id).hidden = !value(key));
  }

  form.addEventListener("input", updatePreview);
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    updatePreview();
    document.getElementById("cvStatus").textContent =
      "Currículo atualizado! Confira a prévia e use Imprimir / Salvar PDF.";
    document.getElementById("cvPreview").scrollIntoView({behavior:"smooth", block:"start"});
  });
  document.getElementById("cvPrint").addEventListener("click", () => {
    updatePreview();
    window.print();
  });
  document.getElementById("cvClear").addEventListener("click", () => {
    form.reset();
    updatePreview();
    document.getElementById("cvStatus").textContent = "Campos limpos. Você pode começar um novo currículo.";
  });
  updatePreview();

  // Perguntas para treino de entrevista
  const questions = [
    {q:"Fale um pouco sobre você.", hint:"Apresente sua formação, experiências e interesses profissionais.", tip:"Faça um resumo objetivo: quem você é profissionalmente, o que já aprendeu e qual oportunidade procura."},
    {q:"Quais são seus principais pontos fortes?", hint:"Escolha competências que tenham relação com a vaga.", tip:"Cite duas ou três qualidades e, se possível, dê um exemplo real de como você as utiliza."},
    {q:"Conte sobre um desafio que você enfrentou.", hint:"Pense em uma situação de estudo, trabalho ou projeto.", tip:"Explique a situação, o que você fez para lidar com ela e qual foi o resultado ou aprendizado."},
    {q:"Por que você deseja trabalhar nesta empresa?", hint:"Pesquise a organização e relacione seus interesses à oportunidade.", tip:"Mostre que pesquisou a empresa e explique de forma sincera como a vaga se conecta aos seus objetivos."},
    {q:"Como você lida com prazos e prioridades?", hint:"Pense em como organiza tarefas e acompanha entregas.", tip:"Explique seu método de organização e dê um exemplo de como priorizou atividades."}
  ];
  let questionIndex = 0;
  const questionText = document.getElementById("questionText");
  const questionHint = document.getElementById("questionHint");
  const answerTip = document.getElementById("answerTip");
  function showQuestion() {
    const item = questions[questionIndex];
    questionText.textContent = item.q;
    questionHint.textContent = item.hint;
    answerTip.textContent = item.tip;
    answerTip.hidden = true;
    document.getElementById("toggleTip").textContent = "Ver dica de resposta";
  }
  document.getElementById("nextQuestion").addEventListener("click", () => {
    questionIndex = (questionIndex + 1) % questions.length;
    showQuestion();
  });
  document.getElementById("toggleTip").addEventListener("click", event => {
    answerTip.hidden = !answerTip.hidden;
    event.currentTarget.textContent = answerTip.hidden ? "Ver dica de resposta" : "Ocultar dica";
  });

  // Formulário demonstrativo: valida os campos, mas não envia dados a um servidor.
  document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const name = document.getElementById("nome").value.trim();
    document.getElementById("status").textContent =
      `Obrigado, ${name}! A demonstração do formulário foi concluída. Para receber mensagens de verdade, é necessário conectar um serviço de formulários ou servidor.`;
    event.currentTarget.reset();
  });
});
