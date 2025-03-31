const SelectedVideo = async () => {
    return ( 
        <div className="w-full flex  h-dvh bg-slate-300 gap-4">
            <div className="w-2/3 h-full bg-amber-400 p-4">
                <div className="w-full aspect-video bg-teal-400 rounded-lg relative overflow-hidden">
                    <video 
                        autoPlay
                        controls
                        className="w-full h-full object-cover absolute inset-0"
                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    />
                </div>
            </div>
            <div className="w-1/3 h-full bg-green-300"></div>
        </div>
    );
}

export default SelectedVideo;