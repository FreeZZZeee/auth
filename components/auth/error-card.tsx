import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

 export const ErrorCard = () => {
    return (
        <CardWrapper
            header="Ошибка"
            headerLabel="Упсс! Что-то пошло не так!"
            backButtonHref="/auth/login"
            backButtonLabel="Назад"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive"/>
            </div>
        </CardWrapper>
    )
 }