import { createContext, useContext, useState, useEffect } from 'react'

const DropdownContext = createContext()

export const useDropdown = () => useContext(DropdownContext)




export function DropDownProvider({ children, init }) {
    let [state, setState] = useState({})
    useEffect(() => {
        function assignData() {
            const dataArr = new Array()
            init.forEach(item => dataArr.push(item.name))
            const initState = {
                values: dataArr,
                currentValue: '',
                search: '',
                searchResult: [],
                show: false
            }
            setState(initState)
        }

        assignData()

    }, [init])
    return (
        <DropdownContext.Provider value={[state, setState]}>
            {children}
        </DropdownContext.Provider>
    )
}