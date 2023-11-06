fetch('https://crudcrud.com/api/c658423748ba4e74880027e7e2c082e1/recipe', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "name": "Apple Pie",
        "preparationTimeInMinutes": 60,
        "description": "Homemade apple pie with a flaky crust and sweet apple filling.",
        "ingredients": [
            {
                "name": "Pie Crust",
                "quantity": "2 (store-bought or homemade)"
            },
            {
                "name": "Apples",
                "quantity": "6 cups, peeled, cored, and sliced"
            },
            {
                "name": "Sugar",
                "quantity": "3/4 cup"
            },
            {
                "name": "Cinnamon",
                "quantity": "1 teaspoon"
            },
            {
                "name": "Butter",
                "quantity": "2 tablespoons, diced"
            }
        ]
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
