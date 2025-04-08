import dayjs from "dayjs";

export const dateFmt = 'MMM DD, YYYY';

export function expires(connectionLink: string, expiry: string, standardLink: string) {
  if (dayjs().isAfter(expiry)) {
    return standardLink
  }
  return connectionLink
}

