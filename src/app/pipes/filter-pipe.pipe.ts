import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: Product[], filterText: string): Product[] {
    //tarayıcı dil seçeneklerine göre küçült. ve null kontrolü var
    filterText = filterText ? filterText.toLocaleLowerCase() : '';

    //sen bi̇r arraya fi̇lter uyguluyorsun o sana yeni̇ bi̇r array oluşturuyor ve geri döndürür.
    //önce tüm isimleri küçük harfe çevir.
    //indexOf ile javascript ile string içinde filterText var mı bakar. True döndürür.
    return filterText
      ? value.filter((p: Product) => p.productName.toLocaleLowerCase().indexOf(filterText) !== -1)
      : value;
    // neden -1: indexOf bulamazsa -1 bulursa bulduğu index numarasını döndürür. 
    //yoksa :value olduğu gibi döndür demiş oluyoruz. 
  }
}
//map, filter
