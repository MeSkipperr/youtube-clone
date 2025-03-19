import CardHomeContent from "@/components/card/home-content";
import CardHomeSkeleton from "@/components/card/home-content/skeleton";
import { getLanguage } from "@/utils/getLanguage";

const fetchInitialData = async () => {
  // const baseUrl = process.env.BASE_URL || "http://localhost:3000"; // Default jika .env tidak ada
  // const res = await fetch(`${baseUrl}/api/user/history?user=user1&page=1`, { cache: "no-store" });

  // if (!res.ok) {
  //   throw new Error(`Failed to fetch data: ${res.statusText}`);
  // }

  // return res.json();
  return true;
};


export default async function Home() {
  const initialData = await fetchInitialData();
  const language = await getLanguage();

  return (
  <div className="w-full min-h-dvh dark:bg-dark flex justify-start items-center pt-4 flex-col">
    {initialData?
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8">
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
      </div>
    :
    <div className=" flex flex-col  border rounded-lg border-highlightColor dark:bg-highlightColorDark dark:border-darkHover shadow-softShadow  px-12 py-4 justify-center items-center">
      <h1 className="text-2xl roboto-Medium">
        {
          language === "JP" ? "検索して開始" :
          language === "EN" ? "Try searching to get started" :
          language === "ID" ? "Coba mencari untuk memulai" :
          "Unknown Language"
        }
      </h1>
      <p className="text-sm">
      {
        language === "JP" ? "あなたが気に入る動画のフィードを作成するために、動画の視聴を開始してください。" :
        language === "EN" ? "Start watching videos to help us build a feed of videos you'll love." :
        language === "ID" ? "Mulai menonton video untuk membantu kami membangun feed video yang akan Anda sukai." :
        "Unknown Language"
      }
      </p>
    </div>
    }
  </div>
  );
}
