import {
  CATEGORIES,
  STORE_ACTION_SIGNUP,
  STORE_ADDRESS,
  STORE_CATEGORY,
  STORE_DESC,
  STORE_ID,
  STORE_NAME,
  STORE_PASSWORD,
  STORE_PHONE,
  STORE_SIGNUP,
  STORE_THUMBNAIL,
} from "common/Constants";
import BaseImage from "components/common/BaseImage";
import useSignUp from "./useSignUp";
import useSignUpApi from "./useSignUpApi";

const SignUp = () => {
  const {
    businessId,
    name,
    password,
    category,
    desc,
    phone,
    address,
    thumbnailBase64,
    onChange,
    onChangeTextArea,
    onChangeCategory,
  } = useSignUp();

  const { onSubmit } = useSignUpApi();

  return (
    <div className="p-4 md:p-8 lg:p-16 flex flex-col gap-8 h-full w-full">
      <h2 className="flex items-center gap-4 text-xl">
        <span className="flex h-4 w-4 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full left-1 top-1 h-2 w-2 bg-sky-500"></span>
        </span>
        {STORE_SIGNUP}
      </h2>
      <div className="flex w-full h-fit">
        <form
          className="w-full rounded-xl text-white bg-[#1E2A3B] divide-y divide-slate-700/90"
          method="post"
          encType="multipart/form-data"
          onSubmit={(e) =>
            onSubmit({
              e,
              businessId,
              name,
              password,
              category,
              desc,
              phone,
              address,
              thumbnailBase64,
            })
          }
        >
          <div className="flex gap-8">
            <h5 className="h-full hidden md:block w-48 p-4 px-8">{STORE_ID}</h5>
            <input
              className="bg-transparent p-4 flex-1 h-full outline-none placeholder:text-gray-600"
              placeholder="23487-237-1112"
              onChange={(e) => onChange(e, "id")}
            />
          </div>
          <div className="flex gap-8">
            <h5 className="h-full hidden md:block w-48 p-4 px-8">
              {STORE_NAME}
            </h5>
            <input
              className="bg-transparent p-4 flex-1 h-full outline-none placeholder:text-gray-600"
              placeholder={STORE_NAME}
              onChange={(e) => onChange(e, "name")}
            />
          </div>
          <div className="flex gap-8">
            <h5 className="h-full hidden md:block w-48 p-4 px-8">
              {STORE_PASSWORD}
            </h5>
            <input
              className="bg-transparent p-4 flex-1 h-full outline-none placeholder:text-gray-600"
              placeholder="비밀번호"
              type="password"
              onChange={(e) => onChange(e, "password")}
            />
          </div>
          <div className="flex gap-8">
            <h5 className="h-full hidden md:block w-48 p-4 px-8">
              {STORE_CATEGORY}
            </h5>
            <select
              className="bg-transparent p-4 h-full  outline-none placeholder:text-gray-600"
              placeholder="에티오피아에서 직접 공수한 본토 원두의 맛을 느껴보세요~"
              value={category}
              onChange={onChangeCategory}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.display}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-8">
            <h5 className="h-full hidden md:block w-48 p-4 px-8">
              {STORE_DESC}
            </h5>
            <textarea
              className="bg-transparent p-4 h-full flex-1 outline-none placeholder:text-gray-600"
              placeholder="에티오피아에서 직접 공수한 본토 원두의 맛을 느껴보세요~"
              rows={4}
              onChange={onChangeTextArea}
            />
          </div>
          <div className="flex gap-8">
            <h5 className="h-full hidden md:block w-48 p-4 px-8">
              {STORE_PHONE}
            </h5>
            <input
              className="bg-transparent p-4 h-full flex-1 outline-none placeholder:text-gray-600"
              placeholder="010-5812-1100"
              onChange={(e) => onChange(e, "phone")}
            />
          </div>
          <div className="flex gap-8">
            <h5 className="h-full hidden md:block w-48 p-4 px-8">
              {STORE_ADDRESS}
            </h5>
            <input
              className="bg-transparent p-4 h-full flex-1 outline-none placeholder:text-gray-600"
              placeholder="서울시 마포구 신촌동"
              onChange={(e) => onChange(e, "address")}
            />
          </div>
          <div className="flex gap-8">
            <h5 className="h-full hidden md:block w-48 p-4 px-8">
              {STORE_THUMBNAIL}
            </h5>
            <div className="flex-1 h-full">
              <input
                className="bg-transparent p-4 max-w-[250px]  outline-none placeholder:text-gray-600"
                type="file"
                onChange={(e) => onChange(e, "thumbnail")}
              />

              {thumbnailBase64 && (
                <div className="h-48 m-4 relative">
                  <BaseImage
                    src={thumbnailBase64}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn--primary btn m-8">
              {STORE_ACTION_SIGNUP}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
