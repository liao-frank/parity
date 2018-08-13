import React from 'react';

const recipes = [
  {
    name: 'Grilled Cheese',
    imgUrl: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f935a85fecb58d0fce20ff646eb7dec0&auto=format&fit=crop&w=1644&q=80',
    description: 'A basic grilled cheese.'
  },
  {
    name: 'Cheeseburger',
    imgUrl: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3fc18f1d35efa5d2f6714f3aca7c9cf6&auto=format&fit=crop&w=933&q=80',
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
