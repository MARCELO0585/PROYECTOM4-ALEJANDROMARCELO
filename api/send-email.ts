import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email, tasksSummary } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email requerido' });
  }

  try {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: `Hola, aquí tienes el resumen de tus tareas:\n\n${tasksSummary}`,
          },
        },
        Subject: {
          Data: 'Resumen de tus tareas - MateCode',
        },
      },
      Source: process.env.AWS_SES_SENDER_EMAIL || "no-reply@matecode.com",
    });

    await ses.send(command);
    return res.status(200).json({ success: true, message: 'Email enviado correctamente' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error interno al enviar correo';
    console.error('Error al enviar email con SES:', error);
    return res.status(500).json({ error: errorMessage });
  }
}
