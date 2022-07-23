import LoadingSpinner from "components/common/LoadingSpinner";
import PersistLogin from "components/PersistLogin";
import GifticonUpdate from "components/store/gifticon/update/GifticonUpdate";
import { useRouter } from "next/router";
import { Suspense } from "react";

const GifticonUpdatePage = () => {
  const router = useRouter();
  const { name } = router.query;
  if (!name) return null;

  return (
    <PersistLogin>
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-full">
            <LoadingSpinner />
          </div>
        }
      >
        <GifticonUpdate name={name} />
      </Suspense>
    </PersistLogin>
  );
};

export default GifticonUpdatePage;
