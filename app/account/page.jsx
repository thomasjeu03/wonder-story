import generateMetadata from '@/lib/metadata';
import LoginComponent from "@/components/loginComponent";

export const metadata = generateMetadata({});

export default function Account() {
    return (
        <>
            <LoginComponent />
        </>
    );
}
