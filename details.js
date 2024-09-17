/**
 * Carga los detalles del paciente en la página de detalles.
 */
function loadPatientDetails() {
    const patientId = Number(localStorage.getItem('currentPatientId'));
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients[patientId];

    if (!patient) {
        alert('Paciente no encontrado.');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('patientNameDetail').innerText = patient.name || 'No especificado';
    document.getElementById('patientDocumentTypeDetail').innerText = patient.documentType || 'No especificado';
    document.getElementById('patientDocumentNumberDetail').innerText = patient.documentNumber || 'No especificado';
    document.getElementById('patientAgeDetail').innerText = patient.age || 'No especificada';
    document.getElementById('patientDateOfBirthDetail').innerText = patient.dateOfBirth || 'No especificada';

    showPatientFormats(patientId);
}

/**
 * Muestra los formatos asociados a un paciente.
 * @param {number} patientId - Índice del paciente en el almacenamiento local.
 */
function showPatientFormats(patientId) {
    const formats = JSON.parse(localStorage.getItem('formats')) || [];
    const formatsList = document.getElementById('formatsList');
    formatsList.innerHTML = '';  // Limpiar los formatos existentes

    formats.forEach((format, index) => {
        if (format.patientId === patientId) {
            const formatDiv = document.createElement('div');
            formatDiv.innerHTML = `
                <h3>${format.type}</h3>
                <p>Fecha: ${format.date}</p>
                <p>${format.content}</p>
                <button onclick="printFormat(${index})">Imprimir</button>
                <button onclick="deleteFormat(${index})">Eliminar</button>
            `;
            formatsList.appendChild(formatDiv);
        }
    });
}

/**
 * Abre el formulario para agregar o editar un formato.
 * @param {string} type - Tipo de formato.
 */
function openForm(type) {
    document.getElementById('formTitle').innerText = type;
    document.getElementById('formDate').value = '';
    document.getElementById('formContent').value = '';
    document.getElementById('formContainer').style.display = 'block';
}

/**
 * Guarda un formato en el almacenamiento local.
 */
function saveForm() {
    const patientId = Number(localStorage.getItem('currentPatientId'));
    const type = document.getElementById('formTitle').innerText;
    const date = document.getElementById('formDate').value;
    const content = document.getElementById('formContent').value;

    if (!date || !content) {
        alert('Fecha y contenido son obligatorios.');
        return;
    }

    const formats = JSON.parse(localStorage.getItem('formats')) || [];
    formats.push({
        patientId,
        type,
        date,
        content
    });

    localStorage.setItem('formats', JSON.stringify(formats));
    document.getElementById('formContainer').style.display = 'none';
    showPatientFormats(patientId);
}

/**
 * Cancela la adición o edición de un formato.
 */
function cancelForm() {
    document.getElementById('formContainer').style.display = 'none';
}

/**
 * Imprime un formato (función de ejemplo, no implementada).
 * @param {number} index - Índice del formato en el almacenamiento local.
 */
function printFormat(index) {
    alert('Función de impresión no implementada.');
}

/**
 * Elimina un formato.
 * @param {number} index - Índice del formato en el almacenamiento local.
 */
function deleteFormat(index) {
    const formats = JSON.parse(localStorage.getItem('formats')) || [];
    formats.splice(index, 1);
    localStorage.setItem('formats', JSON.stringify(formats));
    loadPatientDetails();
}

/**
 * Regresa a la página principal.
 */
function goBack() {
    window.location.href = 'index.html';
}
