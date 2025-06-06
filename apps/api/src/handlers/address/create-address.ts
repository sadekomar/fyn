import { Request, Response } from "express";
import { CreateAddressRequest, CreateAddressResponse } from "./address-types";
import { handleExceptions } from "../../helpers/utils";
import prisma from "../../helpers/prisma";
import { z } from "zod";
import { AddressType } from "@prisma/client";

const createAddressSchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  governorate: z.string().min(1, "Governorate is required"),
  country: z.string().optional().default("Egypt"),
  postalCode: z.string().optional(),
  addressType: z.nativeEnum(AddressType).optional().default(AddressType.NORMAL),
});

export const createAddress = handleExceptions(
  async (
    req: Request,
    res: Response
  ): Promise<Response<CreateAddressResponse>> => {
    const result = createAddressSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        error: result.error.flatten().fieldErrors,
      });
    }

    const validatedData: CreateAddressRequest = result.data;

    const address = await prisma.address.create({
      data: {
        ...validatedData,
        userId: validatedData.userId,
      },
    });

    const response: CreateAddressResponse = {
      status: "success",
      message: "Address created successfully",
      data: address,
    };

    return res.status(201).json(response);
  }
);
