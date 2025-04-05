import ContentPage from "./content-page";

interface Props {
    searchParams: { v?: string };
}

const SelectedVideo = async ({ searchParams }: Props) => {
    const videoId = searchParams?.v;


    const videoUrl =
        videoId === "asdas"
        ? "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        : "";

    return ( 
        <div className="w-full flex  h-dvh bg-slate-300 gap-4">
            <ContentPage videoUrl={videoUrl} />
        </div>
    );
}

export default SelectedVideo;