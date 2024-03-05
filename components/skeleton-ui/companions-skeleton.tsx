

const CompanionSkeleton = () => {
    return (
        <div role="status" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 pb-10 animate-pulse">
            {
                Array.from({ length: 10 }, (_, index) => (
                    <div key={index} className="flex flex-col items-center bg-primary/10 rounded-xl  transition border-0">
                        <div className="flex flex-col gap-2 items-center p-6">
                            <svg className="w-32 h-32 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                            <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 w-28 " />
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 w-44 mt-3 "></div>
                                <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 w-32 "></div>
                            </div>
                        </div>
                        <div className="flex w-full  justify-between p-6 pt-0">
                            <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 w-20 mt-3 "></div>
                            <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 w-8 mt-3 ">
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

    );
}

export default CompanionSkeleton