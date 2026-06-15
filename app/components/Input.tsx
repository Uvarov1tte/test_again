import React from "react"

interface InputProps {
    type: string
    name: string
    defaultValue?: any
    required?: boolean
    className?: string
    testId?: string
}

const Input = ({ type, name, defaultValue, required, className, testId }: InputProps) => {

    const styles = className ? `border rounded border-gray-500 p-2 ${className}` : "border rounded border-gray-500 p-2"

    if (defaultValue) {
        return (
            <>
                {
                    required ?
                        <input type={type} name={name} className={styles} defaultValue={defaultValue} data-testid={testId && testId} required />
                        :
                        <input type={type} name={name} className={styles} defaultValue={defaultValue} data-testid={testId && testId} />
                }
            </>
        )
    } else {
        return (
            <>
                {
                    required ?
                        <input type={type} name={name} className={styles} data-testid={testId && testId} required />
                        :
                        <input type={type} name={name} className={styles} data-testid={testId && testId} />
                }
            </>
        )
    }


}

export default Input