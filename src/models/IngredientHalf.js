import React from 'react';

const ingredients = [
  {
    name: 'Some form of bread',
    imgUrl: 'https://images.pexels.com/photos/2436/bread-food-healthy-breakfast.jpg?auto=compress&cs=tinysrgb&h=350',
    description: 'Some form of bread. Use your best judgment, I guess.'
  },
  {
    name: 'Cheese',
    imgUrl: 'https://images.pexels.com/photos/417468/pexels-photo-417468.jpeg?auto=compress&cs=tinysrgb&h=350',
    description: 'Cheese! Pick your favorite.'
  },
  {
    name: 'A meat',
    imgUrl: 'https://images.pexels.com/photos/8572/food-chicken-meat-outdoors.jpg?auto=compress&cs=tinysrgb&h=350',
    description: 'Mystery meat. Or whatever the recipe calls for.'
  },
  {
    name: 'Fresh vegetables',
    imgUrl: 'https://images.pexels.com/photos/36740/vegetables-vegetable-basket-harvest-garden.jpg?auto=compress&cs=tinysrgb&h=350',
    description: "Various fresh veggies for your gullet. Slice 'em or dice 'em."
  },
  {
    name: 'Condiments',
    imgUrl: 'https://images.unsplash.com/photo-1528750596806-ff12e21cda04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e06d076f451176a53c29c0b24cbb746&auto=format&fit=crop&w=1500&q=80',
    description: 'Did you know, it is difficult to find public domain images of simple condiments?'
  }
];

export default {
  title: 'Ingredients',
  fetch: () => {
    const map = {};

    for (let ingredient of ingredients) {
      const parityProps = mapIngredientToParityProps(ingredient);
      map[parityProps['_parityId']] = {
        ...ingredient,
        ...parityProps
      };
    }

    return map;
  },
  renderItem: (ingredient) => {
    return (
      <div>
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundSize: 'cover',
            backgroundImage: `url('${ingredient.imgUrl}')`
          }}
        ></div>
        <p>{ ingredient.description }</p>
      </div>
    );
  }
};

const mapIngredientToParityProps = (ingredient) => {
  return {
    _parityId: ingredient.name,
    _parityName: ingredient.name
  };
};
