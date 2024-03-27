import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{


  formContact = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string>(''),
    message: new FormControl<string>(''),
    create_at: new FormControl<string>(this.getCreatAt()),
  });
  
  send(){
    this.contact.addContact({...this.formContact.value, reply: false}).subscribe(res =>{
      alert('Thank you for your feedback')
    })
  }

  getCreatAt(){
    var thoiGianHienTai = new Date();
    var ngay = thoiGianHienTai.getDate();
    var thang = thoiGianHienTai.getMonth() + 1;
    var nam = thoiGianHienTai.getFullYear();

    var timeNow = ngay + "/" + thang + "/" + nam;
    return timeNow
  }

  constructor(private contact: ContactService){}
}
