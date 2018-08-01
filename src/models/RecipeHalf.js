import React from 'react';

const recipes = [
  {
    name: 'Grilled Cheese',
    imgUrl: 'https://pixnio.com/free-images/food-and-drink/burgers-and-sandwiches/grilled-cheese-sandwiches-300x225.jpg',
    description: 'A basic grilled cheese.'
  },
  {
    name: 'Cheeseburger',
    imgUrl: 'https://pixnio.com/free-images/2017/05/31/2017-05-31-10-49-18-293x225.jpg',
    description: 'A basic burger.'
  },
  {
    name: 'Hotdog',
    imgUrl: 'https://res.cloudinary.com/twenty20/private_images/t_low-fit/v1460909863/photosp/05e67902-f076-4319-9dc2-394568a01493/05e67902-f076-4319-9dc2-394568a01493.jpg',
    description: 'A basic hotdog.'
  }
];

export default {
  title: 'Recipes',
  fetch: () => {
    const map = {};

    for (let recipe of recipes) {
      const parityProps = mapRecipeToParityProps(recipe);
      map[parityProps['_parityId']] = {
        ...recipe,
        ...parityProps
      };
    }

    return map;
  },
  renderItem: (recipe) => {
    return (
      <div>
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundSize: 'cover',
            backgroundImage: `url('${recipe.imgUrl}')`
          }}
        ></div>
        <p>{ recipe.description }</p>
      </div>
    );
  }
};

const mapRecipeToParityProps = (recipe) => {
  return {
    _parityId: recipe.name,
    _parityName: recipe.name
  };
};
