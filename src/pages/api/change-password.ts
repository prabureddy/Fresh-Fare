import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Bad request' });
  }
  const { newPassword, oldPassword, email } = req.body;
  if (!(email && newPassword && oldPassword)) {
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
  if (data[0].password !== oldPassword) {
    return res
      .status(200)
      .json({ error: "Password Doesn't match", success: false });
  }
  await prisma.user.update({
    where: {
      id: data[0].id,
    },
    data: {
      password: newPassword,
    },
  });
  res.status(200).json({ success: true });
};
export default handler;
