import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';
import * as JsBarcode from 'jsbarcode';
@Component({
  selector: 'app-my-library-card',
  templateUrl: './my-library-card.component.html',
  styleUrls: ['./my-library-card.component.css']
})
export class MyLibraryCardComponent implements OnInit{
  user_id:any
  imgPath="http://45.114.48.134:8090/studentphoto/"
  imagePath2:any="http://45.114.48.134:8090/AuthorisedSignature/";
  constructor(private service:AllDataService){}
  college_id:any
  ngOnInit(): void {
    this.user_id=sessionStorage.getItem('user_id');
    this.college_id=sessionStorage.getItem('college_id');
    this.getAllUsers()
  }
  allData:any
  getAllUsers(){
   if(this.user_id && this.college_id){
    this.service.getUserProfilewithcollegewisewithsignature(this.user_id,this.college_id).subscribe((res:any)=>{
      console.log(res);
      this.allData=res[0];

      JsBarcode('#barcode', this.allData.library_card_number, {
        format: 'CODE128', // Specify the barcode format (e.g., CODE128)
        displayValue: true // Show the data below the barcode
      });

    })
   }
  }

}
