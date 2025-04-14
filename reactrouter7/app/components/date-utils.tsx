import dayjs from "dayjs";
import Card from "react-bootstrap/cjs/Card";
import moment from "dayjs";

export const dateFmt = 'MMM DD, YYYY';

export function expires(connectionLink: string, expiry: string, standardLink: string) {
  if (dayjs().isAfter(expiry)) {
    return standardLink
  }
  return connectionLink
}

type PostMeta = {created: string, updated?: string, affiliate?: boolean}
export function PostMeta({created, updated, affiliate}: PostMeta) {
  return <Card.Subtitle className='text-muted mb-2'>
    {moment(created).format(dateFmt)}
    {updated && <>
      <span> (updated {moment(updated).format(dateFmt)})</span>
    </>}
    {affiliate && <>
      <span>.&nbsp;</span>
      <span className='text-decoration-underline'>This post may contain affiliate links</span>
    </>}
  </Card.Subtitle>
}
