import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from 'src/app/contact.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {
  contactInformation: any[] = []
  date_start: string = ''
  date_end: string = ''
  id: string = ''

  constructor(private contact: ContactService, private http: HttpClient) {}
  ngOnInit(): void {
    this.contact.getContact().subscribe(data => {
      this.contactInformation = data
    })
  }
  formReply = new FormGroup({
    senderName: new FormControl<string>(''),
    replyTo: new FormControl<string>(''),
    toEmail: new FormControl<string>(''),
    message: new FormControl<string>(''),
    message_old: new FormControl<string>(''),
    create_at: new FormControl<string>('')
  })

  formInfoReply = new FormGroup({
    senderName: new FormControl<string>(''),
    message_reply: new FormControl<string>(''),
    reply_at: new FormControl<string>('')
  })

  getCreatAt(){
    var thoiGianHienTai = new Date();
    var ngay = thoiGianHienTai.getDate();
    var thang = thoiGianHienTai.getMonth() + 1;
    var nam = thoiGianHienTai.getFullYear();

    var timeNow = ngay + "/" + thang + "/" + nam;
    return timeNow
  }

  replyInfo(item: any){
    this.formInfoReply.controls['senderName'].setValue(item.sender_reply)
    this.formInfoReply.controls['reply_at'].setValue(item.reply_at)
    this.formInfoReply.controls['message_reply'].setValue(item.message_reply)
  }

  reply(item: any){
    this.id = item.id
    
    this.formReply.controls['senderName'].setValue('Admin - KORO_GAMING')
    this.formReply.controls['replyTo'].setValue(item.name)
    this.formReply.controls['toEmail'].setValue(item.email)
    this.formReply.controls['create_at'].setValue(item.create_at)
    this.formReply.controls['message_old'].setValue(item.message)
  }

  async send(){
    emailjs.init('hDbkEa0mhdi2rs-2o')
    let response = await emailjs.send("service_3n18uaw","template_k4dvvqe",{
      message: this.formReply.value.message,
      toEmail: this.formReply.value.toEmail,
      senderName: this.formReply.value.senderName,
      replyTo: this.formReply.value.replyTo,
      });

      if (response.status == 200){
        alert('Message has ben send !!!')

        let contact = {
          name: this.formReply.value.replyTo,
          email: this.formReply.value.toEmail,
          message: this.formReply.value.message_old,
          create_at: this.formReply.value.create_at,
          reply: true,
          sender_reply: this.formReply.value.senderName,
          message_reply: this.formReply.value.message,
          reply_at: this.getCreatAt()
        }

        this.contact.UpdateContact(this.id, contact).subscribe(res =>{
          this.ngOnInit()
          this.formReply.reset()
        })
      }
  }

  filterData() {
    let filteredData = this.contactInformation;
  
    if (this.date_start && this.date_end) {
      const startDate = new Date(this.date_start);
      startDate.setHours(0, 0, 0);
      const endDate = new Date(this.date_end);
      endDate.setHours(23, 59, 59);
  
      filteredData = filteredData.filter(item => {
        const itemDateParts = item.create_at.split('/');
        const itemDate = new Date(
          parseInt(itemDateParts[2]),
          parseInt(itemDateParts[1]) - 1,
          parseInt(itemDateParts[0])
        );
  
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
  
    return filteredData;
  }
}
