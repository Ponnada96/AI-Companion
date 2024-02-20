import { Separator } from "@/components/ui/separator";


const CompanionFormSkeleton = () => {
    return (
        <div role="status" className="h-full p-4 space-y-2 max-w-3xl mx-auto ">
            <div>
                <h3 className="text-lg font-medium">
                    General Information
                </h3>
                <p className="text-sm text-muted-foreground">
                    General Information about your companion
                </p>
            </div>
            <div className="space-y-2 w-full col-span-2 animate-pulse">
                <Separator className="bg-primary/10" />
                <div className="flex justify-center p-6 ">
                    <svg className="w-40 h-40 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-700  mt-3 "></div>
                    <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-700  mt-3 "></div>
                    <div className="h-10 bg-gray-200 rounded-sm dark:bg-gray-700  mt-3 "></div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="h-52 bg-gray-200 rounded-sm dark:bg-gray-700  mt-3 "></div>
                    <div className="h-52 bg-gray-200 rounded-sm dark:bg-gray-700  mt-3 "></div>
                </div>
                <div className="p-2">
                    <div className="h-11 w-60 rounded-sm  mx-auto
                     bg-gray-200 dark:bg-gray-700"
                    />
                </div>
            </div>

        </div>
    );
}

export default CompanionFormSkeleton;