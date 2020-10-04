import { ItemsService } from './../../services/items.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-witdraw-modal',
  templateUrl: './witdraw-modal.component.html',
  styleUrls: ['./witdraw-modal.component.css']
})
export class WitdrawModalComponent implements OnInit {

  @Input()
   item: Item;
   @Output() 
   passEntry: EventEmitter<any> = new EventEmitter();
   wForm : FormControl;
   updatedItem: Item;


  constructor(private service: ItemsService) { }

  ngOnInit(): void {
    // a single form control - only one input is necessary.
    this.wForm = new FormControl("",[Validators.required, Validators.min(0)]);
  }

   //Withdraw Item nethod
    //if the form is not valid dont send the request.
    //if it does send the request and accordingly inform the user .
    //saving the item that we got as answer so we can pass it back to "all items component".
  witdrawItem(){
    if(this.wForm.invalid){
      return;
    }

    let amount = this.wForm.value;
    this.service.withdrawItem(this.item , amount).subscribe(
    (item)=>{this.updatedItem = item;
      alert("Item's count is now " + item.count)
    this.passBack()},  
    (error)=>{alert(error.error)});
}

 //passing back the item that we got as answer from the updaing process.
passBack() {
  this.passEntry.emit(this.updatedItem);
  document.getElementById("witdrawCloseButton").click();
  }

}