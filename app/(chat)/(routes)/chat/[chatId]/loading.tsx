import { cn } from "@/lib/utils";

const ChatSkeleton = () => {

    const Avatar = ({ width, height }: { width: number; height: number }) => {
        return (
            <svg
                className={cn(`rounded-full text-gray-200 dark:text-gray-600`, `w-${width} h-${height}`)}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="1 0 18 18"
                fill="currentColor"
            >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
        )

    }
    const isEvenNumber = (index: number) => {
        return index % 2 === 0
    }
    return (
        <div role="status" className="flex flex-col h-full p-4 space-y-2 animate-pulse">
            <div className="w-full flex justify-between items-center border-b border-primary/10 p-4">
                <div className="flex">
                    <Avatar width={12} height={12} />
                    <div className="flex flex-col gap-2 ml-2 mt-2">
                        <div className="h-2 w-40 bg-gray-200 rounded-sm dark:bg-gray-700 "></div>
                        <div className="h-2 w-32 bg-gray-200 rounded-sm dark:bg-gray-700 "></div>

                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pr-4 space-y-8">
                {Array.from({ length: 11 }, (_, index) => (
                    <div className="" key={index}>
                        <div className={cn("flex gap-2", `${!isEvenNumber(index) && "justify-end"}`)}>
                            {isEvenNumber(index) &&
                                <Avatar width={10} height={10} />}
                            <div className="h-8 w-1/2 ml-2 mt-1 bg-gray-200 rounded-sm dark:bg-gray-700 "></div>
                            {!isEvenNumber(index) &&
                                <Avatar width={10} height={10} />}
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full  gap-4 border-t border-primary/10 py-4 flex gap-x-2 items-center">
                <div className="h-10 flex-1 bg-gray-200 rounded-sm dark:bg-gray-700 "></div>
                <div className="h-10 w-12 bg-gray-200 rounded-sm dark:bg-gray-700 "></div>
            </div>
        </div>
    );
}

export default ChatSkeleton;

