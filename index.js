fetch('https://crudcrud.com/api/d2f6f2920c974697a54da361abb9189e/recipe', {
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
                _id: 'asdafsgsr1231dsada',
                "name": "Pie Crust",
                "quantity": "2 (store-bought or homemade)"
            },
            {
                _id: 'xdgdfedtewrq12',
                "name": "Apples",
                "quantity": "6 cups, peeled, cored, and sliced"
            },
            {
                _id: 'asfshfghdascsd',
                "name": "Sugar",
                "quantity": "3/4 cup"
            },
            {
                _id: '1243tgergdvsr23',
                "name": "Cinnamon",
                "quantity": "1 teaspoon"
            },
            {
                _id: 'asdadsasd1321321',
                "name": "Butter",
                "quantity": "2 tablespoons, diced"
            }
        ]
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
