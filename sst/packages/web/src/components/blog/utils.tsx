import React from 'react'
export const fmt = 'MMM DD, YYYY';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  jsx?: boolean
  teaser?: string
  default: any
}