import { PrismaClient, Product } from '@prisma/client';
import http from '../framework/basic-rest/utils/http';
import { API_ENDPOINTS } from '../framework/basic-rest/utils/api-endpoints';
const prisma = new PrismaClient();

async function main() {
  const { data }: { data: any } = await http.get(
    `http://localhost:3000/api/${API_ENDPOINTS.PRODUCTS}`
  );
  // console.log(data);
  const allData = await Promise.all(
    data.map((p: any) => {
      return new Promise(async (r) => {
        const added = await prisma.product.create({
          data: p,
        });
        r(added);
      });
    })
  );
  // const added = await prisma.product.create({
  //   data: data[0],
  // });

  // type ProductCreateInput {
  //   id?: String
  //   name: String
  //   slug: String
  //   price: Int
  //   quantity: Int
  //   sold: Int
  //   unit: String
  //   sale_price?: Int | Null
  //   min_price?: Int | Null
  //   max_price?: Int | Null
  //   image: AttachmentCreateNestedOneWithoutProductInput
  //   sku?: String | Null
  //   gallery?: GalleryCreateNestedManyWithoutProductInput
  //   category: CategoryCreateNestedOneWithoutProductsInput
  //   tag?: TagCreateNestedManyWithoutProductInput
  //   meta?: Json | Null
  //   variations?: Json | Null
  //   description: String
  // }

  // console.log(allData);
  // console.log(added);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = {};
