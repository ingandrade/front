import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args === '' || args.length < 3 ) { return value; }
    const resultCountry = [];
    for (const country of value) {
      if ( country.CountryName.toLowerCase().indexOf(args.toLowerCase()) > -1 || country.countryCode > -1 ) {
          resultCountry.push(country);
      }
    }
    return resultCountry;
  }

}
