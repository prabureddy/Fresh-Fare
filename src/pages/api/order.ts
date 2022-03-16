import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Bad request' });
  }
  const { email, orderId } = req.body;
  if (!email && orderId) {
    return res.status(400).json({ error: 'Bad request' });
  }
  const data = await prisma.order.findMany({
    where: {
      email,
    },
  });
  const order = (data as []).find((o: any) => o.order.orderId === orderId);
  if (!order) {
    return res.status(200).json({ error: 'Order Not found!', success: false });
  }
  res.status(200).json({ success: true, order });
};
export default handler;
