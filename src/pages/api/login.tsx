import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Bad request' });
  }
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  const data = await prisma.user.findMany({
    where: {
      email,
      password,
    },
  });
  res
    .status(200)
    .json(
      data.length
        ? { success: true }
        : { success: false, error: 'Invalid Credientials' }
    );
};
export default handler;
