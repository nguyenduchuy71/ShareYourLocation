import { MapPinIcon } from '@heroicons/react/20/solid';
import { Button } from "./ui/button"
import { useToast } from "@/components/ui/use-toast"

function Footer() {
    const { toast } = useToast()

    return (
        <footer className="p-6 bg-slate-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <MapPinIcon className="size-5 text-white" />
                    <p className="text-sm ">Share your real-time location</p>
                </div>
                <Button
                    onClick={() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                                toast({
                                    title: "Your location",
                                    description: `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
                                })
                            })
                        } else {
                            toast({
                                title: "Warning",
                                description: "Geolocation is not supported by this browser.",
                            })
                        }
                    }}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    Share Location
                </Button>
            </div>
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                <p>
                    By sharing your location, you agree to our{" "}
                    <a href="#" className="underline underline-offset-2">
                        Privacy Policy
                    </a>
                    and{" "}
                    <a href="#" className="underline underline-offset-2">
                        Terms of Service
                    </a>
                    .
                </p>
                <p>&copy; 2024 Acme Inc. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer