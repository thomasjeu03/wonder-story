export function H1({ children, className, style }) {
    return (
        <h1 className={`font-bold text-center text-3xl lg:text-4xl ${className}`}
            style={style}>
            {children}
        </h1>
    )
}
