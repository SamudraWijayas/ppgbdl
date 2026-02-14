export const dynamic = "force-dynamic";

import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login";

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};
export default LoginPage;
