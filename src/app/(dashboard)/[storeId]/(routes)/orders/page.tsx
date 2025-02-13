import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import prismadb from "@/lib/prismadb";
import { formatPrice } from "@/lib/price-format";
import { OrderColumn } from "@/components/dashboard/orders/orders-columns";
import { OrderClient } from "@/components/dashboard/orders/order-client";

interface OrdersPageProps {
  params: Promise<{ storeId: string }>;
}

const OrdersPage = async ({ params }: OrdersPageProps) => {
  const { storeId } = await params;
  const orders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatPrice(
      item.orderItems.reduce((total, item) => {
        return total + item.product.price;
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.updatedAt, "do MMMM, yyyy", { locale: fr }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
