import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-samplepage',
  templateUrl: './samplepage.page.html',
  styleUrls: ['./samplepage.page.scss'],
})
export class SamplepagePage implements OnInit {
  address1: any;
  address: any;

  constructor() { }

  ngOnInit(){

    this.address1= 
    
      {name:'', flat:'', locality:'', nickName:'' }
    
    
    
      this.address.push(this.address1);
    
      console.log(this.address);
    }
}
