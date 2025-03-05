export const getGalleries = (product: IProduct) => {
    return product.productImages.map(
        (productImage) =>
            `${import.meta.env.VITE_BACKEND_URL}/images/products/${
                productImage.image
            }`
    );
};
export const getMainImage = (product: IProduct) => {
    return `${import.meta.env.VITE_BACKEND_URL}/images/products/${
        product.main_image
    }`;
};
