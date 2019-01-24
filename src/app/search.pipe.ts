import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any[], searchTerm: string): any {if(!arr || !searchTerm)
    {
      return arr
    }
    else
    {
      return arr.filter (x=>x.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
    }
  }

}
