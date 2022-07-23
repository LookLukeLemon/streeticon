import LoadingSpinner from "components/common/LoadingSpinner";
import PersistLogin from "components/PersistLogin";
import MyStore from "components/store/my-page/MyStore";
import { Suspense } from "react";

const MyPage = () => {
  return (
    <PersistLogin>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <MyStore />
      </Suspense>
    </PersistLogin>
  );
};

export default MyPage;
