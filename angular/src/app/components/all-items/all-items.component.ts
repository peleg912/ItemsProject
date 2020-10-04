import { DepositModalComponent } from './../deposit-modal/deposit-modal.component';
import { WitdrawModalComponent } from './../witdraw-modal/witdraw-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { ItemsService } from './../../services/items.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { $ } from 'protractor';




@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit {
//Params
  items: Item[]; 
  item:Item;
  addForm: FormGroup;
  

// injectable components
  constructor(private service: ItemsService, private builder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    //this code will run when this component will initialize.
    // asking the server to bring all the items, saving this array for client.
    this.service.getAllItems().subscribe( 
    (array)=>{ this.items = array;},
    (error)=>{console.log(error.error)});

    //using reactive forms to provide a simple form to add a new item.
    this.addForm = this.builder.group({
      name:["", [Validators.required]],
      description:["",[Validators.required]],
      count:["", [Validators.required, Validators.min(1)]],  
    });


    }

    //Get item By id- this method never used eventully.
    getItemById(id: number){
      this.service.getItemById(id).subscribe(
        (item)=> {this.item = item},
        (error)=>{console.log(error.error)});
    }

    //Add Item nethod
    //if the form is not valid dont send the request.
    //if it does send the request and accordingly inform the user .
    //clear the form.
    //add the new item to the saved array so we dont need to refresh the page in order to see it.
    addItem(){
      if(this.addForm.invalid){
        return;
      }

      this.service.addItem(new Item(this.addForm.controls['name'].value, this.addForm.controls['description'].value, 
      this.addForm.controls['count'].value)).subscribe(
        (item : Item)=>{alert("item " + item.name + " was added");
        this.addForm.controls['name'].setValue("");
        this.addForm.controls['description'].setValue("");
        this.addForm.controls['count'].setValue("");
        this.items.push(item); 
        document.getElementById("closeButton").click();
        },
        (error)=>{alert(error.error)}
      );

    }

    //Delete item method
    //send the request and accordingly inform the user .
    //delete this item from the saved array so we dont need to refresh the page in order to see it.
    deleteItem(id: number){
      this.service.removeItem(id).subscribe(
        (txt)=>{alert(txt); 
        this.items.splice((id-1), 1)},
        (error)=>{alert(error.error)}
      );
    }

    //next 3 methods opens  a three different dialogs(ng bootstrap Modals).
    //they transfers (back and fort) data (item obj) to the assigned components
    //i also updated the array so we dont need to refresh the page in order to see the items changes.
        openUpdateModal(item : Item){
          const modalRef = this.modalService.open(UpdateModalComponent);
          modalRef.componentInstance.item = item;
          modalRef.componentInstance.passEntry.subscribe((item) => {
            let item1 = this.items.find(i=>i.id === item.id);
            let index =this.items.indexOf(item1);
            this.items[index] = item;
            })
        }

        openWithdrawModal(item){
          const modalRef = this.modalService.open(WitdrawModalComponent);
          modalRef.componentInstance.item = item;
          modalRef.componentInstance.passEntry.subscribe((itm) => {
            let item1 = this.items.find(i=>i.id === itm.id);
            let index =this.items.indexOf(item1);
            this.items[index].count = itm.count;
            })
        }
       
        openDepositModal(item){
          const modalRef = this.modalService.open(DepositModalComponent);
          modalRef.componentInstance.item = item;
          modalRef.componentInstance.passEntry.subscribe((itm) => {
            let item1 = this.items.find(i=>i.id === itm.id);
            let index =this.items.indexOf(item1);
            this.items[index].count = itm.count;
            })
        }
      
     }
