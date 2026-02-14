import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;  
  title?: string;
}

const AuthLayout = (props: PropTypes) => {
  const { children, title } = props;
  return (
    <div className="">
      <section className="max-w-screen-3xl 3xl:container  ">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
