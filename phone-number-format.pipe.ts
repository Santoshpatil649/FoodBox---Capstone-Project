import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat'
})
export class PhoneNumberFormatPipe implements PipeTransform {

  transform(phoneNumber:string):String {

    let formattedPhoneNumber = "(";

    for(let i=0;i<phoneNumber.length;i++){

      if(i==2)
        formattedPhoneNumber += phoneNumber.charAt(i)+ ") ";
      else if (i==5)
        formattedPhoneNumber += phoneNumber.charAt(i) + "-";
      else
        formattedPhoneNumber += phoneNumber.charAt(i);
      }
    console.log(formattedPhoneNumber);
    return formattedPhoneNumber;
  }

}
