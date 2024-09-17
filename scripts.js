// Inicializar los pacientes y formatos en el almacenamiento local
if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify([]));
}
if (!localStorage.getItem('formats')) {
    localStorage.setItem('formats', JSON.stringify([]));
}

// Credenciales de usuario
const USERS = {
    'admin': '0204', // Cambia esto por una contraseña segura
    'invitado': '123456789', // Contraseña para el usuario 0204
    'psicologa': '221099' // Contraseña para el usuario psicologa
};

/**
 * Maneja el inicio de sesión.
 */
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (USERS[username] === password) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        showPatients();
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

/**
 * Muestra la lista de pacientes en la tabla.
 */
function showPatients() {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const tbody = document.querySelector('#patientsTable tbody');
    tbody.innerHTML = '';

    patients.forEach((patient, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.age || 'No especificada'}</td>
            <td>${patient.dateOfAdmission || 'No especificada'}</td>
            <td>
                <button onclick="viewPatient(${index})">Ver</button>
                ${isAdmin() ? `<button onclick="deletePatient(${index})">Eliminar</button>` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Verifica si el usuario actual es un administrador.
 * @returns {boolean} - True si el usuario es admin, false en caso contrario.
 */
function isAdmin() {
    const username = document.getElementById('username').value.trim();
    return username === 'admin';
}

/**
 * Muestra el formulario para agregar un paciente.
 */
function showAddPatientForm() {
    document.getElementById('addPatientForm').style.display = 'block';
}

/**
 * Oculta el formulario para agregar un paciente.
 */
function hideAddPatientForm() {
    document.getElementById('addPatientForm').style.display = 'none';
}

/**
 * Agrega un paciente al almacenamiento local.
 */
function addPatient() {
    const name = document.getElementById('patientName').value.trim();
    const documentType = document.getElementById('documentType').value;
    const documentNumber = document.getElementById('documentNumber').value.trim();
    const age = document.getElementById('patientAge').value.trim();
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const dateOfAdmission = document.getElementById('dateOfAdmission').value;

    if (!name || !documentNumber || !dateOfAdmission) {
        alert('Nombre, número de documento y fecha de ingreso son obligatorios.');
        return;
    }

    if (age && (isNaN(age) || age <= 0)) {
        alert('La edad debe ser un número positivo.');
        return;
    }

    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push({
        name,
        documentType,
        documentNumber,
        age,
        dateOfBirth,
        dateOfAdmission
    });

    localStorage.setItem('patients', JSON.stringify(patients));
    alert('Paciente añadido exitosamente.');
    document.getElementById('addPatientForm').style.display = 'none';
    showPatients();
}

/**
 * Muestra los detalles de un paciente específico.
 * @param {number} index - Índice del paciente en el almacenamiento local.
 */
function viewPatient(index) {
    localStorage.setItem('currentPatientId', index);
    window.location.href = 'details.html'; // Asegúrate de que esta ruta sea correcta
}

/**
 * Elimina un paciente del almacenamiento local.
 * @param {number} index - Índice del paciente en el almacenamiento local.
 */
function deletePatient(index) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.splice(index, 1);
    localStorage.setItem('patients', JSON.stringify(patients));
    showPatients();
}

/**
 * Cierra la sesión y regresa a la página de inicio.
 */
function logout() {
    // Limpia el almacenamiento local
    localStorage.removeItem('currentPatientId');
    
    // Muestra el formulario de inicio de sesión y oculta todo lo demás
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('addPatientForm').style.display = 'none';
    
    // Limpia el formulario de inicio de sesión
    document.getElementById('loginForm').reset();
}



