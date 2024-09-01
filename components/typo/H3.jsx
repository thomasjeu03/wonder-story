export function H3({ children, className, style }) {
    return (
        <h3 className={`text-1xl lg:text-2xl ${className}`}
            style={style}>
            {children}
        </h3>
    )
}
