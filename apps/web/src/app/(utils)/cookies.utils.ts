import { cookies } from "next/headers";

export const getCookie = async (key: string): Promise<string[]> => {
  const cookieStore = await cookies();
  const values = cookieStore.get(key);
  const valuesArray = values ? JSON.parse(values?.value) : [];
  return valuesArray;
};

export const setValueInCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  const values = cookieStore.get(key);
  const valuesArray = values ? JSON.parse(values?.value) : [];
  if (valuesArray.includes(value)) {
    valuesArray.splice(valuesArray.indexOf(value), 1);
  }
  valuesArray.push(value);
  cookieStore.set(key, JSON.stringify(valuesArray));
};

export const removeValueFromCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  const values = cookieStore.get(key);
  const valuesArray = values ? JSON.parse(values?.value) : [];
  valuesArray.splice(valuesArray.indexOf(value), 1);
  cookieStore.set(key, JSON.stringify(valuesArray));
};
