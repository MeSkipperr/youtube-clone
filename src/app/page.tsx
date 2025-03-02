import CardHomeContent from "@/components/card/home-content";
import CardHomeSkeleton from "@/components/card/home-content/skeleton";

export default function Home() {
  return (
  <div className="w-full min-h-dvh dark:bg-dark flex justify-start items-center pt-4 flex-col">
    <div className=" flex flex-col  border rounded-lg border-highlightColor dark:bg-highlightColorDark dark:border-darkHover shadow-softShadow  px-12 py-4 justify-center items-center">
      <h1 className="text-2xl roboto-Medium">Try searching to get started</h1>
      <p className="text-sm">{"Start watching videos to help us build a feed of videos you'll love."}</p>
    </div>
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardHomeContent/>
      <CardHomeContent/>
      <CardHomeContent/>
      <CardHomeContent/>
      <CardHomeContent/>
      <CardHomeContent/>
      <CardHomeContent/>
      <CardHomeContent/>
      <CardHomeSkeleton/>
      <CardHomeSkeleton/>
      <CardHomeSkeleton/>
      <CardHomeSkeleton/>
    </ul>
  </div>
  );
}
