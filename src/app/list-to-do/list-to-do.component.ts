import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.css']
})
export class ListToDoComponent implements OnInit {
  public item:any;
  public list:any=[];
  private id:number=0;

  constructor() { }

  ngOnInit(): void {
  }

  public addItem(event:any): void{
    this.list.push({
      id: ++this.id,
      item: this.item
    });
    this.item = '';
  }

  public close(value:any):any {
    let chosenId=value.id;
    let index = this.list.findIndex((x:any) => x.id ===chosenId);
    this.list.forEach((element:any)=>{
      if(chosenId == element.id){
        this.list.splice(index,1)
      }
    })
  }

}
