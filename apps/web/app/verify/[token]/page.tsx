"use client";

import React from 'react';
import { ConsumerVerificationPage } from '@/components/consumer/ConsumerVerificationPage';

export default function VerifyTokenPage({ params }: { params: { token: string } }) {
  return <ConsumerVerificationPage token={params.token} />;
}
