/* eslint-disable @typescript-eslint/no-explicit-any */
// services/emailService.js

export const sendEmail = async (templateParams: any) => {
  // Estas constantes deben ser reemplazadas por tus valores reales de EmailJS
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  try {
    const data = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: USER_ID,
      template_params: templateParams,
    };

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok || response.status === 200) {
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error("Error al enviar email:", errorText);
      return { success: false, error: errorText };
    }
  } catch (error: unknown) {
    console.error("Error en la petición:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};
