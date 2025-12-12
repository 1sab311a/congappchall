// Show a screen and hide others
    function showScreen(screenId) {
      const screens = document.querySelectorAll('.screen');
      screens.forEach(s => s.classList.remove('active'));
      const target = document.getElementById(screenId);
      if (target) target.classList.add('active');
    }

    // Default to home screen
    showScreen('home-screen');

    // Placeholder functions for your existing logic
    function changeLanguage() { /* your language logic here */ }
    function filterRights() { /* your rights filter logic here */ }
    function filterWorkshops() { /* your workshops filter logic here */ }
    function nextQuizQuestion() { /* your quiz logic here */ }

  // ---------- GLOBAL VARIABLES ----------
let currentLanguage = 'en';
let currentQuestion = 0;
let score = 0;

// ---------- DATA ----------
const rightsData = {
  en: [
    {text: "⚖️ Right to remain silent", scenario:"police", explanation:"You can remain silent during police questioning."},
    {text: "👮 Right to an attorney", scenario:"police", explanation:"You can request a lawyer before answering questions."},
    {text: "📚 Right to education", scenario:"school", explanation:"Students have the right to attend school without discrimination."},
    {text: "💻 Right to online privacy", scenario:"online", explanation:"Your online data cannot be accessed without consent."}
  ],
  es: [
    {text: "⚖️ Derecho a permanecer en silencio", scenario:"police", explanation:"Puedes permanecer en silencio durante el interrogatorio policial."},
    {text: "👮 Derecho a un abogado", scenario:"police", explanation:"Puedes solicitar un abogado antes de responder preguntas."},
    {text: "📚 Derecho a la educación", scenario:"school", explanation:"Los estudiantes tienen derecho a asistir a la escuela sin discriminación."},
    {text: "💻 Derecho a la privacidad en línea", scenario:"online", explanation:"Tus datos en línea no pueden ser accedidos sin tu consentimiento."}
  ],
  ar: [
    {text: "⚖️ الحق في الصمت", scenario:"police", explanation:"يمكنك البقاء صامتًا أثناء استجواب الشرطة."},
    {text: "👮 الحق في محامٍ", scenario:"police", explanation:"يمكنك طلب محامٍ قبل الإجابة على الأسئلة."},
    {text: "📚 الحق في التعليم", scenario:"school", explanation:"للطلاب الحق في التعلم دون تمييز."},
    {text: "💻 الحق في الخصوصية على الإنترنت", scenario:"online", explanation:"لا يمكن الوصول إلى بياناتك على الإنترنت بدون موافقتك."}
  ]
};

const workshopsData = {
  en:[
    {name:"Know Your Rights Workshop", type:"in-person", location:"Local Library", desc:"Learn your rights with experts.", link:"#", virtual:false},
    {name:"Community Legal Aid Info Session", type:"virtual", location:"Zoom", desc:"Free virtual session.", link:"#", virtual:true},
    {name:"Youth Rights Seminar", type:"in-person", location:"High School Auditorium", desc:"Seminar for students.", link:"#", virtual:false}
  ],
  es:[
    {name:"Taller Conoce Tus Derechos", type:"in-person", location:"Biblioteca Local", desc:"Aprende tus derechos.", link:"#", virtual:false},
    {name:"Sesión de Información Legal Comunitaria", type:"virtual", location:"Zoom", desc:"Sesión virtual gratuita.", link:"#", virtual:true},
    {name:"Seminario Derechos Juveniles", type:"in-person", location:"Auditorio Escolar", desc:"Seminario para estudiantes.", link:"#", virtual:false}
  ],
  ar:[
    {name:"ورشة اعرف حقوقك", type:"in-person", location:"المكتبة المحلية", desc:"تعرف على حقوقك.", link:"#", virtual:false},
    {name:"جلسة معلومات المساعدة القانونية المجتمعية", type:"virtual", location:"Zoom", desc:"جلسة افتراضية مجانية.", link:"#", virtual:true},
    {name:"ندوة حقوق الشباب", type:"in-person", location:"مدرج المدرسة الثانوية", desc:"ندوة للطلاب.", link:"#", virtual:false}
  ]
};

const faqData = {
  en:[
    {q:"What should I do if my rights are violated?", a:"Document the incident, file a complaint with the relevant agency, and contact a lawyer immediately."},
    {q:"Where can I find free legal advice?", a:"Websites like the ABA Free Legal Answers, LawHelp.org, and the ACLU website have helpful guidance."},
    {q:"How can I report an incident?", a:"Contact a lawyer first, then potentially the Department of Justice if needed."},
    {q:"How can I contact my representatives in government?", a:"Use the Find My Representative tool on house.gov, or visit senate.gov for senators."}
  ],
  es:[
    {q:"¿Qué hacer si se violan mis derechos?", a:"Documenta el incidente, presenta una queja ante la agencia correspondiente y contacta a un abogado de inmediato."},
    {q:"¿Dónde puedo encontrar asesoría legal gratuita?", a:"Sitios como ABA Free Legal Answers, LawHelp.org y la página de la ACLU tienen orientación útil."},
    {q:"¿Cómo puedo reportar un incidente?", a:"Contacta a un abogado primero, luego potencialmente al Departamento de Justicia si es necesario."},
    {q:"¿Cómo puedo contactar a mis representantes en el gobierno?", a:"Usa la herramienta Find My Representative en house.gov o visita senate.gov para senadores."}
  ],
  ar:[
    {q:"ماذا أفعل إذا انتهكت حقوقي؟", a:"قم بتوثيق الحادثة، وقدم شكوى للجهة المختصة، واتصل بمحامٍ فوراً."},
    {q:"أين يمكنني الحصول على استشارة قانونية مجانية؟", a:"مواقع مثل ABA Free Legal Answers وLawHelp.org وموقع ACLU توفر إرشادات مفيدة."},
    {q:"كيف يمكنني الإبلاغ عن حادثة؟", a:"اتصل بمحامٍ أولاً، ثم ربما وزارة العدل إذا لزم الأمر."},
    {q:"كيف يمكنني الاتصال بممثلي الحكومة؟", a:"استخدم أداة Find My Representative على house.gov، وللنواب قم بزيارة senate.gov."}
  ]
};

const quizData = {
  en:[
    {q:"You are stopped by police, can you remain silent?", options:["Yes","No"], answer:"Yes"},
    {q:"Do you have the right to an attorney?", options:["Yes","No"], answer:"Yes"},
    {q:"Can federal officers detain you without probable cause?", options: ["Yes","No"], answer: "No"},
    {q:"If ICE or any federal agent comes to your home, do you have to let them in?", options: ["Yes, always","Only if they have a warrant","No, never"], answer: "Only if they have a warrant"},
    {q:"Do you have to answer questions without a lawyer?", options: ["Yes","No"], answer: "No"},
    {q:"Can officers detain you without telling you a reason?", options: ["Yes","No"], answer: "No"},
    {q:"Can officers detain you based solely on race, accent, or skin color?", options: ["Yes","No"], answer: "No"},
    {q:"Do these rights even account for those who aren’t citizens?", options: ["Yes, everyone in the U.S. has rights","No, only citizens do"], answer: "Yes, everyone in the U.S. has rights"}
  ],
  es:[
    {q:"Si la policía te detiene, ¿puedes permanecer en silencio?", options:["Sí","No"], answer:"Sí"},
    {q:"¿Tienes derecho a un abogado?", options:["Sí","No"], answer:"Sí"},
    {q:"¿Pueden los agentes federales detenerte sin causa probable?", options: ["Sí","No"], answer:"No"},
    {q:"Si ICE u otro agente federal viene a tu casa, ¿tienes que dejarles entrar?", options: ["Sí, siempre","Solo si tienen una orden","No, nunca"], answer:"Solo si tienen una orden"},
    {q:"¿Tienes que responder preguntas sin un abogado?", options: ["Sí","No"], answer:"No"},
    {q:"¿Pueden los agentes detenerte sin decirte la razón?", options: ["Sí","No"], answer:"No"},
    {q:"¿Pueden detenerte solo por tu raza, acento o color de piel?", options: ["Sí","No"], answer:"No"},
    {q:"¿Estas protecciones aplican a quienes no son ciudadanos?", options: ["Sí, todas las personas tienen derechos","No, solo los ciudadanos"], answer:"Sí, todas las personas tienen derechos"}
  ],
  ar:[
    {q:"إذا أوقفك الشرطة، هل يمكنك البقاء صامتًا؟", options:["نعم","لا"], answer:"نعم"},
    {q:"هل لديك الحق في محامٍ؟", options:["نعم","لا"], answer:"نعم"},
    {q:"هل يمكن للمسؤولين الاتحاديين احتجازك بدون سبب محتمل؟", options: ["نعم","لا"], answer:"لا"},
    {q:"إذا جاء ICE أو أي وكيل فدرالي إلى منزلك، هل يجب أن تدخله؟", options: ["نعم دائمًا","فقط إذا كان لديهم مذكرة","لا أبدًا"], answer:"فقط إذا كان لديهم مذكرة"},
    {q:"هل يجب عليك الإجابة على الأسئلة بدون محامٍ؟", options: ["نعم","لا"], answer:"لا"},
    {q:"هل يمكن للضباط احتجازك دون إخبارك بالسبب؟", options: ["نعم","لا"], answer:"لا"},
    {q:"هل يمكن احتجازك فقط بناءً على العرق أو اللكنة أو لون البشرة؟", options: ["نعم","لا"], answer:"لا"},
    {q:"هل تنطبق هذه الحقوق على غير المواطنين؟", options: ["نعم، لكل من في الولايات المتحدة حقوق","لا، فقط للمواطنين"], answer:"نعم، لكل من في الولايات المتحدة حقوق"}
  ]
};

// ---------- FUNCTIONS ----------
function showScreen(screenId){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if(screen) screen.classList.add('active');
}

function changeLanguage(){
  const select = document.getElementById('languageSelect');
  if(select) currentLanguage = select.value;
  if(currentLanguage==='ar'){
    document.body.setAttribute('dir','rtl');
    document.body.style.textAlign='right';
  } else {
    document.body.setAttribute('dir','ltr');
    document.body.style.textAlign='center';
  }
  loadRights();
  loadWorkshops();
  loadFAQs();
  loadQuiz();
  updateLabels();
}

function loadRights(){
  const scenario = document.getElementById('scenarioSelect')?.value || 'all';
  const container = document.getElementById('rights-list');
  if(!container) return;
  container.innerHTML = '';
  rightsData[currentLanguage].forEach(r => {
    if(scenario==='all' || r.scenario===scenario){
      const li = document.createElement('li');
      li.innerHTML = `${r.text} <span class="tooltip">${r.explanation}</span>`;
      container.appendChild(li);
    }
  });
}

function filterRights(){ loadRights(); }

function loadWorkshops(){
  const filter = document.getElementById('workshopFilter')?.value || 'all';
  const container = document.getElementById('workshop-list');
  if(!container) return;
  container.innerHTML = '';
  workshopsData[currentLanguage].forEach(ws => {
    if(filter==='all' || ws.type===filter){
      const li = document.createElement('li');
      li.innerHTML = `<strong>${ws.name}</strong> - ${ws.location} - ${ws.desc} ${ws.virtual?"(Virtual)":""} - <a href="${ws.link}">RSVP</a>`;
      container.appendChild(li);
    }
  });
}

function filterWorkshops(){ loadWorkshops(); }

function loadFAQs(){
  const container = document.getElementById('faq-list');
  if(!container) return;
  container.innerHTML = '';
  faqData[currentLanguage].forEach(f => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${f.q}</strong><br><span style="color:blue;">${f.a}</span>`;
    container.appendChild(li);
  });
}

function loadQuiz(){
  currentQuestion = 0;
  score = 0;
  showQuizQuestion();
}

function showQuizQuestion(){
  const question = quizData[currentLanguage][currentQuestion];
  if(!question){
    document.getElementById('quiz-question').textContent="Quiz Finished!";
    document.getElementById('quiz-options').innerHTML='';
    document.getElementById('quiz-feedback').textContent='';
    document.getElementById('quiz-score').textContent=`Score: ${score}`;
    return;
  }
  document.getElementById('quiz-question').textContent=question.q;
  const opts = document.getElementById('quiz-options');
  opts.innerHTML='';
  document.getElementById('quiz-feedback').textContent='';
  document.getElementById('quiz-score').textContent=`Score: ${score}`;
  question.options.forEach(o => {
    const b = document.createElement('button');
    b.textContent = o;
    b.onclick = () => checkQuizAnswer(o, question.answer);
    opts.appendChild(b);
  });
}

function checkQuizAnswer(selected, correct){
  if(selected === correct){
    score++;
    document.getElementById('quiz-feedback').textContent="✅ Correct!";
  } else {
    document.getElementById('quiz-feedback').textContent="❌ Incorrect!";
  }
  document.getElementById('quiz-score').textContent=`Score: ${score}`;
}

function nextQuizQuestion(){
  currentQuestion++;
  showQuizQuestion();
}

function updateLabels(){
  const labels = {
    en:{'app-title':'Know Your Rights','lang-label':'Select Language:','rights-title':'My Rights','scenario-label':'Filter by Scenario:','workshops-title':'Workshops Near You','workshop-filter-label':'Filter by Type:','help-title':'Help & Resources','report-label':'Report an Issue / Ask a Question:','quiz-title':'Quick Rights Quiz'},
    es:{'app-title':'Conoce Tus Derechos','lang-label':'Seleccionar Idioma:','rights-title':'Mis Derechos','scenario-label':'Filtrar por Escenario:','workshops-title':'Talleres Cerca de Ti','workshop-filter-label':'Filtrar por Tipo:','help-title':'Ayuda y Recursos','report-label':'Reportar un Problema / Hacer una Pregunta:','quiz-title':'Cuestionario Rápido de Derechos'},
    ar:{'app-title':'اعرف حقوقك','lang-label':'اختر اللغة:','rights-title':'حقوقي','scenario-label':'تصفية حسب السيناريو:','workshops-title':'ورش العمل','workshop-filter-label':'تصفية حسب النوع:','help-title':'المساعدة والموارد','report-label':'الإبلاغ عن مشكلة / طرح سؤال:','quiz-title':'اختبار سريع للحقوق'}
  };
  Object.keys(labels[currentLanguage]).forEach(id=>{
    const e = document.getElementById(id);
    if(e) e.textContent = labels[currentLanguage][id];
  });
}

// ---------- INITIAL LOAD ----------
document.addEventListener('DOMContentLoaded',()=>{
  changeLanguage();
  showScreen('rights-screen');
});



// ---------- BILL OF RIGHTS ADDITION ----------
const billOfRightsSection = {
  en: [
    { text: "📜 Bill of Rights Overview", scenario: "billOfRights", explanation: "The first ten amendments to the U.S. Constitution guarantee fundamental rights like freedom of speech, religion, and assembly, as well as protections in legal proceedings." }
  ],
  es: [
    { text: "📜 Resumen de la Carta de Derechos", scenario: "billOfRights", explanation: "Las diez primeras enmiendas a la Constitución de EE. UU. garantizan derechos fundamentales como la libertad de expresión, religión y reunión, así como protecciones en procedimientos legales." }
  ],
  ar: [
    { text: "📜 نظرة عامة على وثيقة الحقوق", scenario: "billOfRights", explanation: "تضمن التعديلات العشر الأولى لدستور الولايات المتحدة الحقوق الأساسية مثل حرية التعبير والدين والتجمع، بالإضافة إلى الحماية في الإجراءات القانونية." }
  ]
};

// Append the Bill of Rights section to the existing rightsData
Object.keys(rightsData).forEach(lang => {
  rightsData[lang].push(...billOfRightsSection[lang]);
});


// ---------- DETAILED BILL OF RIGHTS BREAKDOWN ----------
const billOfRightsAmendments = {
  en: [
    { text: "Amendment I: Freedom of Religion, Speech, Press, Assembly, Petition", scenario: "billOfRights", explanation: "You can practice any religion, speak freely, publish opinions, gather peacefully, and petition the government." },
    { text: "Amendment II: Right to Bear Arms", scenario: "billOfRights", explanation: "You have the right to own and carry weapons under the law." },
    { text: "Amendment III: Quartering of Soldiers", scenario: "billOfRights", explanation: "The government cannot force you to house soldiers in your home without consent." },
    { text: "Amendment IV: Search and Seizure", scenario: "billOfRights", explanation: "Your property and person are protected from unreasonable searches and seizures." },
    { text: "Amendment V: Rights in Criminal Cases", scenario: "billOfRights", explanation: "You have protections like due process, no double jeopardy, and the right against self-incrimination." },
    { text: "Amendment VI: Right to a Fair Trial", scenario: "billOfRights", explanation: "You have the right to a speedy trial, an impartial jury, and legal counsel." },
    { text: "Amendment VII: Trial by Jury in Civil Cases", scenario: "billOfRights", explanation: "You can have a jury trial in certain civil cases." },
    { text: "Amendment VIII: Cruel and Unusual Punishment", scenario: "billOfRights", explanation: "Excessive bail, fines, and cruel punishment are prohibited." },
    { text: "Amendment IX: Rights Retained by the People", scenario: "billOfRights", explanation: "The people have other rights not specifically listed in the Constitution." },
    { text: "Amendment X: States’ Rights", scenario: "billOfRights", explanation: "Powers not given to the federal government belong to the states or the people." }
  ],
  es: [
    { text: "Enmienda I: Libertad de religión, expresión, prensa, reunión y petición", scenario: "billOfRights", explanation: "Puedes practicar cualquier religión, hablar libremente, publicar opiniones, reunirte pacíficamente y presentar peticiones al gobierno." },
    { text: "Enmienda II: Derecho a portar armas", scenario: "billOfRights", explanation: "Tienes derecho a poseer y portar armas según la ley." },
    { text: "Enmienda III: Alojamiento de soldados", scenario: "billOfRights", explanation: "El gobierno no puede obligarte a alojar soldados en tu casa sin tu consentimiento." },
    { text: "Enmienda IV: Registro e incautación", scenario: "billOfRights", explanation: "Tu propiedad y persona están protegidas contra registros e incautaciones irrazonables." },
    { text: "Enmienda V: Derechos en casos penales", scenario: "billOfRights", explanation: "Tienes protecciones como el debido proceso, no ser juzgado dos veces por el mismo delito y derecho a no autoincriminarte." },
    { text: "Enmienda VI: Derecho a un juicio justo", scenario: "billOfRights", explanation: "Tienes derecho a un juicio rápido, un jurado imparcial y asistencia legal." },
    { text: "Enmienda VII: Juicio por jurado en casos civiles", scenario: "billOfRights", explanation: "Puedes tener un juicio con jurado en ciertos casos civiles." },
    { text: "Enmienda VIII: Castigos crueles e inusuales", scenario: "billOfRights", explanation: "Se prohíben fianzas excesivas, multas y castigos crueles." },
    { text: "Enmienda IX: Derechos reservados al pueblo", scenario: "billOfRights", explanation: "El pueblo tiene otros derechos no listados específicamente en la Constitución." },
    { text: "Enmienda X: Derechos de los estados", scenario: "billOfRights", explanation: "Los poderes no otorgados al gobierno federal pertenecen a los estados o al pueblo." }
  ],
  ar: [
    { text: "التعديل الأول: حرية الدين والتعبير والصحافة والتجمع والالتماس", scenario: "billOfRights", explanation: "يمكنك ممارسة أي دين، والتحدث بحرية، ونشر الآراء، والتجمع سلمياً، وتقديم التماسات للحكومة." },
    { text: "التعديل الثاني: الحق في امتلاك الأسلحة", scenario: "billOfRights", explanation: "لديك الحق في امتلاك وحمل الأسلحة بموجب القانون." },
    { text: "التعديل الثالث: إقامة الجنود", scenario: "billOfRights", explanation: "لا يمكن للحكومة إجبارك على إيواء الجنود في منزلك بدون موافقتك." },
    { text: "التعديل الرابع: التفتيش والمصادرة", scenario: "billOfRights", explanation: "يتم حماية ممتلكاتك وشخصك من التفتيش والمصادرة غير المعقولة." },
    { text: "التعديل الخامس: حقوق في القضايا الجنائية", scenario: "billOfRights", explanation: "لديك حماية مثل الإجراءات القانونية الواجبة، وعدم الملاحقة مرتين لنفس الجريمة، والحق في عدم تقديم الشهادة ضد نفسك." },
    { text: "التعديل السادس: الحق في محاكمة عادلة", scenario: "billOfRights", explanation: "لديك الحق في محاكمة سريعة، هيئة محلفين محايدة، والمساعدة القانونية." },
    { text: "التعديل السابع: المحاكمة بواسطة هيئة محلفين في القضايا المدنية", scenario: "billOfRights", explanation: "يمكنك الحصول على محاكمة بواسطة هيئة محلفين في بعض القضايا المدنية." },
    { text: "التعديل الثامن: العقوبة القاسية وغير المعتادة", scenario: "billOfRights", explanation: "يُحظر الكفالات الغير معقولة والغرامات والعقوبات القاسية." },
    { text: "التعديل التاسع: الحقوق المحفوظة للشعب", scenario: "billOfRights", explanation: "للشعب حقوق أخرى لم تُذكر بالتحديد في الدستور." },
    { text: "التعديل العاشر: حقوق الولايات", scenario: "billOfRights", explanation: "السلطات التي لم تُمنح للحكومة الفيدرالية تعود للولايات أو للشعب." }
  ]
};

// Append the detailed amendments to the rightsData
Object.keys(rightsData).forEach(lang => {
  rightsData[lang].push(...billOfRightsAmendments[lang]);
});




// ---------- ADDITIONAL RIGHTS FOR OTHER SCENARIOS ----------
const extraRights = {
  en: [
    // Police rights
    { text: "🚨 Right to remain silent during questioning", scenario: "police", explanation: "You can refuse to answer questions without a lawyer present." },
    { text: "👮 Right to legal counsel", scenario: "police", explanation: "You can request a lawyer immediately if detained." },
    { text: "📄 Right to know why you are being detained", scenario: "police", explanation: "Officers must inform you of the reason for your detention." },
    { text: "🛑 Protection from unlawful search", scenario: "police", explanation: "Police need a warrant or probable cause to search your property." },

    // School rights
    { text: "🏫 Right to a safe learning environment", scenario: "school", explanation: "Schools must protect you from harassment and bullying." },
    { text: "📚 Right to access educational resources", scenario: "school", explanation: "You should have equal access to classes and materials." },
    { text: "✏️ Right to privacy", scenario: "school", explanation: "School records are private under FERPA regulations." },
    { text: "🗣️ Freedom of expression", scenario: "school", explanation: "You can express yourself in school within reasonable limits." },

    // Online rights
    { text: "💻 Right to online privacy", scenario: "online", explanation: "Your emails and messages are protected under federal privacy laws." },
    { text: "🔒 Right to data protection", scenario: "online", explanation: "Websites must protect your personal data and follow regulations." },
    { text: "⚠️ Right to report cyber harassment", scenario: "online", explanation: "You can report online abuse to authorities and platform admins." },
    { text: "🌐 Right to access information", scenario: "online", explanation: "You have access to public online information and educational resources." }
  ],
  es: [
    // Policía
    { text: "🚨 Derecho a permanecer en silencio durante el interrogatorio", scenario: "police", explanation: "Puedes negarte a responder preguntas sin un abogado presente." },
    { text: "👮 Derecho a asistencia legal", scenario: "police", explanation: "Puedes solicitar un abogado inmediatamente si eres detenido." },
    { text: "📄 Derecho a saber por qué estás detenido", scenario: "police", explanation: "Los oficiales deben informarte del motivo de la detención." },
    { text: "🛑 Protección contra registros ilegales", scenario: "police", explanation: "La policía necesita una orden o causa probable para registrar tu propiedad." },

    // Escuela
    { text: "🏫 Derecho a un entorno de aprendizaje seguro", scenario: "school", explanation: "Las escuelas deben protegerte del acoso y la intimidación." },
    { text: "📚 Derecho a acceder a recursos educativos", scenario: "school", explanation: "Debes tener acceso igualitario a clases y materiales." },
    { text: "✏️ Derecho a la privacidad", scenario: "school", explanation: "Los registros escolares son privados según FERPA." },
    { text: "🗣️ Libertad de expresión", scenario: "school", explanation: "Puedes expresarte en la escuela dentro de límites razonables." },

    // Online
    { text: "💻 Derecho a la privacidad en línea", scenario: "online", explanation: "Tus correos y mensajes están protegidos por leyes federales de privacidad." },
    { text: "🔒 Derecho a la protección de datos", scenario: "online", explanation: "Los sitios web deben proteger tus datos personales y cumplir con regulaciones." },
    { text: "⚠️ Derecho a reportar acoso cibernético", scenario: "online", explanation: "Puedes reportar abuso en línea a autoridades y administradores de plataformas." },
    { text: "🌐 Derecho a acceder a información", scenario: "online", explanation: "Tienes acceso a información pública en línea y recursos educativos." }
  ],
  ar: [
    // الشرطة
    { text: "🚨 الحق في البقاء صامتًا أثناء الاستجواب", scenario: "police", explanation: "يمكنك رفض الإجابة على الأسئلة بدون محامٍ." },
    { text: "👮 الحق في الاستشارة القانونية", scenario: "police", explanation: "يمكنك طلب محامٍ فور احتجازك." },
    { text: "📄 الحق في معرفة سبب احتجازك", scenario: "police", explanation: "يجب على الضباط إعلامك بسبب احتجازك." },
    { text: "🛑 الحماية من التفتيش غير القانوني", scenario: "police", explanation: "تحتاج الشرطة إلى مذكرة أو سبب محتمل لتفتيش ممتلكاتك." },

    // المدرسة
    { text: "🏫 الحق في بيئة تعليمية آمنة", scenario: "school", explanation: "يجب على المدارس حمايتك من التنمر والتحرش." },
    { text: "📚 الحق في الوصول إلى الموارد التعليمية", scenario: "school", explanation: "يجب أن يكون لديك وصول متساوٍ للفصول والمواد." },
    { text: "✏️ الحق في الخصوصية", scenario: "school", explanation: "سجلات المدرسة خاصة وفقًا لقوانين FERPA." },
    { text: "🗣️ حرية التعبير", scenario: "school", explanation: "يمكنك التعبير عن نفسك في المدرسة ضمن حدود معقولة." },

    // الإنترنت
    { text: "💻 الحق في الخصوصية على الإنترنت", scenario: "online", explanation: "رسائلك ومراسلاتك محمية بموجب القوانين الفيدرالية." },
    { text: "🔒 الحق في حماية البيانات", scenario: "online", explanation: "يجب على المواقع حماية بياناتك الشخصية والامتثال للقوانين." },
    { text: "⚠️ الحق في الإبلاغ عن التحرش الإلكتروني", scenario: "online", explanation: "يمكنك الإبلاغ عن الإساءة عبر الإنترنت للسلطات والمسؤولين." },
    { text: "🌐 الحق في الوصول إلى المعلومات", scenario: "online", explanation: "لديك حق الوصول إلى المعلومات العامة والموارد التعليمية عبر الإنترنت." }
  ]
};

// Append extra rights to rightsData
Object.keys(rightsData).forEach(lang => {
  rightsData[lang].push(...extraRights[lang]);
});

// ---------- Append Real Workshops to Existing Data ----------
if (typeof workshopsData !== "undefined") {
  const newWorkshops_en = [
    {name:"NLG Advanced Legal Observer Training", type:"in-person", location:"University of Oregon Law School, Room 110", desc:"Advanced legal observer training.", link:"#", virtual:false, date:"Oct 14, 6pm"},
    {name:"Carsie Blanton @ Wow Hall", type:"in-person", location:"Wow Hall, Eugene, Oregon", desc:"Live music event.", link:"#", virtual:false, date:"Oct 12"},
    {name:"Legal Observer Training", type:"virtual", location:"Online", desc:"Training session for legal observers.", link:"#", virtual:true, date:"Apr 2, 6-8pm"},
    {name:"Know Your Rights and Risks for Immigrants and Allies", type:"virtual", location:"Online", desc:"Informative session for immigrants and allies.", link:"#", virtual:true, date:"Mar 27, 4:30-7pm"}
  ];

  const newWorkshops_es = [
    {name:"Capacitación Avanzada de Observadores Legales NLG", type:"in-person", location:"Escuela de Derecho de la Universidad de Oregon, Sala 110", desc:"Capacitación avanzada para observadores legales.", link:"#", virtual:false, date:"14 Oct, 6pm"},
    {name:"Carsie Blanton @ Wow Hall", type:"in-person", location:"Wow Hall, Eugene, Oregon", desc:"Evento musical en vivo.", link:"#", virtual:false, date:"12 Oct"},
    {name:"Capacitación de Observadores Legales", type:"virtual", location:"En línea", desc:"Sesión de capacitación para observadores legales.", link:"#", virtual:true, date:"2 Abr, 6-8pm"},
    {name:"Conoce tus derechos y riesgos para inmigrantes y aliados", type:"virtual", location:"En línea", desc:"Sesión informativa para inmigrantes y aliados.", link:"#", virtual:true, date:"27 Mar, 4:30-7pm"}
  ];

  const newWorkshops_ar = [
    {name:"تدريب مراقب قانوني متقدم NLG", type:"in-person", location:"جامعة أوريغون كلية الحقوق، الغرفة 110", desc:"تدريب متقدم للمراقبين القانونيين.", link:"#", virtual:false, date:"14 أكتوبر، 6 مساءً"},
    {name:"Carsie Blanton @ Wow Hall", type:"in-person", location:"Wow Hall، يوجين، أوريغون", desc:"حدث موسيقي مباشر.", link:"#", virtual:false, date:"12 أكتوبر"},
    {name:"تدريب المراقب القانوني", type:"virtual", location:"عبر الإنترنت", desc:"جلسة تدريب للمراقبين القانونيين.", link:"#", virtual:true, date:"2 أبريل، 6-8 مساءً"},
    {name:"اعرف حقوقك ومخاطرها للمهاجرين والحلفاء", type:"virtual", location:"عبر الإنترنت", desc:"جلسة إعلامية للمهاجرين والحلفاء.", link:"#", virtual:true, date:"27 مارس، 4:30-7 مساءً"}
  ];

  workshopsData.en.push(...newWorkshops_en);
  workshopsData.es.push(...newWorkshops_es);
  workshopsData.ar.push(...newWorkshops_ar);
}
// ---------- Append Real Workshops to Existing Data ----------
if (typeof workshopsData !== "undefined") {
  const newWorkshops_en = [
    {name:"NLG Advanced Legal Observer Training", type:"in-person", location:"University of Oregon Law School, Room 110", desc:"Advanced legal observer training.", link:"#", virtual:false, date:"Oct 14, 6pm"},
    {name:"Carsie Blanton @ Wow Hall", type:"in-person", location:"Wow Hall, Eugene, Oregon", desc:"Live music event.", link:"#", virtual:false, date:"Oct 12"},
    {name:"Legal Observer Training", type:"virtual", location:"Online", desc:"Training session for legal observers.", link:"#", virtual:true, date:"Apr 2, 6-8pm"},
    {name:"Know Your Rights and Risks for Immigrants and Allies", type:"virtual", location:"Online", desc:"Informative session for immigrants and allies.", link:"#", virtual:true, date:"Mar 27, 4:30-7pm"}
  ];

  const newWorkshops_es = [
    {name:"Capacitación Avanzada de Observadores Legales NLG", type:"in-person", location:"Escuela de Derecho de la Universidad de Oregon, Sala 110", desc:"Capacitación avanzada para observadores legales.", link:"#", virtual:false, date:"14 Oct, 6pm"},
    {name:"Carsie Blanton @ Wow Hall", type:"in-person", location:"Wow Hall, Eugene, Oregon", desc:"Evento musical en vivo.", link:"#", virtual:false, date:"12 Oct"},
    {name:"Capacitación de Observadores Legales", type:"virtual", location:"En línea", desc:"Sesión de capacitación para observadores legales.", link:"#", virtual:true, date:"2 Abr, 6-8pm"},
    {name:"Conoce tus derechos y riesgos para inmigrantes y aliados", type:"virtual", location:"En línea", desc:"Sesión informativa para inmigrantes y aliados.", link:"#", virtual:true, date:"27 Mar, 4:30-7pm"}
  ];

  const newWorkshops_ar = [
    {name:"تدريب مراقب قانوني متقدم NLG", type:"in-person", location:"جامعة أوريغون كلية الحقوق، الغرفة 110", desc:"تدريب متقدم للمراقبين القانونيين.", link:"#", virtual:false, date:"14 أكتوبر، 6 مساءً"},
    {name:"Carsie Blanton @ Wow Hall", type:"in-person", location:"Wow Hall، يوجين، أوريغون", desc:"حدث موسيقي مباشر.", link:"#", virtual:false, date:"12 أكتوبر"},
    {name:"تدريب المراقب القانوني", type:"virtual", location:"عبر الإنترنت", desc:"جلسة تدريب للمراقبين القانونيين.", link:"#", virtual:true, date:"2 أبريل، 6-8 مساءً"},
    {name:"اعرف حقوقك ومخاطرها للمهاجرين والحلفاء", type:"virtual", location:"عبر الإنترنت", desc:"جلسة إعلامية للمهاجرين والحلفاء.", link:"#", virtual:true, date:"27 مارس، 4:30-7 مساءً"}
  ];

  workshopsData.en.push(...newWorkshops_en);
  workshopsData.es.push(...newWorkshops_es);
  workshopsData.ar.push(...newWorkshops_ar);
}

  { q: "هل يمكن للشرطة توقيفي بدون سبب؟", a: "لا، تحتاج الشرطة إلى سبب معقول لتوقيفك في معظم الحالات." }
];

// ---------- Append new FAQs to existing list ----------
function appendMoreFAQs() {
  const container = document.getElementById('faq-list');
  if (!container) return;

  let newFAQ = [];
  if (currentLanguage === 'en') newFAQ = moreFAQ_en;
  else if (currentLanguage === 'es') newFAQ = moreFAQ_es;
  else if (currentLanguage === 'ar') newFAQ = moreFAQ_ar;

  newFAQ.forEach(faq => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${faq.q}</strong><p style="color:blue;">${faq.a}</p>`;
    container.appendChild(li);
  });
}


// ---------- MERGE TEN NEW FAQS INTO EXISTING faqData ----------
const newFAQs = {
  en: [
    {q:"Can I record police interactions?", a:"Yes, as long as you don’t interfere, you can record public officials in public spaces."},
    {q:"Do I have to show ID if stopped on the street?", a:"Depends on your state; some require it if suspected of a crime, others do not."},
    {q:"Can a school search my backpack?", a:"Schools can search if they have reasonable suspicion, but not arbitrarily."},
    {q:"Are online platforms required to protect my data?", a:"Yes, under laws like COPPA, GDPR, or the platform’s own policies."},
    {q:"What if I’m denied service based on discrimination?", a:"You can report to the Department of Justice or your state human rights agency."},
    {q:"Can police search my phone?", a:"Generally no, unless they have a warrant or exigent circumstances."},
    {q:"Do I have the right to protest peacefully?", a:"Yes, you can assemble and protest peacefully in public spaces."},
    {q:"Can my school punish me for social media posts?", a:"Only if they substantially disrupt school operations."},
    {q:"Who can help if I’m harassed online?", a:"Report to platform admins, local law enforcement, or organizations like Cyber Civil Rights Initiative."},
    {q:"What are my rights if detained by ICE?", a:"You have the right to remain silent and request a lawyer immediately."}
  ],
  es: [
    {q:"¿Puedo grabar interacciones con la policía?", a:"Sí, siempre que no interfieras, puedes grabar a funcionarios públicos en espacios públicos."},
    {q:"¿Debo mostrar identificación si me detienen en la calle?", a:"Depende de tu estado; algunos lo requieren si se sospecha un delito, otros no."},
    {q:"¿Puede la escuela revisar mi mochila?", a:"Las escuelas pueden revisar si tienen sospecha razonable, pero no arbitrariamente."},
    {q:"¿Las plataformas en línea deben proteger mis datos?", a:"Sí, bajo leyes como COPPA, GDPR, o según las políticas de la plataforma."},
    {q:"¿Qué hago si me niegan servicio por discriminación?", a:"Puedes reportar al Departamento de Justicia o a la agencia estatal de derechos humanos."},
    {q:"¿Puede la policía registrar mi teléfono?", a:"Generalmente no, a menos que tengan una orden o exista una circunstancia urgente."},
    {q:"¿Tengo derecho a protestar pacíficamente?", a:"Sí, puedes reunirte y protestar pacíficamente en espacios públicos."},
    {q:"¿Puede mi escuela sancionarme por publicaciones en redes?", a:"Solo si interfiere sustancialmente con las operaciones escolares."},
    {q:"¿Quién puede ayudarme si sufro acoso en línea?", a:"Reporta a los administradores de la plataforma, a la policía local o a organizaciones como Cyber Civil Rights Initiative."},
    {q:"¿Cuáles son mis derechos si me detiene ICE?", a:"Tienes derecho a permanecer en silencio y solicitar un abogado inmediatamente."}
  ],
  ar: [
    {q:"هل يمكنني تسجيل تفاعلاتي مع الشرطة؟", a:"نعم، طالما لا تعرقل، يمكنك تسجيل المسؤولين العامين في الأماكن العامة."},
    {q:"هل يجب عليّ إظهار هويتي إذا تم توقيفي في الشارع؟", a:"يعتمد على الولاية؛ بعض الولايات تتطلب ذلك إذا كان هناك شك في جريمة، وأخرى لا."},
    {q:"هل يمكن للمدرسة تفتيش حقيبتي؟", a:"يمكن للمدرسة التفتيش إذا كان لديها سبب معقول، لكن ليس بشكل تعسفي."},
    {q:"هل المنصات الإلكترونية ملزمة بحماية بياناتي؟", a:"نعم، بموجب قوانين مثل COPPA، GDPR، أو سياسات المنصة نفسها."},
    {q:"ماذا أفعل إذا تم رفض خدمتي بسبب التمييز؟", a:"يمكنك الإبلاغ إلى وزارة العدل أو وكالة حقوق الإنسان في الولاية."},
    {q:"هل يمكن للشرطة تفتيش هاتفي؟", a:"عادة لا، إلا إذا كان لديهم مذكرة أو ظروف طارئة."},
    {q:"هل لديّ الحق في الاحتجاج السلمي؟", a:"نعم، يمكنك التجمع والاحتجاج السلمي في الأماكن العامة."},
    {q:"هل يمكن لمدرستي معاقبتي على منشورات في وسائل التواصل؟", a:"فقط إذا كانت تسبب اضطرابًا كبيرًا في سير المدرسة."},
    {q:"من يمكنه مساعدتي إذا تعرضت للمضايقة عبر الإنترنت؟", a:"أبلغ مسؤولي المنصة، أو الشرطة المحلية، أو منظمات مثل Cyber Civil Rights Initiative."},
    {q:"ما هي حقوقي إذا احتجزتني ICE؟", a:"لديك الحق في البقاء صامتًا وطلب محامٍ فورًا."}
  ]
};

// Merge into existing faqData arrays
Object.keys(faqData).forEach(lang => {
  faqData[lang].push(...newFAQs[lang]);
});

// Ensure the home screen shows first after the DOM loads
document.addEventListener('DOMContentLoaded', function() {
    showScreen('home-screen');
});
