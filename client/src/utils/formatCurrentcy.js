
export default function formatCurrency(value){
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(value)
}
