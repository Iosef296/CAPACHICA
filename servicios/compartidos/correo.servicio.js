// backend/servicios/compartidos/correo.servicio.js
// Simulación de envío de correo (en producción usar nodemailer o servicio externo)
class CorreoService {
    async enviar({ to, subject, template, context }) {
        console.log(`📧 Enviando correo a ${to}`);
        console.log(`Asunto: ${subject}`);
        console.log(`Plantilla: ${template}`);
        console.log('Contexto:', context);
        // En implementación real: usar nodemailer o SendGrid
        return { success: true };
    }
}

module.exports = new CorreoService();