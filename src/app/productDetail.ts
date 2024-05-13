export interface ProductDetail {
    id: number
    handle: string,
    title: string,
    description: string,
    SKU: string,
    grams: number,
    stock: number,
    price: number,
    compare_price: number,
    barcode: string,
    image: string | null
}
