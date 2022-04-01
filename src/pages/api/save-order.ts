import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Bad request' });
  }
  const {
    email,
    orderId,
    paymentId,
    total = ``,
    items,
    totalItems = 0,
    totalUniqueItems = 0,
    instruction = '',
    address = {},
  } = req.body;
  if (!(email && orderId && paymentId)) {
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
  const { firstName, lastName, phoneNumber } = data[0];
  await prisma.order.create({
    data: {
      email,
      firstName,
      lastName,
      phoneNumber,
      createdAt: new Date().toISOString(),
      order: {
        orderId,
        paymentId,
        total,
        instruction,
        address,
        trackingNo: `#${Math.random().toString(16).slice(2)}`,
        items,
        totalItems,
        totalUniqueItems,
        createdAt: new Date(),
      } as any,
    },
  });
  res.status(200).json({ success: true });
};
export default handler;
