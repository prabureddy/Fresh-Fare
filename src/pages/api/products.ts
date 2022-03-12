import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: any, res: any) => {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Bad request' });
  }
  const data = await prisma.product.findMany();
  res.status(200).json(data);
};
export default handler;
