// =====================================================================
// 🚨 CONFIGURATION EMAILJS (VERSION PROPRE) 🚨
// =====================================================================

const EMAILJS_PUBLIC_KEY = "qL-nvLHRILPE-D7Ra"; 
const EMAILJS_SERVICE_ID = "service_1rmhcfc"; 
const EMAILJS_TEMPLATE_ID = "template_6nk8ub8";

// Initialisation
emailjs.init(EMAILJS_PUBLIC_KEY); 

// =====================================================================
// FONCTIONS DE NAVIGATION ET ANIMATIONS
// =====================================================================
const totalSteps = 6;

function updateProgressBar(step) {
    const progress = (step / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

function nextStep(current, next) {
    document.getElementById('step-' + current).classList.remove('active');
    document.getElementById('step-' + next).classList.add('active');
    updateProgressBar(next);
    if(next === 2) triggerLightFlowers();
}

function prevStep(current, prev) {
    document.getElementById('step-' + current).classList.remove('active');
    document.getElementById('step-' + prev).classList.add('active');
    updateProgressBar(prev);
}

// ... (Garde le reste de ton code comme avant, jusqu'à la fonction sendEmail) ...

// =====================================================================
// ENVOI EMAIL (CORRIGÉ)
// =====================================================================
function sendEmail(event) {
    event.preventDefault();
    const btn = document.getElementById("btn-envoyer");
    btn.innerText = "Envoi en cours... ⏳";
    btn.disabled = true;

    const templateParams = {
        prenom: document.getElementById('prenom').value || "Non renseigné",
        age: document.getElementById('age').value || "Non renseigné",
        ville: document.getElementById('ville').value || "Non renseigné",
        temperament: getRadioValue('temperament'),
        weekend: getRadioValue('weekend'),
        hobbies: getCheckedValues('hobbies'),
        sortie: document.getElementById('sortie').value || "Non renseigné",
        date_rdv: document.getElementById('date_rdv').value || "Non renseigné"
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function() {
            document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
            document.getElementById('step-success').classList.add('active');
            updateProgressBar(6);
            triggerMassiveExplosion();
        }, function(error) {
            console.error("Erreur:", error);
            alert("Erreur: " + error.text + "\n\nTon Service ID '" + EMAILJS_SERVICE_ID + "' n'est pas reconnu par EmailJS.");
            btn.innerText = "❤️ Envoyer mes réponses";
            btn.disabled = false;
        });
}