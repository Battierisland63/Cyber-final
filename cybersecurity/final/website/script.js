// script.js - Interactive functionality for Digital Threat Awareness Lab

document.addEventListener('DOMContentLoaded', () => {
  // Matrix rain effect
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    
    const chars = '01';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0'; // fallback matrix green
      ctx.fillStyle = '#00ffab'; // match our theme
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    setInterval(drawMatrix, 50);
    
    window.addEventListener('resize', () => {
      resizeCanvas();
    });
  }

  // Assign section index for CSS animation delay
  const sections = document.querySelectorAll('.section');
  sections.forEach((sec, idx) => {
    sec.style.setProperty('--section-index', idx);
  });

  // Smooth scroll handling for navigation links
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Quiz data
  const quizData = [
    {
      question: "What is a common sign of a phishing email?",
      options: [
        "Official company logo",
        "Urgent or threatening language",
        "Correct grammar",
        "Personalized greeting"
      ],
      answer: 1
    },
    {
      question: "What should you do before opening files on an unknown USB drive?",
      options: [
        "Plug it in and open the files",
        "Scan the drive with up‑to‑date antivirus",
        "Ignore the warning",
        "Copy files without scanning"
      ],
      answer: 1
    },
    {
      question: "Which feature helps protect accounts even if credentials are compromised?",
      options: ["Two‑factor authentication", "Remember password", "Auto‑login", "Password hint"],
      answer: 0
    }
  ];

  const quizContainer = document.getElementById('quiz-container');
  const resultDiv = document.getElementById('quiz-result');
  const submitBtn = document.getElementById('submit-quiz');

// Render quiz with modern card UI
const renderQuiz = () => {
  quizData.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    const qTitle = document.createElement('p');
    qTitle.textContent = `${i + 1}. ${q.question}`;
    card.appendChild(qTitle);
    q.options.forEach((opt, idx) => {
      const label = document.createElement('label');
      label.className = 'option';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `q${i}`;
      radio.value = idx;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(' ' + opt));
      card.appendChild(label);
    });
    quizContainer.appendChild(card);
  });
};


  renderQuiz();

  // Submit handler
  submitBtn.addEventListener('click', () => {
    let score = 0;
    quizData.forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) {
        score++;
      }
    });
    resultDiv.textContent = `You scored ${score} out of ${quizData.length}`;
    resultDiv.classList.add('show');
  });
});
