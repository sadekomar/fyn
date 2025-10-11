export const getEmailConfirmationHtml = (name: string, token: string) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://res.cloudinary.com/dffgye7z3/image/upload/v1747755019/loom-black_bywezj.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    </style>
  </head>
  <body
    style='font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";background-color:rgb(244,243,255);margin:0px;padding:0px'>
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Welcome to Loom - Please Confirm Your Email!
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:600px;margin-left:auto;margin-right:auto">
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
              style="background-color:rgb(255,255,255);border-radius:0.5rem;padding:2rem;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000">
              <tbody>
                <tr>
                  <td>
                    <h1
                      style="font-size:1.5rem;line-height:2rem;font-weight:600;color:rgb(31,41,55);margin-bottom:1.5rem;text-align:center">
                      Confirm your email
                    </h1>
                    <p
                      style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);margin-bottom:1rem;margin-top:16px">
                      Hi ${name},
                    </p>
                    <p
                      style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);margin-bottom:1rem;margin-top:16px">
                      Welcome to Loom! We&#x27;re excited for you to discover
                      the world of fashion in Cairo. To get started, please
                      confirm your email by clicking the button below:
                    </p>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="text-align:center;margin-bottom:2rem">
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="${process.env.FRONTEND_URL}/verify-email?token=${token}"
                              class="hover:bg-brand/90"
                              style="background-color:rgb(166,162,222);color:rgb(255,255,255);padding-left:2rem;padding-right:2rem;padding-top:0.75rem;padding-bottom:0.75rem;border-radius:9999px;font-size:1rem;line-height:1.5rem;font-weight:600;display:inline-block;text-decoration-line:none"
                              target="_blank"
                              >Confirm your email</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);margin-bottom:1rem;margin-top:16px">
                      This link will expire in 1 hour. After confirmation,
                      you&#x27;ll have full access to your Loom account.
                    </p>
                    <hr
                      style="border-width:1px;border-color:rgb(229,231,235);margin-top:1.5rem;margin-bottom:1.5rem;width:100%;border:none;border-top:1px solid #eaeaea" />
                    <p
                      style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);margin-bottom:1rem;margin-top:16px">
                      If you didn&#x27;t create an account with Loom, please
                      ignore this email or contact us at<!-- -->
                      <a
                        href="mailto:contact@loomcairo.com"
                        style="color:rgb(166,162,222);text-decoration-line:none"
                        target="_blank"
                        >contact@loomcairo.com</a
                      >
                    </p>
                    <p
                      style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);margin-bottom:0.25rem;margin-top:16px">
                      Best regards,
                    </p>
                    <p
                      style="font-size:1rem;line-height:1.5rem;color:rgb(55,65,81);font-weight:600;margin-top:16px;margin-bottom:16px">
                      The Loom Team
                    </p>
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
              style="text-align:center;margin-top:2rem;margin-bottom:2rem">
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

export const getApplicationConfirmationHtml = (name: string) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://res.cloudinary.com/dffgye7z3/image/upload/v1747755019/loom-black_bywezj.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    </style>
  </head>
  <body
    style='font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";background-color:rgb(244,243,255);margin:0px;padding:0px'>
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Welcome to Loom - Application Received!
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:600px;margin-left:auto;margin-right:auto">
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
              style="background-color:rgb(255,255,255);border-radius:0.5rem;padding:2rem;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000">
              <tbody>
                <tr>
                  <td>
                    <h1
                      style="margin-bottom:1.5rem;text-align:center;font-size:1.5rem;line-height:2rem;font-weight:600;color:rgb(31,41,55)">
                      Loom application confirmation!
                    </h1>
                    <p
                      style="color:rgb(55,65,81);margin-bottom:1rem;font-size:14px;line-height:24px;margin-top:16px">
                      Hi ${name},
                    </p>
                    <p
                      style="color:rgb(55,65,81);margin-bottom:1rem;font-size:14px;line-height:24px;margin-top:16px">
                      Thank you for taking the first step towards joining Loom!
                      We&#x27;re excited to review your application and learn
                      more about how you can contribute to making Cairo the
                      fifth fashion capital of the world! 🎉
                    </p>
                    <p
                      style="color:rgb(55,65,81);margin-bottom:1rem;font-size:14px;line-height:24px;margin-top:16px">
                      Here&#x27;s what happens next:
                    </p>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding-left:1rem;margin-bottom:1.5rem">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="color:rgb(55,65,81);margin-bottom:0.5rem;font-size:14px;line-height:24px;margin-top:16px">
                              1. Our team will review your application (1-2
                              business days)
                            </p>
                            <p
                              style="color:rgb(55,65,81);margin-bottom:0.5rem;font-size:14px;line-height:24px;margin-top:16px">
                              2. If your profile matches our requirements,
                              we&#x27;ll schedule an interview
                            </p>
                            <p
                              style="color:rgb(55,65,81);margin-bottom:0.5rem;font-size:14px;line-height:24px;margin-top:16px">
                              3. You&#x27;ll receive detailed feedback after the
                              interview process
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr
                      style="border-width:1px;border-color:rgb(229,231,235);margin-top:1.5rem;margin-bottom:1.5rem;width:100%;border:none;border-top:1px solid #eaeaea" />
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="text-align:center;margin-bottom:1.5rem">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="color:rgb(55,65,81);margin-bottom:1rem;font-size:14px;line-height:24px;margin-top:16px">
                              While you wait, connect with us on social media:
                            </p>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="text-align:center">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td
                                    align="center"
                                    data-id="__react-email-column">
                                    <a
                                      href="https://instagram.com/loomcairo"
                                      class="hover:text-brand-dark"
                                      style="color:rgb(166,162,222);margin-left:0.5rem;margin-right:0.5rem;text-decoration-line:none"
                                      target="_blank"
                                      >Instagram</a
                                    >
                                    <p
                                      style="color:rgb(156,163,175);margin-left:0.5rem;margin-right:0.5rem;display:inline;font-size:14px;line-height:24px;margin-top:16px;margin-bottom:16px">
                                      •
                                    </p>
                                    <a
                                      href="https://tiktok.com/@loomcairo"
                                      class="hover:text-brand-dark"
                                      style="color:rgb(166,162,222);margin-left:0.5rem;margin-right:0.5rem;text-decoration-line:none"
                                      target="_blank"
                                      >TikTok</a
                                    >
                                    <p
                                      style="color:rgb(156,163,175);margin-left:0.5rem;margin-right:0.5rem;display:inline;font-size:14px;line-height:24px;margin-top:16px;margin-bottom:16px">
                                      •
                                    </p>
                                    <a
                                      href="https://linkedin.com/company/loom-cairo"
                                      class="hover:text-brand-dark"
                                      style="color:rgb(166,162,222);margin-left:0.5rem;margin-right:0.5rem;text-decoration-line:none"
                                      target="_blank"
                                      >LinkedIn</a
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      style="color:rgb(55,65,81);margin-bottom:1rem;font-size:14px;line-height:24px;margin-top:16px">
                      If you have any questions, don&#x27;t hesitate to reach
                      out to us at<!-- -->
                      <a
                        href="mailto:contact@loomcairo.com"
                        style="color:rgb(166,162,222);text-decoration-line:none"
                        target="_blank"
                        >contact@loomcairo.com</a
                      >
                    </p>
                    <p
                      style="color:rgb(55,65,81);margin-bottom:0.25rem;font-size:14px;line-height:24px;margin-top:16px">
                      Best regards,
                    </p>
                    <p
                      style="color:rgb(55,65,81);font-weight:600;font-size:14px;line-height:24px;margin-top:16px;margin-bottom:16px">
                      The Loom Team
                    </p>
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
              style="text-align:center;margin-top:2rem;margin-bottom:2rem">
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
