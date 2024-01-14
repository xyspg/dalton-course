import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const Warning = ({ title, description }: { title: string, description: string }) => {
    return (
        <Alert className="max-w-4xl font-sans">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    )
}