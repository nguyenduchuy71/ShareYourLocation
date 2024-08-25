import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="space-y-4 text-center">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                </div>
            </div>
        </div>
    )
}

export default Loading