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
  const data = await prisma.order.findMany({
    where: {
      email,
    },
  });
  res.status(200).json({
    success: true,
    orders: data.map((o: any) => {
      const {
        orderId,
        address,
        total,
        instruction,
        createdAt,
        trackingNo = '',
        items = [],
      } = o.order;
      return {
        id: o.id,
        orderId,
        tracking_number: trackingNo,
        total: total.toFixed(2),
        created_at: createdAt,
        instruction,
        products: items.map((i: any) => {
          return {
            id: i.id,
            name: i.name,
            quantity: i.quantity,
            price: i.price,
            image: {
              id: 1,
              thumbnail: i.image,
            },
          };
        }),
        shipping_address: {
          street_address: address?.address?.formatted_address,
        //   country: 'USA',
        //   city: 'Worcester',
        //   state: 'Massachusetts',
        //   zip: '01609',
        },
      };
    }),
  });
};
export default handler;
