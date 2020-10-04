import { Item } from '../../classes/item';
import { ItemsService } from '../../services/items.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {

//input params are obtained from an external source (component)
  @Input()
  id: number;
  @Input()
  item: Item;
//output params passing data to an external source (component)
  @Output() 
  passEntry: EventEmitter<any> = new EventEmitter();
  //regular params
  upForm: FormGroup;
  updatedItem: Item;

  constructor(private builder: FormBuilder, private service: ItemsService) { }

  ngOnInit(): void {
    //reactive form for the update inputs
    this.upForm = this.builder.group({
      id:[this.item.id, [Validators.required]], // id is not updatable (disabled by HTML attribute)
      name:[this.item.name, [Validators.required]],
      description:[this.item.description,[Validators.required]],
      count:[this.item.count, [Validators.required, Validators.min(1)]],  
    });
  }

  //Update Item nethod
    //if the form is not valid dont send the request.
    //if it does send the request and accordingly inform the user .
    //clear the form.
    //saving the item that we got as answer so we can pass it back to "all items component".
  updateItem(){
    if(this.upForm.invalid){
      return;
    }

    //defining the item according to the changes
    const itemAfterUpdate = { 
      id: this.item.id, //since we cant change the id 
      name: this.upForm.controls['name'].value, 
      description: this.upForm.controls['description'].value,
      count: this.upForm.controls['count'].value
   }; 

    this.service.updateItem(itemAfterUpdate).subscribe(
      (item)=>{ this.updatedItem = item;
      alert("Item " + item.name +  " was updated");
        this.upForm.controls['name'].setValue("");
        this.upForm.controls['description'].setValue("");
        this.upForm.controls['count'].setValue("");
        this.passBack();
      },
      (error)=>{alert(error.error)});
   }

   //passing back the item that we got as answer from the updaing process.
   passBack() {
    this.passEntry.emit(this.updatedItem);
    document.getElementById("updateCloseButton").click();
    }
}
