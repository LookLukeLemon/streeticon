import {
  STORE_ACTION_ADD_GIFTICON,
  STORE_ADD_GIFTICON,
  STORE_ADD_GIFTICON_DESC,
  STORE_ADD_GIFTICON_IMAGES,
  STORE_ADD_GIFTICON_NAME,
  STORE_ADD_GIFTICON_PRICE,
  STORE_ADD_GIFTICON_TOTAL,
} from "common/Constants";
import BaseImage from "components/common/BaseImage";
import useGifticonApi from "../useGifticonApi";
import useAddGifticon from "./useAddGifticon";

const AddGifticon = () => {
  const { onSubmitAddGifticon } = useGifticonApi();
  const {
    name,
    desc,
    price,
    total,
    base64Thumbnails,
    onChange,
    onChangeTextArea,
  } = useAddGifticon();

  return (
    <div className="p-4 md:p-8 lg:p-16 gap-8 flex flex-col ">
      <h2 className="flex items-center gap-4 text-xl">
        <span className="flex h-4 w-4 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full left-1 top-1 h-2 w-2 bg-sky-500"></span>
        </span>
        {STORE_ADD_GIFTICON}
      </h2>
      <form
        className="h-full rounded-xl text-white bg-[#1E2A3B] divide-y divide-slate-700/90"
        onSubmit={(e) =>
          onSubmitAddGifticon(e, base64Thumbnails, name, desc, price, total)
        }
      >
        <div className="flex gap-8 h-full">
          <h5 className="h-full w-48 p-4 px-8">{STORE_ADD_GIFTICON_NAME}</h5>
          <input
            className="bg-transparent p-4 h-full flex-1 outline-none placeholder:text-gray-600"
            placeholder="그린테라스 #1"
            value={name}
            onChange={(e) => onChange(e, "name")}
          />
        </div>

        <div className="flex gap-8 h-full">
          <h5 className="h-full w-48 p-4 px-8">{STORE_ADD_GIFTICON_DESC}</h5>
          <textarea
            className="bg-transparent p-4 h-full flex-1 outline-none placeholder:text-gray-600"
            placeholder="그린그라스 풍경"
            rows={4}
            value={desc}
            onChange={onChangeTextArea}
          />
        </div>

        <div className="flex gap-8 h-full">
          <h5 className="h-full w-48 p-4 px-8">{STORE_ADD_GIFTICON_PRICE}</h5>
          <input
            className="bg-transparent p-4 h-full flex-1 outline-none placeholder:text-gray-600"
            type="number"
            placeholder="15,000"
            value={price}
            onChange={(e) => onChange(e, "price")}
          />
        </div>

        <div className="flex gap-8 h-full">
          <h5 className="h-full w-48 p-4 px-8">{STORE_ADD_GIFTICON_TOTAL}</h5>
          <input
            className="bg-transparent p-4 h-full flex-1 outline-none placeholder:text-gray-600"
            type="number"
            placeholder="10"
            value={total}
            onChange={(e) => onChange(e, "total")}
          />
        </div>

        <div className="flex gap-8 h-full">
          <h5 className="h-full w-48 p-4 px-8">{STORE_ADD_GIFTICON_IMAGES}</h5>
          <div className="flex-1 h-full">
            <input
              className="bg-transparent p-4 outline-none placeholder:text-gray-600"
              multiple
              type="file"
              onChange={(e) => {
                onChange(e, "images");
              }}
            />

            {base64Thumbnails?.map((i, idx) => {
              return (
                <div key={idx} className="h-48 m-4 relative">
                  <BaseImage src={i} alt="" layout="fill" objectFit="contain" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn--primary btn m-8">
            {STORE_ACTION_ADD_GIFTICON}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGifticon;
