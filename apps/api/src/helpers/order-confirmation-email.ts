import { AddressType, OrderStatus } from "@repo/database";

export type OrderConfirmationEmail = {
  orderNumber: string;
  orderTotal: number;
  items: {
    name: string;
    quantity: number;
    brand: string;
    price: number;
    size: string;
    image: string;
  }[];
  shippingEstimates: {
    cost: number;
    brand: {
      id: string;
      name: string;
    };
  }[];
  status: OrderStatus;
  address: {
    addressType: AddressType;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    governorate: string;
    country: string;
    postalCode: string;
    company: string;
    createdAt: Date;
  };
};
function formatEmailNotification(
  items: OrderConfirmationEmail["items"]
): string {
  const brands = [...new Set(items.map((item) => item.brand))].map(
    (brand) => brand.charAt(0).toUpperCase() + brand.slice(1)
  );

  if (brands.length === 0) return "";
  if (brands.length === 1)
    return `You'll receive another email from ${brands[0]} once we place your order.`;
  if (brands.length === 2)
    return `You'll receive emails from ${brands[0]} and ${brands[1]} once we place your order.`;

  const lastBrand = brands[brands.length - 1];
  const otherBrands = brands.slice(0, -1);
  return `You'll receive emails from ${otherBrands.join(", ")}, and ${lastBrand} once we place your order.`;
}

export const getOrderConfirmationHtml = (order: OrderConfirmationEmail) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://res.cloudinary.com/dffgye7z3/image/upload/v1747755019/loom-black_bywezj.png" />
    <link
      rel="preload"
      as="image"
      href="https://res.cloudinary.com/dffgye7z3/image/upload/v1749728666/DSC07933_zozyii.webp" />
    <link
      rel="preload"
      as="image"
      href="https://res.cloudinary.com/dffgye7z3/image/upload/v1749728478/DSC02802-1_e93868e6-c9e3-42d5-b81e-e7d44625e838_yx3u0u.webp" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    </style>
  </head>
  <body
    style='margin:0px;background-color:rgb(244,243,255);padding:0px;font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'>
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Loom - Order Confirmation #${order.orderNumber}
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="margin-left:auto;margin-right:auto;display:flex;min-height:100vh;max-width:600px;align-items:center;justify-content:center">
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top:3rem;margin-bottom:3rem;border-radius:1rem;background-color:rgb(255,255,255);padding:2rem;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000">
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="margin-top:2rem;margin-bottom:3rem;text-align:center">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              alt="Loom Logo"
                              height="36"
                              src="https://res.cloudinary.com/dffgye7z3/image/upload/v1747755019/loom-black_bywezj.png"
                              style="margin-left:auto;margin-right:auto;margin-bottom:1rem;display:block;outline:none;border:none;text-decoration:none" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="border-radius:0.5rem;background-color:rgb(255,255,255);padding:2rem;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000">
                      <tbody>
                        <tr>
                          <td>
                            <h1
                              style="margin-bottom:1.5rem;text-align:center;font-size:1.5rem;line-height:2rem;font-weight:600;color:rgb(31,41,55)">
                              Thank you for your order!
                            </h1>
                            <p
                              style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);margin-bottom:1rem;margin-top:16px">
                              Hi
                              <!-- -->${order.address.firstName}<!-- -->
                              <!-- -->${order.address.lastName}<!-- -->,
                            </p>
                            <p
                              style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);margin-bottom:1rem;margin-top:16px">
                              Your order is now pending.
                              <!-- -->${formatEmailNotification(order.items)}
                            </p>
                            <a
                              href="https://loomcairo.com/orders/${order.orderNumber}"
                              class="hover:bg-brand/90"
                              style="background-color:rgb(166,162,222);display:inline-block;border-radius:9999px;padding-left:2rem;padding-right:2rem;padding-top:0.75rem;padding-bottom:0.75rem;font-size:1rem;line-height:1.5rem;font-weight:600;color:rgb(255,255,255);text-decoration-line:none"
                              target="_blank"
                              >View order</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="margin-top:1rem;border-radius:0.5rem;background-color:rgb(255,255,255);padding:1.5rem;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000">
                      <tbody>
                        <tr>
                          <td>
                            <h1
                              style="margin-bottom:1rem;font-size:1.125rem;line-height:1.75rem;font-weight:600;color:rgb(31,41,55)">
                              Order summary
                            </h1>
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="width:100%;border-collapse:collapse">
                              <tbody>
                                ${order.items
                                  .map(
                                    (item) => `
                                    <tr>
                                      <td
                                        style="padding:4px 0;vertical-align:top;width:60px">
                                        <img
                                          alt="${item.name}"
                                          height="56"
                                          src="${item.image}"
                                          style="border-radius:0.375rem;border-width:1px;object-fit:cover;display:block;outline:none;border:none;text-decoration:none"
                                          width="56" />
                                      </td>
                                      <td style="padding:4px 0;vertical-align:top">
                                        <p
                                          style="font-weight:500;color:rgb(31,41,55);font-size:14px;line-height:24px;margin-top:16px;margin-bottom:16px">
                                            ${item.name}<!-- -->
                                            ×
                                            <!-- -->${item.quantity}
                                          </p>
                                          <p
                                            style="font-size:0.75rem;line-height:1rem;color:rgb(107,114,128);margin-top:16px;margin-bottom:16px;text-transform:capitalize">
                                            ${item.size}<!-- -->
                                            -
                                            <!-- -->${item.brand}
                                          </p>
                                      </td>
                                      <td
                                        style="padding:4px 0;vertical-align:top;text-align:right;min-width:80px">
                                        <p
                                          style="font-weight:600;color:rgb(31,41,55);font-size:14px;line-height:24px;margin-top:16px;margin-bottom:16px">
                                            EGP
                                            <!-- -->${item.price}
                                          </p>
                                      </td>
                                    </tr>
                                  `
                                  )
                                  .join("")}
                              </tbody>
                            </table>
                            <hr
                              style="margin-top:0.75rem;margin-bottom:0.75rem;border-width:1px;border-color:rgb(229,231,235);width:100%;border:none;border-top:1px solid #eaeaea" />
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="width:100%;font-size:0.875rem;line-height:1.25rem;border-collapse:collapse">
                              <tbody>
                                <tr>
                                  <td style="color:rgb(75,85,99)">Subtotal</td>
                                  <td
                                    style="font-weight:500;color:rgb(31,41,55);text-align:right">
                                    EGP<!-- -->
                                    <!-- -->${order.orderTotal - order.shippingEstimates.reduce((sum, est) => sum + est.cost, 0)}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="color:rgb(75,85,99)">Shipping</td>
                                  <td
                                    style="font-weight:500;color:rgb(31,41,55);text-align:right">
                                    EGP<!-- -->
                                    <!-- -->${order.shippingEstimates.reduce((sum, est) => sum + est.cost, 0)}
                                  </td>
                                </tr>
                                ${order.shippingEstimates
                                  .map(
                                    (est) => `
                                  <tr>
                                    <td
                                      style="padding-left:1rem;font-size:0.75rem;line-height:1rem;color:rgb(107,114,128);text-transform:capitalize  ">
                                      Shipping -
                                      <!-- -->${est.brand.name}
                                    </td>
                                    <td
                                      style="font-size:0.75rem;line-height:1rem;color:rgb(107,114,128);text-align:right">
                                      EGP
                                      <!-- -->${est.cost}
                                    </td>
                                  </tr>
                                `
                                  )
                                  .join("")}
                                <tr>
                                  <td colspan="2">
                                    <div
                                      style="margin-top:0.5rem;margin-bottom:0.5rem;border-top-width:1px;border-color:rgb(229,231,235)"></div>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="font-size:1rem;line-height:1.5rem;font-weight:600;color:rgb(31,41,55)">
                                    Total
                                  </td>
                                  <td
                                    style="font-size:1rem;line-height:1.5rem;font-weight:700;color:rgb(17,24,39);text-align:right">
                                    EGP
                                    <!-- -->${order.orderTotal}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr
                      style="margin-top:1rem;margin-bottom:1rem;border-width:1px;border-color:rgb(229,231,235);width:100%;border:none;border-top:1px solid #eaeaea" />
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="border-radius:0.5rem;background-color:rgb(255,255,255);padding:1.5rem;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000">
                      <tbody>
                        <tr>
                          <td>
                            <h1
                              style="margin-bottom:1rem;font-size:1.125rem;line-height:1.75rem;font-weight:600;color:rgb(31,41,55)">
                              Customer information
                            </h1>
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="width:100%;border-collapse:collapse">
                              <tbody>
                                <tr>
                                  <td style="vertical-align:top;width:50%">
                                    <p
                                      style="margin-bottom:0.25rem;font-weight:600;color:rgb(31,41,55);font-size:14px;line-height:24px;margin-top:16px">
                                      Shipping address
                                    </p>
                                    <div
                                      style="font-size:0.875rem;line-height:1.25rem;color:rgb(55,65,81)">
                                      <div>
                                        ${order.address.firstName}<!-- -->
                                        <!-- -->${order.address.lastName}
                                      </div>
                                      <div>
                                        ${order.address.address}
                                      </div>
                                      ${order.address.apartment ? `<div>${order.address.apartment}</div>` : ""}
                                      <div>${order.address.city}</div>
                                      <div>${order.address.postalCode}</div>
                                      <div>${order.address.country}</div>
                                    </div>
                                  </td>
                                  <td style="vertical-align:top;width:50%"></td>
                                </tr>
                              </tbody>
                            </table>
                            <div style="margin-top:1.5rem">
                              <p
                                style="margin-bottom:0.25rem;font-weight:600;color:rgb(31,41,55);font-size:14px;line-height:24px;margin-top:16px">
                                Shipping method
                              </p>
                              <div
                                style="font-size:0.875rem;line-height:1.25rem;color:rgb(55,65,81)">
                                Cairo
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr
                      style="margin-top:1rem;margin-bottom:1rem;border-width:1px;border-color:rgb(229,231,235);width:100%;border:none;border-top:1px solid #eaeaea" />
                    <p
                      style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);margin-top:16px;margin-bottom:16px">
                      If you have any questions, contact us at<!-- -->
                      <a
                        href="mailto:contact@loomcairo.com"
                        style="color:rgb(166,162,222);text-decoration-line:none"
                        target="_blank"
                        >contact@loomcairo.com</a
                      >
                    </p>
                    <div
                      style="margin-top:1rem;display:flex;flex-direction:column;gap:0.5rem">
                      <div
                        style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81)">
                        Thank you for shopping with Loom,
                      </div>
                      <div
                        style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);font-weight:600">
                        The Loom Team
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top:2rem;margin-bottom:2rem;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:0.875rem;line-height:1.25rem;color:rgb(107,114,128);margin-top:16px;margin-bottom:16px">
                      © 2025 Loom. All rights reserved.
                    </p>
                    <p
                      style="font-size:0.875rem;line-height:1.25rem;color:rgb(107,114,128);margin-top:16px;margin-bottom:16px">
                      Cairo, Egypt
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`;
};
