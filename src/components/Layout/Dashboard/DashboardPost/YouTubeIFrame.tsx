type YouTubeIFrameProps = {
  src: string;
  title?: string;
  className?: string;
};

export default function YouTubeIFrame({
  src,
  title,
  className,
}: YouTubeIFrameProps) {
  return (
    <div className="mt-4 flex flex-col items-center ">
      <div className="relative w-full pt-[56.25%] ">
        <iframe
          className="absolute left-0 top-0 h-full w-full rounded-xl border-2 border-gray-700 shadow-xl"
          src={src}
          title={title ?? 'YouTube Video Player'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
