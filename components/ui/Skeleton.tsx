'use client';

import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  circle?: boolean;
}

export function Skeleton({ className, width, height, circle }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'skeleton',
        circle && 'rounded-full',
        !circle && 'rounded-lg',
        className
      )}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <Skeleton height="24px" width="60%" />
      <Skeleton height="16px" width="40%" />
      <Skeleton height="120px" width="100%" />
      <div className="flex gap-2">
        <Skeleton height="32px" width="80px" />
        <Skeleton height="32px" width="80px" />
      </div>
    </div>
  );
}