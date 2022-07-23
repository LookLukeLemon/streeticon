import { GifticonApi, GifticonItemDto } from "common/store";
import BaseImage from "components/common/BaseImage";
import { formatDistanceToNowStrict } from "date-fns";

const GifticonItem = ({
  image1,
  image2,
  image3,
  image4,
  image5,
  name,
  price,
  totalCount,
  soldCount,
  desc,
  createdAt,
  onClickUpdate,
}: GifticonItemDto & GifticonApi) => {
  const subImages = [image2, image3, image4, image5].filter((img) => !!img);

  return (
    <article className="p-4 md:p-8 flex flex-col sm:flex-row gap-8">
      <div className="sm:w-24 w-56 flex flex-col gap-2">
        <div className="sm:w-24 w-56 aspect-square relative rounded-md bg-slate-100 overflow-hidden">
          <BaseImage src={image1} alt="" layout="fill" objectFit="cover" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {subImages.map((si) => (
            <div
              key={si}
              className="aspect-square relative rounded-md bg-slate-100 overflow-hidden"
            >
              <BaseImage src={si} alt="" layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex gap-4">
          <h2 className="font-semibold flex-1 text-white line-clamp-2">
            {name}
          </h2>
          <div className="shrink-0 flex space-x-1">
            <dt className="text-sky-500">
              <span className="sr-only">Count</span>
              <svg width="16" height="20" fill="currentColor">
                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
              </svg>
            </dt>
            <dd>{`${soldCount} / ${totalCount}`}</dd>
          </div>
        </div>
        <dl className="mt-2 gap-x-2 flex flex-wrap text-sm leading-6 font-medium">
          <div>
            <dt className="sr-only">Price</dt>
            <dd className="px-1.5 ring-1 ring-slate-400 rounded">
              {Number(price).toLocaleString("ko-KR", {
                style: "currency",
                currency: "KRW",
              })}
            </dd>
          </div>
          <div className=" flex-1 text-slate-400">
            <dt className="sr-only">Created At</dt>
            <dd>{formatDistanceToNowStrict(new Date(createdAt))}</dd>
          </div>
          <button
            className="ring-1 px-2 rounded-md text-slate-400 text-xs font-light ring-slate-400"
            onClick={() => onClickUpdate(name)}
          >
            수정
          </button>

          <div className="flex-none w-full mt-2 font-normal">
            <dt className="sr-only">Desc</dt>
            <dd className="text-slate-400">{desc}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
};

export default GifticonItem;
