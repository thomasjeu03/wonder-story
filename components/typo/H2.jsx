export function H2({ children, className, style }) {
    return (
        <h2 className={`font-bold text-2xl lg:text-3xl ${className}`}
            style={style}>
            {children}
        </h2>
    )
}
