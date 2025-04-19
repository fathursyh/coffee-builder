
export class Utility {
    static rupiah  = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        trailingZeroDisplay: 'stripIfInteger'
    });

    static currency(value : number) : string {
        return this.rupiah.format(value); 
    }
}