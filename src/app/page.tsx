import ParentContent from "@/components/home/content-parent";
import CardHomeSkeleton from "@/components/home/home-content/skeleton";
import { getLanguage } from "@/utils/getLanguage";

const fetchInitialData = async () => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000"; 
  const res = await fetch(`${baseUrl}/api/user/history?user=user1&page=1`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return await res.json();
};


export default async function Home() {
  const isHaveRecommend = true;
  const initialData = await fetchInitialData();
  const {t} = await getLanguage();

  console.log("Penerjemah : ", t)

  return (
  <div className="w-full min-h-dvh dark:bg-dark flex justify-start items-center pt-4 flex-col">
    {isHaveRecommend?
      initialData?
        <ParentContent firstRecommendation={initialData}/>
        :
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8">
          {Array.from({ length: 12 }).map((_, index) => (
              <CardHomeSkeleton key={index}/>
            ))
          }
        </div>
    :
    <div className=" flex flex-col  border rounded-lg border-highlightColor dark:bg-highlightColorDark dark:border-darkHover shadow-softShadow  px-12 py-4 justify-center items-center">
      <h1 className="text-2xl roboto-Medium">
        {t.homePage.getStarted[0]}
      </h1>
      <p className="text-sm">
        {t.homePage.getStarted[1]}
      </p>
    </div>
    }
  </div>
  );
}
