import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Bad request' });
  }
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Bad request' });
  }
  await prisma.message.create({
    data: {
      message,
      createdAt: new Date().toISOString(),
    },
  });
  res.status(200).json({ success: true });
};
export default handler;
