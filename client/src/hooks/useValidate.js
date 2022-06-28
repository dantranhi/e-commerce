
const useValidate = (errors, param) =>{
    return errors ? errors.find(error=>error.param===param)?.msg : null
}

export default useValidate