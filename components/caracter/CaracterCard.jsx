import Image from "next/image";


export default function CaracterCard({ caracter }) {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-3">
            <Image
                src={caracter?.img}
                alt={caracter?.label}
                className="w-32 h-32 rounded-full"
                width={100}
                height={100}
            />
            <p className="text-center">{caracter?.label}</p>
        </div>
    )
}