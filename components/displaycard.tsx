import {ReactNode} from "react";
import {Card} from "@/components/ui/card";

export default function DisplayCard({children}: { children: ReactNode }) {

    return (<Card className="w-full max-w-3xl mx-auto p-5">
        {children}
    </Card>)
}