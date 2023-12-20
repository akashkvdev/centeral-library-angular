import { Component, OnInit } from '@angular/core';
import { AllDataService } from 'src/app/Services/all-data.service';

@Component({
  selector: 'app-users-books-requests',
  templateUrl: './users-books-requests.component.html',
  styleUrls: ['./users-books-requests.component.css']
})
export class UsersBooksRequestsComponent implements OnInit{
  clg_id:any;
  p:any=1
  bkrqstdtls:any;
  library_card_no:any;
  imgPath:any="http://45.114.48.134:8090/BookImage/";
  useImgPath:any="http://45.114.48.134:8090/studentphoto/";
  user_id:any

 constructor(private AllDataService:AllDataService) {}
  ngOnInit(): void {
    this.user_id=sessionStorage.getItem('user_id')
    this.clg_id=sessionStorage.getItem('college_id')
    this.userBkReqstdtls();

  }
  userBkReqstdtls(){
    this.AllDataService.BkRqstDtls(this.clg_id).subscribe((res:any)=>{
      this.bkrqstdtls =res;
    });
  }
  BookIssue(alldata:any){
    console.log(alldata);

    const formdata=new FormData()
    formdata.append('entry_by', this.user_id);
    formdata.append('id', alldata.id);
    formdata.append('accession_no', alldata.accession_no);
    this.AllDataService.RequestedBookIssue(formdata).subscribe((res:any)=>{
      // console.log(res);
      if(res===1){
        alert('Book Issued Successfully');
        this.userBkReqstdtls()
      }

    },(err:any)=>{
      console.log(err);

    })

  }



}
