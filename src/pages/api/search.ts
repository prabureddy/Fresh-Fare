import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: any, res: any) => {
  if (req.method !== 'GET') {
    return res.status(400).json({ error: 'Bad request' });
  }
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Bad request' });
  }
  const data = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        },
        {
          sku: {
            contains: q,
            mode: 'insensitive',
          },
        },
      ],
    },
  });
  res.status(200).json(data);
};
export default handler;
