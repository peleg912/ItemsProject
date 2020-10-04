import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Item } from 'src/app/classes/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.css']
})
export class DepositModalComponent implements OnInit {
// notes are the same as in "withdraw-component". :)

  @Input()
   item: Item;
   @Output() 
   passEntry: EventEmitter<any> = new EventEmitter();
   dForm : FormControl;
   updatedItem: Item;
   
  constructor(private service: ItemsService) { }

  ngOnInit(): void {
    this.dForm = new FormControl("",[Validators.required, Validators.min(0)]);
  }

   //Deposit Item nethod
    //if the form is not valid dont send the request.
    //if it does send the request and accordingly inform the user .
    //saving the item that we got as answer so we can pass it back to "all items component".
  depositItem(){
    if(this.dForm.invalid){
      return;
    }

    let amount = this.dForm.value;
    this.service.depositItem(this.item , amount).subscribe(
      (item)=>{ this.updatedItem = item;
      alert("Item's count is now " + item.count)
      this.passBack();
      },
      (error)=>{alert(error.error); }
    )};

    //passing back the item that we got as answer from the updaing process.
  passBack() {
    this.passEntry.emit(this.updatedItem);
    document.getElementById("depositCloseButton").click();
    }

}
