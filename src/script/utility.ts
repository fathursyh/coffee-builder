
export class Utility {

    static currency(value : number) : string {
        const rupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            trailingZeroDisplay: 'stripIfInteger'
        });
        return rupiah.format(value); 
    }
}