fetch('https://crudcrud.com/api/4e792512535140a082bf592eed0d4bc0/recipe', {
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
                "quantity": "2"
            },
            {
                _id: 'xdgdfedtewrq12',
                "name": "Apples",
                "quantity": "6"
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
