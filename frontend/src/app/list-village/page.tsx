import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import ListDesa from "@/components/views/ListDesa";

const Group = () => {
  return (
    <LandingPageLayout
      showNavBack={true}
      span="Daftar Desa"
      showFooter={false}
      showBottomNav={false}
      marginTop="mt-[0px]"
    >
      <ListDesa />
    </LandingPageLayout>
  );
};

export default Group;
