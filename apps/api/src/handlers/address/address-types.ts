import { Address, AddressType } from "@prisma/client";

// Create
export type CreateAddressRequest = {
  userId: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  city: string;
  governorate: string;
  country?: string;
  postalCode?: string;
  addressType?: AddressType;
};

type CreateAddressSuccessResponse = {
  status: "success";
  message: string;
  data: Address;
};

type CreateAddressErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type CreateAddressResponse =
  | CreateAddressSuccessResponse
  | CreateAddressErrorResponse;

// Read
type ReadAddressesSuccessResponse = {
  status: "success";
  message: string;
  data: Address[];
};

type ReadAddressesErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type ReadAddressesResponse =
  | ReadAddressesSuccessResponse
  | ReadAddressesErrorResponse;

// Delete
type DeleteAddressSuccessResponse = {
  status: "success";
  message: string;
  data: Address;
};

type DeleteAddressErrorResponse = {
  status: "error";
  error: {
    [key: string]: string[];
  };
};

export type DeleteAddressResponse =
  | DeleteAddressSuccessResponse
  | DeleteAddressErrorResponse;
