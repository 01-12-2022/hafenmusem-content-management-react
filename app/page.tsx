"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter()
    router.replace("/items")

    return (<div className='flex flex-col gap-20 items-center justify-center content-center p-20'>
        <h1 className='text-3xl'>You will be redirected to the items page.</h1>
        <p>Here&apos;s a button if that doesn&apos;t work:</p>
        <Button variant={'outline'} onClick={() => router.replace("/items")}>
            Go to /Items :)
        </Button>
    </div>);
}
