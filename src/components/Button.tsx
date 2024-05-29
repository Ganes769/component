// import { ButtonHTMLAttributes, ReactNode } from "react";
// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant: "standard" | "plain" | "outline" | "error";
//   title: string;
//   hasIcon: boolean;
//   iconPos?: "start" | "end";
//   icon?: ReactNode;
// }

// type varientStyleTypes = Record<"standard" | "plain" | "outline", string> & {
//   error: {
//     standard: string;
//     plain: string;
//     outline: string;
//   };
// };
// const variantStyles: varientStyleTypes = {
//   standard: "btn-primary",
//   outline: "btn-secondary",
//   plain: "btn-tertiary",
//   error: {
//     standard: "btn-error",
//     outline: "btn-errorSecondary",
//     plain: "btn-errorTertiary",
//   },
// };

// export default function Button({
//   variant = "standard",
//   title,
//   icon,
//   iconPos,
//   hasIcon,
//   ...props
// }: ButtonProps) {
//   const varientclass = variantStyles[variant];

//   return (
//     <button {...props} className={`default ${varientclass}`}>
//       {hasIcon && iconPos == "start" && icon}
//       {title}
//       {hasIcon && iconPos === "end" && icon}
//     </button>
//   );
// }
