"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

interface HistoryItem {
    id: number;
    action: string;
    timestamp: string;
}

export default function UserHistory() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/user/history?user=user1&page=${page}`);
                setHistory((prev) => [...prev, ...response.data.data]);
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
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">User History</h1>
            <div className="space-y-3">
                {history.map((item) => (
                    <div key={item.id} className="p-3 border rounded-lg shadow-sm bg-white">
                        <p className="text-sm text-gray-600">{item.timestamp}</p>
                        <p className="text-lg">{item.action}</p>
                    </div>
                ))}

                {/* Skeleton Loader saat fetching data */}
                {loading &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="p-3 border rounded-lg shadow-sm bg-gray-200 animate-pulse"
                        >
                            <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
                            <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
                        </div>
                    ))
                }
            </div>

            {/* Observer Div */}
            <div ref={observerRef} className="h-10" />
        </div>
    );
}
