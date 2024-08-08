import CustomLayout from "@/components/CustomLayout"
import { Button } from "@/components/ui/button"
import imagePage1 from '@/assets/pic1.jfif'
import imagePage2 from '@/assets/pic2.jfif'


function HomeScreen() {
    return (
        <CustomLayout>
            <main>
                <section className="w-full py-8 md:py-16">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Share Your Location in Real-Time
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Our app allows you to share your location with friends and family, so they can always know where you
                                        are and when you arrive safely.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                                        Join with us
                                    </Button>
                                </div>
                            </div>
                            <img
                                src={imagePage1}
                                width="550"
                                height="550"
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-6 md:py-12 lg:py-24 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-lg font-semibold">Key Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Locate Your Loved Ones</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our app allows you to share your location in real-time with your friends and family, so they can
                                    always know where you are and when you arrive safely.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <img
                                src={imagePage2}
                                width="550"
                                height="310"
                                alt="Image"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <ul className="grid gap-6">
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Live Location Tracking</h3>
                                            <p className="text-muted-foreground">
                                                Share your location in real-time with your loved ones, so they can always know where you are.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Group Sharing</h3>
                                            <p className="text-muted-foreground">
                                                Create groups and share your location with multiple people at once, making it easy to coordinate
                                                with your friends and family.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Safety Alerts</h3>
                                            <p className="text-muted-foreground">
                                                Set up safety alerts to notify your loved ones if you don't arrive at your destination on time
                                                or if you're in an emergency situation.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-6 md:py-12 lg:py-24 border-t">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-md font-semibold">Security</div>
                                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                    Your Privacy is Our Priority
                                </h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    We take your privacy seriously and use advanced encryption to ensure that your location data is always
                                    secure and protected.
                                </p>
                            </div>
                            <div className="flex flex-col items-start space-y-4">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-md font-semibold">Reliability</div>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                                    Our app is built on a robust and reliable platform, ensuring that your location data is always
                                    accurate and up-to-date. You can trust that your loved ones will always know where you are.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </CustomLayout>
    )
}

export default HomeScreen