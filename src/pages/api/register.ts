import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Bad request' });
  }
  const { email, password, name = '' } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  const data = await prisma.user.findMany({
    where: {
      email,
      password,
    },
  });
  if (data.length > 0) {
    return res
      .status(200)
      .json({ error: 'Account Already exists', success: false });
  }
  await prisma.user.create({
    data: {
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    },
  });
  res.status(200).json({ success: true });
};
export default handler;
