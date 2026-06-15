import React from "react"

interface ButtonProps {
    type: "submit" | "reset" | "button" | undefined,
    children: React.ReactNode
    className?: string,
    testId?: string,
}

const Button = ({ type, children, className, testId }: ButtonProps) => {
    const defaultStyle = "border rounded p-2 hover:text-gray-50 hover:bg-red-400 hover:border-red-400"
    const styles = className ? `${defaultStyle} ${className}` : defaultStyle

    return (
        <button
            type={type}
            className={styles}
            data-testid={testId && testId}
        >
            {children}
        </button>
    )
}

export default Button