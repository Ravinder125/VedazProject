export const InputBox = ({
    className = "",
    id = "",
    name = "",
    label = "",
    props
}: {
    className?: string,
    id?: string,
    name?: string,
    label?: string,
    props?: React.ComponentProps<"input">
}) => {
    return <div className={"form-input--box flex flex-col gap-1 " + className}>
        {label && (
            <label htmlFor={id}>{label}</label>
        )}
        {/* <Input type="text" {...props} /> */}
        <input type="text" name={name} className="form-input" id={id} {...props} />
    </div>
}