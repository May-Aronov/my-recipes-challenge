var RecipeApp = function () {

    var recipes = [
        {
            id: 1,
            name: 'Best Chicken Soup!',
            image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
            ingredients: [
                { name: 'whole chicken', Ingredientid: 1 },
                { name: 'medium carrots', Ingredientid: 2 },
                { name: 'onions', Ingredientid: 3 },
            ]
        }
    ];

    var $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 4;

    var createRecipe = function (name, image) {
        var recipe = {
            name: name,
            image: image,
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId++;

        recipes.push(recipe);
    };

    var findrecipe = function (ID) {
        for (let j = 0; j < recipes.length; j++) {
            if (recipes[j].id == ID) {
                return recipes[j];
            }
        }
    };
    var findIngredientindex = function (currentpost, ingredientid) {
        var currentingredients = currentpost.ingredients;
        for (let i = 0; i < currentingredients.length; i++) {
            if (currentingredients[i].Ingredientid == ingredientid) {
                return i;
            }
        }
    };

    var createIngredients = function (recipeId, ingredientName) {
        Ingredient = {
            name: ingredientName
            , Ingredientid: ingId
        };
        ingId++
        findrecipe(recipeId).ingredients.push(Ingredient);
    };

    var removeIngredient = function (ingredientid, recipeid) {
        var currentpost = findrecipe(recipeid);
        var Ingredientindex = findIngredientindex(currentpost, ingredientid);
        currentpost.ingredients.splice(Ingredientindex, 1);
    };
    var _getIngredientsHTML = function (recipe) {
        var recipesHTML = "";
        var ingredients = recipe.ingredients
        for (let i = 0; i < ingredients.length; i++) {
            recipesHTML += `<li class="ingredient" data-id='${ingredients[i].Ingredientid}'>
            <button class="btn btn-danger btn-sm remove-ingredient">Remove ingredient</button>
            ${ingredients[i].name} 
           </li>`;
        }
        return recipesHTML;
    };

    var renderRecipes = function () {
        //empty recipes div
        $recipes.empty();

        for (var i = 0; i < recipes.length; i++) {
            //current recipe in iteration
            var recipe = recipes[i];

            //return HTML for all ingredients
            var ingredients = _getIngredientsHTML(recipe); //add code

            $recipes.append(
                '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' +
                '<h4 class="text-capitalize font-italic text-center">' + recipe.name + '</h4>' +
                '<img class="recipe-img" src="' + recipe.image + '"/>' +
                '<hr>' +
                '<h5 class="font-italic font-bold text-center">ingredients</h5>' +
                '<div class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<button  type="button" class="add-ingredients input-group-text btn btn-primary" id="basic-addon3">Add Ingredients</button>' +
                '</div>' +
                '<input type="text" class="form-control ingredientname" id="basic-url" aria-describedby="basic-addon3">' +

                '</div>' +
                '<ul class="ingredients">' + ingredients + '</ul>' +
                '</div>'
            );
        }
    };

    return {
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        createIngredients: createIngredients,
        removeIngredients: removeIngredient

    }
};

var app = RecipeApp();


//--------EVENTS

//add a recipe
$('.add-recipe').on('click', function () {
    //collect input text
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();

    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});

$('.recipes').on('click', '.add-ingredients', function () {
    let currentrecipe = $(this).closest('.recipe');
    let ingredientName = currentrecipe.find('.ingredientname').val();
    let recipeId = currentrecipe.data().id;
    app.createIngredients(recipeId, ingredientName);
    app.renderRecipes();
})
$('.recipes').on('click', '.remove-ingredient', function () {
    var relevantingredient = $(this).closest('.ingredient');
    var ingredientid = relevantingredient.data().id;
    var relevantrecipe = $(this).closest('.recipe');
    var recipeid = relevantrecipe.data().id;
    app.removeIngredients(ingredientid, recipeid);
    app.renderRecipes();
});

