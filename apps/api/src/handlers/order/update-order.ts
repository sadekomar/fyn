import { Request, Response } from "express";
import { handleExceptions } from "../../helpers/utils";
import { prisma, Order } from "@repo/database";
import { UpdateOrderRequest, UpdateOrderResponse } from "./order";
import { Resend } from "resend";

export const updateOrder = handleExceptions(
  async (
    req: Request<any, {}, UpdateOrderRequest>,
    res: Response<UpdateOrderResponse>
  ) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    sendOrderCancellationEmail(order);

    return res.status(200).json({
      status: "success",
      message: "Order updated successfully",
      data: {
        orderId: order.id,
        status: order.status,
      },
    });
  }
);

async function sendOrderCancellationEmail(order: Order) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Loom Cairo <orders@loomcairo.com>",
    to: order.email,
    subject: "Order Confirmation",
    html: "<h1>Order canceled</h1>",
  });
}
