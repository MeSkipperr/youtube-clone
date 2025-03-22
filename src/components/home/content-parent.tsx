"use client"
import CardHomeContent from "@/components/home/home-content";
import CardHomeSkeleton from "@/components/home/home-content/skeleton";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface HistoryItem {
    id: number;
    action: string;
    timestamp: string;
}

const ParentContent = (
    {
        firstRecommendation
    }:{
        firstRecommendation:HistoryItem
    }) => {
    const [recommendContent, setRecommendContent] = useState<HistoryItem[]>([firstRecommendation]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/user/history?user=user1&page=${page}`);
                setRecommendContent((prev) => [...prev, ...response.data.data]);
                setHasMore(response.data.data.length > 0);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
            setLoading(false);
        };

        fetchHistory();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage((prev) => prev + 1);
                }
            },
            { rootMargin: "100px" }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading]);

    return ( 
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 px-8">
            {recommendContent.map((item) => (
                <CardHomeContent key={"videoid:"+item.id}/>
            ))}
            {loading &&
                Array.from({ length: 4 }).map((_, index) => (
                    <CardHomeSkeleton key={"skeleton"+index}/>
                ))
            }
            <div ref={observerRef} className="h-10" />
        </div>
    );
}

export default ParentContent;