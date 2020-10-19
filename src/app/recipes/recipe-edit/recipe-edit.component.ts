import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, NgControlStatus } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          //The plus before parms converts it into a number
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
          //Check which mode we are in 
          //console.log(this.editMode);

        }
      );
  }
  onSubmit(){
    console.log(this.recipeForm);
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );
  }
  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  private initForm(){
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]); 

    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });

  }
}
