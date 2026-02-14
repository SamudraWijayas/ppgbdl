import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <div className="">
      <section className="max-w-screen-3xl 3xl:container">{children}</section>
    </div>
  );
};

export default AuthLayout;
