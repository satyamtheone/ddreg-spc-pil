"use client";

import Link from "next/link";

const LoginLinks = () => {
  return (
    <div className="text-base text-center flex flex-col gap-1">
      <span>By clicking Continue, you agree to DDReg Pharma's</span>

      <div>
        <Link
          href="/legal/privacy-policy"
          className="font-medium text-cyan-500 underline decoration-transparent hover:decoration-current"
        >
          Privacy Policy
        </Link>
        ,{" "}
        <Link
          href="/legal/cookies"
          className="font-medium text-cyan-500 underline decoration-transparent hover:decoration-current"
        >
          Cookie Policy
        </Link>{" "}
        and{" "}
        <Link
          href="/legal/terms-condition"
          className="font-medium text-cyan-500 underline decoration-transparent hover:decoration-current"
        >
          Terms & Conditions
        </Link>
        .
      </div>
    </div>
  );
};

export default LoginLinks;