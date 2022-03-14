import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Bad request' });
  }
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Bad request' });
  }
  const data = await prisma.user.findMany({
    where: {
      email,
    },
  });
  if (data.length === 0) {
    return res
      .status(200)
      .json({ error: "Account Doesn't exists", success: false });
  }
  const { address } = data[0];
  res.status(200).json({ success: true, address });
};
export default handler;
