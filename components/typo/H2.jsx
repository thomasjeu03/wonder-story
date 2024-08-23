export function H2({ children, className, style }) {
    return (
        <h2 className={`text-gray-500 mt-2 text-3xl transition-colors first:mt-0 ${className}`}
            style={style}>
            {children}
        </h2>
    )
}
