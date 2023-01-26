export default function (photoUrls, names, addressStuff) {
    let data = {
        shippingMethod: "Budget",
        recipient: {},
        items: []
    }
    if(names){
        data.recipient.name = names
    }
    if(addressStuff){
        data.recipient.address = addressStuff
    }
    if(photoUrls?.length){
        photoUrls.forEach(element => {
            let asset = {
                merchantReference: "Photo Album 4x6",
                sku: "GLOBAL-PHO-4x6",
                copies: 1,
                sizing: "fillPrintArea",
                attributes: {
                    finish: 'gloss'
                },
                assets: [{
                    printArea: 'default',
                    url: element
                }]
            }
            return data.items.push(asset)
        });
    }
    return data
}