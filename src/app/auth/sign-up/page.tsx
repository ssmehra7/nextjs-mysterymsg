import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"



function Signup() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-1/4 flex flex-col items-center justify-center">
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    
                </CardHeader>
                <CardContent>
                    <Input type="username" placeholder="username"/>
                </CardContent>
                <CardContent>
                    <Input type="email" placeholder="Email"/>
                </CardContent>
                <CardContent>
                    <Input type="password" placeholder="Password"/>
                </CardContent>
                <CardFooter>
                    <Button size={"lg"}>
                       <div className="text-md">
                       Signup
                        </div> 
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
}

export default Signup
