export const FormErrorMessage = ({error, marginTop, marginBottom}) => {
    if (error) {
        return <p className="text-danger" style={{ marginTop: marginTop ? marginTop : 0, marginBottom: marginBottom ? marginBottom : 0 }}>{error}</p>
    }
    return <p style={{ marginTop: marginTop ? marginTop : 0, marginBottom: marginBottom ? marginBottom : 0 }} className="invisible" >-</p>
}

export const InputErrorMessage = ({error, marginTop, marginBottom}) => {
    if (error) {
        return <p className="text-danger border-danger" style={{ marginTop: marginTop ? marginTop : 0, marginBottom: marginBottom ? marginBottom : 0 }}>{error}</p>
    }
    return <p style={{ marginTop: marginTop ? marginTop : 0, marginBottom: marginBottom ? marginBottom : 0 }} className="invisible" >-</p>
}