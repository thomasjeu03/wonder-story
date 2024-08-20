export function H1({ children, className, style }) {
    return (
        <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
            style={style}>
            {children}
        </h1>
    )
}
