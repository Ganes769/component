import React from "react";

interface IconProps {
  fillColor?: string;
}

export const SaveIcon: React.FC<IconProps> = ({}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.33334 8.33333V13.3333M11.6667 8.33333V13.3333M15 5V15C15 15.9205 14.2538 16.6667 13.3333 16.6667H6.66668C5.7462 16.6667 5.00001 15.9205 5.00001 15V5M3.33334 5H16.6667M12.5 5V4.16667C12.5 3.24619 11.7538 2.5 10.8333 2.5H9.16668C8.2462 2.5 7.50001 3.24619 7.50001 4.16667V5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowIcon: React.FC<IconProps> = ({}) => {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3333 5L0.666672 5M11.3333 5L7.33334 9M11.3333 5L7.33334 1"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
