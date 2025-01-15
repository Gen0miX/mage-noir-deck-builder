import { Suspense } from "react";
import LoginRegisterContainer from "@/components/LoginRegisterContainer";

const VerifyEmail: React.FC = () => {
  return (
    <Suspense
      fallback={<span className="loading loading-dots loading-md"></span>}
    >
      <LoginRegisterContainer></LoginRegisterContainer>
    </Suspense>
  );
};

export default VerifyEmail;
